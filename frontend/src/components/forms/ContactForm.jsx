/* === ContactForm.jsx - Form đăng ký tư vấn === */
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'

export default function ContactForm() {
  const { showToast } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên'
    if (!form.email.trim()) {
      errs.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email không đúng định dạng'
    }
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        showToast('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.')
      } else {
        showToast(data.message || 'Gửi thất bại, vui lòng thử lại!', 'error')
      }
    } catch {
      showToast('Không thể kết nối đến server. Vui lòng thử lại!', 'error')
    }
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-teal-900 mb-3">Cảm ơn bạn!</h3>
        <p className="text-dark-500 mb-6">
          Thông tin đã được ghi nhận. Đội ngũ tư vấn sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}>
          Gửi thông tin khác
        </Button>
      </div>
    )
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-teal-300 ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Họ tên *</label>
        <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Nguyễn Văn A" className={inputClass('name')} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Email *</label>
        <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="example@email.com" className={inputClass('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Số điện thoại *</label>
        <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="0912345678" className={inputClass('phone')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-1.5">Nội dung</label>
        <textarea value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Tôi muốn tìm hiểu thêm về..." rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
      </div>
      <Button type="submit" variant="orange" className="w-full" size="lg">
        GỬI THÔNG TIN
      </Button>
    </form>
  )
}
