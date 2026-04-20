/* === ValuePage.jsx - Trang giá trị bền vững === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { images } from '../data/contact'

const coreValues = [
  {
    id: 'can-bang',
    title: 'Cân bằng',
    desc: 'Ero Riverside kiến tạo không gian sống hài hòa giữa nhịp sống đô thị năng động và thiên nhiên trong lành, giúp cư dân tận hưởng sự cân bằng trọn vẹn giữa công việc, nghỉ ngơi và cuộc sống.',
    image: images.valueSection,
  },
  {
    id: 'an-yen',
    title: 'An yên',
    desc: 'Sở hữu môi trường sống xanh, yên tĩnh cùng hệ thống tiện ích khép kín, Ero Riverside mang đến cảm giác thư thái, riêng tư – nơi mỗi ngày trôi qua đều nhẹ nhàng và bình yên.',
    image: images.lifestyle,
  },
  {
    id: 'hien-dai',
    title: 'Hiện đại',
    desc: 'Được quy hoạch đồng bộ với hạ tầng tiên tiến và tiện ích thông minh, Ero Riverside đáp ứng chuẩn sống hiện đại, nâng tầm trải nghiệm cho cộng đồng cư dân trẻ, năng động.',
    image: images.interiorView,
  },
]

const investmentReasons = [
  { title: 'Dòng tiền cho thuê ổn định', desc: 'Ero Riverside thừa hưởng lợi thế từ khu công nghiệp VSIP với hàng chục nghìn chuyên gia và lao động, tạo nhu cầu lớn về nhà ở, kinh doanh và dịch vụ – đảm bảo khả năng khai thác cho thuê bền vững.' },
  { title: 'Gia tăng giá trị theo hạ tầng', desc: 'Khu vực Từ Sơn đang phát triển mạnh về giao thông và đô thị hóa, với nhiều tuyến đường trọng điểm và quy hoạch đồng bộ, giúp bất động sản có dư địa tăng giá rõ rệt trong trung và dài hạn.' },
  { title: 'Hưởng lợi từ làn sóng FDI', desc: 'Bắc Ninh là điểm đến của nhiều tập đoàn lớn, kéo theo nhu cầu nhà ở, thương mại và dịch vụ tăng cao – tạo động lực tăng trưởng giá trị bất động sản bền vững.' },
  { title: 'Thanh khoản cao, dễ khai thác kinh doanh', desc: 'Sự đa dạng loại hình như shophouse, nhà phố, căn hộ cùng cộng đồng cư dân – chuyên gia đông đúc giúp bất động sản dễ mua bán, dễ kinh doanh và tối ưu lợi nhuận đầu tư.' },
]

export default function ValuePage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.valueSection} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Giá trị vững bền</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Biểu tượng cân bằng hoàn hảo giữa An yên và Hiện đại, mang lại giá trị sống vững bền cho cộng đồng cư dân</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Giá trị cốt lõi" subtitle="Ero Riverside mang lại giá trị sống vững bền và khai mở tiềm năng khu vực" />
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
