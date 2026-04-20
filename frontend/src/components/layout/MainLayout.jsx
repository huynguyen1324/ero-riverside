/* === MainLayout.jsx - Layout chính bọc tất cả các trang ===
 * Gồm Header (trên), nội dung trang (giữa), Footer (dưới),
 * nút hành động nổi (Zalo, Hotline) và Toast thông báo.
 */
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import FloatingActions from '../common/FloatingActions'
import Toast from '../common/Toast'

export default function MainLayout() {
  const { pathname } = useLocation()

  // Mỗi khi chuyển trang, cuộn lên đầu
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Nội dung trang hiện tại (render bởi React Router) */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Nút nổi Zalo + Hotline góc phải */}
      <FloatingActions />

      {/* Toast thông báo toàn app */}
      <Toast />
    </div>
  )
}
