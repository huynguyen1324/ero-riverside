# 🏠 Ero Riverside — Backend API (MySQL + Prisma)

---

## ✅ Yêu cầu cài đặt
- Node.js >= 18
- MySQL (đã cài theo hướng dẫn)

---

## 🚀 Các bước chạy lần đầu

### Bước 1 — Cài packages
```bash
npm install
```

### Bước 2 — Tạo file .env
```bash
copy .env.example .env
```
Mở file `.env`, sửa dòng này (thay `YOUR_PASSWORD`):
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/ero_riverside"
```

### Bước 3 — Tạo database & bảng tự động
```bash
npm run db:migrate
```
> Lệnh này sẽ tự tạo database `ero_riverside` và các bảng `users`, `contacts` trong MySQL. Không cần tạo tay!

### Bước 4 — Chạy server
```bash
npm run dev
```
Server chạy tại: **http://localhost:5000**

Kiểm tra: mở trình duyệt vào http://localhost:5000/api/health → thấy `"Server đang chạy 🚀"` là OK ✅

---

## 📡 API Endpoints

### Auth
| Method | URL | Mô tả |
|--------|-----|-------|
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/auth/me | Thông tin user (cần token) |

### User
| Method | URL | Mô tả |
|--------|-----|-------|
| GET | /api/users/profile | Xem profile |
| PUT | /api/users/profile | Cập nhật name, phone |
| PUT | /api/users/change-password | Đổi mật khẩu |

### Contact
| Method | URL | Mô tả |
|--------|-----|-------|
| POST | /api/contact | Gửi form tư vấn |
| GET | /api/contact | Danh sách (admin) |

---

## 🔗 Tích hợp Frontend

1. Thêm vào `.env` của frontend:
```
VITE_API_URL=http://localhost:5000/api
```

2. Copy `src/services_frontend_api.js` → `src/services/api.js` trong frontend

3. Thay `src/contexts/AuthContext.jsx` bằng `src/AuthContext_updated.jsx`

---

## 🛠️ Lệnh hữu ích

```bash
npm run dev          # Chạy development (auto-reload)
npm run db:migrate   # Tạo/cập nhật bảng trong MySQL
npm run db:studio    # Mở giao diện quản lý DB trên trình duyệt
```
