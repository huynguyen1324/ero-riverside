# Ero Riverside - React Website

## 🚀 Cách chạy project

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt tại http://localhost:5173
```

## 📁 Cấu trúc thư mục

```
src/
├── main.jsx                    # Điểm khởi chạy app
├── App.jsx                     # Định nghĩa routing
├── index.css                   # CSS gốc + Tailwind
│
├── contexts/
│   └── AuthContext.jsx          # Quản lý đăng nhập/đăng xuất (React Context)
│
├── data/                        # Dữ liệu mock (tách riêng để dễ sửa)
│   ├── highlights.js            # Điểm nổi bật dự án
│   ├── amenities.js             # Tiện ích
│   ├── policies.js              # Chính sách bán hàng
│   ├── floorPlans.js            # Mặt bằng
│   └── contact.js               # Thông tin liên hệ + menu + hình ảnh
│
├── components/
│   ├── layout/                  # Layout dùng chung
│   │   ├── Header.jsx           # Menu trên cùng (responsive)
│   │   ├── Footer.jsx           # Chân trang
│   │   └── MainLayout.jsx       # Bọc Header + Outlet + Footer
│   │
│   ├── common/                  # Component dùng lại
│   │   ├── Button.jsx           # Nút bấm (primary/gold/outline)
│   │   ├── SectionTitle.jsx     # Tiêu đề mục
│   │   ├── Card.jsx             # Thẻ hiển thị
│   │   ├── Modal.jsx            # Popup
│   │   ├── Toast.jsx            # Thông báo nổi
│   │   ├── ProtectedRoute.jsx   # Bảo vệ trang cần đăng nhập
│   │   └── FloatingActions.jsx  # Nút nổi (Zalo, Hotline, Back to top)
│   │
│   ├── home/                    # Component riêng trang chủ
│   │   ├── Hero.jsx
│   │   ├── Intro.jsx
│   │   ├── Highlights.jsx
│   │   └── CTA.jsx
│   │
│   └── forms/                   # Form dùng chung
│       ├── LoginForm.jsx
│       ├── RegisterForm.jsx
│       └── ContactForm.jsx
│
└── pages/                       # Các trang (1 trang = 1 file)
    ├── HomePage.jsx             # /
    ├── AboutPage.jsx            # /gioi-thieu
    ├── ValuePage.jsx            # /gia-tri-ben-vung
    ├── PolicyPage.jsx           # /chinh-sach-ban-hang
    ├── LocationPage.jsx         # /vi-tri
    ├── AmenitiesPage.jsx        # /tien-ich
    ├── FloorPlanPage.jsx        # /mat-bang
    ├── ContactPage.jsx          # /lien-he
    ├── LoginPage.jsx            # /dang-nhap
    ├── RegisterPage.jsx         # /dang-ky
    ├── AccountPage.jsx          # /tai-khoan (protected)
    └── NotFoundPage.jsx         # 404
```

## 🔐 Luồng hoạt động chức năng đăng nhập

### Tổng quan
Chức năng đăng nhập sử dụng **React Context API** + **localStorage** để quản lý
trạng thái. Không cần backend — mọi thứ xử lý ở frontend.

### Luồng chi tiết

1. **Đăng ký** (`/dang-ky`)
   - User điền form → validate (email, SĐT, mật khẩu 6+ ký tự, xác nhận khớp)
   - Nếu hợp lệ → lưu vào `localStorage` key `erp_registered_users`
   - Hiện toast "Đăng ký thành công" → chuyển sang trang đăng nhập

2. **Đăng nhập** (`/dang-nhap`)
   - User nhập email + mật khẩu → validate
   - So sánh với danh sách đã đăng ký trong localStorage
   - Hoặc dùng tài khoản demo: `demo@erp.vn` / `123456`
   - Nếu đúng → lưu user vào state + localStorage → chuyển về trang chủ
   - Header tự đổi nút "Đăng nhập" → hiện tên user + dropdown menu

3. **Protected Route** (`/tai-khoan`)
   - Component `ProtectedRoute` kiểm tra `isLoggedIn`
   - Nếu chưa đăng nhập → redirect về `/dang-nhap`
   - Nếu đã đăng nhập → cho xem bình thường

4. **Đăng xuất**
   - Click "Đăng xuất" → xóa user khỏi state + localStorage
   - Header đổi về nút "Đăng nhập"

### Sơ đồ

```
User → /dang-ky → Validate → localStorage → /dang-nhap
                                                ↓
User → /dang-nhap → Validate → So sánh localStorage → OK → Set state + toast
                                                        ↓
                                               Header hiện tên user
                                                        ↓
                                   /tai-khoan accessible (ProtectedRoute OK)
                                                        ↓
                                   Đăng xuất → Clear state + localStorage
```

## 🎨 Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|---------|
| React 18 | Xây dựng UI |
| Vite 5 | Build tool nhanh |
| React Router 6 | Điều hướng nhiều trang |
| Tailwind CSS 3 | Styling responsive |
| React Context | Quản lý state đăng nhập |
| localStorage | Lưu trữ dữ liệu đăng nhập |

## 📱 Responsive

Website hỗ trợ 3 breakpoint chính:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Mở rộng

Để kết nối backend thật sau này:
1. Thay hàm `login()` và `register()` trong `AuthContext.jsx` bằng API call
2. Thay `ContactForm` submit bằng API call
3. Thay dữ liệu mock trong `/data` bằng fetch từ API
