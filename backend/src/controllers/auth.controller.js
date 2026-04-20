// ===================================================
// controllers/auth.controller.js
// ===================================================
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import prisma from '../config/db.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js'
import { sendWelcomeEmail } from '../utils/email.js'

// Số lần login sai tối đa trước khi khóa tài khoản
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_DURATION_MS   = 15 * 60 * 1000  // 15 phút

// Cấu hình cookie cho refresh token
const REFRESH_COOKIE_OPTIONS = {
  httpOnly:  true,          // JS không đọc được → chặn XSS
  secure:    process.env.NODE_ENV === 'production', // chỉ HTTPS trên production
  sameSite: 'strict',       // chặn CSRF
  maxAge:    7 * 24 * 60 * 60 * 1000,  // 7 ngày (ms)
}

// Lọc thông tin an toàn (không trả password, loginAttempts, lockedUntil)
const safeUser = (u) => ({
  id: u.id, name: u.name, email: u.email,
  phone: u.phone, role: u.role, createdAt: u.createdAt,
})

// ── POST /api/auth/register ───────────────────────────
export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg })
    }

    const { name, email, phone, password } = req.body

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email này đã được đăng ký. Vui lòng dùng email khác.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword },
    })

    sendWelcomeEmail({ name, email }).catch(console.error)

    // Sau đăng ký, cấp luôn access token (không cần login lại)
    const accessToken = signAccessToken({ id: user.id, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id })

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công!',
      accessToken,
      user: safeUser(user),
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server, vui lòng thử lại.' })
  }
}

// ── POST /api/auth/login ──────────────────────────────
export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg })
    }

    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    // Không tiết lộ email có tồn tại hay không (ngăn user enumeration)
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' })
    }

    // Kiểm tra tài khoản có đang bị khóa không
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((user.lockedUntil - Date.now()) / 60000)
      return res.status(423).json({
        success: false,
        message: `Tài khoản bị khóa do nhập sai quá nhiều lần. Thử lại sau ${minutesLeft} phút.`,
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // Tăng loginAttempts, khóa nếu vượt ngưỡng
      const newAttempts = user.loginAttempts + 1
      const updateData  = { loginAttempts: newAttempts }

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        updateData.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS)
      }

      await prisma.user.update({ where: { id: user.id }, data: updateData })

      const remaining = MAX_LOGIN_ATTEMPTS - newAttempts
      const msg = remaining > 0
        ? `Email hoặc mật khẩu không đúng. Còn ${remaining} lần thử trước khi khóa tài khoản.`
        : 'Email hoặc mật khẩu không đúng. Tài khoản đã bị khóa 15 phút.'

      return res.status(401).json({ success: false, message: msg })
    }

    // Login thành công → reset loginAttempts
    await prisma.user.update({
      where: { id: user.id },
      data:  { loginAttempts: 0, lockedUntil: null },
    })

    const accessToken  = signAccessToken({ id: user.id, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id })

    // refreshToken → httpOnly cookie (không thể đọc bằng JS/XSS)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)

    res.json({
      success: true,
      message: 'Đăng nhập thành công!',
      accessToken,               // accessToken trả trong body
      user: safeUser(user),
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server, vui lòng thử lại.' })
  }
}

// ── POST /api/auth/logout ─────────────────────────────
export const logout = async (req, res) => {
  try {
    // Lấy access token từ header để blacklist
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      // Lưu vào blacklist để token này không dùng được nữa
      await prisma.blacklistedToken.create({ data: { token } })
    }

    // Xóa refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({ success: true, message: 'Đăng xuất thành công.' })
  } catch (err) {
    console.error('Logout error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}

// ── POST /api/auth/refresh ────────────────────────────
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken
    if (!token) {
      return res.status(401).json({ success: false, message: 'Không tìm thấy refresh token.' })
    }

    const decoded = verifyRefreshToken(token)

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Tài khoản không tồn tại hoặc đã bị vô hiệu hóa.' })
    }

    // Cấp access token mới
    const newAccessToken = signAccessToken({ id: user.id, role: user.role })

    res.json({ success: true, accessToken: newAccessToken })
  } catch {
    return res.status(401).json({ success: false, message: 'Refresh token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.' })
  }
}

// ── GET /api/auth/me ──────────────────────────────────
export const getMe = async (req, res) => {
  try {
    // Lấy đầy đủ thông tin user từ DB (req.user chỉ có id, role)
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' })
    }
    res.json({ success: true, user: safeUser(user) })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}
