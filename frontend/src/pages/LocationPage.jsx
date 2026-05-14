/* === LocationPage.jsx - Trang vị trí dự án === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { contactInfo, images } from '../data/contact'

const connections = [
  { label: 'Quốc lộ 1B', desc: 'Tiếp giáp trực tiếp, kết nối Bắc Ninh - Lạng Sơn' },
  { label: 'Cầu Thanh Trì', desc: 'Mạng lưới giao thông trọng điểm rút ngắn khoảng cách với Thủ đô' },
  { label: 'Nút giao 271', desc: 'Nằm song song cầu Đại Đình hiện đại, phục vụ giao thông thuận tiện' },
  { label: 'Hà Nội & Bắc Ninh', desc: 'Cách trung tâm Hà Nội 18km, trung tâm TP Bắc Ninh 15km' },
]

const advantages = [
  { title: 'Tâm điểm Đô thị mở rộng', desc: 'Đóng vai trò hạt nhân trong chiến lược phát triển đô thị mở rộng của cả Hà Nội và Bắc Ninh.' },
  { title: 'Địa linh nhân kiệt', desc: 'Vùng đất Phù Chẩn mang đậm dấu ấn Kinh Bắc, hội tụ đầy đủ các yếu tố thuận lợi nhất để hình thành đô thị kiểu mẫu.' },
  { title: 'Giao thông khác mức', desc: 'Hệ thống nút giao thông hiện đại giúp việc di chuyển đến các khu trung tâm lân cận trở nên nhanh chóng.' },
  { title: 'Tiềm năng tăng giá', desc: 'Sự hoàn thiện của hạ tầng giao thông (Cầu 271, Đại Đình) là đòn bẩy mạnh mẽ cho giá trị bất động sản.' },
]

export default function LocationPage() {
  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.locationMap} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Vị trí dự án</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Tâm điểm kết nối — Bứt phá kế hoạch</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Tọa độ vàng phía Đông Bắc" subtitle="Vị trí đắc địa cạnh ga Trung Mầu, tận hưởng ưu thế kép" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3 overflow-hidden rounded-2xl shadow-xl">
              <img src={images.mapDetail} alt={`Bản đồ vị trí ${contactInfo.projectName}`} className="w-full object-cover" />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-body text-xl font-bold text-teal-900 mb-4">Vị trí tiếp giáp</h3>
              {connections.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-dark-700">{item.label}</p>
                    <p className="text-xs text-dark-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Lợi thế khu vực" subtitle="Hạ tầng phát triển mạnh mẽ, giá trị gia tăng không ngừng" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 lg:p-8 shadow-md border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4 font-bold text-sm font-body">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-body font-semibold text-xl text-teal-900 mb-2">{item.title}</h4>
                <p className="text-dark-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/lien-he" variant="orange" size="lg">Nhận thông tin chi tiết vị trí</Button>
          </div>
        </div>
      </section>

      <section className="relative h-[50vh] min-h-[300px] overflow-hidden">
        <img src={images.aerialView} alt="Phối cảnh tổng thể" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <p className="font-display text-2xl font-bold">Đường Hữu Nghị,Phù Chẩn, Từ Sơn, Bắc Ninh</p>
        </div>
      </section>
    </>
  )
}
