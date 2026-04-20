/* === AdminLayout.jsx - Giao diện dành riêng cho Admin === */
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLayout() {
  const { user, isLoggedIn, logout } = useAuth()
  const location = useLocation()

  // Bảo vệ route: Chỉ Admin mới được vào
  if (!isLoggedIn) return <Navigate to="/dang-nhap" replace />
  if (user?.email !== 'admin@erp.vn') return <Navigate to="/" replace />

  const navItems = [
    { name: 'Quản lý Tài khoản', path: '/admin', icon: '👤' },
    { name: 'Yêu cầu Tư vấn', path: '/admin/contacts', icon: '📞' },
  ]

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-900 text-white flex flex-col shadow-xl z-10">
        <div className="h-16 flex items-center px-6 border-b border-teal-800">
          <Link to="/" className="text-xl font-display font-bold text-gold-200 tracking-wider">
            ERP ADMIN
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-teal-800 text-gold-200 font-medium shadow-sm' : 'hover:bg-teal-800/50 text-gray-300'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-teal-800">
          <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white transition">
            ← Quay lại trang khách
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-0">
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="text-gray-900 font-medium">{user?.name}</p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
