# Hướng dẫn chi tiết tích hợp Google Login (@react-oauth/google)

Tài liệu này hướng dẫn bạn cách tích hợp trực tiếp Google Login vào ứng dụng React (Vite) của mình bằng thư viện chính thức, không thông qua Firebase.

---

## Bước 1: Thiết lập trên Google Cloud Console (GCP)

Đây là bước quan trọng nhất để lấy được "chìa khóa" (Client ID) từ Google.

1.  **Truy cập**: Vào [Google Cloud Console](https://console.cloud.google.com/).
2.  **Tạo dự án**: Bấm vào nút dự án ở góc trên bên trái -> **New Project** -> Đặt tên (vd: `Employee-App-Google-Auth`).
3.  **Cấu hình Màn hình đồng ý (OAuth Consent Screen)**:
    *   Tìm kiếm "OAuth Consent Screen" trong thanh tìm kiếm.
    *   Chọn **User Type**: `External` -> Bấm **Create**.
    *   Điền **App name**, **User support email**, và **Developer contact info**.
    *   Bấm **Save and Continue** qua các bước tiếp theo (không cần thêm scope) cho đến khi quay lại Dashboard.
4.  **Tạo Chứng chỉ (Credentials)**:
    *   Vào tab **Credentials** ở cột bên trái.
    *   Bấm **Create Credentials** -> Chọn **OAuth client ID**.
    *   **Application type**: Chọn `Web application`.
    *   **Name**: `Employee App Client`.
    *   **Authorized JavaScript origins**: Bấm **Add URI** và điền: `http://localhost:5173`.
    *   **Authorized redirect URIs**: Bấm **Add URI** và điền: `http://localhost:5173`.
5.  **Lấy Client ID**: Sau khi bấm **Create**, Google sẽ hiển thị một thông báo chứa **Your Client ID**. 
    > **⚠️ Chú ý**: Hãy copy dãy ký tự dài kết thúc bằng `.apps.googleusercontent.com` này lại.

---

## Bước 2: Cài đặt thư viện

Mở terminal tại thư mục dự án và chạy lệnh:

```bash
npm install @react-oauth/google jwt-decode
```
*(Thư viện `jwt-decode` dùng để giải mã thông tin user từ chuỗi Token mà Google trả về).*

---

## Bước 3: Cấu trúc Code thực hiện

### 1. Bao bọc ứng dụng (Main.tsx)
Bạn cần bao bọc toàn bộ App bằng Provider của Google và dán Client ID vào đây.

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="DÁN_CLIENT_ID_CỦA_BẠN_VÀO_ĐÂY">
    <App />
</GoogleOAuthProvider>
```

### 2. Thêm nút Login vào LoginForm.tsx
Sử dụng component `GoogleLogin` có sẵn của thư viện.

```tsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// Bên trong component LoginForm:
<GoogleLogin
  onSuccess={credentialResponse => {
    const details = jwtDecode(credentialResponse.credential);
    console.log(details); 
    // details sẽ chứa: name, email, picture...
    // Sau đó bạn có thể navigate('/employee')
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
```

---

## Bước 4: Lưu trạng thái (Gợi ý dùng Zustand)

Vì bạn đã học về **Zustand**, hãy tạo một file `src/store/authStore.ts` để lưu thông tin user sau khi login thành công. Khi đó, ở trang `EmployeePage`, bạn có thể kiểm tra: Nếu không có user trong Store thì dùng `Navigate` để đá người dùng quay lại trang Login.

---

**Bạn hãy tập trung hoàn thành Bước 1 trên trang web của Google trước nhé.** Khi nào bạn đã có **Client ID**, hãy nhắn cho mình để mình hướng dẫn bạn viết code "xịn" cho từng file!
