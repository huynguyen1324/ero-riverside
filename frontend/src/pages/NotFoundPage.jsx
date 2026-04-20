/* === NotFoundPage.jsx - Trang 404 === */
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="text-center px-4">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-teal-100">404</h1>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-teal-900 mt-4 mb-3">Trang không tồn tại</h2>
        <p className="text-dark-500 text-lg mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/" variant="primary" size="lg">Về trang chủ</Button>
          <Button to="/lien-he" variant="outline">Liên hệ hỗ trợ</Button>
        </div>
      </div>
    </section>
  )
}
