# Hướng dẫn tích hợp GitHub Login (OAuth 2.0)

GitHub Login hơi "khó tính" hơn Google và Facebook một chút. Trong khi Google/Facebook có SDK chạy thẳng ở Frontend, thì GitHub yêu cầu một bước **Exchange Code** (Đổi mã lấy Token) mà thông thường bước này **cần có Backend** để giữ bí mật `Client Secret`.

Tuy nhiên, mình sẽ hướng dẫn bạn quy trình "chuẩn" và cách lách luật nếu bạn chỉ có mỗi Frontend.

---

## Bước 1: Tạo OAuth App trên GitHub

1. Truy cập [GitHub Settings -> Developer settings](https://github.com/settings/developers).
2. Chọn **OAuth Apps** -> **New OAuth App**.
3. **Application name**: `Employee App GitHub`.
4. **Homepage URL**: `http://localhost:5173`.
5. **Authorization callback URL**: `http://localhost:5173/login`. (Đây là nơi GitHub sẽ gửi người dùng quay lại kèm theo một cái mã `code`).
6. Bấm **Register application**.
7. Copy lấy **Client ID**.

---

## Bước 2: Thêm Client ID vào `.env`

```env
VITE_GITHUB_CLIENT_ID=DÁN_CLIENT_ID_CỦA_BẠN_VÀO_ĐÂY
```

---

## Bước 3: Quy trình Code (Flow)

Vì GitHub không có "nút bấm" làm sẵn xịn xò như Google, chúng ta sẽ tự chế một cái nút.

### 1. Nút bấm GitHub
Tại `LoginForm.tsx`, bạn thêm một nút bấm:

```tsx
const handleGithubLogin = () => {
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/login";
  
  // Đẩy sang trang của GitHub để user bấm "Authorize"
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
};

// Trong phần render:
<button 
  onClick={handleGithubLogin}
  className="w-full bg-gray-800 text-white py-2 rounded mt-2 flex items-center justify-center gap-2"
>
  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-5 h-5 invert" />
  Continue with GitHub
</button>
```

### 2. Xử lý khi quay lại (Hứng mã `code`)
Sau khi user bấm "Authorize" trên GitHub, trình duyệt sẽ quay lại:
`http://localhost:5173/login?code=ABCXYZ...`

Bạn cần dùng `useEffect` trong `LoginForm.tsx` hoặc `LoginPage.tsx` để bắt lấy cái `code` này.

```tsx
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // VẤN ĐỀ LỚN: Bạn cần gửi 'code' này lên Backend để đổi lấy 'access_token'.
    // Vì nếu làm ở Frontend, bạn sẽ phải lộ 'Client Secret' (CỰC KỲ NGUY HIỂM).
    console.log("Mã code từ GitHub:", code);
    
    // Giả sử bạn có backend hoặc dùng Proxy:
    // fetch('https://your-backend.com/github-callback', { body: { code } })
    //   .then(res => res.json())
    //   .then(user => login(user))
  }
}, []);
```

---

## ⚠️ CẢNH BÁO "THỰC TẾ"

GitHub **không cho phép** gọi API đổi Token trực tiếp từ trình duyệt (do lỗi CORS) vì họ bắt buộc bạn phải giữ `Client Secret` an toàn ở phía Server.

**Giải pháp để bạn vẫn làm được GitHub Login mà không cần viết Backend:**

1. **Sử dụng Firebase Auth:** Bạn chỉ cần gạt công tắc "GitHub" trong Firebase Console, Firebase sẽ làm "trung gian" xử lý hết đống `code` và `secret` kia cho bạn. Bạn chỉ việc gọi hàm `signInWithPopup(githubProvider)`.
2. **Sử dụng Supabase / Clerk:** Tương tự Firebase, cực kỳ nhanh.
3. **Sử dụng Proxy cá nhân:** Tự viết một cái Server Node.js/Express bé xíu (khoảng 10 dòng code) chỉ để làm nhiệm vụ "đổi mã".

**Lời khuyên:** Nếu bạn muốn app "xịn" và hỗ trợ nhiều loại (Google, Facebook, GitHub, Twitter...) thì hãy cân nhắc chuyển sang dùng **Firebase Auth** hoặc **Clerk**. Nó sẽ giúp bạn tiết kiệm hàng tuần trời ngồi debug các lỗi lặt vặt của từng nhà cung cấp!

Bạn có muốn mình hướng dẫn cách dùng **Firebase Auth** để gom tất cả lại một chỗ không?
