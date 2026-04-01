# Khái niệm Redux (Giải thích qua Thuyết Kho Hàng)

Khái niệm về **Redux** là một trong những cột mốc đánh dấu sự "trưởng thành" của một Lập trình viên React. Để hiểu Redux nhanh nhất, bạn đừng cố đọc lý thuyết vội, hãy dùng mô hình **"Thuyết Kho Hàng"** dưới đây nhé!

## 1. Vấn đề: Tại sao lại sinh ra Redux? (Nỗi Đau Prop Drilling)
Ở ứng dụng nhỏ, bạn xài `useState` là đủ. Bạn truyền data từ Component Cha xuống Con thông qua siêu xe mang tên `Props`.
Tuy nhiên, nếu App của bạn to lên (như Shopee): 
Component `Header` (ở góc trên màn hình) muốn biết giỏ hàng có bao nhiêu món. Trong khi chỗ bấm nút "Thêm vào giỏ" lại nằm tít ở Component `ProductDetail` (góc dưới cùng). 
Để truyền được dữ liệu giữa 2 ông này, bạn phải dùng Props chuyền qua lại qua hàng chục Component trung gian (Cha -> Con -> Cháu -> Chắt) dù tụi nó chả cần sử dụng dữ liệu đó. 

👉 **Đó gọi là lỗi "Prop Drilling" (khoan tường truyền data). Cực kỳ cực khổ để bảo trì!**

---

## 2. Sự cứu rỗi của Redux: "Kho Hàng Tổng Bang"
Redux nhảy vào và nói: *"Đừng có chuyền tay nhau nữa, mệt lắm! Tui sẽ xây cho mấy người một cái Kho Hàng Tổng ngự trên đỉnh núi. Thằng nào có Data mới thì ném thẳng lên rổ của tui. Thằng nào cần Data thì cứ ngửa tay xin thẳng từ Kho của tui là xong!"*

Chính xác: **Redux là một công cụ State Management (Quản lý Trạng thái Global)**.

---

## 3. Giải phẫu hệ sinh thái Redux (Gồm 4 Nhân vật chính)

Bạn hãy tưởng tượng bạn quản lý một Quán Trà Sữa:

### 📦 Nhân vật 1: STORE (Khối tài sản chung)
- Là cái kho lưu hồ sơ ban đầu (bên trong chứa toàn bộ dữ liệu Global của bạn: Danh sách giỏ hàng, Thông tin user đang đăng nhập,...). 
- Nó cất giữ "Sự Thật Duy Nhất" (Single Source of Truth), ai cần gì phải hỏi nó hết.

### 📝 Nhân vật 2: ACTION (Tờ Đơn Đặt Hàng)
- Một Object trong Javascript để mô tả ý định của bạn. Nó luôn có một tên gọi loại lệnh (`type`) và dữ liệu đi kèm (`payload`).
- Ví dụ ghi trên tờ giấy: `{ type: "THÊM_TRÀ_SỮA", payload: "Matcha đá xay" }`.

### 🚀 Nhân vật 3: DISPATCH (Shipper / Người đưa thư)
- Là hành động bạn (từ Component React) cầm Tờ Đơn Đặt Hàng chạy vèo vèo lên đưa cho cái Kho Hàng. Giống việc bạn bấm cái nút "Thêm vào giỏ" rồi giao tờ giấy đi.

### 🧙‍♂️ Nhân vật 4: REDUCER (Ông Thủ Kho / Lão Kế toán)
- Ông này là người quyền lực nhất hệ thống. 
- Khi người giao hàng (Dispatch) đưa Tờ Đơn (Action) cho lão, lão sẽ lấy cái sổ sách cũ ra, suy nghĩ theo logic được lập trình sẵn, chép lại một Tờ Sổ Sách Mới Tinh và vứt vào trong `STORE`.
> **Lưu ý:** Lão này cực kỳ nguyên tắc - ổng luôn COPY dữ liệu cũ ra sửa chứ KHÔNG BAO GIỜ bôi xóa trực tiếp trên sổ sách gốc (đảm bảo tính Immutability).

---

## 4. Tóm tắt lại vòng đời Redux (Nhịp nhảy của hệ thống):
1. **Ui (React View)**: Có ông khách bấm nút "Mua hàng".
2. **Dispatch**: Bắt sự kiện, tạo tờ giấy **Action** `{type: "MUA", món: "Trà sữa"}` rồi ném cái vèo đi.
3. **Reducer**: Chộp được tờ giấy, đọc thấy chữ "MUA", lão mở kho xem *"À, giỏ hàng nãy có 0 món, giờ mọc thêm 1, ghi vô sổ mới: Giỏ hàng = 1"*. Rút sổ cũ vứt đi, ném sổ mới vào **Store**.
4. **Store**: Thay đổi dữ liệu trạng thái thành 1.
5. **Ui (Ví dụ cái icon Giỏ Hàng ở Header)**: Thấy Store đổi số 1, nó lật đật bật số 1 đỏ chót lên cái chuông báo! Tất cả đều được cập nhật hoàn toàn tự động.

## Khi nào BẠN NÊN xài Redux?
- Khi App đủ to (App dạng quản lý nhân viên đơn giản thì chưa cần, xài `useState` và Context API là đủ).
- Khi có một State dữ liệu mà bị chọc ngoáy ở quá nhiều chỗ (Ví dụ điển hình: Trạng thái User đăng nhập ở Header, Sidemenu, Footer đều phải gọi ra để kiểm tra quyền hạn).
