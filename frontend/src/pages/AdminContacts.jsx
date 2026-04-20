/* === AdminContacts.jsx - Quản lý yêu cầu tư vấn === */
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AdminContacts() {
  const { showToast } = useAuth()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  const fetchContacts = () => {
    const token = localStorage.getItem('erp_token')
    fetch(`${API_URL}/admin/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(data.contacts)
        else setError('Không thể tải danh sách tư vấn')
        setLoading(false)
      })
      .catch(() => {
        setError('Không thể kết nối đến server')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-teal-900 mb-1">Yêu cầu Tư vấn</h1>
        <p className="text-gray-500">Khách hàng để lại thông tin cần liên hệ</p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Tổng số yêu cầu</p>
          <p className="text-3xl font-bold text-teal-700">{contacts.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Yêu cầu hôm nay</p>
          <p className="text-3xl font-bold text-orange-500">
            {contacts.filter(c => new Date(c.createdAt).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
      </div>

      {/* Ô tìm kiếm */}
      <div className="mb-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên, số điện thoại..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                     focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
        />
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-16 text-center text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400">Chưa có yêu cầu tư vấn nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Khách hàng</th>
                  <th className="px-4 py-3 text-left font-medium">Liên hệ</th>
                  <th className="px-4 py-3 text-left font-medium">Nội dung</th>
                  <th className="px-4 py-3 text-left font-medium">Thời gian</th>
                  <th className="px-4 py-3 text-center font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-800">{c.phone}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                      {c.message || <span className="text-gray-400 italic">Không có lời nhắn</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(c.createdAt)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Chờ xử lý
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
