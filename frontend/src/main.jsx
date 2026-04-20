/* === main.jsx - Điểm khởi chạy ứng dụng === */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter bọc toàn bộ app để dùng React Router */}
    <BrowserRouter>
      {/* AuthProvider cung cấp trạng thái đăng nhập cho toàn app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
