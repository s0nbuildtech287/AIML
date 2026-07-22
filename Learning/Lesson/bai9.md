# Bài 9: Feature Engineering - Tiền xử lý dữ liệu nâng cao

Mục tiêu bài học: Nắm bắt các kỹ thuật mã hóa biến phân loại, chuẩn hóa dữ liệu, ngăn ngừa hiện tượng rò rỉ dữ liệu (Data Leakage) bằng công cụ Pipeline của Scikit-learn.

---

## 1. Mã hóa dữ liệu phân loại (Categorical Encoding)

Các thuật toán học máy chỉ hiểu dữ liệu số. Dữ liệu dạng chữ (ví dụ: Sex, Embarked, Subject) cần được chuyển thành số trước khi đưa vào mô hình.

* One-Hot Encoding:
  - Chuyển mỗi giá trị phân loại thành một cột nhị phân mới (chứa 0 hoặc 1).
  - Ví dụ: Cột Quốc_gia có 3 giá trị [Mỹ, Pháp, Việt Nam] ➔ Chuyển thành 3 cột: Quốc_gia_Mỹ, Quốc_gia_Pháp, Quốc_gia_Việt_Nam. Dòng có giá trị Mỹ sẽ điền [1, 0, 0].
  - Dùng khi dữ liệu phân loại không có thứ tự ưu tiên hoặc phân cấp.

* Label Encoding / Ordinal Encoding:
  - Chuyển mỗi giá trị thành một số nguyên tương ứng.
  - Ví dụ: Trình_độ [Cấp 3, Đại học, Thạc sĩ] ➔ [1, 2, 3].
  - Dùng khi dữ liệu phân loại có tính chất thứ tự, tăng tiến.

---

## 2. Chuẩn hóa dữ liệu (Feature Scaling)

Các đặc trưng có thể có thang đo rất khác nhau (ví dụ: cột Tuổi có giá trị từ 0-80, trong khi cột Thu_nhập có giá trị từ 5 triệu - 100 triệu). Sự chênh lệch này khiến các mô hình tính khoảng cách (như KNN, SVM) hoặc các mô hình tối ưu Gradient Descent bị lệch và hội tụ rất chậm.

Hai phương pháp chuẩn hóa phổ biến:
1. Min-Max Scaling (Normalization): Đưa dữ liệu về khoảng [0, 1].
   x_new = (x - min) / (max - min)
2. Standardization (Z-score Scaling): Biến đổi dữ liệu có giá trị trung bình bằng 0 và độ lệch chuẩn bằng 1.
   x_new = (x - mean) / std
   Cực kỳ thích hợp cho các mô hình giả định phân phối chuẩn của dữ liệu.

---

## 3. Rò rỉ dữ liệu (Data Leakage) & Scikit-learn Pipeline

* Hiện tượng Rò rỉ dữ liệu (Data Leakage):
  - Xảy ra khi thông tin từ tập kiểm thử (Test set) vô tình bị rò rỉ vào tập huấn luyện (Train set) trong quá trình tiền xử lý dữ liệu (ví dụ: tính giá trị trung bình mean trên toàn bộ bảng dữ liệu trước khi chia train/test split).
  - Tác hại: Mô hình đạt độ chính xác cực cao khi train/test nhưng bị sụt giảm nghiêm trọng khi chạy dữ liệu thực tế bên ngoài do bị overfitting thông số thống kê của tập test.

* Giải pháp: Scikit-learn Pipeline:
  - Pipeline là một chuỗi các bước tiền xử lý và huấn luyện được đóng gói làm một thực thể duy nhất.
  - Khi gọi pipeline.fit(X_train), pipeline sẽ tính toán các thông số thống kê (như mean, max) CHỈ trên tập X_train và áp dụng các thông số đó để biến đổi dữ liệu.
  - Khi gọi pipeline.predict(X_test), pipeline sử dụng các thông số đã tính từ tập X_train để áp dụng lên tập X_test, ngăn chặn hoàn toàn việc rò rỉ thông tin từ X_test.
