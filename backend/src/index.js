// ===================================================
// index.js - Entry point
// ===================================================
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import xss from 'xss'

import authRoutes    from './routes/auth.routes.js'
import userRoutes    from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Security Middleware ───────────────────────────────
// Helmet: tự động set các security HTTP headers
//   (X-Content-Type-Options, X-Frame-Options, HSTS, CSP, X-XSS-Protection, ...)
app.use(helmet())

// XSS sanitize: làm sạch mọi input từ body/query/params
// Dùng thư viện 'xss' (đang được maintain) thay vì 'xss-clean' (deprecated, có CVE)
app.use((req, res, next) => {
  if (req.body)   req.body   = JSON.parse(xss(JSON.stringify(req.body)))
  if (req.query)  req.query  = JSON.parse(xss(JSON.stringify(req.query)))
  if (req.params) req.params = JSON.parse(xss(JSON.stringify(req.params)))
  next()
})

// ── General Middleware ────────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())  // Parse cookie để đọc refreshToken httpOnly

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,  // Bắt buộc để cookie httpOnly hoạt động cross-origin
}))

// ── Rate Limiting ─────────────────────────────────────
// Rate limit chung
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Quá nhiều yêu cầu, thử lại sau.' },
}))

// Rate limit riêng cho auth (chặt hơn — chống brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Quá nhiều lần thử, thử lại sau 15 phút.' },
})

// ── Routes ───────────────────────────────────────────
app.use('/api/auth',    authLimiter, authRoutes)
app.use('/api/users',   userRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server đang chạy 🚀' })
})

// ── 404 ──────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint không tồn tại' })
})

// ── Global error ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Lỗi server:', err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi server nội bộ',
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`)
})
