# Phần 5: Kiến trúc RAG - Truy xuất thông tin (Góc nhìn trực quan & Trừu tượng)

Chào mừng bạn đến với thế giới của RAG (Retrieval-Augmented Generation) - giải pháp giúp LLM không bị ảo giác nhờ việc tra cứu tài liệu thực tế. Hãy tưởng tượng nhân viên tư vấn AI của quán sinh tố vừa nói chuyện với khách, vừa liên tục lật xem Sách công thức pha chế đặt ở quầy.

Dưới đây là cách hệ thống này hoạt động dưới dạng hình ảnh trực quan:

---

## 1. Embeddings – Xếp sách lên kệ theo chủ đề
* Ý nghĩa: Biến đổi ý nghĩa của từ/câu văn thành tọa độ số học (vector) để máy tính so khớp ngữ nghĩa.
* Hình ảnh trừu tượng: Bạn muốn sắp xếp hàng ngàn cuốn sách công thức đồ uống vào thư viện. Bạn xếp theo nguyên tắc: Các loại sinh tố hoa quả (bơ, xoài, dâu) ngọt mát nằm cạnh nhau ở kệ bên trái; Các loại cà phê đắng, trà nóng nằm cạnh nhau ở kệ bên phải. Khoảng cách địa lý giữa các cuốn sách chính là khoảng cách vector ngữ nghĩa (Cosine Similarity). Nhờ vậy, khi tìm kiếm, bạn chỉ cần đi thẳng đến đúng kệ sách liên quan.

---

## 2. Vector Database – Tủ hồ sơ thông minh
* Ý nghĩa: Cơ sở dữ liệu chuyên dụng để lưu trữ và truy vấn nhanh các vector tương đồng ngữ nghĩa lớn.
* Hình ảnh trừu tượng: Giống như một chiếc tủ tài liệu tự động ở quầy bar. Khi khách hỏi: *"Món gì uống mát, tốt cho da và không béo?"*, chiếc tủ tự động phân tích ý nghĩa câu hỏi và lập tức đẩy ra ngay 3 trang tài liệu về: Sinh tố cà chua ít đường, Sinh tố dâu tây hạt chia. Chiếc tủ tìm kiếm cực nhanh trên hàng triệu trang tài liệu chỉ trong vài phần nghìn giây.

---

## 3. Ingestion & Chunking – Cắt nhỏ sách công thức để đọc nhanh
* Ý nghĩa: Phân tách tài liệu dài thành các đoạn nhỏ (chunks) có đè chồng (overlap) trước khi nạp vào CSDL.
* Hình ảnh trừu tượng: Cuốn sách hướng dẫn vận hành chuỗi cửa hàng dày 500 trang. Nếu mỗi lần khách hỏi một câu ngắn, bạn bắt nhân viên AI phải đọc lại cả cuốn sách 500 trang đó, nhân viên sẽ bị quá tải (tràn cửa sổ ngữ cảnh), trả lời chậm và tốn phí token. Giải pháp là cắt cuốn sách ra thành từng trang hoặc từng món nước độc lập (Chunking), mỗi đoạn cắt có đè chồng thêm 2-3 dòng của đoạn trước (Overlap) để không bị mất chữ ở ranh giới cắt.

---

## 4. Advanced RAG (Re-ranking) – Quản lý quán lọc lại công thức
* Ý nghĩa: Sử dụng mô hình kiểm chéo sâu sắc hơn để xếp hạng lại danh sách tài liệu tìm được, loại bỏ các kết quả nhiễu.
* Hình ảnh trừu tượng: Khi tủ hồ sơ thông minh đẩy ra 20 trang tài liệu liên quan đến từ khóa "bơ". Trước khi đưa cho nhân viên AI đọc để trả lời khách, bạn (quản lý cửa hàng đóng vai trò Re-ranker) cầm 20 trang đó lên, đọc lướt nhanh và chọn lọc ra chính xác 3 trang mô tả đúng công thức bơ đặc biệt nhất để gửi đi, loại bỏ 17 trang mô tả lan man về cách trồng cây bơ.

---

## 5. RAG Evaluation – Giám sát chất lượng chống nói dối (ảo giác)
* Ý nghĩa: Chạy các bộ chỉ số tự động để đo lường xem câu trả lời của AI có chuẩn xác và dựa hoàn toàn vào tài liệu cung cấp hay không.
* Hình ảnh trừu tượng: Bạn là chủ quán sinh tố, bạn định kỳ chạy các bài kiểm tra sát hạch nhân viên AI:
  * Faithfulness (Độ trung thực): Câu trả lời của nhân viên có hoàn toàn được trích xuất từ sách công thức ra không, hay là tự chế thêm (ảo giác)?
  * Answer Relevance: Câu trả lời có giải quyết đúng thắc mắc của khách không, hay trả lời lạc đề?
  * Context Recall: Tủ hồ sơ có tìm đủ tài liệu cần thiết để trả lời câu hỏi của khách chưa?
