/* === Intro.jsx - Giới thiệu ngắn dự án trên trang chủ === */
import { images, contactInfo } from '../../data/contact'
import { projectStats } from '../../data/highlights'

export default function Intro() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img
              src={images.projectOverview}
              alt={`Tổng quan dự án ${contactInfo.projectName}`}
              className="rounded-2xl shadow-xl w-full object-cover object-left aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-teal-800 text-white rounded-xl p-5 shadow-xl">
              <p className="text-3xl font-display font-bold text-gold-200">22.5 ha</p>
              <p className="text-sm text-white/70 mt-1">Quy hoạch GĐ 1</p>
            </div>
          </div>

          <div>
            <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">
              Tổng quan dự án
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-3 mb-5 leading-tight">
              Một không gian Châu Âu trong lòng Hà Nội - Bắc Ninh
            </h2>

            <p className="text-dark-500 text-lg leading-relaxed mb-4">
              <strong className="text-teal-800">Ero Riverside</strong> là khu đô thị hạt nhân trong chiến lược phát triển mở rộng của Hà Nội và Bắc Ninh, kiến tạo một cộng đồng sống văn minh và hiện đại trên quy mô 200ha.
            </p>

            <p className="text-dark-500 leading-relaxed mb-8">
              Sở hữu vị trí đắc địa tại xã Phù Chẩn, dự án được quy hoạch đồng bộ theo chuẩn mực quốc tế, mang đậm dấu ấn kiến trúc Châu Âu hài hòa với cảnh sắc thiên nhiên Kinh Bắc.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {projectStats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <p className="text-xl lg:text-2xl font-display font-bold text-teal-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-dark-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
