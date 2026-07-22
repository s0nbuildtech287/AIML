# Bài 1: NumPy cơ bản - Mảng (Array), Vectorization & Phép toán Ma trận

Mục tiêu bài học: Hiểu rõ ndarray là gì, tại sao NumPy lại xử lý số liệu nhanh vượt trội so với danh sách truyền thống của Python, làm chủ các thao tác indexing, slicing, các phép nhân ma trận và cơ chế Broadcasting.

---

## 1. Tại sao NumPy ndarray lại nhanh hơn Python List?

Mảng nhiều chiều của NumPy (ndarray) là cấu trúc lõi cho mọi tính toán trong khoa học dữ liệu và học máy. Sự khác biệt nằm ở thiết kế bộ nhớ dưới nền:

* Bộ nhớ liên tục (Contiguous Memory Allocation):
  - Python List lưu trữ các tham chiếu (địa chỉ con trỏ) đến các đối tượng nằm rải rác ở các vị trí khác nhau trong RAM. Mỗi phần tử trong list là một đối tượng Python riêng lẻ có metadata đi kèm (overhead cao).
  - NumPy Array lưu trữ dữ liệu thực tế liên tục nhau trong bộ nhớ RAM dưới dạng các khối byte thô. Khi CPU truy cập một phần tử, nó sẽ tải toàn bộ khối dữ liệu kế cận vào CPU Cache (L1/L2/L3 cache), tăng tốc độ đọc dữ liệu cực lớn.

* Đồng nhất kiểu dữ liệu (Homogeneous Types):
  - Mọi phần tử trong ndarray buộc phải có cùng một kiểu dữ liệu (ví dụ: float32, int64). CPU không mất thời gian kiểm tra kiểu dữ liệu của từng phần tử tại thời điểm chạy (runtime type-checking).

* Vectorization (Véc-tơ hóa):
  - Nhờ bộ nhớ liên tục và đồng nhất, các phép toán trên mảng được đẩy xuống mã máy C biên dịch sẵn. CPU có thể tận dụng tập lệnh SIMD (Single Instruction, Multiple Data) để thực thi một phép tính trên nhiều phần tử cùng lúc trong một chu kỳ xung nhịp.

---

## 2. Khởi tạo mảng trong NumPy

Nhập thư viện thông qua bí danh np:
```python
import numpy as np
```

### Các cách tạo mảng cơ bản:

* Tạo từ cấu trúc dữ liệu Python:
  - np.array([1, 2, 3]): Tạo mảng 1 chiều (Vector).
  - np.array([[1, 2], [3, 4]]): Tạo mảng 2 chiều (Matrix).

* Tạo mảng mẫu định sẵn:
  - np.zeros((dòng, cột)): Tạo ma trận toàn số 0.0. Thường dùng để khởi tạo trọng số hoặc bộ nhớ đệm.
  - np.ones((dòng, cột)): Tạo ma trận toàn số 1.0.
  - np.arange(start, stop, step): Tạo dãy số cách đều.
  - np.linspace(start, stop, num): Tạo num số chia đều trong khoảng từ start đến stop. Thường dùng để tạo lưới tọa độ kiểm thử.

---

## 3. Indexing & Slicing Đa Chiều

Cú pháp trích xuất dữ liệu trên ma trận 2D: arr[chỉ_số_dòng, chỉ_số_cột]

Cho ma trận A có kích thước 3x3:
```python
A = np.array([
    [10, 11, 12],
    [20, 21, 22],
    [30, 31, 32]
])
```

* Truy xuất phần tử đơn:
  - A[0, 1] trả về 11 (dòng 0, cột 1).

* Slicing (Cắt mảng):
  - Cú pháp dạng start:stop (không bao gồm vị trí stop).
  - A[0:2, 1:3] lấy dòng 0 và 1, cột 1 và 2. Kết quả thu được ma trận con 2x2:
    [[11, 12],
     [21, 22]]
  - A[:, 0] dấu hai chấm đại diện cho việc lấy toàn bộ dòng. Đoạn này nghĩa là lấy toàn bộ dòng của cột 0. Kết quả: [10, 20, 30].

---

## 4. Phép toán Ma trận cơ bản

### 4.1. Thay đổi hình dạng (Reshape)
- Hàm reshape cho phép chuyển đổi cấu trúc mảng mà không thay đổi dữ liệu gốc.
- Điều kiện: tích các chiều mới phải bằng số phần tử ban đầu.
- Ví dụ: Mảng 12 phần tử có thể reshape thành 3x4, 4x3, 2x6 hoặc 12x1.
- Lưu ý: Dùng -1 ở một chiều để NumPy tự tính chiều còn lại dựa trên các chiều đã biết. Ví dụ: arr.reshape(3, -1).

### 4.2. Chuyển vị ma trận (Transpose)
- Ký hiệu .T hoặc hàm np.transpose().
- Hoán đổi dòng thành cột và ngược lại. Ma trận kích thước M x N sẽ chuyển thành N x M.

### 4.3. Nhân ma trận: Nhân từng phần tử vs Nhân ma trận chuẩn
Cho hai ma trận A và B:
- Nhân từng phần tử (Element-wise multiplication): Dùng toán tử *. A[i, j] nhân trực tiếp với B[i, j]. Yêu cầu A và B phải cùng kích thước.
- Nhân ma trận (Dot product): Dùng toán tử @ hoặc hàm np.dot(). Thực hiện nhân dòng của ma trận trước với cột của ma trận sau. Yêu cầu số cột của ma trận trước phải bằng số dòng của ma trận sau.

---

## 5. Cơ chế Broadcasting

Cơ chế Broadcasting cho phép NumPy thực hiện các phép toán số học giữa các mảng có kích thước (shape) khác nhau.

### Quy tắc hoạt động:
Khi so sánh kích thước của hai mảng từ chiều cuối cùng (bên phải nhất) quay về trước:
1. Hai chiều bằng nhau.
2. Một trong hai chiều có kích thước bằng 1. Chiều có kích thước bằng 1 sẽ được tự động nhân bản lên để khớp với mảng còn lại.

Ví dụ:
- Ma trận A kích thước (2, 3) cộng với Vector B kích thước (1, 3).
- Chiều cuối cùng khớp nhau (cùng bằng 3).
- Chiều thứ hai: B có kích thước 1, A có kích thước 2.
- Vector B tự nhân bản dòng của nó thành 2 dòng giống nhau tạo thành ma trận (2, 3) để thực hiện phép cộng từng vị trí tương ứng với A.
