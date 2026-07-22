# Bài 2: Pandas cơ bản - Thao tác dữ liệu với Series & DataFrame

Mục tiêu bài học: Nắm vững cấu trúc dữ liệu Series và DataFrame, thành thạo các phương pháp truy xuất dữ liệu bằng loc/iloc, các phép toán lọc dữ liệu (filtering) và nhóm dữ liệu (groupby).

---

## 1. Cấu trúc dữ liệu trong Pandas

Pandas cung cấp hai cấu trúc dữ liệu chính phục vụ cho phân tích:

* Series:
  - Là mảng 1 chiều có gắn nhãn (index).
  - Có thể coi Series là một cột đơn lẻ trong bảng dữ liệu hoặc một danh sách nâng cao nơi mỗi phần tử có một nhãn định danh (không nhất thiết phải là số thứ tự 0, 1, 2).

* DataFrame:
  - Là cấu trúc dữ liệu 2 chiều dạng bảng (dòng và cột), giống như bảng tính Excel hoặc bảng trong cơ sở dữ liệu SQL.
  - Mỗi cột trong DataFrame thực chất là một Series dùng chung một hệ chỉ mục dòng (Index).

Để sử dụng Pandas, ta import thư viện dưới tên viết tắt là pd:
```python
import pandas as pd
```

---

## 2. Khởi tạo và Đọc dữ liệu

* Khởi tạo từ Dictionary:
```python
data = {
    "Name": ["An", "Bình", "Chi"],
    "Age": [22, 25, 20],
    "Grade": [8.5, 9.0, 7.0]
}
df = pd.DataFrame(data)
```

* Đọc dữ liệu từ file ngoài:
  - pd.read_csv("path/to/file.csv"): Đọc file CSV.
  - pd.read_json("path/to/file.json"): Đọc file JSON.
  - pd.read_excel("path/to/file.xlsx"): Đọc file Excel.

---

## 3. Truy xuất và Cắt dữ liệu (Indexing & Slicing)

Pandas cung cấp hai thuộc tính cốt lõi để định vị dòng và cột:

* .loc[] (Label-based indexing):
  - Định vị dựa trên nhãn (tên cột, nhãn dòng).
  - Cú pháp: df.loc[nhãn_dòng, nhãn_cột]
  - Ví dụ: df.loc[0:2, "Name"] -> Lấy các dòng từ nhãn 0 đến nhãn 2 của cột Name. (Lưu ý: loc lấy bao gồm cả điểm cuối).

* .iloc[] (Integer position-based indexing):
  - Định vị dựa vào chỉ số vị trí nguyên (tương tự như cách index của mảng Python chuẩn, bắt đầu từ 0).
  - Cú pháp: df.iloc[chỉ_số_dòng, chỉ_số_cột]
  - Ví dụ: df.iloc[0:2, 0:2] -> Lấy các dòng 0, 1 và các cột 0, 1 (không bao gồm dòng 2 và cột 2).

---

## 4. Lọc dữ liệu bằng điều kiện (Filtering)

Lọc dòng trong DataFrame hoạt động bằng cách truyền vào một mảng Boolean (True/False).

```python
# Lấy các hàng có Age lớn hơn 20
df_filtered = df[df["Age"] > 20]

# Kết hợp nhiều điều kiện (Dùng ký hiệu & cho AND, | cho OR, ~ cho NOT)
# Lưu ý: Mỗi điều kiện bắt buộc phải nằm trong cặp ngoặc đơn ()
df_filtered = df[(df["Age"] > 20) & (df["Grade"] >= 8.0)]
```

---

## 5. Phép nhóm dữ liệu (Groupby & Aggregation)

Phép toán groupby cho phép chia dữ liệu thành các nhóm dựa trên các giá trị của một hoặc nhiều cột, sau đó áp dụng các hàm tổng hợp (aggregation) trên từng nhóm như: mean() (trung bình), sum() (tổng), count() (đếm số lượng), max(), min().

```python
# Tính điểm trung bình (Grade) theo từng nhóm tuổi (Age)
age_group = df.groupby("Age")["Grade"].mean()
```

Hàm groupby là nền tảng cốt lõi của các tác vụ phân tích, giúp tóm tắt dữ liệu lớn thành các thông tin tổng quát có ý nghĩa.
