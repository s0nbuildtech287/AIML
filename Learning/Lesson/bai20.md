# Bài 20: Kỹ thuật RAG - Tiền xử lý dữ liệu văn bản (Ingestion & Chunking)

Mục tiêu bài học: Hiểu kiến trúc tổng quan của Retrieval-Augmented Generation (RAG), các chiến lược phân tách văn bản (Chunking) và quy trình nạp dữ liệu (Ingestion Pipeline).

---

## 1. Tại sao cần RAG?

Mô hình ngôn ngữ lớn (LLM) có các hạn chế:
- Kiến thức bị đóng băng tại thời điểm hoàn thành huấn luyện (Knowledge cutoff).
- Không có quyền truy cập vào nguồn dữ liệu nội bộ bảo mật của doanh nghiệp.
- Dễ bị hiện tượng ảo giác (Hallucination - bịa đặt thông tin tự tin).

RAG (Retrieval-Augmented Generation - Thế dữ liệu tăng cường truy xuất) giải quyết vấn đề này bằng cách:
1. Khi người dùng đặt câu hỏi, hệ thống sẽ đi tìm kiếm (Retrieve) các đoạn văn bản liên quan nhất từ kho tài liệu nội bộ.
2. Gộp câu hỏi của người dùng và các đoạn tài liệu tìm được vào một prompt.
3. Gửi prompt này cho LLM. LLM sẽ đọc hiểu tài liệu và trả lời câu hỏi dựa trên các bằng chứng thực tế đó, loại bỏ ảo giác và cập nhật thông tin mới nhất.

---

## 2. Kỹ thuật chia nhỏ văn bản (Chunking)

Chúng ta không thể gửi cả một cuốn sách PDF hàng nghìn trang cho LLM vì vượt quá giới hạn ngữ cảnh (Context limit) và cực kỳ tốn chi phí token. Do đó, tài liệu cần được cắt nhỏ thành các mảnh (Chunks) tối ưu trước khi nạp vào Vector DB.

Các chiến lược Chunking phổ biến:
- Fixed-size Chunking (Cắt theo độ dài cố định): Cắt văn bản theo một số lượng ký tự cố định (ví dụ: 500 ký tự) và thiết lập khoảng đè chồng (Overlap, ví dụ: 50 ký tự) giữa hai chunk liên tiếp để tránh mất ngữ cảnh ở ranh giới cắt.
- Recursive Character Chunking: Cắt thông minh dựa trên các ký tự phân tách tự nhiên như dấu xuống dòng (\n\n, \n), dấu chấm câu (.), dấu phẩy (,), giúp giữ nguyên cấu trúc ngữ pháp của câu.
- Semantic Chunking (Cắt theo ngữ nghĩa): Phân tích vector embedding của từng câu văn và thực hiện cắt khi phát hiện hướng vector thay đổi đột ngột (chuyển sang chủ đề khác).

---

## 3. Quy trình Ingestion Pipeline

Quy trình nạp dữ liệu chuẩn gồm 4 bước:
1. Load: Đọc và trích xuất text từ các định dạng file thô (PDF, Word, HTML, Markdown).
2. Split (Chunking): Chia nhỏ text thành các chunk.
3. Embed: Gọi API để biến đổi các chunk text thành các vector embedding.
4. Store: Lưu trữ các vector và nội dung text tương ứng vào cơ sở dữ liệu Vector DB.
