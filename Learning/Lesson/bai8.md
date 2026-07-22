# Bài 8: Đánh giá hiệu năng mô hình (Model Evaluation Metrics)

Mục tiêu bài học: Nắm vững các chỉ số đánh giá mô hình phân loại và hồi quy, hiểu rõ cơ chế hoạt động của Confusion Matrix và kỹ thuật kiểm thử chéo Cross-Validation.

---

## 1. Đánh giá bài toán Phân loại (Classification Metrics)

Để đánh giá một mô hình phân loại, chúng ta không thể chỉ dựa vào độ chính xác chung (Accuracy), đặc biệt khi tập dữ liệu bị mất cân bằng (ví dụ: phát hiện giao dịch gian lận chiếm tỷ lệ 0.1% dữ liệu).

* Ma trận nhầm lẫn (Confusion Matrix):
  Bảng thống kê so sánh giữa Nhãn thực tế và Nhãn dự đoán của mô hình:
  - True Positive (TP): Thực tế là 1, Dự đoán là 1 (Đúng).
  - True Negative (TN): Thực tế là 0, Dự đoán là 0 (Đúng).
  - False Positive (FP - Lỗi Loại I): Thực tế là 0, Dự đoán là 1 (Sai - Báo động giả).
  - False Negative (FN - Lỗi Loại II): Thực tế là 1, Dự đoán là 0 (Sai - Bỏ sót).

* Các chỉ số đánh giá chính:
  - Accuracy (Độ chính xác tổng): (TP + TN) / Tổng số mẫu.
  - Precision (Độ chuẩn xác): TP / (TP + FP). Tỷ lệ dự đoán đúng lớp 1 trên tổng số ca được dự đoán là 1. Rất quan trọng khi giá trị của cảnh báo sai (FP) là đắt đỏ.
  - Recall (Độ thu hồi / Độ nhạy): TP / (TP + FN). Tỷ lệ tìm được lớp 1 trên tổng số ca thực tế là 1. Rất quan trọng khi giá trị của việc bỏ sót (FN) là cực kỳ nguy hiểm (ví dụ: phát hiện ung thư).
  - F1-Score: Điểm số trung bình điều hòa của Precision và Recall, giúp đánh giá cân bằng:
    F1 = 2 * (Precision * Recall) / (Precision + Recall)

---

## 2. Đánh giá bài toán Hồi quy (Regression Metrics)

* Mean Absolute Error (MAE - Sai số tuyệt đối trung bình):
  Tính trung bình độ lệch tuyệt đối giữa dự đoán và thực tế. Đơn giản, dễ giải thích.

* Root Mean Squared Error (RMSE - Căn sai số bình phương trung bình):
  Tính căn bậc hai của trung bình các sai số bình phương. RMSE phạt nặng các sai số lớn do phép bình phương, rất nhạy cảm với các lỗi lớn của mô hình.

* R-squared (R² - Hệ số xác định):
  Đo tỷ lệ phương sai của biến mục tiêu được giải thích bởi mô hình. R² nằm trong khoảng (-vô cùng, 1]:
  - R² = 1: Dự đoán hoàn hảo.
  - R² = 0: Dự đoán chỉ tương đương với lấy giá trị trung bình của tập dữ liệu làm kết quả.
  - R² < 0: Dự đoán tệ hơn cả lấy giá trị trung bình.

---

## 3. Kiểm thử chéo K-Fold Cross-Validation

Nếu chỉ chia dữ liệu thành 1 tập Train và 1 tập Test (Hold-out), kết quả đánh giá mô hình có thể bị lệch hoặc may rủi do cách chia ngẫu nhiên.

K-Fold Cross-Validation giải quyết vấn đề này bằng cách:
1. Chia toàn bộ tập dữ liệu gốc thành K phần bằng nhau (gọi là các folds).
2. Chạy huấn luyện K lần. Trong mỗi lần lặp, lấy 1 fold làm tập kiểm thử (Validation) và K-1 folds còn lại làm tập huấn luyện (Train).
3. Kết quả đánh giá cuối cùng là giá trị trung bình cộng của chỉ số đo lường qua K lần chạy.
Điều này giúp đảm bảo độ ổn định và khách quan của kết quả kiểm thử.
