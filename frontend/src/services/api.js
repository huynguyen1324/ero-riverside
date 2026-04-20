/* ===================================================
 * API Service - Tích hợp Backend
 * =================================================== */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper: Lấy token từ localStorage (hoặc dùng AuthContext nếu cần)
const getToken = () => localStorage.getItem('erp_token')

// Helper: Gọi API với fetch
const request = async (endpoint, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
  
  // Xử lý lỗi
  if (!res.ok) {
    let errorMessage = 'Lỗi không xác định'
    try {
      const data = await res.json()
      errorMessage = data.message || errorMessage
    } catch (e) {
      // res.json() có thể lỗi nếu server trả về plain text
    }
    throw new Error(errorMessage)
  }

  return await res.json()
}

// ══════════════════════════════════════════════════════
// AUTH API
// ══════════════════════════════════════════════════════

export const authAPI = {
  // Đăng ký tài khoản
  register: (userData) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),

  // Đăng nhập
  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

  // Lấy thông tin user hiện tại
  getMe: () => request('/auth/me'),
}

// ══════════════════════════════════════════════════════
// USER API
// ══════════════════════════════════════════════════════

export const userAPI = {
  getProfile: () => request('/users/profile'),

  updateProfile: (data) =>
    request('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),

  changePassword: (data) =>
    request('/users/change-password', { method: 'PUT', body: JSON.stringify(data) }),
}

// ══════════════════════════════════════════════════════
// CONTACT API
// ══════════════════════════════════════════════════════

export const contactAPI = {
  submit: (data) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),
}

export default {
  auth: authAPI,
  user: userAPI,
  contact: contactAPI
}
