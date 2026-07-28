# Phần 1: Dữ liệu và Toán học trong AI/ML (Thuật ngữ & Kiến thức chuyên ngành)

Tài liệu này hệ thống lại các khái niệm, phương pháp và thuật ngữ chuyên môn quan trọng nhất thuộc **Phần 1: Nền tảng Dữ liệu & Toán học tối ưu** trong Machine Learning. Đây là những từ khóa nền tảng giúp bạn làm việc chuyên nghiệp với dữ liệu.

---

## I. DATA CLEANING (Làm sạch Dữ liệu)
Mục tiêu là xử lý các lỗi vật lý, đảm bảo **Tính toàn vẹn (Data Integrity)** và **Chất lượng dữ liệu (Data Quality)** trước khi đưa vào mô hình.

### 1. Handling Missing Values (Xử lý dữ liệu khuyết thiếu)
* **Khái niệm**: Dữ liệu thu thập thực tế bị trống ở một số thuộc tính (gọi là giá trị `Null` hoặc `NaN`).
* **Phương pháp xử lý**:
  * **Imputation (Điền khuyết)**: Thay thế giá trị khuyết bằng **Mean** (trung bình cộng), **Median** (trung vị) đối với biến số; hoặc dùng **Mode** (yếu vị) đối với biến phân loại (chữ).
  * **Deletion**: Dùng `df.dropna(subset=[...])` để xóa bỏ dòng/cột nếu tỷ lệ khuyết thiếu quá cao (>60%) và không thể điền khuyết.

### 2. Outlier Detection & Handling (Phát hiện và xử lý giá trị ngoại lệ)
* **Khái niệm**: Outlier là giá trị đột biến, nằm quá xa vùng phân bố trung tâm của dữ liệu (do lỗi nhập liệu hoặc nhiễu đo lường).
* **Phương pháp phát hiện**:
  * **Quy tắc IQR (Interquartile Range - Khoảng tứ phân vị)**:
    * Tính khoảng cách giữa phân vị 75% ($Q_3$) và phân vị 25% ($Q_1$): $IQR = Q_3 - Q_1$.
    * Điểm dữ liệu $x$ được coi là Outlier nếu $x < Q_1 - 1.5 \times IQR$ hoặc $x > Q_3 + 1.5 \times IQR$.
  * **Z-score**: Điểm dữ liệu có trị tuyệt đối Z-score $> 3$ cũng thường được coi là Outlier.

### 3. Duplication & Casting (Xóa trùng lặp và Ép kiểu)
* **Xử lý trùng lặp**: Loại bỏ các bản ghi trùng nhau hoàn toàn bằng `df.drop_duplicates()` để tránh làm sai lệch phân phối dữ liệu huấn luyện.
* **Ép kiểu dữ liệu**: Sử dụng `.astype()` để chuyển kiểu dữ liệu thô (như chữ số ở dạng string) về đúng kiểu dữ liệu tính toán (float, int).

---

## II. FEATURE ENGINEERING (Kỹ nghệ Đặc trưng)
Mục tiêu là biến đổi dữ liệu sạch thành các **đặc trưng (features)** phù hợp để thuật toán Machine Learning khai thác và học tập hiệu quả nhất.

### 1. Feature Scaling (Chuẩn hóa thang đo đặc trưng)
* **Vì sao cần**: Các thuật toán tính khoảng cách (KNN, K-Means) hoặc sử dụng đạo hàm tối ưu (Gradient Descent) sẽ bị lệch hướng nếu các đặc trưng đầu vào có dải giá trị quá chênh lệch.
* **Phương pháp phổ biến**:
  * **Standardization (Chuẩn hóa Z-score)**: Biến đổi phân bố dữ liệu về dạng có trung bình ($\mu$) = 0 và độ lệch chuẩn ($\sigma$) = 1.
    * Công thức: $z = \frac{x - \mu}{\sigma}$
  * **Normalization (MinMax Scaling)**: Co nén dữ liệu về khoảng cố định $[0, 1]$ (hoặc $[-1, 1]$).
    * Công thức: $x_{\text{new}} = \frac{x - \min}{\max - \min}$

### 2. Categorical Encoding (Mã hóa biến phân loại)
* **Vì sao cần**: Mô hình Machine Learning bản chất là các mô hình toán học nên chỉ làm việc với số thực, không hiểu được chữ viết.
* **Phương pháp phổ biến**:
  * **Label Encoding**: Chuyển đổi các danh mục chữ thành các số nguyên tăng dần ($0, 1, 2...$). Chỉ nên dùng khi biến phân loại đó có tính thứ tự rõ ràng (ví dụ: `Thấp` $\rightarrow 0$, `Trung bình` $\rightarrow 1$, `Cao` $\rightarrow 2$).
  * **One-Hot Encoding**: Biến đổi cột phân loại thành nhiều cột nhị phân (chứa $0$ hoặc $1$). Tránh bẫy ngộ nhận lớn nhỏ của mô hình đối với các danh mục không có thứ tự (như màu sắc, thành phố).

### 3. Log Transformation (Biến đổi Log)
* **Ý nghĩa**: Áp dụng hàm logarit $\ln(x)$ cho các thuộc tính số có phân phối bị lệch nặng (Skewed Distribution). Nó giúp nén các giá trị cực lớn gần lại nhau, đưa phân phối dữ liệu tiệm cận về **Phân phối chuẩn (Normal Distribution)**.

### 4. Polynomial Features (Tạo đặc trưng bậc cao)
* **Ý nghĩa**: Tạo thêm các đặc trưng bằng cách bình phương hoặc nhân chéo các thuộc tính có sẵn ($x_1^2$, $x_1 \times x_2$). Kỹ thuật này giúp các mô hình tuyến tính (như Linear Regression) có thể học được các đường ranh giới phi tuyến tính phức tạp.

---

## III. GRADIENT DESCENT & OPTIMIZATION (Tối ưu hóa Gradient Descent)
Thuật toán tìm cực tiểu của **Hàm mất mát (Loss Function)** để cập nhật trọng số ($w, b$) tốt nhất cho mô hình.

* **Gradient (Vector đạo hàm riêng)**: Đại lượng chỉ hướng đi lên dốc nhanh nhất của hàm số tại điểm hiện tại. Do đó, để giảm thiểu hàm Loss, ta phải đi ngược hướng Gradient (phép trừ).
* **Learning Rate (Tốc độ học - $\eta$ hoặc $\alpha$)**: Độ lớn của mỗi bước nhảy khi cập nhật trọng số:
  * Nếu $\alpha$ quá lớn: Trọng số nhảy vọt qua điểm cực tiểu, gây phân kỳ (divergence) hoặc dao động mạnh.
  * Nếu $\alpha$ quá nhỏ: Bước đi quá ngắn, mô hình hội tụ cực kỳ chậm và dễ bị kẹt ở các **Cực tiểu cục bộ (Local Minima)** hoặc **Điểm yên ngựa (Saddle Point)**.
