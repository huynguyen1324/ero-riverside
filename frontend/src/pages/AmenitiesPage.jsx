/* === AmenitiesPage.jsx - Trang tiện ích dự án === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { amenities, amenityFeatures } from '../data/amenities'
import { contactInfo, images } from '../data/contact'

export default function AmenitiesPage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.lifestyle} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Tiện ích nội khu</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Hệ tiện ích đa dạng, hiện đại, nâng tầm chất lượng cuộc sống</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Hệ tiện ích đồng bộ" subtitle={`Mỗi phút giây tại ${contactInfo.projectName} là trải nghiệm trọn vẹn`} />
          <div className="space-y-16 lg:space-y-24">
            {amenities.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="overflow-hidden rounded-2xl shadow-xl group">
                    <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">Tiện ích {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-teal-900 mt-2 mb-4">{item.title}</h3>
                  <p className="text-dark-500 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Hạ tầng kỹ thuật" subtitle="Chuỗi trang thiết bị và hạ tầng cao cấp đi kèm dự án" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {amenityFeatures.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-teal-100/50">
                <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="text-dark-700 text-sm font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Trải nghiệm tiện ích thực tế</h3>
          <p className="text-white/70 mb-8 text-lg">Đăng ký tham quan dự án để cảm nhận trực tiếp hệ tiện ích đẳng cấp.</p>
          <Button to="/lien-he" variant="orange" size="lg">Đặt lịch tham quan</Button>
        </div>
      </section>
    </>
  )
}
