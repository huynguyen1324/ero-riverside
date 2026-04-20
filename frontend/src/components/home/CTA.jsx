/* === CTA.jsx - Call-to-Action section trên trang chủ === */
import { Link } from 'react-router-dom'
import { images } from '../../data/contact'

const quickLinks = [
  { label: 'Chính sách bán hàng', path: '/chinh-sach-ban-hang', desc: 'Ưu đãi hấp dẫn, hỗ trợ tài chính' },
  { label: 'Vị trí dự án', path: '/vi-tri', desc: 'Tâm điểm kết nối, bứt phá kế hoạch' },
  { label: 'Tiện ích nội khu', path: '/tien-ich', desc: 'Bể bơi, TTTM, sân thể thao,...' },
  { label: 'Mặt bằng căn hộ', path: '/mat-bang', desc: 'Xem chi tiết layout các căn hộ' },
]

export default function CTA() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.aerialView} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-teal-900/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Khám phá <span className="text-gold-200">Ero Riverside</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tìm hiểu chi tiết từng khía cạnh của dự án để đưa ra quyết định đầu tư sáng suốt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group block bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-gold-200 transition-colors">
                {item.label}
              </h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
              <span className="inline-block mt-3 text-gold-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Xem chi tiết →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
