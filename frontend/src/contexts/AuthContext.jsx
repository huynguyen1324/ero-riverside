/* ===================================================
 * AuthContext.jsx - Quản lý trạng thái đăng nhập toàn app
 *
 * Chiến lược token bảo mật:
 *  - accessToken  : lưu trong state (memory), KHÔNG localStorage → không bị XSS đọc
 *  - refreshToken : lưu trong httpOnly cookie do backend set → JS không đọc được
 *
 * Flow tự động refresh:
 *  Khi API trả 401 → gọi /api/auth/refresh (cookie tự gửi kèm) → nhận accessToken mới
 *  Nếu refresh cũng thất bại → logout hẳn
 * =================================================== */
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null)
  const [loading, setLoading]         = useState(true)
  const [toast, setToast]             = useState(null)

  // accessToken lưu trong ref (không trigger re-render, không trong localStorage)
  const accessTokenRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ── Hàm tạo header Authorization ─────────────────────
  const authHeader = () =>
    accessTokenRef.current
      ? { Authorization: `Bearer ${accessTokenRef.current}` }
      : {}

  // ── Tự động refresh khi accessToken hết hạn ──────────
  const tryRefresh = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method:      'POST',
        credentials: 'include',  // Gửi kèm httpOnly cookie refreshToken
      })
      if (!res.ok) return false
      const data = await res.json()
      accessTokenRef.current = data.accessToken
      return true
    } catch {
      return false
    }
  }, [])

  // ── Fetch wrapper: tự retry sau khi refresh ──────────
  const apiFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...authHeader(), ...options.headers },
    })

    // Nếu 401 và chưa retry → thử refresh rồi gọi lại
    if (res.status === 401 && !options._retry) {
      const refreshed = await tryRefresh()
      if (refreshed) {
        return apiFetch(url, { ...options, _retry: true })
      }
      // Refresh cũng thất bại → logout hẳn
      setUser(null)
      accessTokenRef.current = null
      return res
    }

    return res
  }, [tryRefresh])

  // ── Kiểm tra session khi app khởi động ───────────────
  useEffect(() => {
    const init = async () => {
      // Thử refresh để lấy accessToken (nếu còn cookie hợp lệ)
      const refreshed = await tryRefresh()
      if (!refreshed) {
        setLoading(false)
        return
      }

      // Lấy thông tin user
      try {
        const res  = await apiFetch(`${API_URL}/auth/me`)
        const data = await res.json()
        if (data.success) setUser(data.user)
      } catch { /* backend chưa chạy */ }

      setLoading(false)
    }

    init()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // ── ĐĂNG NHẬP ────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    try {
      const res  = await fetch(`${API_URL}/auth/login`, {
        method:      'POST',
        credentials: 'include',   // Nhận httpOnly cookie
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.success) {
        accessTokenRef.current = data.accessToken  // Lưu trong memory
        setUser(data.user)
        showToast('Đăng nhập thành công!')
        return { success: true }
      }

      showToast(data.message || 'Email hoặc mật khẩu không đúng!', 'error')
      return { success: false, message: data.message }
    } catch {
      showToast('Không thể kết nối đến server. Vui lòng thử lại!', 'error')
      return { success: false, message: 'Lỗi kết nối' }
    }
  }, [showToast])

  // ── ĐĂNG KÝ ──────────────────────────────────────────
  const register = useCallback(async (userData) => {
    try {
      const res  = await fetch(`${API_URL}/auth/register`, {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify(userData),
      })
      const data = await res.json()

      if (data.success) {
        showToast('Đăng ký thành công! Vui lòng đăng nhập.')
        return { success: true }
      }

      showToast(data.message || 'Đăng ký thất bại!', 'error')
      return { success: false, message: data.message }
    } catch {
      showToast('Không thể kết nối đến server. Vui lòng thử lại!', 'error')
      return { success: false, message: 'Lỗi kết nối' }
    }
  }, [showToast])

  // ── ĐĂNG XUẤT ────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      // Gọi server để blacklist access token + xóa refreshToken cookie
      await apiFetch(`${API_URL}/auth/logout`, { method: 'POST' })
    } catch { /* Ignore lỗi mạng khi logout */ }

    accessTokenRef.current = null
    setUser(null)
    showToast('Đã đăng xuất')
  }, [apiFetch, showToast])

  // ── CẬP NHẬT PROFILE ─────────────────────────────────
  const updateProfile = useCallback(async (data) => {
    try {
      const res  = await apiFetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        body:   JSON.stringify(data),
      })
      const result = await res.json()

      if (result.success) {
        setUser(result.user)
        showToast('Cập nhật thành công!')
        return { success: true }
      }

      showToast(result.message, 'error')
      return { success: false, message: result.message }
    } catch {
      return { success: false, message: 'Lỗi kết nối' }
    }
  }, [apiFetch, showToast])

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    apiFetch,   // Expose để các component khác dùng API call có auto-refresh
    toast,
    showToast,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
