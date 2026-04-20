/* === Header.jsx - Navbar khớp pixel với web gốc Ero Riverside ===
 *
 * Cấu trúc bố cục (flex, 3 vùng):
 *   [LOGO fixed-left]  ---  [MENU]  ---  [CTA pill button]
 *
 * - Thanh gradient 4px ở DƯỚI header (giống web gốc)
 * - Logo có fallback: SVG gốc → ảnh local → text
 * - Nút ĐẶT LỊCH TƯ VẤN: pill, gradient teal, icon chuông vàng, pulse animation
 * - Auth button nhỏ gọn, không phá layout
 */
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { navLinks, images } from '../../data/contact'

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)
  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/') }

  /* Khi logo SVG gốc lỗi → dùng file local fallback */
  const handleLogoError = () => setLogoError(true)
  const logoSrc = logoError ? images.logoFallback : images.logo

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'shadow-md' : ''}`}
      style={{ transition: 'box-shadow 0.3s ease' }}
    >
      {/* ========== NỀN TRẮNG CHÍNH ========== */}
      <div style={{ backgroundColor: '#fff' }}>
        {/*
          Container cố định 1200px, padding 2 bên 24px.
          Flex justify-between để 3 vùng KHÔNG chồng lấn.
        */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
          }}
        >
          <Link
            to="/"
            onClick={closeMobile}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={logoSrc}
              alt="Ero Riverside"
              onError={handleLogoError}
              style={{
                height: 50,
                width: 'auto',
                maxWidth: 'none',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </Link>

          {/* ====== VÙNG 2: MENU DESKTOP (giữa-phải) ====== */}
          <nav
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'header-nav-active' : 'header-nav-item'
                }
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  padding: '6px 12px',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ====== VÙNG 3: CTA + AUTH (phải, cố định) ====== */}
          <div
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Nút ĐẶT LỊCH TƯ VẤN — pill, gradient, chuông vàng, pulse */}
            <Link
              to="/lien-he"
              className="btn-cta-pulse"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #19aac3 0%, #03989e 30%, #034f58 100%)',
                borderRadius: 26,
                padding: '9px 20px',
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
              }}
            >
              {/* Icon chuông vàng nhạt + animation rung */}
              <svg
                className="bell-icon"
                viewBox="0 0 24 24"
                style={{ width: 15, height: 15, fill: '#fde298', flexShrink: 0 }}
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              ĐẶT LỊCH TƯ VẤN
            </Link>

            {/* Auth nhỏ gọn */}
            {isLoggedIn ? (
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 6px',
                    borderRadius: 20,
                  }}
                  className="hover:bg-gray-50"
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    backgroundColor: '#03989e', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: '#005967',
                    maxWidth: 72, overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {user.name || 'Tài khoản'}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="animate-slide-down" style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 4,
                    width: 172, background: '#fff', borderRadius: 12,
                    boxShadow: '0 8px 30px rgba(0,0,0,.12)', border: '1px solid #f0f0f0',
                    padding: '6px 0', whiteSpace: 'normal',
                  }}>
                    {user?.email === 'admin@erp.vn' && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                        style={{ display: 'block', padding: '8px 16px', fontSize: 13, color: '#03989e', textDecoration: 'none', fontWeight: 600 }}
                        className="hover:bg-teal-50">Trang Quản Trị</Link>
                    )}
                    <Link to="/tai-khoan" onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'block', padding: '8px 16px', fontSize: 13, color: '#363636', textDecoration: 'none' }}
                      className="hover:bg-teal-50">Thông tin cá nhân</Link>
                    <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #f0f0f0' }} />
                    <button onClick={handleLogout}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px', fontSize: 13, color: '#e01a1a', background: 'none', border: 'none', cursor: 'pointer' }}
                      className="hover:bg-red-50">Đăng xuất</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/dang-nhap" style={{
                fontSize: 14, fontWeight: 600, color: '#005967',
                textDecoration: 'none', whiteSpace: 'nowrap', padding: '6px 12px',
              }}>
                Đăng nhập
              </Link>
            )}
          </div>

          {/* ====== Hamburger (mobile) ====== */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label="Menu"
            style={{ marginLeft: 'auto', padding: 8, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{ width: 22, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ display: 'block', height: 2, borderRadius: 1, background: '#005967', transition: 'all 0.2s',
                transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ display: 'block', height: 2, borderRadius: 1, background: '#005967', transition: 'all 0.2s',
                opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: 'block', height: 2, borderRadius: 1, background: '#005967', transition: 'all 0.2s',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </div>
          </button>
        </div>
      </div>

      {/* ========== THANH GRADIENT 4px Ở DƯỚI (giống web gốc) ========== */}
      <div className="header-bottom-line" />

      {/* ========== MOBILE MENU ========== */}
      {mobileOpen && (
        <div className="lg:hidden animate-slide-down" style={{ background: '#fff', borderTop: '1px solid #f0f0f0', boxShadow: '0 8px 30px rgba(0,0,0,.1)' }}>
          <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px' }}>
            <NavLink to="/" onClick={closeMobile}
              className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-bold ${isActive ? 'text-teal-500 bg-teal-50' : 'text-[#005967] hover:bg-gray-50'}`}>
              TRANG CHỦ
            </NavLink>
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} onClick={closeMobile}
                className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-bold ${isActive ? 'text-teal-500 bg-teal-50' : 'text-[#005967] hover:bg-gray-50'}`}>
                {link.label}
              </NavLink>
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f0f0f0' }} />
            <Link to="/lien-he" onClick={closeMobile}
              className="btn-cta-pulse"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0', borderRadius: 26, color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                background: 'linear-gradient(135deg, #19aac3 0%, #03989e 30%, #034f58 100%)' }}>
              <svg className="bell-icon" viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#fde298' }}>
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              ĐẶT LỊCH TƯ VẤN
            </Link>
            {isLoggedIn ? (
              <div style={{ marginTop: 8 }}>
                {user?.email === 'admin@erp.vn' && (
                  <Link to="/admin" onClick={closeMobile} className="block px-4 py-2.5 rounded-lg text-sm font-bold text-teal-700 bg-teal-100 mb-2">
                    Trang Quản Trị
                  </Link>
                )}
                <Link to="/tai-khoan" onClick={closeMobile} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#005967] bg-teal-50 mb-2">
                  {user.name || 'Tài khoản'}
                </Link>
                <button onClick={() => { handleLogout(); closeMobile() }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <Link to="/dang-nhap" onClick={closeMobile} style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 8, border: '1px solid #005967', color: '#005967', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Đăng nhập</Link>
                <Link to="/dang-ky" onClick={closeMobile} style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 8, border: '1px solid #005967', color: '#005967', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Đăng ký</Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {userMenuOpen && <div style={{ position: 'fixed', inset: 0, zIndex: -1 }} onClick={() => setUserMenuOpen(false)} />}
    </header>
  )
}
