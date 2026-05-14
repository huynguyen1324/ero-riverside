/* === policies.js - Dữ liệu chính sách bán hàng === */

export const productTypes = [
  {
    id: 'biet-thu-song-lap',
    title: 'Biệt thự song lập',
    subtitle: 'Cao 3 tầng, không gian sống xanh mát',
    desc: 'Thiết kế hiện đại với kích thước lô đất 8,5x20m, mang lại không gian sống thoáng đãng, gần gũi với thiên nhiên.',
    priceFrom: 'Liên hệ',
    image: '/images/biet_thu_song_lap.png',
  },
  {
    id: 'biet-thu-don-lap',
    title: 'Biệt thự đơn lập',
    subtitle: 'Cao 2,5 tầng, đa dạng diện tích',
    desc: 'Các lô đất biệt thự với kích thước đa dạng (20x20m; 26x20m; 28x20m), kiến trúc sang trọng, khẳng định đẳng cấp chủ nhân.',
    priceFrom: 'Liên hệ',
    image: '/images/biet_thu_don_lap.png',
  },
  {
    id: 'shophouse-234',
    title: 'Shophouse 234',
    subtitle: 'Nơi an cư lý tưởng giữa trung tâm dự án',
    desc: 'Nổi bật giữa trung tâm dự án là nơi an cư lý tưởng của gia đình. Diện tích phù hợp cung cấp không gian rộng rãi để chủ nhân thoải mái thể hiện phong cách riêng trong thiết kế và bố trí nội thất.',
    priceFrom: 'Liên hệ',
    image: '/images/shophouse_234.jpg',
    specs: {
      construction: '60 - 72 m²',
      floor: '186 - 224 m²',
      land: '100 - 253 m²'
    }
  },
  {
    id: 'shophouse',
    title: 'Shophouse',
    subtitle: 'Dòng sản phẩm thương mại năng động',
    desc: 'Dòng sản phẩm tiền năng thương mại lớn nhất dự án với lợi thế không gian thương mại rộng lớn, kết nối trực tiếp với trục chính đại đô thị VSIP Bắc Ninh, đường Hữu Nghị rộng 56m. Đây sẽ là nơi diễn ra các hoạt động buôn bán, mua sắm giải trí sôi động đem lại dòng tiền bền vững cho gia chủ dù là đầu tư kinh doanh hay cho thuê.',
    priceFrom: 'Liên hệ',
    image: '/images/shophouse.jpg',
    specs: {
      construction: '72 m²',
      floor: '222 m²',
      land: '120 - 192 m²'
    }
  },
]

export const salesPolicies = [
  {
    id: 1,
    title: 'Hỗ trợ vay ngân hàng',
    desc: 'Hỗ trợ vay lên tới 70% giá trị sản phẩm, lãi suất ưu đãi.',
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
