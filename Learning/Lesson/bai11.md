# Bài 11: Mạng Neural Network - Perceptron, Activation & Backpropagation

Mục tiêu bài học: Hiểu cấu trúc một nơ-ron nhân tạo, vai trò của các hàm kích hoạt (Activation functions) và cơ chế học tập lan truyền ngược (Backpropagation).

---

## 1. Nơ-ron nhân tạo (Perceptron)

Mạng thần kinh nhân tạo (Artificial Neural Network - ANN) mô phỏng cấu trúc hoạt động của bộ não con người. Đơn vị xử lý nhỏ nhất trong mạng được gọi là Neuron (hay Perceptron).

Cơ cấu tính toán của một Neuron:
1. Nhận các đầu vào (X1, X2, ..., Xn).
2. Nhân từng đầu vào với các trọng số tương ứng (W1, W2, ..., Wn) rồi tính tổng, cộng thêm hệ số tự do b (bias):
   z = W1 * X1 + W2 * X2 + ... + Wn * Xn + b
3. Cho giá trị z đi qua một Hàm kích hoạt (Activation Function) f(z) để tạo ra đầu ra phi tuyến tính:
   a = f(z)

---

## 2. Hàm kích hoạt (Activation Functions)

Nếu không có hàm kích hoạt phi tuyến tính, mạng neural dù có bao nhiêu lớp ẩn cũng chỉ tương đương với một phép biến đổi tuyến tính đơn giản (phép nhân ma trận thông thường). Hàm kích hoạt giúp mạng học được các quan hệ phức tạp, phi tuyến tính.

Các hàm kích hoạt phổ biến:
- Sigmoid: Nén đầu ra về khoảng [0, 1]. Thích hợp cho lớp đầu ra của bài toán phân loại nhị phân. Nhược điểm: gây hiện tượng triệt tiêu đạo hàm (Vanishing Gradient) ở các câu sâu.
- ReLU (Rectified Linear Unit): f(x) = max(0, x). Trả về 0 nếu đầu vào âm, giữ nguyên nếu đầu vào dương. Tính toán cực kỳ nhanh, là hàm kích hoạt tiêu chuẩn cho các lớp ẩn trong mạng sâu.
- Softmax: Nén các giá trị đầu ra của lớp cuối cùng thành một phân phối xác suất có tổng bằng 1. Dùng trong bài toán phân loại nhiều lớp (Multi-class classification).

---

## 3. Lan truyền xuôi & Lan truyền ngược (Forward & Backpropagation)

Mạng Neural học tập bằng cách lặp lại chu kỳ gồm hai pha chính:

* Pha 1: Lan truyền xuôi (Forward Propagation)
  - Dữ liệu đầu vào đi từ lớp đầu tiên qua các lớp ẩn (tính tổng có trọng số và áp dụng hàm kích hoạt) đến lớp đầu ra để đưa ra dự đoán.
  - Tính toán sai số (Loss) giữa giá trị dự đoán và nhãn thực tế bằng một hàm mất mát (ví dụ: Cross-Entropy Loss).

* Pha 2: Lan truyền ngược (Backpropagation)
  - Đây là pha cốt lõi giúp mô hình tự học.
  - Sử dụng Quy tắc chuỗi (Chain Rule) trong đạo hàm giải tích để tính đạo hàm của hàm mất mát theo từng trọng số (weight) và bias trong mạng từ lớp cuối cùng quay ngược trở lại lớp đầu tiên.
  - Cập nhật các trọng số và bias bằng thuật toán tối ưu (Gradient Descent) để giảm sai số ở lượt chạy tiếp theo:
    W = W - lr * (đạo_hàm_loss_theo_W)
