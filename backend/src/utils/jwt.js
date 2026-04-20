/* ===================================================
 * utils/jwt.js - Tạo và xác thực JWT token
 *
 * Chiến lược 2 loại token:
 *  - accessToken : chứa { id, role }, hết hạn 15 phút
 *  - refreshToken: chứa { id } chỉ, hết hạn 7 ngày, lưu httpOnly cookie
 * =================================================== */
import jwt from 'jsonwebtoken'

/**
 * Tạo access token (15 phút).
 * Nhúng cả role vào payload để tránh query DB mỗi request.
 */
export const signAccessToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  })

/**
 * Tạo refresh token (7 ngày).
 * Chỉ chứa id, không chứa role — giảm thông tin trong cookie.
 */
export const signRefreshToken = ({ id }) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  })

/** Xác thực access token */
export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET)

/** Xác thực refresh token */
export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET)
