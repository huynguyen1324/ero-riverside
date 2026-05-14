/* === ValuePage.jsx - Trang giá trị bền vững === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { contactInfo, images } from '../data/contact'

const coreValues = [
  {
    id: 'phap-ly',
    title: 'Pháp lý',
    desc: 'Khu nhà ở Phù Chẩn đảm bảo sự an tâm tuyệt đối cho chủ sở hữu với hệ thống hồ sơ pháp lý minh bạch, được phê duyệt chính thức bởi UBND tỉnh Bắc Ninh.',
    image: images.valueSection,
  },
  {
    id: 'quy-hoach',
    title: 'Quy hoạch',
    desc: 'Dự án được quy hoạch đồng bộ với mật độ xây dựng hợp lý, dành nhiều không gian cho cây xanh, công viên và các công trình công cộng hiện đại.',
    image: images.lifestyle,
  },
  {
    id: 'ha-tang',
    title: 'Hạ tầng',
    desc: 'Hệ thống hạ tầng kỹ thuật đạt chuẩn với trạm biến áp, trạm cấp nước và xử lý nước thải riêng biệt, mang lại cuộc sống tiện nghi và bền vững.',
    image: images.interiorView,
  },
]

const investmentReasons = [
  { title: 'Vị trí chiến lược tại Phù Chẩn', desc: 'Nằm tại xã Phù Chẩn, huyện Từ Sơn – khu vực đang có tốc độ đô thị hóa nhanh và hạ tầng giao thông ngày càng hoàn thiện, mang lại tiềm năng tăng giá trị cao.' },
  { title: 'Kết nối vùng thuận tiện', desc: 'Tiếp giáp Quốc lộ 1 mới và các trục đường tỉnh lộ, giúp việc di chuyển đến các khu công nghiệp và trung tâm kinh tế lân cận trở nên dễ dàng.' },
  { title: 'Hạ tầng kỹ thuật hoàn chỉnh', desc: 'Dự án đã hoàn thiện san nền và quy hoạch hệ thống điện, nước, thoát nước bài bản, sẵn sàng cho việc triển khai xây dựng và bàn giao.' },
  { title: 'Cơ sở hạ tầng xã hội đồng bộ', desc: 'Gần các khu dân cư hiện hữu và đầy đủ tiện ích xã hội, tạo điều kiện thuận lợi cho việc sinh sống và kinh doanh dịch vụ.' },
]

export default function ValuePage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.mapDetail} alt={`Bản đồ vị trí ${contactInfo.projectName}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Giá trị vững bền</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Tổng quan về {contactInfo.projectName} — Dự án đô thị hiện đại tại Bắc Ninh</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Giá trị cốt lõi" subtitle={`${contactInfo.projectName} mang lại giá trị sống vững bền và khai mở tiềm năng khu vực`} />
          <div className="space-y-16 lg:space-y-24">
            {coreValues.map((value, index) => (
              <div key={value.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img src={value.image} alt={value.title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">Giá trị {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-2 mb-5">{value.title}</h3>
                  <p className="text-dark-500 text-lg leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Tiềm năng sinh lời" subtitle="Cơ hội đón đầu tiềm năng gia tăng giá trị bất động sản trong tương lai" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {investmentReasons.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 lg:p-8 shadow-md border border-teal-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 font-bold text-sm font-body">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-body font-semibold text-xl text-teal-900 mb-2">{item.title}</h4>
                <p className="text-dark-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/lien-he" variant="orange" size="lg">Tìm hiểu cơ hội đầu tư</Button>
          </div>
        </div>
      </section>
    </>
  )
}
