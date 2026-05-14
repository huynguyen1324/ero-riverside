/* === contact.js - Thông tin liên hệ và cấu hình site === */

export const contactInfo = {
  projectName: 'Khu nhà ở Phù Chẩn',
  developer: 'Công ty Cổ phần Thiên Đức',
  address: 'Xã Phù Chẩn, huyện Từ Sơn, tỉnh Bắc Ninh',
  office: 'Số 02 Tôn Thất Tùng, Phường Kim Liên, Hà Nội',
  email: 'info@thienduc.vn',
  hotline: '0382970723',
  tiktokUrl: 'https://www.tiktok.com/@eroriverpark0',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61567233022297',
}

/* Menu điều hướng - giống hệt navbar gốc */
export const navLinks = [
  { label: 'TỔNG QUAN', path: '/gioi-thieu' },
  { label: 'GIÁ TRỊ VỮNG BỀN', path: '/gia-tri-ben-vung' },
  { label: 'CHÍNH SÁCH', path: '/chinh-sach-ban-hang' },
  { label: 'VỊ TRÍ', path: '/vi-tri' },
  { label: 'TIỆN ÍCH', path: '/tien-ich' },
  { label: 'MẶT BẰNG', path: '/mat-bang' },
]

export const images = {
  /* Logo chính - SVG gốc từ web Ladipage */
  logo: '/images/ero_riverside_logo.png',
  /* Fallback nếu SVG không load: đặt file tại public/assets/images/logo-ero-riverside.png */
  logoFallback: '/images/logo-ero-riverside.png',
  heroBanner: '/images/banner-bg-1.png',
  projectOverview: '/images/project-overview.png',
  valueSection: '/images/value-section.png',
  locationMap: '/images/location-map.jpg',
  aerialView: '/images/aerial-view.png',
  masterPlan: 'https://w.ladicdn.com/s1050x1000/60c01a633e70ad002097e7bb/erp_ldp_040424-v2-16-copy-20240412103711-z2jvu.png',
  lifestyle: '/images/project-overview.png',
  interiorView: '/images/ha-tang.png',
  mapDetail: '/images/map-detail.png',
  policyBanner: 'https://w.ladicdn.com/s1200x500/60c01a633e70ad002097e7bb/erp_banner-web_080625-03-copy-20250806015303-94a0i.png',
  heThongGiaoDuc: '/images/he_thong_giao_duc.png',
  heThongYTe: '/images/he_thong_y_te.png',
  trungTamThuongMai: '/images/trung_tam_thuong_mai.png',
}
