# Kế Hoạch Backend 3 — Bảo Mật JWT & RBAC

## Tổng Quan

**Vai trò**: Backend 3 (Kỹ sư ATTT)  
**Deadline**: 16/04/2026  
**Nhiệm vụ**: Triển khai các cơ chế bảo mật JWT, RBAC và hardening toàn bộ API

---

## Hiện Trạng (Đã Có Sẵn)

> [!NOTE]
> Team đã code sẵn một phần nền tảng bảo mật. Backend 3 **không cần làm lại** mà chỉ cần **hoàn thiện và nâng cấp**.

| Thành phần | File | Trạng thái |
|---|---|---|
| JWT `signToken` + `verifyToken` | `utils/jwt.js` | ✅ Có sẵn |
| Middleware `protect` (xác thực Bearer token) | `middlewares/auth.middleware.js` | ✅ Có sẵn |
| Middleware `adminOnly` (RBAC cơ bản, hard-coded) | `middlewares/auth.middleware.js` | ⚠️ Cần refactor |
| bcrypt hash password (cost=12) | `controllers/auth.controller.js` | ✅ Có sẵn |
| Input validation (express-validator) | `routes/*.routes.js` | ✅ Có sẵn |
| Rate limiting (auth 10 req/15ph + global 100 req/15ph) | `src/index.js` | ✅ Có sẵn |
| CORS config | `src/index.js` | ✅ Có sẵn |
| Schema RBAC (enum Role: user/admin) | `prisma/schema.prisma` | ✅ Có sẵn |
| AuthContext frontend (kết nối API) | `frontend/src/contexts/AuthContext.jsx` | ⚠️ Cần nâng cấp |
| `AuthContext_updated.jsx` (bản mới, đặt sai chỗ) | `backend/src/AuthContext_updated.jsx` | ❌ Cần di chuyển |

---

## Những Gì Cần Bổ Sung / Nâng Cấp

### Phân Tích Lỗ Hổng Hiện Tại

| # | Vấn đề | Mức độ | Giải pháp |
|---|---|---|---|
| 1 | JWT payload chỉ có `id` — mỗi request phải query DB để lấy `role` | Trung bình | Nhúng `role` vào payload |
| 2 | **Không có refresh token** — token 7 ngày, hết hạn là logout cứng | Cao | Access token 15ph + refresh token 7 ngày |
| 3 | **Không có blacklist/revoke** — logout chỉ xóa client-side, server không biết | Cao | Bảng `BlacklistedToken` trong DB |
| 4 | `adminOnly` hard-code string — không tổng quát | Trung bình | Refactor thành `requireRole(...roles)` |
| 5 | Chỉ có 2 role `user`/`admin` — không thể mở rộng linh hoạt | Thấp | Chuẩn bị infrastructure cho role mới |
| 6 | **Không có Helmet.js** — thiếu security headers (XSS, CSP, HSTS...) | Cao | Thêm `helmet` |
| 7 | **Không có sanitize input** — XSS/injection qua text fields | Cao | Thêm `xss-clean` hoặc `sanitize-html` |
| 8 | Password policy **quá yếu** (chỉ min 6 ký tự) | Trung bình | Thêm pattern chữ hoa + số + ký tự đặc biệt |
| 9 | **Không có account lockout** — brute-force mật khẩu không bị chặn | Cao | Lock account sau N lần login sai |
| 10 | `AuthContext.jsx` frontend chưa xử lý token hết hạn / refresh tự động | Trung bình | Cập nhật logic interceptor 401 |

---

## Kế Hoạch Thực Hiện

### Bước 1 — Cài thêm dependency

```bash
npm install helmet xss
```

> `helmet` — tự động set các security HTTP headers (XSS, HSTS, CSP, X-Frame-Options...)  
> `xss` — sanitize input chống XSS, **đang được maintain tích cực** (thay thế `xss-clean` đã deprecated và có lỗ hổng đã biết)

