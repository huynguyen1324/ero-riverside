/* === Toast.jsx - Thông báo nổi === */
import { useAuth } from '../../contexts/AuthContext'

export default function Toast() {
  const { toast } = useAuth()
  if (!toast) return null

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-teal-700'

  return (
    <div className="fixed top-24 right-4 z-[200] animate-slide-down">
      <div className={`${bgColor} text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 min-w-[280px]`}>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  )
}
