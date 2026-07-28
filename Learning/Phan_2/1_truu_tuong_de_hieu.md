# Phần 2: Học máy cổ điển (Góc nhìn trực quan & Trừu tượng)

Chào mừng bạn đến với giai đoạn tiếp theo của lộ trình AI. Sau khi đã làm sạch và sơ chế nguyên liệu, hãy tưởng tượng chúng ta bắt đầu xây dựng chiến lược kinh doanh cho quán sinh tố thông qua việc phân loại và tìm kiếm khách hàng tiềm năng.

Dưới đây là cách các mô hình học máy cổ điển giúp quán hoạt động thông minh:

---

## 1. Linear Regression (Hồi quy tuyến tính) – Dự đoán giá theo size cốc
* Ý nghĩa: Dự đoán một giá trị số thực liên tục dựa trên xu hướng thay đổi thẳng của các thuộc tính đầu vào.
* Hình ảnh trừu tượng: Bạn muốn đặt giá bán cho các size cốc sinh tố. Bạn thấy rằng dung tích cốc càng tăng thì giá tiền tăng theo một tỷ lệ rất đều đặn (đường thẳng đi lên). Hồi quy tuyến tính giúp bạn vẽ đường thẳng đó để khi có một size cốc mới lạ (ví dụ size siêu khổng lồ), bạn chỉ cần chiếu lên đường thẳng là biết ngay nên bán giá bao nhiêu.

---

## 2. Logistic Regression (Hồi quy Logistic) – Khách có mua hay không?
* Ý nghĩa: Quyết định phân loại dữ liệu vào các nhóm nhị phân (chỉ có hai lựa chọn: Có hoặc Không, 1 hoặc 0).
* Hình ảnh trừu tượng: Khi một người đi ngang qua quán sinh tố, bạn muốn dự đoán xem họ có ghé vào mua hay không dựa trên các đặc điểm như: thời tiết, họ có đang đi chậm không, họ có nhìn vào quán không. Kết quả đầu ra chỉ có hai trạng thái rõ ràng: Có mua (1) hoặc Không mua (0).

---

## 3. Decision Tree (Cây quyết định) – Sơ đồ phán đoán If-Else
* Ý nghĩa: Chia nhánh dữ liệu dựa trên các câu hỏi điều kiện If-Else tuần tự để đưa ra kết quả cuối cùng.
* Hình ảnh trừu tượng: Giống như một hướng dẫn viên bán hàng sơ đồ cho nhân viên mới:
  * Nếu khách hàng là Nữ:
    * Nếu dưới 25 tuổi -> Giới thiệu Sinh tố dâu tây.
    * Nếu trên 25 tuổi -> Giới thiệu Sinh tố bơ ít đường.
  * Nếu khách hàng là Nam -> Giới thiệu Cà phê cốt dừa.
  Mô hình này cực kỳ dễ nhìn và dễ giải thích cho bất kỳ ai.

---

## 4. Random Forest (Rừng ngẫu nhiên) – Biểu quyết của hội đồng nhân viên
* Ý nghĩa: Kết hợp kết quả dự đoán của hàng trăm cây quyết định độc lập để đưa ra kết quả chính xác nhất, chống quá khớp (overfitting).
* Hình ảnh trừu tượng: Thay vì chỉ tin vào phán đoán của một nhân viên bán hàng duy nhất (dễ bị chủ quan, sai lệch), bạn tổ chức cuộc họp biểu quyết cho toàn bộ 10 nhân viên trong quán. Mỗi người có một suy đoán riêng (một cây quyết định). Ý kiến nào nhận được đa số biểu quyết của hội đồng sẽ là quyết định cuối cùng của quán. Điều này giúp giảm thiểu tối đa các sai sót cá nhân.

---

## 5. Model Evaluation (Đánh giá mô hình) – Kỳ thi sát hạch nhân viên
* Ý nghĩa: Các chỉ số đo lường xem mô hình dự đoán chuẩn xác ở mức độ nào để tối ưu hóa thuật toán.
* Hình ảnh trừu tượng: Bạn muốn kiểm tra xem nhân viên tư vấn đoán sở thích khách hàng chuẩn không. Bạn chấm điểm:
  * Accuracy: Tổng số khách đoán đúng vị trên tổng số khách phục vụ.
  * Precision: Trong số các khách nhân viên hô to là thích ngọt, bao nhiêu người thực sự thích ngọt (tránh báo động nhầm).
  * Recall: Nhân viên có bỏ sót khách hàng thích ngọt nào mà không tư vấn không (tránh bỏ sót mục tiêu).

---

## 6. K-Means & PCA (Phân cụm & Giảm chiều) – Gom nhóm khách hàng & Rút gọn khảo sát
* Ý nghĩa: Gom nhóm tự động dữ liệu không nhãn và chiếu giảm số thuộc tính thừa để dễ vẽ biểu đồ phân tích.
* Hình ảnh trừu tượng:
  * Gom cụm (K-Means): Bạn có dữ liệu của 1000 khách quen nhưng không biết phân nhóm thế nào. Thuật toán tự động gom họ thành các nhóm có thói quen giống nhau (Ví dụ: Nhóm học sinh thích giá rẻ uống chiều tối, Nhóm văn phòng thích healthy uống buổi sáng) để bạn có chính sách khuyến mãi riêng.
  * Giảm chiều (PCA): Khách hàng điền phiếu khảo sát gồm 50 câu hỏi. Để vẽ lên biểu đồ phân tích 2D cho dễ nhìn, PCA giúp bạn gom 50 câu hỏi đó lại chỉ còn 2 chỉ số cốt lõi nhất: Khả năng chi tiêu và Mức độ quan tâm sức khỏe.
