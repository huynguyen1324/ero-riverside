/* === AboutPage.jsx - Trang giới thiệu dự án === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { images, contactInfo } from '../data/contact'
import { projectStats } from '../data/highlights'

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.lifestyle} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Giới thiệu dự án</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Tổng quan về Ero Riverside — Dự án đô thị hiện đại phía Đông Bắc Hà Nội</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img src={images.projectOverview} alt="Tổng quan Ero Riverside" className="rounded-2xl shadow-2xl w-full object-cover object-left aspect-[4/3]" />
              <img src={images.interiorView} alt="Nội thất căn hộ" className="absolute -bottom-8 -right-4 lg:-right-10 w-48 lg:w-64 rounded-xl shadow-xl border-4 border-white" />
            </div>
            <div className="lg:pl-4">
              <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">Tổng quan</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-3 mb-6 leading-tight">Bản hòa ca hoàn hảo của chất sống hiện đại và an yên</h2>
              <div className="space-y-4 text-dark-500 leading-relaxed">
                <p><strong className="text-teal-800">{contactInfo.projectName}</strong> là nơi nuôi dưỡng cảm xúc và nâng tầm trải nghiệm, kiến tạo một cộng đồng văn minh phía Đông Bắc Hà Nội.</p>
                <p>Được phát triển bởi <strong className="text-teal-800">{contactInfo.developer}</strong>, dự án gieo nguồn cảm hứng, khai mở cuộc sống thịnh vượng bên sông, mang đến trải nghiệm hệ tiện ích đa dạng, hiện đại.</p>
                <p>Tọa lạc trên đại lộ Trường Sa ngay bên cầu Đông Trù, dự án sở hữu ưu thế "kép" về vị trí — vừa gần trung tâm hiện đại với chỉ 15 phút di chuyển vào phố cổ, 20 phút tới sân bay Nội Bài; vừa kế cận điểm giao giữa sông Hồng, sông Đuống.</p>
              </div>
              <div className="mt-8">
                <Button to="/lien-he" variant="orange">Đăng ký tư vấn</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Thông tin nổi bật" subtitle="Những con số ấn tượng của dự án" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {projectStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 lg:p-8 text-center shadow-md border border-teal-100/50">
                <p className="text-3xl lg:text-4xl font-display font-bold text-teal-800">{stat.value}</p>
                <p className="text-dark-500 mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Hình ảnh tiêu biểu" subtitle="Cảnh quan và không gian sống tại dự án" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[images.projectOverview, images.aerialView, images.lifestyle, images.interiorView, images.valueSection, images.locationMap].map((src, i) => (
              <div key={i} className="group overflow-hidden rounded-xl shadow-md aspect-[4/3]">
                <img src={src} alt={`Hình ảnh dự án ${i + 1}`} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${src === images.projectOverview ? 'object-left' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