> [!WARNING]
> **Không dùng `xss-clean`** — package này không được maintain từ lâu và có CVE đã biết. **Không dùng `express-mongo-sanitize`** nếu DB là MySQL/Prisma — package đó chỉ dành cho MongoDB.

---

### Bước 2 — Thêm `helmet` + `xss` vào `src/index.js`

#### [MODIFY] [index.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/index.js)

```js
import helmet from 'helmet'
import xss    from 'xss'

app.use(helmet())  // security headers

// Middleware sanitize input dùng thư viện xss (đang được maintain)
app.use((req, res, next) => {
  if (req.body)   req.body   = JSON.parse(xss(JSON.stringify(req.body)))
  if (req.query)  req.query  = JSON.parse(xss(JSON.stringify(req.query)))
  if (req.params) req.params = JSON.parse(xss(JSON.stringify(req.params)))
  next()
})
```

---

### Bước 3 — Hoàn Thiện JWT (Payload + Refresh Token + Blacklist)

#### [MODIFY] [schema.prisma](file:///d:/downloads/ero-riverside/ero-riverside/backend/prisma/schema.prisma)

Thêm model `BlacklistedToken`, thêm field `loginAttempts` + `lockedUntil` vào `User`:
```prisma
model User {
  // ... fields cũ
  loginAttempts Int      @default(0)       // đếm số lần login sai
  lockedUntil   DateTime?                  // thời điểm hết lock
}

model BlacklistedToken {
  id        Int      @id @default(autoincrement())
  token     String   @db.Text
  createdAt DateTime @default(now())

  @@map("blacklisted_tokens")
}
```

#### [MODIFY] [utils/jwt.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/utils/jwt.js)

- Thêm `role` vào payload (tránh query DB mỗi request)
- Tách thành `accessToken` (15 phút) và `refreshToken` (7 ngày)

```js
export const signAccessToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '15m' })

export const signRefreshToken = ({ id }) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET)
```

#### [MODIFY] [controllers/auth.controller.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/controllers/auth.controller.js)

- `login` → trả về cả `accessToken` + `refreshToken`
- Thêm `POST /api/auth/logout` → lưu access token vào blacklist
- Thêm `POST /api/auth/refresh` → verify refresh token → cấp `accessToken` mới

#### [MODIFY] [middlewares/auth.middleware.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/middlewares/auth.middleware.js)

- `protect`: dùng `role` từ JWT payload, **kiểm tra blacklist**, không query DB
- Xóa `adminOnly`, thay bằng `requireRole(...roles)` tổng quát

```js
export const protect = async (req, res, next) => {
  // ... verify token
  const blocked = await prisma.blacklistedToken.findFirst({ where: { token } })
  if (blocked) return res.status(401).json({ ... })
  // role lấy từ payload — KHÔNG query DB
  req.user = { id: decoded.id, role: decoded.role }
  next()
}

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập.' })
  }
  next()
}
```

> [!NOTE]
> **Trade-off đã biết và chấp nhận được**: Khi `protect` không còn query DB, nếu admin bị vô hiệu hóa (`isActive = false`), token cũ của họ **vẫn có hiệu lực tối đa 15 phút** cho đến khi hết hạn. Đây là đánh đổi hiệu năng vs bảo mật tức thì.
>
> - ✅ **Chấp nhận được** vì access token có thời hạn ngắn (15 phút)
> - 🔒 **Nếu cần revoke ngay lập tức**: thêm token của user đó vào blacklist khi deactivate tài khoản, HOẶC giữ lại `prisma.user.findUnique` trong `protect` chỉ cho các endpoint cực kỳ nhạy cảm (ví dụ: admin panel)

---

### Bước 4 — Account Lockout Sau N Lần Login Sai

#### [MODIFY] [controllers/auth.controller.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/controllers/auth.controller.js)

Trong hàm `login`, thêm logic:
- Sai password → tăng `loginAttempts`
- Nếu `loginAttempts >= 5` → set `lockedUntil = now + 15 phút`
- Mỗi request login → kiểm tra `lockedUntil` trước, nếu còn hạn → trả 423
- Login thành công → reset `loginAttempts = 0`

