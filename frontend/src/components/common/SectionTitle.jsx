/* === SectionTitle.jsx - Tiêu đề mục dùng chung === */
export default function SectionTitle({
  title,
  subtitle,
  light = false,
  center = true,
  className = '',
}) {
  return (
    <div className={`mb-10 lg:mb-14 ${center ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <span className={`block w-10 h-[2px] ${light ? 'bg-gold-200' : 'bg-teal-500'}`} />
        <span className={`block w-2 h-2 rounded-full ${light ? 'bg-gold-200' : 'bg-teal-500'}`} />
        <span className={`block w-10 h-[2px] ${light ? 'bg-gold-200' : 'bg-teal-500'}`} />
      </div>

      <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-[42px] leading-tight ${
        light ? 'text-white' : 'text-teal-900'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-lg max-w-3xl leading-relaxed ${
          center ? 'mx-auto' : ''
        } ${light ? 'text-white/70' : 'text-dark-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
