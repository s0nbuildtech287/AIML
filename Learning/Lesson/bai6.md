# Bài 6: Machine Learning có giám sát - Hồi quy & Phân loại tuyến tính

Mục tiêu bài học: Phân biệt bài toán Hồi quy và Phân loại, nắm rõ nguyên lý của Hồi quy tuyến tính (Linear Regression) và Hồi quy Logistic (Logistic Regression).

---

## 1. Học máy có giám sát (Supervised Learning)

Học máy có giám sát là quá trình huấn luyện mô hình dựa trên tập dữ liệu đã được gán nhãn (Labeled data). Nhãn chính là đáp án đúng mà mô hình cần học cách dự đoán.
Tập dữ liệu đầu vào gồm:
- Đặc trưng (Features - ký hiệu X): Các thuộc tính mô tả dữ liệu.
- Nhãn (Labels / Target - ký hiệu y): Giá trị thực tế cần dự đoán.

Học máy có giám sát chia thành hai lớp bài toán chính:
1. Hồi quy (Regression): Dự đoán một giá trị số thực liên tục (ví dụ: dự đoán giá nhà, nhiệt độ ngày mai, doanh số bán hàng).
2. Phân loại (Classification): Dự đoán một nhãn danh mục rời rạc (ví dụ: email là Spam hay Không Spam, hành khách sống hay chết).

---

## 2. Hồi quy tuyến tính (Linear Regression)

Hồi quy tuyến tính tìm mối quan hệ tuyến tính (đường thẳng) giữa các biến đặc trưng đầu vào X và biến mục tiêu liên tục y.

* Công thức tổng quát:
  y = w1 * x1 + w2 * x2 + ... + wn * xn + b
  Trong đó:
  - w (Weights) là trọng số đại diện cho tầm ảnh hưởng của từng đặc trưng.
  - b (Bias) là sai số hệ số tự do.

* Hàm mất mát (Loss Function - MSE):
  Hồi quy tuyến tính sử dụng Sai số bình phương trung bình (Mean Squared Error - MSE) để đo lường độ lệch giữa giá trị dự đoán và giá trị thực tế:
  MSE = (1 / m) * Tổng((y_pred - y_real)²)
  Mô hình tìm cách tối ưu hóa các trọng số w và b để MSE đạt giá trị nhỏ nhất (thường sử dụng thuật toán Gradient Descent).

---

## 3. Hồi quy Logistic (Logistic Regression)

Mặc dù có tên là Hồi quy, Hồi quy Logistic thực chất là thuật toán phân loại (thường dùng cho phân loại nhị phân - 2 lớp).

* Nguyên lý hoạt động:
  - Đầu tiên, mô hình tính toán một giá trị tuyến tính giống như Hồi quy tuyến tính: z = W * X + b.
  - Sau đó, giá trị z được đi qua hàm kích hoạt Sigmoid để nén kết quả về khoảng giá trị xác suất từ 0 đến 1.

* Hàm Sigmoid:
  S(z) = 1 / (1 + e^(-z))

* Quyết định phân lớp:
  - Nếu xác suất S(z) >= 0.5: Dự đoán nhãn là 1 (ví dụ: Chết / Spam).
  - Nếu xác suất S(z) < 0.5: Dự đoán nhãn là 0 (ví dụ: Sống / Không Spam).
