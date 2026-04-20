/* === Card.jsx - Thẻ hiển thị nội dung dùng chung === */
export default function Card({
  children,
  className = '',
  hover = true,
  padding = true,
}) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
      } ${padding ? 'p-6' : ''} shadow-md border border-gray-100/50 ${className}`}
    >
      {children}
    </div>
  )
}
