/* === Highlights.jsx - Điểm nổi bật dự án (trang chủ) === */
import { highlights } from '../../data/highlights'
import Card from '../common/Card'
import SectionTitle from '../common/SectionTitle'
import { contactInfo } from '../../data/contact'

export default function Highlights() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Điểm nổi bật"
          subtitle={`Những yếu tố tạo nên giá trị vượt trội của ${contactInfo.projectName}`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Card key={item.id} className="group">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4 font-bold text-lg font-body">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-body font-semibold text-lg text-teal-900 mb-2">
                {item.title}
              </h3>
              <p className="text-dark-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
