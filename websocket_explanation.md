# 🌐 WebSockets & Socket.io: "Cuộc gọi video" của thế giới Web

Chào bạn! Nếu HTTP là việc gửi thư tay (phải đợi phản hồi), thì **WebSockets** giống như một cuộc gọi điện thoại: Một khi đã kết nối, cả hai bên có thể nói chuyện cùng lúc mà không cần chờ đợi.

---

## 1. WebSockets là gì?

**WebSocket** là một giao thức truyền tải dữ liệu **hai chiều (Full-duplex)** trên một kết nối TCP duy nhất. 

- **HTTP (Cũ)**: Client hỏi -> Server trả lời -> Ngắt kết nối. (Muốn biết có tin nhắn mới không? Bạn phải F5 liên tục).
- **WebSocket (Mới)**: Client và Server "bắt tay" (Handshake) -> Giữ nguyên kết nối -> Ai có tin gì mới thì tự động "bắn" sang cho bên kia ngay lập tức.

---

## 2. Cách hoạt động (The Lifecycle)

Quy trình diễn ra trong 3 bước siêu nhanh:

1.  **Handshake (Bắt tay)**: Client gửi một yêu cầu HTTP đặc biệt tới Server nói rằng: *"Này, chúng ta nâng cấp lên WebSocket nhé?"*.
2.  **Open (Mở)**: Nếu Server đồng ý, kết nối được giữ mở. Lúc này không còn là HTTP nữa, mà là giao thức `ws://` (hoặc `wss://` cho bảo mật).
3.  **Bidirectional Data (Dữ liệu 2 chiều)**: Cả Client và Server đều có thể gửi tin nhắn bất cứ lúc nào (Event-driven).
4.  **Close (Đóng)**: Khi một trong hai bên muốn ngắt kết nối.

---

## 3. Tại sao nên dùng Socket cho App Quản lý Nhân viên?

Trong dự án của bạn, Socket giải quyết được những bài toán cực "nhối":

-   **Đồng bộ tức thì (Sync)**: Khi Admin A xóa nhân viên X, Admin B đang xem danh sách sẽ thấy dòng đó biến mất ngay lập tức (không cần F5).
-   **Trạng thái Online**: Biết được ai đang truy cập hệ thống.
-   **Thông báo (Notifications)**: Nhận thông báo "Hợp đồng của nhân viên A sắp hết hạn" theo thời gian thực.

---

## 4. Ví dụ minh họa (Socket.io)

### Phía Server (Node.js)
```javascript
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Có người vừa vào App!');

  // Nghe tín hiệu "thêm nhân viên" từ một máy nào đó
  socket.on('new_employee', (data) => {
    // Bắn tín hiệu cho TẤT CẢ mọi người khác biết
    socket.broadcast.emit('employee_added', data);
  });
});
```

### Phía Client (React)
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Lắng nghe tín hiệu từ Server
socket.on('employee_added', (newEmployee) => {
  alert(`Nhân viên mới ${newEmployee.name} vừa được thêm!`);
  // Gọi TanStack Query để làm mới danh sách (Refetch)
});
```

---

## 5. Socket.io vs WebSockets "Thuần"

Bạn sẽ thường nghe thấy cái tên **Socket.io**. Đây là một thư viện cực kỳ phổ biến giúp dùng WebSockets dễ dàng hơn vì:
-   **Tự động kết nối lại**: Nếu mạng bị rớt, nó tự động "gọi lại" cho đến khi thông.
-   **Hỗ trợ phòng (Rooms)**: Bạn có thể gửi tin nhắn cho "Phòng Kế toán" mà không ảnh hưởng đến "Phòng Nhân sự".
-   **Dễ dùng**: Cú pháp `.on()` và `.emit()` rất giống với cách React xử lý sự kiện.

---

## 🚀 Kết luận
WebSockets giúp ứng dụng của bạn không còn là một trang web "vô tri" mà trở thành một thực thể **sống**, phản ứng ngay lập tức với mọi thay đổi của dữ liệu. 

Nếu bạn muốn thử nghiệm, mình có thể giúp bạn viết một cái **Proxy Server** cực nhỏ bằng Node.js để vừa chạy được `json-server` (dữ liệu), vừa chạy được `Socket.io` (real-time) cho dự án này!
