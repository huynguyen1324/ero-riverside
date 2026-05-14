/* === Modal.jsx - Popup/Modal dùng chung ===
 * Hiện lên phía trên nội dung trang, có overlay tối phía sau.
 */
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg', noPadding = false }) {
  // Khóa scroll body khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay tối */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Nội dung modal */}
      <div className={`relative bg-white shadow-2xl flex flex-col animate-fade-in-up ${maxWidth} w-full max-h-[98vh] overflow-hidden rounded-2xl`}>
        {/* Header modal */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-display font-semibold text-xl text-teal-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-dark-400 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body modal */}
        <div className={`${noPadding ? 'p-0' : 'p-5'} overflow-y-auto flex-grow`}>
          {children}
        </div>
      </div>
    </div>
  )
}
