# Bài 4: Khám phá dữ liệu (EDA) - Trực quan hóa dữ liệu

Mục tiêu bài học: Làm chủ quy trình Khám phá dữ liệu (Exploratory Data Analysis - EDA), biết cách lựa chọn biểu đồ phân tích phù hợp và phân tích ma trận hệ số tương quan của dữ liệu.

---

## 1. Exploratory Data Analysis (EDA) là gì?

EDA là bước tối quan trọng trước khi bắt đầu huấn luyện mô hình học máy. Mục đích của EDA:
- Tìm hiểu phân phối của từng thuộc tính (đều hay lệch).
- Phát hiện các giá trị dị biệt (Outliers - các giá trị bất thường).
- Tìm kiếm mối quan hệ (mô hình tương quan) giữa các biến số để lựa chọn thuộc tính phù hợp đưa vào huấn luyện.

---

## 2. Các loại biểu đồ EDA cốt lõi

* Biểu đồ Histogram (Biểu đồ tần suất):
  - Dùng để xem hình dạng phân phối của dữ liệu dạng số liên tục (ví dụ: tuổi tác, giá vé).
  - Giúp nhận diện dữ liệu có tuân theo Phân phối chuẩn (Normal Distribution) hay bị lệch trái/lệch phải.

* Biểu đồ Boxplot (Biểu đồ hộp và râu):
  - Trực quan hóa 5 giá trị thống kê: Min, Q1 (25%), Median (50%), Q3 (75%), Max.
  - Cực kỳ hữu dụng để phát hiện nhanh các giá trị dị biệt (Outliers) nằm ngoài khoảng râu của hộp.

* Biểu đồ Scatter Plot (Biểu đồ phân tán):
  - Dùng để trực quan hóa mối quan hệ giữa hai biến số liên tục (ví dụ: mối quan hệ giữa Age và Fare).
  - Giúp quan sát xu hướng tăng/giảm đồng biến hay nghịch biến.

---

## 3. Ma trận tương quan (Correlation Matrix)

* Khái niệm: Hệ số tương quan Pearson (Correlation Coefficient, ký hiệu r) đo lường mức độ liên hệ tuyến tính giữa hai biến số.
* Giá trị của r nằm trong khoảng từ -1 đến 1:
  - r gần 1: Tương quan thuận mạnh (biến A tăng thì biến B tăng).
  - r gần -1: Tương quan nghịch mạnh (biến A tăng thì biến B giảm).
  - r gần 0: Không có tương quan tuyến tính.
* Lệnh tính ma trận tương quan trong Pandas:
  - df.corr(numeric_only=True): Tính hệ số tương quan giữa tất cả các cột dạng số.
  - Ma trận tương quan thường được vẽ trực quan hóa dưới dạng Heatmap (Bản đồ nhiệt).
