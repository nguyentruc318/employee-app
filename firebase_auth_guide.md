# Hướng dẫn chi tiết tích hợp Firebase Auth (Google & GitHub SSO)

Tài liệu này hướng dẫn bạn từng bước để đưa hệ thống đăng nhập SSO vào ứng dụng Quản lý nhân viên hiện tại, kết hợp với **Zustand** để quản lý trạng thái đăng nhập toàn cục.

---

## Bước 1: Thiết lập trên Firebase Console

1.  **Tạo dự án**: Truy cập [Firebase Console](https://console.firebase.google.com/), bấm **Add Project** và đặt tên dự án (vd: `Employee-App-Auth`).
2.  **Bật Authentication**:
    *   Vào menu **Authentication** -> Tab **Sign-in method**.
    *   Bấm **Add new provider**.
    *   **Google**: Bật trạng thái `Enable`, chọn Email hỗ trợ dự án và bấm **Save**.
    *   **GitHub**: Bật trạng thái `Enable`. Tại đây bạn sẽ thấy 2 ô cần điền: `Client ID` và `Client Secret`. Đừng đóng trang này, hãy sang Bước 2.

---

## Bước 2: Thiết lập trên GitHub Developer Settings

Để Firebase có thể nói chuyện được với GitHub, bạn cần cấp phép cho nó:

1.  Truy cập [GitHub Settings -> Developer settings](https://github.com/settings/developers).
2.  Chọn **OAuth Apps** -> **New OAuth App**.
3.  **Application name**: `Employee App Auth`.
4.  **Homepage URL**: `http://localhost:5173`.
5.  **Authorization callback URL**: Quay lại trang Firebase (chỗ cấu hình GitHub), copy cái đường dẫn **Callback URL** mà Firebase cung cấp và dán vào đây.
6.  Bấm **Register application**.
7.  Copy **Client ID** và tạo một cái **Client Secret** mới. 
8.  Dán ngược lại 2 mã này vào trang cấu hình GitHub trên Firebase Console và bấm **Save**.

---

## Bước 3: Cài đặt thư viện vào Project

Mở Terminal tại thư mục `employee-app` và chạy lệnh:

```bash
npm install firebase zustand
```

---

## Bước 4: Lấy cấu hình Firebase (Firebase Config)

1.  Tại trang chủ Firebase Console, bấm vào icon **Web (</>)** để đăng ký ứng dụng Web.
2.  Đặt tên (vd: `Employee Web`).
3.  Firebase sẽ hiện ra một đoạn mã `firebaseConfig`. Hãy copy đoạn đó, nó trông như thế này:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## Bước 5: Cấu trúc code trong React

Bạn sẽ cần tạo các file sau (mình sẽ hỗ trợ bạn code chi tiết sau khi bạn xong các bước setup trên):

1.  **`src/utils/firebase.ts`**: Nơi khởi tạo Firebase.
2.  **`src/store/authStore.ts`**: Store Zustand để lưu thông tin `user` (đang login hay chưa).
3.  **`src/components/ProtectedRoute.tsx`**: Một linh kiện bao bọc, nếu user chưa login thì đá văng về trang `/login`.

---

## Bước 6: Cập nhật Giao diện Login

Trong `LoginForm.tsx`, chúng ta sẽ thêm 2 nút bấm:
*   `signInWithGoogle()`
*   `signInWithGithub()`

Khi user bấm vào, Firebase sẽ mở Popup để đăng nhập. Thành công thì chúng ta lưu user vào Store và dùng `navigate('/employee')` để chuyển trang.

---

**Bạn hãy thực hiện Bước 1 và Bước 2 trước nhé.** Khi nào bạn đã có đoạn `firebaseConfig` trong tay, hãy nhắn cho mình để mình bắt đầu viết code thực tế cho bạn!
