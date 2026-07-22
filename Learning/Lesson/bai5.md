# Bài 5: Toán tối thiểu cho AI - Đại số tuyến tính, Xác suất & Gradient Descent

Mục tiêu bài học: Nắm vững các khái niệm đại số tuyến tính căn bản, hiểu ý nghĩa thống kê mô tả và làm chủ thuật toán tối ưu hóa Gradient Descent (Độ dốc đi xuống).

---

## 1. Đại số tuyến tính căn bản trong AI

Đại số tuyến tính là ngôn ngữ biểu diễn dữ liệu của AI. Mọi dữ liệu (ảnh, âm thanh, văn bản) đều được biến đổi thành các con số và ma trận.

* Vector (Mảng 1 chiều):
  - Đại diện cho một điểm dữ liệu có nhiều đặc trưng (features). Ví dụ: một căn nhà có thể biểu diễn bằng vector [số_phòng, diện_tích, giá].

* Ma trận (Mảng 2 chiều):
  - Đại diện cho một tập dữ liệu (dataset). Mỗi hàng là một mẫu dữ liệu (sample), mỗi cột là một đặc trưng (feature).

* Phép nhân ma trận (Dot Product):
  - Phép toán cốt lõi trong mạng thần kinh nhân tạo (Neural Network). Khi một lớp mạng tính toán đầu ra, nó thực chất đang nhân ma trận dữ liệu đầu vào với ma trận trọng số (Weights) và cộng với vector sai lệch (Bias):
    Y = X @ W + B

---

## 2. Xác suất & Thống kê cơ bản

Giúp chúng ta hiểu, đánh giá dữ liệu và đo lường độ tin cậy của mô hình.

* Phân phối chuẩn (Normal Distribution):
  - Phân phối hình chuông đối xứng, nơi đa phần dữ liệu tập trung ở giữa xung quanh giá trị trung bình. Rất nhiều thuật toán ML giả định dữ liệu đầu vào tuân theo phân phối này.

* Các chỉ số thống kê mô tả:
  - Giá trị trung bình (Mean): Tổng tất cả giá trị chia cho số lượng phần tử. Dễ bị ảnh hưởng bởi giá trị cực đoan (Outliers).
  - Trung vị (Median): Giá trị đứng ở giữa dãy số khi đã sắp xếp. Phản ánh thực tế tốt hơn khi dữ liệu có outliers lớn.
  - Phương sai (Variance) & Độ lệch chuẩn (Standard Deviation): Đo lường mức độ phân tán của dữ liệu so với giá trị trung bình. Độ lệch chuẩn lớn nghĩa là dữ liệu trải rộng, biến động mạnh.

---

## 3. Thuật toán tối ưu hóa Gradient Descent

Trong học máy, mục tiêu của việc huấn luyện mô hình là tìm ra bộ trọng số W sao cho sai số (Loss/Cost) giữa giá trị dự đoán và thực tế là nhỏ nhất. Hàm đo lường sai số này được gọi là Hàm mất mát (Loss Function).

Gradient Descent là thuật toán lặp đi lặp lại để tìm điểm cực tiểu của hàm mất mát.

* Nguyên lý hoạt động (Tìm đường xuống núi):
  - Tưởng tượng bạn đang đứng trên đỉnh núi sương mù và muốn xuống thung lũng (điểm cực tiểu). Bạn sẽ nhìn xung quanh xem hướng nào dốc nhất đi xuống và bước một bước nhỏ theo hướng đó.
  - Độ dốc chính là Đạo hàm (Gradient) của hàm số tại điểm hiện tại.
  - Công thức cập nhật vị trí mới:
    x_new = x_old - lr * gradient
  - Trong đó, lr (Learning Rate - Tỷ lệ học) quyết định độ lớn của mỗi bước đi.

* Ảnh hưởng của Learning Rate (lr):
  - lr quá nhỏ: Bước đi quá ngắn, thuật toán mất rất nhiều thời gian (hoặc bị kẹt ở cực trị cục bộ) mới xuống được đáy.
  - lr quá lớn: Bước đi quá dài, bạn có thể nhảy vượt qua cả đáy thung lũng (overshoot) và dao động liên tục hoặc bay ra xa (phân kỳ).
