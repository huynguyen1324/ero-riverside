/* === AccountPage.jsx - Trang thông tin cá nhân (protected route) === */
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

const API_URL = 'http://localhost:5000/api'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('erp_token')
      try {
        const res = await fetch(`${API_URL}/contact/my-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          setRequests(data.contacts)
        }
      } catch (err) {
        console.error('Không thể lấy lịch sử tư vấn')
      } finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Banner gradient */}
          <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' }}>
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-2xl bg-gold-500 text-white flex items-center justify-center text-3xl font-display font-bold shadow-lg border-4 border-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          <div className="pt-14 pb-8 px-8">
            <h1 className="font-display text-2xl font-bold text-teal-900">
              {user?.name || 'Người dùng'}
            </h1>
            <p className="text-dark-500 mt-1">Thành viên Ero Riverside</p>

            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-dark-500 mb-1">Email</p>
                  <p className="font-medium text-dark-700">{user?.email || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-dark-500 mb-1">Số điện thoại</p>
                  <p className="font-medium text-dark-700">{user?.phone || '—'}</p>
                </div>
              </div>

              {/* Lịch sử yêu cầu tư vấn */}
              <div>
                <h3 className="font-semibold text-teal-900 mb-3">Lịch sử Yêu cầu Tư vấn</h3>
                {loading ? (
                  <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
                ) : requests.length > 0 ? (
                  <div className="space-y-3">
                    {requests.map((req) => (
                      <div key={req.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">{formatDate(req.createdAt)}</span>
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                            Đã tiếp nhận
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm">
                          {!req.message ? <span className="italic text-gray-400">Không có lời nhắn</span> : `"${req.message}"`}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-teal-50 rounded-xl p-5 border border-teal-100 text-center">
                    <p className="text-sm text-dark-500 mb-3">
                      Bạn chưa gửi yêu cầu tư vấn nào.
                    </p>
                    <Button to="/lien-he" variant="primary" className="text-sm">Đặt lịch tư vấn ngay</Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-full text-red-600 font-semibold border-2 border-red-100 hover:bg-red-50 transition-colors text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