```js
// Kiểm tra lock
if (user.lockedUntil && user.lockedUntil > new Date()) {
  return res.status(423).json({
    success: false,
    message: `Tài khoản bị khóa. Thử lại sau ${Math.ceil((user.lockedUntil - Date.now()) / 60000)} phút.`
  })
}
```

---

### Bước 5 — Nâng Cấp Password Policy

#### [MODIFY] [routes/auth.routes.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/routes/auth.routes.js)

```js
body('password')
  .isLength({ min: 8 }).withMessage('Mật khẩu tối thiểu 8 ký tự')
  .matches(/[A-Z]/).withMessage('Phải có ít nhất 1 chữ hoa')
  .matches(/[0-9]/).withMessage('Phải có ít nhất 1 chữ số')
  .matches(/[!@#$%^&*]/).withMessage('Phải có ít nhất 1 ký tự đặc biệt')
```

> Áp dụng tương tự cho `change-password` trong `user.routes.js`

---

### Bước 6 — RBAC: Refactor Routes Dùng `requireRole`

#### [MODIFY] [routes/user.routes.js](file:///d:/downloads/ero-riverside/ero-riverside/backend/src/routes/user.routes.js)

Thay `adminOnly` → `requireRole('admin')`:
```js
import { protect, requireRole } from '../middlewares/auth.middleware.js'

// Thay:
router.get('/', adminOnly, getAllUsers)
// Thành:
router.get('/', requireRole('admin'), getAllUsers)
```

> Khi cần thêm role `staff` sau này chỉ cần: `requireRole('admin', 'staff')`

---

### Bước 7 — Tích Hợp Frontend: Di Chuyển AuthContext

> [!IMPORTANT]
> File `backend/src/AuthContext_updated.jsx` đang **đặt sai chỗ** trong thư mục backend. Đây là file React, phải thuộc frontend.

#### So sánh 2 phiên bản AuthContext:

| Tính năng | `AuthContext.jsx` (frontend/cũ) | `AuthContext_updated.jsx` (backend/mới) |
|---|---|---|
| Khởi tạo user | Từ localStorage (`erp_user`) | Gọi `authAPI.getMe()` khi có token |
| API | `fetch` thủ công | `authAPI`, `userAPI` wrapper |
| `updateProfile` | ❌ Không có | ✅ Có |
| Xử lý token hết hạn | Xóa token, giữ trạng thái cũ | Xóa token, set user null |
| Xử lý refresh token | ❌ Không có | ❌ Chưa có |

#### [MODIFY] [AuthContext.jsx](file:///d:/downloads/ero-riverside/ero-riverside/frontend/src/contexts/AuthContext.jsx)

Merge bản mới vào frontend, **bổ sung thêm**:

**Chiến lược lưu token (quan trọng):**

| Token | Lưu ở đâu | Lý do |
|---|---|---|
| `accessToken` | `localStorage` hoặc memory (biến JS) | Thời hạn ngắn (15 phút), rủi ro chấp nhận được |
| `refreshToken` | **`httpOnly` cookie** | Không thể đọc bằng JS/XSS, bảo mật hơn hẳn localStorage |

> [!IMPORTANT]
> **Đây là lựa chọn chính, không phải tùy chọn.** Lưu `refreshToken` vào localStorage đồng nghĩa với việc bất kỳ XSS nào cũng có thể đánh cắp và dùng để lấy access token mới vô thời hạn.

**Backend cần cấu hình cookie khi cấp refresh token:**
```js
// controllers/auth.controller.js — sau khi login thành công:
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,   // JS không đọc được
  secure: true,     // chỉ gửi qua HTTPS
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 ngày
})
// Chỉ trả accessToken trong body
res.json({ success: true, accessToken, user: safeUser(user) })
```

