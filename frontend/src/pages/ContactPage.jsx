/* === ContactPage.jsx - Trang liên hệ === */
import SectionTitle from '../components/common/SectionTitle'
import ContactForm from '../components/forms/ContactForm'
import { contactInfo, images } from '../data/contact'

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.interiorView} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Liên hệ tư vấn</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Để lại thông tin, nhận tin tức mới nhất của dự án từ chúng tôi</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-6 lg:p-10 border border-gray-100">
                <h3 className="font-display text-2xl font-bold text-teal-900 mb-2">Đăng ký nhận tư vấn</h3>
                <p className="text-dark-500 mb-8">Điền thông tin bên dưới, đội ngũ tư vấn sẽ liên hệ bạn trong thời gian sớm nhất.</p>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display text-2xl font-bold text-teal-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-4">
                <div className="bg-teal-50 rounded-xl p-5">
                  <p className="text-sm text-dark-500 mb-1">Địa chỉ dự án</p>
                  <p className="font-semibold text-teal-900">{contactInfo.address}</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-5">
                  <p className="text-sm text-dark-500 mb-1">Văn phòng CĐT</p>
                  <p className="font-semibold text-teal-900">{contactInfo.office}</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-5">
                  <p className="text-sm text-dark-500 mb-1">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="font-semibold text-teal-800 hover:underline">{contactInfo.email}</a>
                </div>
                <div className="bg-gold-50 rounded-xl p-5 border-2 border-gold-200">
                  <p className="text-sm text-dark-500 mb-1">Hotline</p>
                  <a href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`} className="text-2xl font-display font-bold text-teal-800 hover:text-teal-600">
                    {contactInfo.hotline}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href={contactInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">Zalo</a>
                <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
