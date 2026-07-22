# Bài 10: Học không giám sát - Phân cụm K-Means & Giảm chiều PCA

Mục tiêu bài học: Hiểu nguyên lý học không giám sát, làm chủ cơ chế gom nhóm phân cụm của K-Means và phương pháp giảm số chiều dữ liệu của PCA.

---

## 1. Học không giám sát (Unsupervised Learning)

Trái ngược với học có giám sát, tập dữ liệu đầu vào của học không giám sát hoàn toàn không có nhãn kết quả (y). Mô hình phải tự động tìm kiếm các cấu trúc ẩn, quy luật hoặc phân bố bên trong dữ liệu thô.
Các tác vụ tiêu biểu:
- Phân cụm (Clustering): Gom các điểm dữ liệu tương đồng vào cùng một nhóm.
- Giảm chiều dữ liệu (Dimensionality Reduction): Rút gọn số lượng đặc trưng lớn xuống số lượng nhỏ hơn mà vẫn giữ được thông tin quan trọng nhất.

---

## 2. Thuật toán phân cụm K-Means

K-Means chia dữ liệu thành K cụm (clusters) riêng biệt dựa trên khoảng cách địa lý giữa các điểm dữ liệu.

* Các bước hoạt động:
  1. Chọn ngẫu nhiên K điểm làm tâm cụm ban đầu (Centroids).
  2. Gán mỗi điểm dữ liệu vào tâm cụm gần nó nhất (sử dụng khoảng cách Euclid).
  3. Tính toán lại tọa độ tâm cụm bằng cách lấy trung bình cộng tọa độ của tất cả các điểm đã được gán vào cụm đó.
  4. Lặp lại bước 2 và bước 3 cho đến khi vị trí các tâm cụm không còn thay đổi.

* Cách chọn số lượng cụm K tối ưu: Phương pháp Elbow (Đường cùi chỏ)
  - Chạy K-Means với nhiều giá trị K khác nhau và tính tổng bình phương khoảng cách từ các điểm tới tâm cụm (WCSS).
  - Vẽ biểu đồ WCSS theo K. Đồ thị sẽ giảm nhanh và có xu hướng gập lại thành một góc giống cùi chỏ tại số cụm tối ưu.

---

## 3. Thuật toán phân tích thành phần chính (PCA)

Trong thực tế, dữ liệu có thể có hàng trăm đặc trưng (chiều). Vẽ đồ thị hoặc huấn luyện mô hình trên dữ liệu quá nhiều chiều gặp khó khăn (gọi là Lời nguyền đa chiều - Curse of Dimensionality).
PCA (Principal Component Analysis) giúp giảm chiều dữ liệu.

* Nguyên lý hoạt động:
  - PCA tìm kiếm các trục tọa độ mới (gọi là các Thành phần chính - Principal Components) sao cho khi chiếu dữ liệu lên các trục này, phương sai (độ phân tán thông tin) của dữ liệu được bảo toàn nhiều nhất.
  - Thành phần chính thứ nhất (PC1) giữ lượng thông tin lớn nhất, thành phần thứ hai (PC2) vuông góc với PC1 và giữ lượng thông tin lớn thứ hai.
  - Nhờ vậy, ta có thể giảm một tập dữ liệu từ 10 chiều xuống còn 2 chiều (PC1 và PC2) để dễ dàng vẽ biểu đồ trực quan hóa dữ liệu lên mặt phẳng mà không làm mất đi quá nhiều bản chất thông tin.
