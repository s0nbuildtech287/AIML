# Bài 14: Dữ liệu chuỗi thời gian & Text - Từ RNN/LSTM đến Attention

Mục tiêu bài học: Nắm bắt kiến trúc mạng tuần tự RNN/LSTM để xử lý dữ liệu dạng chuỗi, hiểu hạn chế của chúng và ý tưởng đột phá của cơ chế Attention.

---

## 1. Mạng tuần tự RNN và LSTM

Dữ liệu văn bản (câu chữ) hay chuỗi thời gian (giá cổ phiếu) là dữ liệu có thứ tự trước sau (Sequential data). Mạng MLP và CNN thông thường xử lý các phần tử độc lập và không có khái niệm bộ nhớ để lưu giữ ngữ cảnh từ các từ phía trước.

* Mạng RNN (Recurrent Neural Network):
  - RNN xử lý chuỗi bằng cách truyền trạng thái ẩn (Hidden state) từ bước thời gian này sang bước thời gian tiếp theo, đóng vai trò như một bộ nhớ ngắn hạn.
  - Nhược điểm: Khi chuỗi quá dài (ví dụ: câu văn dài hơn 50 từ), RNN gặp hiện tượng triệt tiêu đạo hàm (Vanishing Gradient), khiến nó quên mất thông tin ở đầu câu.

* Mạng LSTM (Long Short-Term Memory):
  - Khắc phục lỗi của RNN bằng cách bổ sung thêm Trạng thái ô (Cell state) đi dọc qua chuỗi và các cổng kiểm soát (Gate: Forget gate, Input gate, Output gate).
  - Các cổng quyết định thông tin nào cần xóa đi, thông tin nào cần giữ lại, giúp ghi nhớ ngữ cảnh rất xa.

---

## 2. Cơ chế chú ý (Attention Mechanism)

Mặc dù LSTM giải quyết được chuỗi dài trung bình, nó vẫn gặp hiện tượng nghẽn thông tin (Bottleneck) khi phải nén toàn bộ ngữ cảnh câu văn dài vào một vector có kích thước cố định ở cuối câu trước khi dịch.

Ý tưởng đột phá của Attention:
- Thay vì chỉ nhìn vào từ cuối cùng, mô hình được phép nhìn lại (truy cập) toàn bộ các trạng thái ẩn (hidden states) của tất cả các từ trong câu đầu vào tại mọi bước dịch.
- Mô hình tính toán một Trọng số chú ý (Attention Weight) để xác định mức độ liên quan của từng từ đầu vào đối với từ đang cần dịch ở đầu ra.
- Ví dụ: Khi dịch từ "học sinh", mô hình sẽ tập trung cao độ (attention weight cao) vào từ "student" trong câu tiếng Anh gốc thay vì các từ khác.
Cơ chế này loại bỏ hoàn toàn hiện tượng nghẽn thông tin và mở đường cho kỷ nguyên Transformer.
