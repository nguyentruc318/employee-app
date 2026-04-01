# Khái niệm Zustand (Viết tắt: Nhanh, Gọn, Không màu mè)

Nếu ở bài trước, chúng ta ví **Redux** như một cái "Kho Hàng Tổng" của một tập đoàn lớn với thủ tục giấy tờ rườm rà (Action, Dispatch, Reducer...), thì **Zustand** chính là một **Cửa hàng tiện lợi tự phục vụ (Self-service Store)** hiện đại, bé xinh nhưng cực kỳ mạnh mẽ.

## 1. Vấn đề: Tại sao Zustand lại được sinh ra khi đã có Redux?

Redux rất mạnh, nhưng nó có một "lời nguyền" mà mọi Dev đều ngán ngẩm: **Boilerplate Code (Code rườm rà chém gió quá nhiều)**.
Để đổi được tên của 1 ông User trong Redux, bạn phải cấu hình Store, tạo Action, định nghĩa hằng số type, viết Reducer bóc tách switch-case... Quá nhiều thủ tục cho một việc bằng móng tay!

Gấu trúc nhỏ **Zustand** (tiếng Đức nghĩa là "Trạng thái") ra đời để chém đứt mọi thủ tục đó.

---

## 2. Sự khác biệt cốt lõi (Zustand so với Redux)

### Ở Redux: Mô hình Tập đoàn nhà nước (Nhiều thủ tục)

- Dev: "Dạ thưa anh Kế Toán (Reducer), em (Dispatch) mang theo cái Giấy đề nghị (Action) tên là 'ĐỔI_TÊN', mã số payload là 'Nguyễn Văn B', anh duyệt để sửa cái Tên trong Kho (Store) giúp em!"
  => Kết quả: Rất chặt chẽ, an toàn, nhưng 10 file code sinh ra.

### Ở Zustand: Mô hình Cửa hàng tự phục vụ (Tiện lợi)

- Dev: "Ê Store, đổi tên thành 'Nguyễn Văn B' nhen!"
- Store: "Ok xong!"
  => Kết quả: Cực kỳ ngắn gọn, viết đúng trong 1 cái Custom Hook là xong.

---

## 3. Cách Zustand hoạt động (Phẫu thuật bằng code)

Không có Reducer, không có Dispatch, không có Action bọc ngoài. Bản thân Zustand chỉ là một cái **Custom Hook** chứa State và các Hàm sửa State.

Bạn định nghĩa cái Store ở một góc:

```javascript
import { create } from "zustand";

// BƯỚC 1: XÂY CỰC NHANH CÁI KHO
const useKhoHang = create((set) => ({
  soLuongGioHang: 0, // <-- Đây là Data (State)
  tangGioHang: () =>
    set((state) => ({ soLuongGioHang: state.soLuongGioHang + 1 })), // <-- Đây là Hàm sửa Data
  xoaSachGioHang: () => set({ soLuongGioHang: 0 }),
}));
```

Sau đó bạn lôi nó ra xài ở BẤT KỲ component nào (Dù cách nhau nghìn trùng):

```javascript
// BƯỚC 2: RÚT RA XÀI NHƯ ĐÚNG RỒI
function NutMuaHang() {
  // Thò tay vào kho bốc cái hàm tăng ra
  const tangGioHang = useKhoHang((state) => state.tangGioHang);

  return <button onClick={tangGioHang}>Mua đi</button>;
}

function IconGioHang() {
  // Thò tay vào kho lấy cái số biến ra
  const soLuong = useKhoHang((state) => state.soLuongGioHang);

  return <div>🛒 Có {soLuong} món</div>;
}
```

---

## 4. Ưu điểm chí mạng của Zustand

1. **Không bọc Provider:** Khác với Redux (phải có bọc `<Provider>` ở file `main.tsx`) hay Context API, Zustand đứng độc lập hoàn toàn. Bạn xài ở đâu thì import cái Hook vào đó.
2. **Rất ít code:** Tốc độ Setup một Store bằng Zustand chỉ tốn khoảng 15 giây (Thực tế đi làm công ty bây giờ chuộng cái này hơn Redux Toolkit vì nó code quá lẹ).
3. **Mượt mà (Re-render tối ưu):** Bạn lấy đúng miếng Data nào thì khi miếng đó đổi, thẻ Component của bạn mới bị nháy (Re-render). Không lấy thì nó nằm im ru.

## 5. Zustand Slice Pattern (Chia để trị)

Khi ứng dụng của bạn lớn lên, việc nhét tất cả State và Hàm vào một chỗ sẽ khiến file Store của bạn dài hàng nghìn dòng. Zustand giải quyết vấn đề này cực kỳ thông minh bằng **Slice Pattern**.

