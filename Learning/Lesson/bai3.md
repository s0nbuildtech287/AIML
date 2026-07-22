# Bài 3: Làm sạch dữ liệu - Xử lý dữ liệu thiếu và lỗi

Mục tiêu bài học: Hiểu rõ tác hại của dữ liệu lỗi, làm chủ các kỹ thuật xử lý giá trị khuyết thiếu (NaN) và các phương pháp xóa trùng lặp dữ liệu thực tế.

---

## 1. Dữ liệu khuyết thiếu (Missing Data / NaN) là gì?

Trong thực tế, dữ liệu thu thập được hầu như luôn bị thiếu thông tin do: lỗi cảm biến, người dùng không điền form, hoặc lỗi truyền tin. Trong Pandas, các ô trống này được biểu diễn dưới dạng NaN (Not a Number) hoặc None.

Tác hại:
- Các mô hình học máy (Machine Learning) đa số không chấp nhận đầu vào chứa giá trị NaN và sẽ báo lỗi khi huấn luyện.
- Các phép tính toán thống kê (như tính trung bình cộng) có thể bị lệch hoặc sai sót.

---

## 2. Các phương pháp kiểm tra dữ liệu thiếu

* Kiểm tra ô trống:
  - df.isnull() hoặc df.isna(): Trả về ma trận True/False tương ứng với từng ô.
  - df.isnull().sum(): Trả về tổng số lượng ô trống của từng cột. Đây là câu lệnh đầu tiên cần chạy khi phân tích bất kỳ tập dữ liệu nào.

---

## 3. Các chiến lược xử lý dữ liệu khuyết thiếu

* Chiến lược 1: Loại bỏ (dropna)
  - Sử dụng khi tỷ lệ dữ liệu thiếu rất nhỏ (dưới 5%) hoặc cột bị thiếu không quan trọng.
  - df.dropna(): Xóa toàn bộ hàng nếu chứa bất kỳ ô trống nào.
  - df.dropna(subset=["Age"]): Chỉ xóa hàng nếu cột Age bị trống.

* Chiến lược 2: Điền giá trị thay thế (Imputation - fillna)
  - Sử dụng để giữ lại số lượng dòng của dữ liệu.
  - Điền giá trị hằng số: df.fillna(0)
  - Điền bằng giá trị thống kê của cột (Khuyên dùng):
    + Dữ liệu dạng số: Điền bằng Giá trị trung bình (mean) hoặc Trung vị (median).
      mean_age = df["Age"].mean()
      df["Age"].fillna(mean_age, inplace=True)
    + Dữ liệu dạng chữ (danh mục): Điền bằng giá trị xuất hiện nhiều nhất (mode).

---

## 4. Xử lý dữ liệu trùng lặp (Duplicates)

Dữ liệu trùng lặp xuất hiện do lỗi hệ thống lưu trữ hoặc gộp nhiều nguồn dữ liệu.

* Kiểm tra trùng lặp:
  - df.duplicated(): Trả về True/False cho mỗi dòng nếu dòng đó bị trùng lặp với một dòng xuất hiện trước đó.
  - df.duplicated().sum(): Đếm tổng số dòng bị trùng hoàn toàn.

* Xóa trùng lặp:
  - df.drop_duplicates(inplace=True): Chỉ giữ lại bản ghi đầu tiên, xóa toàn bộ các bản ghi trùng lặp phía sau.
