/* ===================================================
 * routes/user.routes.js
 * =================================================== */
import { Router } from 'express'
import { body } from 'express-validator'
import {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
} from '../controllers/user.controller.js'
import { protect, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

// Tất cả routes đều yêu cầu đăng nhập
router.use(protect)

router.get('/profile', getProfile)

router.put(
  '/profile',
  [
    body('name').optional().trim().notEmpty().withMessage('Họ tên không được để trống'),
    body('phone').optional().matches(/^0\d{9}$/).withMessage('Số điện thoại không hợp lệ'),
  ],
  updateProfile
)

router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại'),
    body('newPassword')
      .isLength({ min: 8 }).withMessage('Mật khẩu mới tối thiểu 8 ký tự')
      .matches(/[A-Z]/).withMessage('Mật khẩu mới phải có ít nhất 1 chữ hoa')
      .matches(/[0-9]/).withMessage('Mật khẩu mới phải có ít nhất 1 chữ số')
      .matches(/[!@#$%^&*]/).withMessage('Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt'),
  ],
  changePassword
)

// Chỉ admin — dùng requireRole thay adminOnly cứng nhắc
// Để mở rộng thêm role sau này chỉ cần: requireRole('admin', 'staff')
router.get('/', requireRole('admin'), getAllUsers)

export default router
