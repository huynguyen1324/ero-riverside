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
      {/* === NÚT TIKTOK === */}
      <a
        href={contactInfo.tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn-pulse"
        title="TikTok Ero Riverside"
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
        }}
      >
        <svg style={{ width: 22, height: 22 }} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.81.47-1.37 1.35-1.41 2.29-.02.31 0 .62.03.93.12 1.44 1.31 2.76 2.75 2.87 1.23.07 2.4-.49 3.11-1.5.39-.56.57-1.22.59-1.9.04-4.88.01-9.76.05-14.63z"/></svg>
      </a>

      {/* === NÚT ĐIỆN THOẠI === */}
      <a
        href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`}
        className="floating-btn-pulse"
        title={`Gọi: ${contactInfo.hotline}`}
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
