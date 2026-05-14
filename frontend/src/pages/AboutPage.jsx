/* === AboutPage.jsx - Trang giới thiệu dự án === */
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { images, contactInfo } from '../data/contact'
import { projectStats } from '../data/highlights'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.lifestyle} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Giới thiệu dự án</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Thiên Đức - Đô thị mới Ero Riverside: Một không gian Châu Âu trong lòng Hà Nội - Bắc Ninh</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src={images.projectOverview} alt="Ero Riverside Overview" className="w-full h-full object-cover object-left" />
              </div>
              <div className="absolute -bottom-8 -right-4 lg:-right-10 w-48 lg:w-64 bg-white p-2 rounded-xl shadow-xl border-4 border-white">
                <img src={images.interiorView} alt="Interior View" className="rounded-lg" />
              </div>
            </div>
            <div className="lg:pl-4">
              <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">Tổng quan dự án</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-3 mb-6 leading-tight">Vùng đất địa linh nhân kiệt - Tâm điểm phát triển tương lai</h2>
              <div className="space-y-4 text-dark-500 leading-relaxed text-justify">
                <p>
                  <strong className="text-teal-800">Khu đô thị mới Ero Riverside</strong> có tổng diện tích quy hoạch lên đến 200ha, tọa lạc tại xã Phù Chẩn, huyện Từ Sơn, tỉnh Bắc Ninh. Nằm tiếp giáp với Quốc lộ 1B, dự án chỉ cách trung tâm Hà Nội 18km và trung tâm thị xã Bắc Ninh 15km.
                </p>
                <p>
                  Đây là vùng đất hội đủ những yếu tố thuận lợi nhất để hình thành nên một khu đô thị hiện đại với những ưu thế đặc biệt. Mạng lưới giao thông nối liền cầu Thanh Trì giúp rút ngắn khoảng cách với Thủ đô, cùng nút giao thông khác mức 271 song song cầu Đại Đình hiện đại, phục vụ giao thông vô cùng tiện lợi.
                </p>
                <p>
                  Dự án đóng vai trò là hạt nhân trong chiến lược phát triển đô thị mở rộng của Hà Nội và Bắc Ninh, song hành với các khu kinh tế - xã hội trọng điểm trong khu vực.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-16 lg:py-24 bg-teal-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src={images.logo} alt="" className="w-full h-full object-contain translate-x-1/2 scale-150" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase font-body">Tầm nhìn chiến lược</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-8">Kiến tạo đô thị cảnh quan, mang đậm dấu ấn Kinh Bắc</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 leading-relaxed text-justify">
              <p>
                Với tầm nhìn lâu dài, Ero Riverside được bố trí mạng lưới giao thông hợp lý, kết nối chặt chẽ với các trung tâm hành chính - văn hóa - thương mại tầm cỡ. Đô thị được định hướng trở thành một không gian sống hiện đại, hài hòa tuyệt đối với cảnh sắc thiên nhiên.
              </p>
              <p>
                Lá phổi xanh của đô thị là khu công viên trung tâm với diện tích mặt nước và cây xanh rộng lớn, điều hòa không khí và mang lại sự thư thái. Hành lang văn hóa và nghỉ ngơi bao gồm các khu vui chơi giải trí, trạm xử lý nước sinh hoạt đạt chuẩn, bệnh viện và khu bảo tồn...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giai đoạn 1 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="lg:order-2">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl relative group">
                <img src={images.aerialView} alt="Giai đoạn 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold">Quy hoạch Giai đoạn 1: 22.5ha</p>
                </div>
              </div>
            </div>
            <div className="lg:order-1 lg:pr-4">
              <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase font-body">Tiến độ phát triển</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mt-3 mb-6 leading-tight">Giai đoạn 1: Chuẩn mực Châu Âu hiện đại</h2>
              <div className="space-y-4 text-dark-500 leading-relaxed text-justify">
                <p>
                  Diện tích quy hoạch giai đoạn 1 là <strong className="text-teal-800">22.5ha</strong>, được thiết kế đồng bộ từ hạ tầng kỹ thuật đến hạ tầng xã hội theo tiêu chuẩn quốc tế. Các công trình tại đây mang phong cách kiến trúc hiện đại của Châu Âu.
                </p>
                <p>
                  Hệ thống hạ tầng kỹ thuật được đầu tư hoàn hảo: Đại lộ trung tâm rộng 24m với 4 làn xe, vỉa hè 4m rợp bóng cây xanh. Đặc biệt, toàn bộ hệ thống điện, nước và thông tin liên lạc được bố trí trong tuy nen ngầm, đảm bảo an toàn tuyệt đối và tính thẩm mỹ cao cho đô thị.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Thông số ấn tượng" subtitle="Những con số minh chứng cho quy mô và tâm huyết của chủ đầu tư" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {projectStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 lg:p-8 text-center shadow-md border border-teal-100/50">
                <p className="text-3xl lg:text-4xl font-display font-bold text-teal-800">
                  {stat.value.split(' ')[0]}
                  <span className="text-xl lg:text-2xl ml-1">{stat.value.split(' ')[1]}</span>
                </p>
                <p className="text-dark-500 mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Infrastructure */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Pháp lý & Hạ tầng" subtitle="Nền tảng vững chắc cho một cuộc sống an tâm" />
          <div className="mt-10 bg-teal-50 rounded-3xl p-8 lg:p-12 border border-teal-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h4 className="text-teal-900 font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-teal-200 rounded-lg flex items-center justify-center text-teal-800 text-sm">01</span>
                    Quyết định phê duyệt
                  </h4>
                  <div className="bg-white p-6 rounded-xl border border-teal-100 space-y-2">
                    <p className="text-dark-500">Số quyết định: <span className="font-semibold text-teal-800">1220/QĐ - CT</span></p>
                    <p className="text-dark-500">Cơ quan ban hành: Chủ tịch UBND tỉnh Bắc Ninh</p>
                    <p className="text-dark-500">Đơn vị quản lý: Công ty Cổ phần Thiên Đức</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-teal-900 font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-teal-200 rounded-lg flex items-center justify-center text-teal-800 text-sm">02</span>
                    Chuẩn mực hạ tầng
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2 text-dark-500 bg-white p-3 rounded-lg border border-teal-50">
                      <span className="text-teal-500 font-bold">✓</span> Hệ thống điện ngầm
                    </li>
                    <li className="flex items-center gap-2 text-dark-500 bg-white p-3 rounded-lg border border-teal-50">
                      <span className="text-teal-500 font-bold">✓</span> Nước sạch Châu Âu
                    </li>
                    <li className="flex items-center gap-2 text-dark-500 bg-white p-3 rounded-lg border border-teal-50">
                      <span className="text-teal-500 font-bold">✓</span> Thông tin liên lạc ngầm
                    </li>
                    <li className="flex items-center gap-2 text-dark-500 bg-white p-3 rounded-lg border border-teal-50">
                      <span className="text-teal-500 font-bold">✓</span> Hệ thống thoát nước riêng
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-teal-200/50 text-center">
              <p className="text-sm text-dark-400 italic">Dự án được triển khai với đầy đủ hồ sơ pháp lý, sẵn sàng bàn giao cho cư dân.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Hình ảnh thực tế & Phối cảnh" subtitle="Chiêm ngưỡng không gian sống đẳng cấp tại Ero Riverside" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[images.projectOverview, images.aerialView, images.mapDetail, images.interiorView, images.valueSection, images.locationMap].map((src, i) => (
              <div key={i} className="group overflow-hidden rounded-xl shadow-md aspect-[4/3] bg-white">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button to="/lien-he" variant="orange" size="lg">Nhận thông tin báo giá chi tiết</Button>
          </div>
        </div>
      </section>
    </>
  )
}

