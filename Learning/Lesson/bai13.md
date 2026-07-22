# Bài 13: Mạng CNN cho dữ liệu hình ảnh

Mục tiêu bài học: Hiểu rõ nhược điểm của mạng MLP đối với ảnh, cơ chế hoạt động của các lớp Convolutional và Pooling, cùng phương pháp Transfer Learning.

---

## 1. Tại sao mạng MLP thông thường không phù hợp với ảnh?

Khi xử lý hình ảnh lớn (ví dụ: ảnh màu kích thước 256x256x3 pixels = 196,608 phần tử):
- Nếu dùng mạng MLP (Fully Connected), lớp ẩn đầu tiên chỉ cần 1000 node sẽ tạo ra tới gần 200 triệu trọng số cần huấn luyện. Điều này gây bùng nổ tài nguyên tính toán và cực kỳ dễ bị Overfitting.
- Mạng MLP làm phẳng ảnh thành vector 1D, phá vỡ hoàn toàn mối liên hệ không gian (Spatial relationships) giữa các điểm ảnh liền kề (trái, phải, trên, dưới).

---

## 2. Cấu trúc mạng CNN (Convolutional Neural Network)

Mạng CNN giải quyết vấn đề trên bằng cách quét qua bức ảnh để tìm kiếm các đặc trưng cục bộ thông qua hai lớp chính:

* Lớp tích chập (Convolutional Layer):
  - Sử dụng các bộ lọc kích thước nhỏ (Kernels / Filters, ví dụ: 3x3 hoặc 5x5) trượt khắp bức ảnh (Stride).
  - Tại mỗi vị trí, nhân từng điểm ảnh với trọng số của bộ lọc để tính tổng (Dot product), tạo ra một Bản đồ đặc trưng (Feature Map).
  - Cơ chế chia sẻ trọng số (Weight Sharing): Một bộ lọc dùng chung cho toàn bộ ảnh, giảm tối đa số lượng tham số cần học.

* Lớp Pooling (Giảm mẫu):
  - Lớp Max Pooling quét qua Feature Map và chỉ giữ lại giá trị lớn nhất trong từng ô cửa sổ (ví dụ: 2x2).
  - Giúp giảm kích thước ảnh, tăng tính kháng nhiễu và làm cho mô hình không bị phụ thuộc vào vị trí của vật thể trong ảnh (Translation invariance).

---

## 3. Transfer Learning (Học chuyển giao)

Là kỹ thuật lấy một mô hình đã được huấn luyện sẵn (Pre-trained model) trên các tập dữ liệu khổng lồ chứa hàng triệu bức ảnh (ví dụ: ImageNet) như ResNet, VGG, MobileNet.

Ta đóng băng (Freeze) các lớp trích xuất đặc trưng (Feature extractor) của mô hình pre-trained, chỉ thay thế lớp phân loại cuối cùng (Classifier) bằng lớp mới phù hợp với bài toán của mình và tiến hành huấn luyện trên tập dữ liệu nhỏ của chúng ta.
Phương pháp này giúp tiết kiệm thời gian huấn luyện và đạt độ chính xác cực cao dù có ít dữ liệu.
