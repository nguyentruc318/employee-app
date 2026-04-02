# Hướng dẫn chi tiết tích hợp Facebook Login (@greatsumini/react-facebook-login)

Tương tự như Google, Facebook cũng cung cấp một cơ chế đăng nhập rất phổ biến. Tuy nhiên, thay vì dùng `jwt-decode`, Facebook chia quá trình này thành 2 phần: **Lấy Token** và **Lấy Profile**.

Mình khuyến nghị dùng thư viện `@greatsumini/react-facebook-login` vì nó hỗ trợ React 18+ rất tốt và dễ sử dụng.

---

## Bước 1: Lấy App ID từ Meta for Developers (Facebook)

1. **Truy cập**: Vào trang [Meta for Developers](https://developers.facebook.com/). Đăng nhập bằng tài khoản Facebook của bạn.
2. **Tạo ứng dụng**: Bấm **My Apps** (Ứng dụng của tôi) -> **Create App** (Tạo ứng dụng).
3. **Chọn loại ứng dụng**: Chọn **Authenticate and request data from users with Facebook Login** (Xác thực và yêu cầu dữ liệu từ người dùng...).
4. Điền các thông tin cần thiết và bấm **Tạo ứng dụng**.
5. **Cài đặt Facebook Login**: Ở Dashboard, tìm **Facebook Login** và bấm **Set up**.
   - Chọn **Web**. 
   - Điền URL của site là: `http://localhost:5173/` rồi bấm Save.
6. **Lấy App ID**: Ở menu bên trái, vào **App settings (Cài đặt ứng dụng)** -> **Basic (Cơ bản)**. Bạn sẽ nhìn thấy cái **App ID**. (Không lấy App Secret nhé, Frontend không cần bảo mật).
   - *Lưu ý: Bạn có thể cần điền App Domains là `localhost` tại đây.*

---

## Bước 2: Thêm App ID vào file môi trường (`.env`)

Mở file `.env` ở thư mục gốc và thêm dòng này vào:

```env
VITE_FACEBOOK_APP_ID=DÁN_APP_ID_CỦA_BẠN_VÀO_ĐÂY
```

> **⚠️ RẤT QUAN TRỌNG:** Phải tắt Terminal đang chạy `npm run dev` (nhấn Ctrl+C) và chạy lại thì Vite mới nhận giá trị mới trong `.env`.

---

## Bước 3: Cài đặt thư viện cho React

Mở một Terminal mới (hoặc tắt cái cũ) và chạy lệnh:

```bash
npm install @greatsumini/react-facebook-login
```

---

## Bước 4: Tích hợp nút Facebook Login vào `LoginForm.tsx`

Bây giờ bạn mở file `src/components/login/login-form.tsx` ra và làm theo các bước sau:

**1. Import Component:**
Thêm dòng này ở trên cùng:
```tsx
import FacebookLogin from '@greatsumini/react-facebook-login';
```

**2. Đặt nút phía dưới nút Google:**
Facebook cho phép bạn cấu hình cực kỳ linh hoạt. Thư viện này hỗ trợ 1 hàm `onProfileSuccess` để lấy thẳng Tên và Ảnh của người dùng mà không cần gọi API thủ công.

```tsx
<FacebookLogin
  appId={import.meta.env.VITE_FACEBOOK_APP_ID}
  className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2 transition duration-200"
  onSuccess={(response) => {
    // Bước 1: Login thành công (Facebook trả về Token)
    console.log('Đăng nhập thành công, Token:', response);
  }}
  onFail={(error) => {
    console.log('Đăng nhập thất bại!', error);
  }}
  onProfileSuccess={(response) => {
    // Bước 2: Tự động lấy Profile (Tên, Ảnh...)
    console.log('Lấy Profile thành công!', response);
    
    // Vì Store Zustand của bạn đang định nghĩa kiểu 'GoogleUser' với các trường name, email, picture, sub.
    // Nên mình sẽ map dữ liệu của Facebook cho khớp với các trường đó:
    const user = {
      name: response.name,
      email: response.email,
      picture: response.picture?.data?.url, // Ảnh của FB chôn hơi sâu
      sub: response.id // Facebook dùng 'id' thay vì 'sub'
    };
    
    // Lưu vào Zustand và chuyển trang như Google
    if (user) {
      login(user as any); // (Ép kiểu để TypeScript không báo lỗi do Store đang dùng type 'GoogleUser')
      navigate("/employee");
    }
  }}
/>
```

---

## 🚀 Các bước tiếp theo để bạn "Chuẩn hóa" dự án (Mở rộng cho nhiều loại SSO)

Khi App có cả Google và Facebook, kiểu dữ liệu `GoogleUser` trong Store nghe có vẻ không hợp lý nữa. Người ta thường sẽ đổi tên thành `AuthUser` chung chung. 

**Ví dụ, ở file `employee.type.ts`:**
```typescript
// Đổi tên nó đi cho tổng quát
export interface AuthUser {
  name: string;
  email?: string; // Tùy app có trả về hay không
  picture?: string;
  sub: string;
}
```

Chúc bạn thiết lập thành công! Hãy làm bước 1 trên `developers.facebook.com` trước, rồi nhắn mình nếu có gặp lỗi "đường dẫn không hợp lệ" hay "App Not Setup" nhé!
