/* === Footer.jsx - Chân trang giống web gốc === */
import { Link } from 'react-router-dom'
import { contactInfo, navLinks, images } from '../../data/contact'

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <p className="text-sm leading-relaxed text-white/60">
              Bản hòa ca hoàn hảo của chất sống hiện đại và an yên, kiến tạo
              cộng đồng văn minh phía Đông Bắc Hà Nội.
            </p>
          </div>

          <div>
            <h4 className="text-gold-200 font-semibold text-base mb-4 font-body tracking-wide">
              Khám phá
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm hover:text-gold-200 transition-colors">Trang chủ</Link></li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-gold-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/lien-he" className="text-sm hover:text-gold-200 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-200 font-semibold text-base mb-4 font-body tracking-wide">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm">
              <li>{contactInfo.address}</li>
              <li>{contactInfo.office}</li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-200 transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`} className="hover:text-gold-200 font-semibold text-white text-base">
                  {contactInfo.hotline}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-200 font-semibold text-base mb-4 font-body tracking-wide">
              Kết nối
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={contactInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.81.47-1.37 1.35-1.41 2.29-.02.31 0 .62.03.93.12 1.44 1.31 2.76 2.75 2.87 1.23.07 2.4-.49 3.11-1.5.39-.56.57-1.22.59-1.9.04-4.88.01-9.76.05-14.63z"/></svg>
              </a>
            </div>
            <p className="text-sm text-white/50">
              Phát triển bởi<br />
              <span className="text-gold-200 font-semibold">{contactInfo.developer}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} {contactInfo.projectName}. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
