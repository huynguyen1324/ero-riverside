/* === FloatingActions.jsx - 3 nút liên hệ nổi bên phải ===
 * Zalo | Điện thoại | Facebook
 * Tất cả có hiệu ứng pulse scale animation.
 * KHÔNG có nút mũi tên lên đầu trang.
 */
import { useState, useEffect } from 'react'
import { contactInfo } from '../../data/contact'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 16,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* === NÚT ZALO === */}
      <a
        href={contactInfo.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn-pulse"
        title="Chat Zalo"
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#0068FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0, 104, 255, 0.4)',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 800, lineHeight: 1 }}>Zalo</span>
      </a>

      {/* === NÚT ĐIỆN THOẠI === */}
      <a
        href="tel:0932888008"
        className="floating-btn-pulse"
        title="Gọi: 0932 888 008"
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#03989e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(3, 152, 158, 0.4)',
        }}
      >
        <svg style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      {/* === NÚT FACEBOOK === */}
      <a
        href={contactInfo.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn-pulse"
        title="Facebook Ero Riverside"
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#1877F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(24, 119, 242, 0.4)',
        }}
      >
        <svg style={{ width: 22, height: 22 }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  )
}
