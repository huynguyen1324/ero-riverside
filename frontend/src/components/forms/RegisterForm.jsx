/* === RegisterForm.jsx - Form đăng ký tài khoản === */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'

export default function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên'
    if (!form.email.trim()) {
      errs.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email không đúng định dạng'
    }
    if (!form.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^0\d{9}$/.test(form.phone)) {
      errs.phone = 'Số điện thoại phải có 10 chữ số, bắt đầu bằng 0'
    }
    if (!form.password) {
      errs.password = 'Vui lòng nhập mật khẩu'
    } else if (form.password.length < 6) {
      errs.password = 'Mật khẩu tối thiểu 6 ký tự'
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    } else if (form.confirmPassword !== form.password) {
      errs.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
    setLoading(false)
    if (result.success) navigate('/dang-nhap')
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const renderField = (field, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-dark-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300 ${
          errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
        }`}
      />
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderField('name', 'Họ tên', 'text', 'Nguyễn Văn A')}
      {renderField('email', 'Email', 'email', 'example@email.com')}
      {renderField('phone', 'Số điện thoại', 'tel', '0912345678')}
      {renderField('password', 'Mật khẩu', 'password', 'Tối thiểu 6 ký tự')}
      {renderField('confirmPassword', 'Xác nhận mật khẩu', 'password', 'Nhập lại mật khẩu')}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
      </Button>

      <p className="text-center text-sm text-dark-500">
        Đã có tài khoản?{' '}
        <Link to="/dang-nhap" className="text-teal-700 font-semibold hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}
