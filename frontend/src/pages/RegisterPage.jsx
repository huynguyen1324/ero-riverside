/* === RegisterPage.jsx - Trang đăng ký tài khoản === */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/forms/RegisterForm'
import { images, contactInfo } from '../data/contact'

export default function RegisterPage() {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn) return <Navigate to="/" replace />

  return (
    <section className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={images.valueSection} alt={contactInfo.projectName} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-teal-900/60" />
        <div className="absolute bottom-16 left-10 right-10">
          <h2 className="font-display text-3xl font-bold text-white leading-snug">
            Tham gia cộng đồng<br />
            <span className="text-gold-200">cư dân đẳng cấp</span>
          </h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-24 lg:pt-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <img src={images.logo} alt="Logo" className="h-10 mx-auto mb-4" />
          </div>
          <h1 className="font-display text-3xl font-bold text-teal-900 mb-2">Đăng ký tài khoản</h1>
          <p className="text-dark-500 mb-8">Tạo tài khoản để theo dõi thông tin và nhận ưu đãi dành riêng cho bạn.</p>
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}
