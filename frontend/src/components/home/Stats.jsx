/* === Stats.jsx - Các thông số ấn tượng của dự án === */
import { projectStats } from '../../data/highlights'

export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {projectStats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-teal-50/30 rounded-2xl p-6 lg:p-8 text-center border border-teal-100 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-3xl lg:text-4xl font-display font-bold text-teal-800 mb-2">
                {stat.value.split(' ')[0]}
                <span className="text-xl lg:text-2xl ml-1">{stat.value.split(' ')[1]}</span>
              </p>
              <p className="text-dark-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
