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
                href={contactInfo.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-500 flex items-center justify-center transition-colors"
                aria-label="Zalo"
              >
                <span className="text-xs font-bold">Zalo</span>
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
