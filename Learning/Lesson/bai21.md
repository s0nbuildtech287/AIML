# Bài 21: Kỹ thuật RAG nâng cao - Tối ưu hóa truy xuất với LangChain/LlamaIndex

Mục tiêu bài học: Nắm bắt các hạn chế của RAG cơ bản, cơ chế xếp hạng lại (Re-ranking) và cách sử dụng LangChain/LlamaIndex để xây dựng RAG nâng cao.

---

## 1. Hạn chế của RAG cơ bản (Naive RAG)

Hệ thống RAG cơ bản thường gặp lỗi ở 2 khâu:
- Truy xuất sai (Retrieval failure): Tìm kiếm vector dựa trên Cosine Similarity thô đôi khi trả về các chunk chứa từ ngữ giống nhau nhưng ngữ nghĩa thực tế không liên quan, hoặc bỏ sót các tài liệu quan trọng chứa từ đồng nghĩa.
- Tổng hợp kém (Generation failure): LLM nhận được quá nhiều thông tin rác từ các chunk được gửi kèm, dẫn đến bị loãng ngữ cảnh hoặc bị hiện tượng "Lost in the Middle" (chỉ chú ý thông tin ở đầu và cuối prompt, bỏ quên thông tin ở giữa).

---

## 2. Kỹ thuật xếp hạng lại (Re-ranking)

Để giải quyết lỗi trên, ta tích hợp thêm bộ lọc Re-ranker:
- Giai đoạn 1 (Retrieve): Sử dụng Vector DB tìm nhanh ra Top 20 hoặc 50 chunk liên quan nhất dựa trên khoảng cách vector (tốc độ cực nhanh nhưng độ chính xác ngữ nghĩa ở mức trung bình).
- Giai đoạn 2 (Re-rank): Đưa câu hỏi và Top 50 chunk này qua một mô hình Re-ranker chuyên dụng (Cross-Encoder, ví dụ: Cohere Re-rank, BGE-Reranker). Mô hình này sẽ tính toán chi tiết sự liên quan chéo giữa câu hỏi và từng chunk để sắp xếp lại vị trí và chỉ lọc ra Top 3 đến 5 chunk có điểm chất lượng cao nhất đưa vào prompt của LLM.
Kỹ thuật này giúp cải thiện đáng kể độ chính xác của câu trả lời và giảm chi phí token gửi cho LLM.

---

## 3. Vai trò của LangChain & LlamaIndex

LangChain và LlamaIndex là hai framework phát triển ứng dụng AI hàng đầu hiện nay:
- LangChain: Cung cấp các chuỗi liên kết (Chains), các công cụ đóng gói prompt, quản lý lịch sử chat và tích hợp với hàng trăm dịch vụ bên ngoài, rất phù hợp khi xây dựng các ứng dụng AI có luồng logic phức tạp, Agent đa dụng.
- LlamaIndex: Tập trung tối đa vào việc kết nối, lập chỉ mục (Indexing) và truy xuất dữ liệu tối ưu, là công cụ số một khi mục tiêu chính của dự án là xây dựng hệ thống RAG tìm kiếm trên kho tài liệu khổng lồ của doanh nghiệp.
