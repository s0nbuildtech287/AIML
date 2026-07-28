# Phần 2: Học máy cổ điển (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ kiến thức và thuật ngữ chuyên ngành thuộc nhóm các thuật toán học máy cổ điển (Classic Machine Learning).

---

## I. SUPERVISED LEARNING (Học có giám sát)
Là phương pháp huấn luyện mô hình dựa trên tập dữ liệu đã có sẵn nhãn mục tiêu y (Ground Truth).

### 1. Linear Regression (Hồi quy tuyến tính)
* Khái niệm: Mô hình dự đoán biến mục tiêu liên tục y dựa trên mối quan hệ tuyến tính với các biến độc lập X.
* Phương trình đơn biến: y = w * x + b
  * w: Trọng số (weight / hệ số góc).
  * b: Hệ số chặn (bias / intercept).
* Hàm mất mát (Loss Function): Mean Squared Error (MSE) - Trung bình bình phương sai số. MSE phạt rất nặng các lỗi lớn do có phép bình phương.
* Chỉ số đánh giá: R-squared (R2 Score - Hệ số xác định). R2 nằm trong khoảng (-inf, 1], biểu thị tỷ lệ phần trăm phương sai của y được giải thích bởi các đặc trưng X.

### 2. Logistic Regression (Hồi quy Logistic)
* Khái niệm: Mô hình phân loại nhị phân (Binary Classification) tính xác suất đầu ra thuộc về lớp tích cực (lớp 1) qua hàm kích hoạt Sigmoid.
* Hàm kích hoạt Sigmoid: Nén mọi giá trị số thực z về khoảng xác suất (0, 1). Công thức: f(z) = 1 / (1 + e^-z).
* Hàm mất mát: Binary Cross-Entropy Loss (Log Loss). Hàm này tối ưu hóa việc phạt nặng các dự đoán xác suất lệch xa so với nhãn thực tế.
* Đường ranh giới quyết định (Decision Boundary): Là một siêu phẳng tuyến tính ngăn cách các lớp trong không gian đặc trưng.

### 3. Decision Tree (Cây quyết định)
* Khái niệm: Mô hình phân cấp thực hiện chia nhánh dữ liệu bằng các câu hỏi điều kiện.
* Tiêu chí phân nhánh (Splitting Criteria):
  * Gini Impurity (Độ vẩn đục Gini): Đo lường mức độ trộn lẫn của các lớp tại một node. Gini = 0 khi node hoàn toàn thuần khiết (chỉ chứa 1 lớp duy nhất).
  * Entropy & Information Gain (Độ tăng thông tin): Chọn đặc trưng phân chia sao cho làm giảm độ hỗn loạn thông tin (Entropy) của các node con nhiều nhất.
* Regularization (Tránh quá khớp): Giới hạn độ sâu tối đa (max_depth), số mẫu tối thiểu ở node lá (min_samples_leaf) hoặc thực hiện Pruning (Cắt tỉa nhánh thừa).

### 4. Random Forest (Rừng ngẫu nhiên)
* Khái niệm: Thuật toán Ensemble Learning sử dụng phương pháp Bagging (Bootstrap Aggregating) kết hợp nhiều cây quyết định độc lập.
* Nguyên lý hoạt động:
  * Bootstrap: Tạo ra các tập dữ liệu con bằng cách lấy mẫu ngẫu nhiên có lặp lại từ tập dữ liệu gốc.
  * Feature Randomness: Tại mỗi bước chia node, chỉ chọn lọc ngẫu nhiên một nhóm nhỏ các đặc trưng thay vì quét toàn bộ, giúp giảm độ tương quan giữa các cây.
  * Dự đoán: Lấy biểu quyết đa số (Majority Voting) cho bài toán phân loại, hoặc tính trung bình cộng (Average) cho bài toán hồi quy.
* Out-of-Bag (OOB) Score: Điểm đánh giá mô hình trực tiếp trên các mẫu dữ liệu không được chọn trong quá trình Bootstrap mà không cần chia tập Validation riêng.

---

## II. MODEL EVALUATION METRICS (Đánh giá Hiệu năng Mô hình)
Đo lường chất lượng dự đoán của mô hình phân loại trên các khía cạnh khác nhau.

* Confusion Matrix (Ma trận nhầm lẫn): Bảng thống kê các kết quả dự đoán True Positive (TP), True Negative (TN), False Positive (FP - Lỗi Loại I), và False Negative (FN - Lỗi Loại II).
* Accuracy (Độ chính xác tổng quát): Tỷ lệ số mẫu đoán đúng trên tổng số mẫu. Kém tin cậy khi dữ liệu bị mất cân bằng lớp (Imbalanced Data).
* Precision (Độ chính xác dự đoán): Tỷ lệ mẫu thực sự đúng trên các mẫu được mô hình gắn nhãn dương tính. Quan trọng khi cần giảm thiểu báo động giả (False Positive).
* Recall (Độ nhạy): Tỷ lệ mô hình quét trúng trên toàn bộ các mẫu dương tính thực tế. Quan trọng khi cần tránh bỏ sót mục tiêu (False Negative).
* F1-Score: Trung bình điều hòa (Harmonic Mean) giữa Precision và Recall, giúp cân bằng cả hai chỉ số.

---

## III. UNSUPERVISED LEARNING (Học không giám sát)
Huấn luyện mô hình trên dữ liệu không được gán nhãn mục tiêu y từ trước.

### 1. K-Means Clustering (Phân cụm K-Means)
* Khái niệm: Thuật toán phân nhóm dữ liệu dựa trên khoảng cách hình học tới các tâm cụm (Centroid).
* Thuật toán lặp: Gán điểm vào tâm gần nhất (khoảng cách Euclid) -> Cập nhật tâm mới bằng trung bình tọa độ các điểm trong cụm -> Lặp lại đến khi hội tụ.
* Tìm K tối ưu: Sử dụng phương pháp Elbow (Khuỷu tay) vẽ đồ thị tổng bình phương khoảng cách trong cụm (Inertia/WCSS) và chọn điểm gãy khúc.

### 2. PCA (Principal Component Analysis - Phân tích thành phần chính)
* Khái niệm: Thuật toán giảm chiều dữ liệu tuyến tính bằng cách chiếu dữ liệu sang không gian mới.
* Nguyên lý: Tìm các trục thành phần chính (Principal Components - PC) vuông góc với nhau sao cho dữ liệu chiếu lên các trục này giữ được phương sai (Variance) lớn nhất (giữ tối đa thông tin).
* Yêu cầu bắt buộc: Phải chuẩn hóa dữ liệu (Standardization) trước khi chạy PCA vì thuật toán rất nhạy cảm với thang đo của các đặc trưng.
