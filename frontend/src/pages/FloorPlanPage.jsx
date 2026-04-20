/* === FloorPlanPage.jsx - Trang mặt bằng dự án === */
import { useState } from 'react'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import { floorPlanCategories } from '../data/floorPlans'
import { images } from '../data/contact'

export default function FloorPlanPage() {
  const [activeTab, setActiveTab] = useState(floorPlanCategories[0].id)
  const [lightboxImage, setLightboxImage] = useState(null)
  const activeCategory = floorPlanCategories.find((c) => c.id === activeTab)

  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.masterPlan} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Mặt bằng dự án</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Tổng mặt bằng và layout chi tiết các căn hộ</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Chọn loại mặt bằng" />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {floorPlanCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === cat.id ? 'text-white shadow-md' : 'bg-gray-100 text-dark-500 hover:bg-gray-200'
                }`}
                style={activeTab === cat.id ? { background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' } : {}}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className={`grid gap-5 ${
              activeCategory.images.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {activeCategory.images.map((img, i) => (
                <div
                  key={i}
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow relative"
                  onClick={() => setLightboxImage(img)}
                >
                  <img src={img} alt={`${activeCategory.title} - ${i + 1}`} className="w-full object-contain bg-gray-50 group-hover:scale-[1.02] transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 rounded-full px-4 py-2 text-sm font-medium text-teal-800 shadow transition-opacity">
                      Phóng to
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button to="/lien-he" variant="orange" size="lg">Nhận mặt bằng chi tiết</Button>
          </div>
        </div>
      </section>

      <Modal isOpen={!!lightboxImage} onClose={() => setLightboxImage(null)} title={activeCategory?.title || 'Mặt bằng'}>
        {lightboxImage && <img src={lightboxImage} alt="Mặt bằng chi tiết" className="w-full rounded-lg" />}
      </Modal>
    </>
  )
}