**Frontend AuthContext — bổ sung:**
- `accessToken` lưu trong memory (biến state hoặc module-level variable), không localStorage
- Hàm `refreshAccessToken()` — gọi `POST /api/auth/refresh`, cookie `httpOnly` tự động được trình duyệt gửi kèm
- Interceptor: API call nhận 401 → thử refresh → nếu fail thì logout hẳn
- `logout` gọi `POST /api/auth/logout` → server blacklist access token + xóa cookie

```js
// Ví dụ flow refresh tự động:
const refreshAccessToken = async () => {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include'  // gửi kèm httpOnly cookie
  })
  if (res.ok) {
    const { accessToken } = await res.json()
    setAccessToken(accessToken)  // lưu trong memory/state
    return true
  }
  return false
}
```

> [!NOTE]
> **Yêu cầu CORS**: Backend phải cấu hình `credentials: true` và `origin` cụ thể (không dùng `*`) để cookie `httpOnly` hoạt động cross-origin. File `index.js` hiện tại đã cấu hình đúng.

#### [DELETE] `backend/src/AuthContext_updated.jsx`

Sau khi merge xong, xóa file đặt nhầm chỗ khỏi thư mục backend.

---

### Bước 8 — Chạy Migration

```bash
cd backend
npx prisma migrate dev --name add_refresh_token_and_lockout
```

---

## Phân Công Và Ưu Tiên

| Ưu tiên | Task | Thời gian ước tính |
|---|---|---|
| 🔴 Cao | Bước 3: JWT payload + refresh token + blacklist | 60-90 phút |
| 🔴 Cao | Bước 4: Account lockout | 30 phút |
| 🔴 Cao | Bước 2: Helmet + xss-clean | 15 phút |
| 🟡 Trung bình | Bước 5: Password policy | 15 phút |
| 🟡 Trung bình | Bước 6: Refactor requireRole + routes | 15 phút |
| 🟡 Trung bình | Bước 7: AuthContext frontend | 45 phút |
| 🟢 Thấp | Bước 8: Migration DB | 10 phút |

**Tổng**: ~3.5–4 giờ làm việc

---

## Tóm Tắt Những Gì Backend 3 Được "Credit" Cho

| Cơ chế | Trạng thái |
|---|---|
| **JWT** (access 15ph + refresh 7 ngày, role trong payload) | 🆕 Nâng cấp |
| **RBAC** (`requireRole()` tổng quát, sẵn sàng mở rộng role) | 🆕 Nâng cấp |
| **Token Revocation** (blacklist DB khi logout) | 🆕 Mới |
| **Account Lockout** (khóa 15ph sau 5 lần sai) | 🆕 Mới |
| **Security Headers** (Helmet.js) | 🆕 Mới |
| **XSS Sanitization** (xss-clean) | 🆕 Mới |
| **Password Policy** (8 ký tự + chữ hoa + số + ký tự đặc biệt) | 🆕 Nâng cấp |
| **Rate Limiting** | ✅ Giữ nguyên |
| **bcrypt** (cost=12) | ✅ Giữ nguyên |
| **AuthContext Frontend** (refresh tự động, logout thực sự) | 🆕 Nâng cấp |

---

## Verification Plan

### Kiểm tra với Postman / Thunder Client

| Test | Expected |
|---|---|
| `POST /api/auth/login` | Body: `{ accessToken, user }` — **KHÔNG có `refreshToken` trong body**; kiểm tra tab **Cookies** trong Postman để thấy cookie `refreshToken` (httpOnly, Secure, SameSite=Strict) |
| `POST /api/auth/logout` | 200, token bị blacklist |
| Dùng `accessToken` cũ sau logout | 401 |
| `POST /api/auth/refresh` | Nhận `accessToken` mới |
| Login sai password 5 lần liên tiếp | Lần 5 nhận 423 + thông báo khóa |
| Register password yếu ("abc123") | 400 + message hướng dẫn |
| Check response headers | Có `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` |
| `GET /api/users` không có token | 401 |
| `GET /api/users` với token `role=user` | 403 |
| `GET /api/users` với token `role=admin` | 200 |

### Kiểm tra rate limit
- Auth: gửi >10 request login trong 15 phút → nhận 429