### Ý tưởng: "Nhiều quầy hàng trong một siêu thị"

Thay vì một cái rổ khổng lồ, bạn chia nhỏ Store ra thành các "lát cắt" (Slice). Ví dụ: một lát cho **User**, một lát cho **Sản phẩm**, một lát cho **Cài đặt**.

### Cách triển khai thực tế:

Bạn viết các Slice riêng biệt dưới dạng các function, sau đó "hàn" chúng lại vào một Store duy nhất.

```javascript
// 1. Lát cắt Quản lý Cá (Fish Slice)
const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

// 2. Lát cắt Quản lý Gấu (Bear Slice)
const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

// 3. HÀN CHÚNG LẠI (The Bound Store)
const useStore = create((...a) => ({
  ...createFishSlice(...a),
  ...createBearSlice(...a),
}));
```

### Tại sao lại dùng Slice?

1. **Dễ bảo trì:** Bạn có thể tách mỗi Slice ra một file riêng biệt. File `userSlice.ts`, `productSlice.ts`... nhìn rất sạch sẽ.
2. **Dùng chung State:** Các Slice có thể gọi hàm của nhau hoặc dùng chung dữ liệu nếu cần (thông qua tham số `get` của Zustand).
3. **Logic rõ ràng:** Giống như Redux chia nhỏ thành nhiều `reducer` bằng `combineReducers`, nhưng Zustand làm việc này mượt mà hơn vì nó không cần tầng Action trung gian.

**Tóm lại:** Zustand hoàn toàn có thể chia thành nhiều Slice. Nó giúp bạn vừa giữ được sự ngắn gọn, vừa có được sự quy củ của các dự án lớn!

## 6. Middleware trong Zustand (Siêu năng lực bổ sung)

Zustand không chỉ đơn thuần là lưu trữ, nó còn có các "Middleware" cực kỳ lợi hại để giúp bạn xử lý các bài toán khó mà không cần viết quá nhiều code.

### 🛡️ persist: "Ghi chép vĩnh viễn"

Đây là middleware được dùng nhiều nhất. Nó giúp tự động lưu State của bạn vào `localStorage` hoặc `sessionStorage`.

- **Bài toán:** User chọn Chế độ tối (Dark Mode), tắt trình duyệt đi mở lại vẫn phải là Dark Mode.
- **Cách làm:** Bạn chỉ cần bọc `persist` quanh Store của mình.

```javascript
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "user-settings", // tên khóa lưu trong localStorage
    },
  ),
);
```

### 🔍 devtools: "Camera giám sát"

Zustand cực kỳ hào phóng khi cho phép bạn dùng chung bộ công cụ **Redux DevTools** để debug. Bạn có thể xem lại lịch sử thay đổi State, "du hành thời gian" để xem lỗi xảy ra lúc nào.

```javascript
import { devtools } from 'zustand/middleware'

const useStore = create(devtools((set) => ({ ... })))
```

### 🧩 immer: "Viết code lười biếng" (Giải quyết nỗi đau Nested Object)

Bình thường khi cập nhật State lồng nhau (Object trong Object), bạn phải dùng cú pháp Spread `...` rất mệt mỏi. Nếu lồng 3-4 lớp, code sẽ cực kỳ khó đọc và dễ sai sót.

#### ❌ Cách thủ công (KHÔNG dùng Immer - Dùng Spread):

Để cập nhật được cái `company` nằm sâu bên trong, bạn phải "bóc vỏ" từng lớp một. Nếu quên một dấu `...` ở bất kỳ lớp nào, bạn sẽ làm mất sạch dữ liệu của các lớp khác!

```javascript
const useStore = create((set) => ({
  user: { profile: { work: { company: "Vatek" } } },
  updateCompany: (newName) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          work: {
            ...state.user.profile.work,
            company: newName,
          },
        },
      },
    })),
}));
```

#### ✅ Cách dùng Immer Middleware:

Bạn chỉ cần "chọc" thẳng vào chỗ cần sửa như đang làm việc với biến bình thường. Code cực kỳ ngắn gọn, không lo làm mất dữ liệu các cấp khác vì bạn chỉ đang "chỉ định" chỗ cần sửa.

```javascript
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    user: { profile: { work: { company: "Vatek" } } },
    updateCompany: (newName) =>
      set((state) => {
        // Chỉ cần 1 dòng duy nhất, Immer tự lo phần còn lại
        state.user.profile.work.company = newName;
      }),
  })),
);
```

**Tại sao Immer làm được vậy?** Thực chất nó tạo ra một bản "nháp" (draft) cho bạn quậy phá thoải mái, sau đó nó tự đối soát và tạo ra một Object mới hoàn toàn cho React. Kết quả là code vừa sạch, vừa đảm bảo tính bất biến (Immutability).

