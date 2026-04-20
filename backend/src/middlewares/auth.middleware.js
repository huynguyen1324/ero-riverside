// ===================================================
// middlewares/auth.middleware.js
// ===================================================
import { verifyToken } from '../utils/jwt.js'
import prisma from '../config/db.js'

/**
 * Middleware xác thực JWT.
 *
 * Lấy role từ payload (không query DB) để tối ưu hiệu năng.
 *
 * ⚠️ Trade-off đã biết: Nếu user bị deactivate (isActive=false),
 * access token cũ vẫn hợp lệ tối đa 15 phút cho đến khi hết hạn.
 * Đây là đánh đổi chấp nhận được do access token rất ngắn hạn.
 * Để revoke ngay lập tức khi deactivate: thêm token vào blacklist
 * tại thời điểm deactivate, hoặc giữ lại DB check cho endpoint nhạy cảm.
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Bạn chưa đăng nhập.' })
    }

    const token   = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    // Kiểm tra token có trong blacklist (đã logout) không
    const blocked = await prisma.blacklistedToken.findFirst({ where: { token } })
    if (blocked) {
      return res.status(401).json({ success: false, message: 'Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.' })
    }

    // Lấy id và role từ payload — không query DB
    req.user = { id: decoded.id, role: decoded.role }
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' })
  }
}

/**
 * RBAC middleware tổng quát.
 * Thay thế adminOnly cứng nhắc bằng hàm nhận nhiều role.
 *
 * Ví dụ:
 *   requireRole('admin')            — chỉ admin
 *   requireRole('admin', 'staff')   — admin hoặc staff
 *
 * Phải dùng sau protect để req.user đã được set.
 */
export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập.' })
  }
  next()
}
