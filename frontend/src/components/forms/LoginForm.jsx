/* === LoginForm.jsx - Form đăng nhập === */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) {
      errs.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email không đúng định dạng'
    }
    if (!form.password) {
      errs.password = 'Vui lòng nhập mật khẩu'
    } else if (form.password.length < 6) {
      errs.password = 'Mật khẩu tối thiểu 6 ký tự'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      if (form.email === 'admin@erp.vn') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="example@email.com"
          className={`w-full px-4 py-3 rounded-xl border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300 ${
            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Mật khẩu</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Tối thiểu 6 ký tự"
          className={`w-full px-4 py-3 rounded-xl border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300 ${
            errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          }`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

      <p className="text-center text-sm text-dark-500">
        Chưa có tài khoản?{' '}
        <Link to="/dang-ky" className="text-teal-700 font-semibold hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </form>
  )
}
