# Bài 15: Kiến trúc Transformer - Sơ đồ hoạt động

Mục tiêu bài học: Nắm bắt kiến trúc tổng quan của Transformer, cơ chế Self-Attention và lý do tại sao nó thay thế hoàn toàn RNN/LSTM trong xử lý ngôn ngữ tự nhiên.

---

## 1. Tại sao Transformer lại vượt trội?

Transformer (được giới thiệu trong bài báo "Attention Is All You Need" năm 2017) loại bỏ hoàn toàn các vòng lặp tuần tự (RNN/LSTM).

Ưu điểm tuyệt đối:
- Song song hóa hoàn toàn (Parallelization): Do không xử lý tuần tự từng từ một mà nạp toàn bộ câu vào cùng một lúc, Transformer tận dụng tối đa GPU để tính toán song song, rút ngắn thời gian huấn luyện từ vài tuần xuống vài giờ.
- Xử lý ngữ cảnh cực xa: Cơ chế chú ý cho phép bất kỳ hai từ nào trong câu liên kết trực tiếp với nhau bất kể khoảng cách địa lý trong văn bản.

---

## 2. Các thành phần chính trong Transformer

* Tokenization & Embedding:
  - Tokenization: Cắt câu văn thành các đơn vị nhỏ hơn (từ hoặc cụm từ - gọi là Tokens).
  - Word Embedding: Chuyển các token thành các vector biểu diễn ngữ nghĩa.
  - Positional Encoding (Mã hóa vị trí): Vì nạp toàn bộ câu cùng lúc, mô hình mất khái niệm thứ tự từ. Positional Encoding cộng thêm một vector sóng sin/cos vào vector embedding để mô hình biết được từ này đứng ở vị trí thứ mấy trong câu.

* Self-Attention (Tự chú ý):
  - Giúp mỗi từ trong câu tự liên kết và hiểu mối quan hệ của nó với tất cả các từ còn lại trong chính câu đó.
  - Ví dụ: Trong câu "Con báo đuổi theo con mồi vì nó đói", cơ chế Self-Attention sẽ giúp từ "nó" liên kết mạnh nhất với từ "Con báo" (chỉ ra chủ thể).

* Khối Encoder - Decoder:
  - Encoder: Đọc câu đầu vào và trích xuất ngữ cảnh đa chiều dưới dạng ma trận số.
  - Decoder: Nhận ngữ cảnh từ Encoder và tự hồi quy (Auto-regressive) sinh ra từng từ đầu ra tiếp theo.
  - Các mô hình ngôn ngữ lớn (LLM) hiện nay như GPT là mô hình chỉ chứa các khối Decoder xếp chồng lên nhau (Decoder-only architecture).
