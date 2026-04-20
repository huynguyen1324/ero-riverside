/* === LoginPage.jsx - Trang đăng nhập === */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/forms/LoginForm'
import { images } from '../data/contact'

export default function LoginPage() {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn) return <Navigate to="/" replace />

  return (
    <section className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={images.lifestyle} alt="Ero Riverside" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-teal-900/60" />
        <div className="absolute bottom-16 left-10 right-10">
          <h2 className="font-display text-3xl font-bold text-white leading-snug">
            Giá trị bền vững<br />
            <span className="text-gold-200">Sinh lời vượt trội</span>
          </h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-24 lg:pt-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <img src={images.logo} alt="Logo" className="h-10 mx-auto mb-4" />
          </div>
          <h1 className="font-display text-3xl font-bold text-teal-900 mb-2">Đăng nhập</h1>
          <p className="text-dark-500 mb-8">Đăng nhập để quản lý thông tin và nhận ưu đãi riêng.</p>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
