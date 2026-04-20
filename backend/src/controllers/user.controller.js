// ===================================================
// controllers/user.controller.js
// ===================================================
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import prisma from '../config/db.js'

const safeUser = (u) => ({
  id: u.id, name: u.name, email: u.email,
  phone: u.phone, role: u.role, createdAt: u.createdAt,
})

// GET /api/users/profile
export const getProfile = async (req, res) => {
  res.json({ success: true, user: safeUser(req.user) })
}

// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg })
    }

    const { name, phone } = req.body
    const data = {}
    if (name)  data.name  = name
    if (phone) data.phone = phone

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
    })

    res.json({ success: true, message: 'Cập nhật thành công!', user: safeUser(user) })
  } catch (err) {
    console.error('Update profile error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}

// PUT /api/users/change-password
export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg })
    }

    const { currentPassword, newPassword } = req.body

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng.' })
    }

    const hashed = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } })

    res.json({ success: true, message: 'Đổi mật khẩu thành công!' })
  } catch (err) {
    console.error('Change password error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}

// GET /api/users  (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 20
    const skip  = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.user.count(),
    ])

    res.json({
      success: true,
      data: users.map(safeUser),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}
