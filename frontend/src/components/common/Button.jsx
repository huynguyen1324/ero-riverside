/* === Button.jsx - Nút bấm dùng chung === */
import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'text-white hover:opacity-90 shadow-md hover:shadow-lg',
    gold: 'bg-gold-500 text-white hover:bg-gold-400 shadow-md hover:shadow-lg',
    outline: 'border-2 border-teal-800 text-teal-800 hover:bg-teal-50',
    orange: 'bg-[#f36e36] text-white hover:bg-[#e05e28] shadow-md hover:shadow-lg',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3.5 text-base',
  }

  const gradientStyle = variant === 'primary'
    ? { background: 'linear-gradient(135deg, #03989e 0%, #034f58 100%)' }
    : {}

  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={base} style={gradientStyle} {...props}>{children}</Link>
  if (href) return <a href={href} className={base} style={gradientStyle} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  return <button className={base} style={gradientStyle} {...props}>{children}</button>
}
