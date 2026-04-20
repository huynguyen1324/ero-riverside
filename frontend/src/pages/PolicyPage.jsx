/* === PolicyPage.jsx - Trang chính sách bán hàng === */
import { useState } from 'react'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { productTypes, salesPolicies } from '../data/policies'
import { images } from '../data/contact'

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState(productTypes[0].id)
  const activeProduct = productTypes.find((p) => p.id === activeTab)

  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.aerialView} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Chính sách bán hàng</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Ưu đãi hấp dẫn cùng chính sách thanh toán linh hoạt</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Sản phẩm đang mở bán" subtitle="Lựa chọn sản phẩm phù hợp với nhu cầu của bạn" />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {productTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === type.id
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-dark-500 hover:bg-gray-200'
                }`}
                style={activeTab === type.id ? { background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' } : {}}
              >
                {type.title}
              </button>
            ))}
          </div>

          {activeProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img src={activeProduct.image} alt={activeProduct.title} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-3">Đang mở bán</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-teal-900 mb-2">{activeProduct.title}</h3>
                <p className="text-teal-700 font-semibold text-lg mb-4">{activeProduct.subtitle}</p>
                <p className="text-dark-500 leading-relaxed mb-6">{activeProduct.desc}</p>
                <div className="bg-teal-50 rounded-xl p-5 mb-6">
                  <p className="text-sm text-dark-500">Giá từ</p>
                  <p className="text-2xl font-display font-bold text-teal-800">{activeProduct.priceFrom}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button to="/lien-he" variant="orange">Nhận báo giá chi tiết</Button>
                  <Button to="/mat-bang" variant="outline">Xem mặt bằng</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Ưu đãi & Hỗ trợ" subtitle="Chính sách hỗ trợ tối đa cho khách hàng" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {salesPolicies.map((policy, i) => (
              <Card key={policy.id} className="text-center group">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4 font-bold text-lg font-body">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-body font-semibold text-lg text-teal-900 mb-2">{policy.title}</h4>
                <p className="text-dark-500 text-sm leading-relaxed">{policy.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Sổ hồng sẵn sàng — Nhận nhà ở ngay</h3>
          <p className="text-white/70 mb-8 text-lg">Pháp lý minh bạch, sở hữu lâu dài. Liên hệ ngay để nhận tư vấn chi tiết.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/lien-he" variant="orange" size="lg">Nhận tư vấn ngay</Button>
            <Button href="tel:0932888008" variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">0932 888 008</Button>
          </div>
        </div>
      </section>
    </>
  )
}
