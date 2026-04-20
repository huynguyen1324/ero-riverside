/* === Hero.jsx - Banner lớn trang chủ === */
import Button from '../common/Button'
import { images } from '../../data/contact'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <img
        src={images.heroBanner}
        alt="Ero Riverside toàn cảnh"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 h-full flex items-end pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-teal-500/90 text-white text-sm font-semibold rounded-full mb-5 animate-fade-in">
              Sổ hồng sẵn sàng — Nhận nhà ở ngay
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in-up">
              Giá trị bền vững<br />
              <span className="text-gold-200">Sinh lời vượt trội</span>
            </h1>

            <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              BIỆT THỰ VEN SÔNG HIẾM CÓ 
              <br />
              NGAY TÂM ĐIỂM GA METRO TRUNG MẦU
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button variant="orange" size="lg" to="/lien-he">
                Nhận tư vấn ngay
              </Button>
              <Button variant="outline" size="lg" to="/gioi-thieu" className="border-white/50 text-white hover:bg-white/10 hover:border-white">
                Tìm hiểu dự án
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
