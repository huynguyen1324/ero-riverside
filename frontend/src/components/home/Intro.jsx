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
              alt="Tổng quan dự án Ero Riverside"
              className="rounded-2xl shadow-xl w-full object-cover object-left aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-teal-800 text-white rounded-xl p-5 shadow-xl">
              <p className="text-3xl font-display font-bold text-gold-200">14.6 ha</p>
              <p className="text-sm text-white/70 mt-1">Tổng diện tích</p>
            </div>
          </div>

          <div>
            <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">
              Tổng quan dự án
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-3 mb-5 leading-tight">
              Bản hòa ca hoàn hảo của chất sống hiện đại và an yên
            </h2>

            <p className="text-dark-500 text-lg leading-relaxed mb-4">
              <strong className="text-teal-800">{contactInfo.projectName}</strong> là nơi nuôi dưỡng cảm xúc
              và nâng tầm trải nghiệm, kiến tạo một cộng đồng văn minh phía Đông Bắc Hà Nội.
            </p>

            <p className="text-dark-500 leading-relaxed mb-8">
              Được phát triển bởi <strong className="text-teal-800">{contactInfo.developer}</strong>,
              Ero Riverside gieo nguồn cảm hứng, khai mở cuộc sống thịnh vượng bên sông,
              mang đến trải nghiệm hệ tiện ích đa dạng, hiện đại.
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
