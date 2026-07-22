# Bài 7: Các mô hình cây - Decision Tree & Random Forest

Mục tiêu bài học: Hiểu cách cây quyết định phân chia dữ liệu, nắm bắt khái niệm Ensemble Learning và thuật toán Random Forest.

---

## 1. Cây quyết định (Decision Tree)

Cây quyết định là mô hình trực quan học cách đưa ra dự đoán bằng cách phân chia dữ liệu thành các nhánh dựa trên câu hỏi điều kiện Đúng/Sai (If-Else).

* Cấu trúc cây:
  - Gốc (Root Node): Điểm bắt đầu chứa toàn bộ dữ liệu, là đặc trưng quan trọng nhất được chọn để phân chia đầu tiên.
  - Nút điều kiện (Decision Node): Các nút trung gian thực hiện các câu hỏi điều kiện trên các đặc trưng để rẽ nhánh.
  - Lá (Leaf Node): Nút cuối cùng chứa nhãn dự đoán (trong phân loại) hoặc giá trị số trung bình (trong hồi quy).

* Tiêu chí phân chia nhánh:
  Cây quyết định chọn thuộc tính để chia nhánh sao cho dữ liệu ở các nhánh con sau khi chia đạt độ đồng nhất (độ tinh khiết - purity) cao nhất. Các chỉ số đo lường độ tinh khiết gồm:
  - Chỉ số Gini Impurity (Độ vẩn đục Gini): Càng gần 0 nghĩa là dữ liệu trong nhóm càng đồng nhất.
  - Entropy (Thông tin hỗn loạn): Đo mức độ không chắc chắn của thông tin.

* Nhược điểm của Decision Tree:
  Rất dễ bị quá khớp (Overfitting) khi cây phát triển quá sâu, ghi nhớ toàn bộ nhiễu của tập dữ liệu huấn luyện khiến kết quả trên tập kiểm thử bị kém đi.

---

## 2. Ensemble Learning (Học máy kết hợp)

Ensemble Learning là phương pháp kết hợp nhiều mô hình học máy cơ bản để tạo ra một mô hình tổng hợp mạnh mẽ hơn, tăng tính tổng quát và giảm sai số dự đoán.
Hai kỹ thuật Ensemble chính:
1. Bagging (Bootstrap Aggregating): Huấn luyện song song nhiều mô hình độc lập trên các phần dữ liệu con ngẫu nhiên được lấy mẫu từ tập gốc. Kết quả cuối cùng là bầu chọn số đông (phân loại) hoặc tính trung bình (hồi quy).
2. Boosting: Huấn luyện tuần tự các mô hình, mô hình sau tập trung sửa lỗi sai của mô hình trước đó (ví dụ: Gradient Boosting, XGBoost).

---

## 3. Thuật toán Random Forest (Rừng ngẫu nhiên)

Random Forest là thuật toán Bagging tiêu biểu, xây dựng một rừng gồm hàng trăm cây quyết định độc lập.

* Cách thức hoạt động:
  - Lấy mẫu dữ liệu ngẫu nhiên có lặp lại (Bootstrap Sampling) để tạo tập huấn luyện riêng cho mỗi cây.
  - Tại mỗi bước phân chia nhánh của cây, chỉ chọn ngẫu nhiên một nhóm nhỏ các đặc trưng thay vì xem xét toàn bộ các đặc trưng (Feature Randomness).
  - Khi cần dự đoán một mẫu dữ liệu mới, Random Forest cho tất cả các cây chạy dự đoán độc lập, sau đó lấy đa số phiếu bầu (Majority Vote) để đưa ra kết quả cuối cùng.

Nhờ sự ngẫu nhiên hóa kép này, Random Forest khắc phục triệt để nhược điểm Overfitting của cây quyết định đơn lẻ và có độ ổn định cực cao.
