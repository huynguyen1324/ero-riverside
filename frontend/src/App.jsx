/* === App.jsx - Component gốc, định nghĩa toàn bộ routing === */
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ValuePage from './pages/ValuePage'
import PolicyPage from './pages/PolicyPage'
import LocationPage from './pages/LocationPage'
import AmenitiesPage from './pages/AmenitiesPage'
import FloorPlanPage from './pages/FloorPlanPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import AdminContacts from './pages/AdminContacts'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/common/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* Các route giao diện Admin (Tách biệt khỏi MainLayout) */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
      </Route>

      {/* Tất cả trang khách hàng dùng chung MainLayout (Header + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/gia-tri-ben-vung" element={<ValuePage />} />
        <Route path="/chinh-sach-ban-hang" element={<PolicyPage />} />
        <Route path="/vi-tri" element={<LocationPage />} />
        <Route path="/tien-ich" element={<AmenitiesPage />} />
        <Route path="/mat-bang" element={<FloorPlanPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />

        {/* Protected route: chỉ truy cập được khi đã đăng nhập */}
        <Route
          path="/tai-khoan"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        {/* Trang 404 cho mọi URL không khớp */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
