/* === AdminPage.jsx - Quản lý người dùng === */
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const API_URL = 'http://localhost:5000/api'

export default function AdminPage() {
  const { user, showToast } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  const fetchUsers = () => {
    const token = localStorage.getItem('erp_token')
    fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.users)
        else setError('Không thể tải danh sách người dùng')
        setLoading(false)
      })
      .catch(() => {
        setError('Không thể kết nối đến server')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}"?`)) return

    const token = localStorage.getItem('erp_token')
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        showToast('Đã xóa người dùng thành công!')
        fetchUsers() // Cập nhật lại danh sách
      } else {
        showToast(data.message || 'Xóa thất bại', 'error')
      }
    } catch {
      showToast('Lỗi kết nối khi xóa', 'error')
    }
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
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
        <h1 className="text-2xl font-bold text-teal-900 mb-1">Cài đặt tài khoản</h1>
        <p className="text-gray-500">Danh sách người dùng đã đăng ký hệ thống</p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Tổng tài khoản</p>
          <p className="text-3xl font-bold text-teal-700">{users.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Đăng ký hôm nay</p>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
      </div>

      {/* Ô tìm kiếm */}
      <div className="mb-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Tìm người dùng..."
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
          <div className="p-16 text-center text-gray-400">Không tìm thấy người dùng nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Họ tên</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Số điện thoại</th>
                  <th className="px-4 py-3 text-left font-medium">Ngày đăng ký</th>
                  <th className="px-4 py-3 text-right font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      {user.id !== u.id && (
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                        >
                          Xóa
                        </button>
                      )}
                      {user.id === u.id && (
                        <span className="text-gray-400 text-xs px-3 py-1.5">Bạn</span>
                      )}
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
