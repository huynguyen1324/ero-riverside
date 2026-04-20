/* === ProtectedRoute.jsx - Bảo vệ trang cần đăng nhập ===
 * Nếu chưa đăng nhập → chuyển về trang đăng nhập.
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  // Chưa đăng nhập → redirect sang /dang-nhap
  if (!isLoggedIn) {
    return <Navigate to="/dang-nhap" replace />
  }

  // Đã đăng nhập → hiện nội dung bình thường
  return children
}
