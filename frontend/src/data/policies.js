/* === policies.js - Dữ liệu chính sách bán hàng === */

export const productTypes = [
  {
    id: 'chung-cu',
    title: 'Căn hộ chung cư',
    subtitle: 'Quỹ căn 3PN view sông cuối cùng',
    desc: 'Những căn hộ cuối cùng tại Ero Riverside đang được mở bán. Dự án có giá hấp dẫn nhất thị trường cùng chính sách bán hàng linh hoạt. Hệ thống trang thiết bị hiện đại, chuỗi tiện ích nội khu đa dạng.',
    priceFrom: '2.99 tỷ',
    image: '/images/can-ho.jpg',
  },
  {
    id: 'shophouse',
    title: 'Shophouse khối đế',
    subtitle: 'Đón sóng giao thương quốc tế - Sát cầu Đông Trù & Cổ Loa',
    desc: 'Thiết kế thông minh 3-4 tầng, diện tích từ 109,8m² - 321,9m². Kết hợp linh hoạt giữa ở - cho thuê - kinh doanh. Vỉa hè rộng thoáng thu hút khách, tối ưu lợi nhuận lâu dài.',
    priceFrom: 'Liên hệ',
    image: '/images/shophouse.jpg',
  },
  {
    id: 'tmdv',
    title: 'Căn hộ thương mại dịch vụ',
    subtitle: 'Tiết kiệm tới 60% giá trị so với dự án lân cận',
    desc: 'Mức giá chỉ từ 44 triệu/m², tương đương 30% - 40% giá căn hộ các dự án lân cận. Thiết kế linh hoạt, có thể bố trí thành căn hộ hai chìa khóa, vừa ở vừa cho thuê.',
    priceFrom: '44 triệu/m²',
    image: '/images/tmdv.webp',
  },
]

export const salesPolicies = [
  {
    id: 1,
    title: 'Hỗ trợ vay ngân hàng',
    desc: 'Hỗ trợ vay lên tới 70% giá trị căn hộ, lãi suất ưu đãi.',
  },
  {
    id: 2,
    title: 'Chiết khấu thanh toán sớm',
    desc: 'Chiết khấu hấp dẫn khi thanh toán sớm hoặc thanh toán 1 lần.',
  },
  {
    id: 3,
    title: 'Quà tặng giá trị',
    desc: 'Nhận ngay quà tặng giá trị khi ký hợp đồng mua bán.',
  },
  {
    id: 4,
    title: 'Hỗ trợ pháp lý',
    desc: 'Hỗ trợ hoàn thiện thủ tục pháp lý, nhận sổ hồng nhanh chóng.',
  },
]