**Lời khuyên:** Hãy bắt đầu với `persist` trước vì nó cực kỳ hữu ích cho các tính năng như giỏ hàng, cài đặt người dùng hay lưu Token đăng nhập!

## 7. Làm việc với Map, Set và Tối ưu re-render (useShallow)

Zustand không chỉ chơi với Object và Array, nó còn hỗ trợ cực tốt cho các cấu trúc dữ liệu hiện đại của JavaScript như **Map** và **Set**, đồng thời cung cấp "vũ khí" để tối ưu hiệu năng.

### 🗺️ Map và Set trong Zustand

Bình thường, bạn hay dùng Array để lưu danh sách. Nhưng nếu danh sách có hàng nghìn phần tử và bạn cần tìm kiếm cực nhanh theo ID, hãy dùng **Map**. Nếu cần danh sách không trùng lặp, hãy dùng **Set**.

```javascript
const useStore = create((set) => ({
  // Dùng Map để lưu danh sách nhân viên theo ID (truy xuất siêu tốc)
  employees: new Map(),

  addEmployee: (id, data) =>
    set((state) => {
      const newMap = new Map(state.employees);
      newMap.set(id, data);
      return { employees: newMap };
    }),
}));
```

### ⚡ useShallow: "Lá chắn" bảo vệ Re-render

Đây là kiến thức cực kỳ quan trọng để app của bạn chạy mượt như lụa.

**Vấn đề:**
Khi bạn lấy ra nhiều giá trị từ Store bằng một mảng hoặc object:

```javascript
const { fishes, bears } = useStore((state) => ({
  fishes: state.fishes,
  bears: state.bears,
}));
```

Mỗi khi Store có _bất kỳ thay đổi nào_ (dù chả liên quan đến cá hay gấu), Zustand sẽ tạo ra một Object mới `{ fishes, bears }`. React thấy Object này "mới" (khác địa chỉ ô nhớ) nên nó bắt Component vẽ lại (Re-render) vô tội vạ.

**Giải pháp: useShallow**
Nó sẽ đi soi từng giá trị _bên trong_ Object. Nếu giá trị `fishes` và `bears` vẫn cũ, nó sẽ không cho Component vẽ lại.

```javascript
import { useShallow } from "zustand/react/shallow";

// Bọc useShallow quanh selector của bạn
const { fishes, bears } = useStore(
  useShallow((state) => ({
    fishes: state.fishes,
    bears: state.bears,
  })),
);
```

**Tóm tắt:**

- Dùng **Map/Set** khi dữ liệu lớn và cần hiệu năng cao.
- Luôn luôn dùng **useShallow** khi bạn "bốc" từ 2 món trở lên từ Store trong cùng một selector để tránh giật lag UI!

## 8. TOP 5 Tính năng "Quốc dân" trong Zustand (Hay dùng nhất)

Nếu bạn mới bắt đầu, hãy tập trung thành thạo 5 thứ này trước, vì 90% dự án thực tế chỉ xoay quanh chúng:

1.  **Hàm `set` (có dùng callback state)**:
    - Đây là cách cập nhật chuẩn nhất. Luôn dùng `set((state) => ({ count: state.count + 1 }))` thay vì gán trực tiếp để đảm bảo dữ liệu mới nhất không bị ghi đè sai.
2.  **Middleware `persist`**:
    - Dùng để lưu Token đăng nhập, thông tin User hoặc Giỏ hàng. Chỉ cần cấu hình 1 lần, F5 trang dữ liệu vẫn còn y nguyên.
3.  **Middleware `devtools`**:
    - Bật nó lên để soi lỗi bằng Redux DevTools trên trình duyệt. Không có nó, bạn sẽ mù tịt không biết State đang nhảy đi đâu.
4.  **Hook `useShallow`**:
    - Dùng khi App bắt đầu có dấu hiệu giật lag hoặc khi bạn cần lấy cùng lúc nhiều giá trị ra để hiển thị.
5.  **Cấu trúc `Slices`**:
    - Đừng bao giờ nhét tất cả vào 1 file duy nhất nếu dự án có hơn 3 tính năng lớn. Hãy chia nhỏ ngay từ đầu để sau này không phải hì hục đi gỡ rối code.

---

**Lời kết:** Zustand thắng ở sự **đơn giản**. Đừng cố gắng làm nó phức tạp như Redux. Hãy cứ viết Store như viết một cái React Hook bình thường, và bạn sẽ thấy việc quản lý dữ liệu trong React chưa bao giờ sướng đến thế! 🚀
