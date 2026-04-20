/* ===================================================
 * routes/contact.routes.js
 * =================================================== */
import { Router } from 'express'
import { body } from 'express-validator'
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
} from '../controllers/contact.controller.js'
import { protect, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

const contactRules = [
  body('name').trim().notEmpty().withMessage('Vui lòng nhập họ tên'),
  body('email').isEmail().withMessage('Email không đúng định dạng').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Vui lòng nhập số điện thoại'),
  body('message').optional().trim(),
]

// Public: ai cũng gửi được (có thể đăng nhập hoặc không)
// protect được dùng với optional=true bằng cách tự viết
router.post('/', contactRules, (req, res, next) => {
  // Thử lấy user nếu có token, không có thì bỏ qua
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    return protect(req, res, () => next())
  }
  next()
}, submitContact)

// Admin only
router.get('/', protect, requireRole('admin'), getAllContacts)
router.patch('/:id/status', protect, requireRole('admin'), updateContactStatus)

export default router
