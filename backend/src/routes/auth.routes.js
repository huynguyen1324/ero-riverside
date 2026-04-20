/* ===================================================
 * routes/auth.routes.js
 * =================================================== */
import { Router } from 'express'
import { body } from 'express-validator'
import { register, login, logout, refreshToken, getMe } from '../controllers/auth.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = Router()

// Validation rules
const passwordRules = body('password')
  .isLength({ min: 8 }).withMessage('Mật khẩu tối thiểu 8 ký tự')
  .matches(/[A-Z]/).withMessage('Mật khẩu phải có ít nhất 1 chữ hoa')
  .matches(/[0-9]/).withMessage('Mật khẩu phải có ít nhất 1 chữ số')
  .matches(/[!@#$%^&*]/).withMessage('Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)')

const registerRules = [
  body('name').trim().notEmpty().withMessage('Vui lòng nhập họ tên'),
  body('email').isEmail().withMessage('Email không đúng định dạng').normalizeEmail(),
  body('phone').matches(/^0\d{9}$/).withMessage('Số điện thoại phải có 10 chữ số, bắt đầu bằng 0'),
  passwordRules,
]

const loginRules = [
  body('email').isEmail().withMessage('Email không đúng định dạng').normalizeEmail(),
  body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu'),
]

router.post('/register', registerRules, register)
router.post('/login',    loginRules,    login)
router.post('/logout',   protect,       logout)   // Cần token để blacklist
router.post('/refresh',                 refreshToken)  // Dùng httpOnly cookie
router.get('/me',        protect,       getMe)

export default router
