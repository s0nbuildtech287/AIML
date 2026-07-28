# Phần 7: Kỹ năng vận hành thực tế (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ các kỹ năng vận hành, bảo mật, tối ưu hóa chi phí và kiểm thử tự động hệ thống AI trong thực tế sản xuất (Production).

---

## I. AGENT FRAMEWORKS & CONTEXT MEMORY (Khung phát triển và Bộ nhớ ngữ cảnh)

### 1. LangChain & LangGraph
* LangChain: Thư viện cung cấp các Runnable abstraction để dễ dàng ghép nối Prompt, LLM, Vector DB và Output Parser thành chuỗi xử lý (LCEL - LangChain Expression Language) thông qua toán tử pipe |.
* LangGraph: Phần mở rộng của LangChain hỗ trợ thiết kế các hệ thống đa tác nhân (Multi-Agent) và chuỗi hội thoại có trạng thái (Stateful) dưới dạng đồ thị có chu trình (cho phép vòng lặp quay lại node trước).
  * State (Trạng thái): Đối tượng dữ liệu dùng chung truyền qua lại giữa các nút đồ thị để lưu giữ thông tin phiên làm việc.
  * Node: Hàm số Python thực thi một hành động và trả về cập nhật cho State.
  * Conditional Edge: Hàm rẽ nhánh điều hướng luồng đi của đồ thị dựa trên phán đoán của LLM tại nút trước.
  * Checkpointer / MemorySaver: Cơ chế lưu snapshot trạng thái đồ thị vào DB tại mỗi bước để hỗ trợ Human-in-the-loop (tạm dừng chờ con người phê duyệt).

### 2. Multi-turn Memory (Bộ nhớ hội thoại đa lượt)
* Stateless LLM API: Bản chất các cuộc gọi API LLM là phi trạng thái (không tự nhớ lịch sử). Lập trình viên phải đính kèm toàn bộ lịch sử trò chuyện cũ vào prompt của lượt gọi mới.
* Memory Types:
  * ConversationBufferMemory: Gửi toàn bộ lịch sử trò chuyện cũ thô. Gây phình to token cực nhanh khi trò chuyện kéo dài.
  * ConversationBufferWindowMemory: Chỉ giữ lại K lượt trò chuyện gần nhất, tự động cắt bỏ các tin nhắn cũ hơn để khống chế độ dài prompt.
  * ConversationSummaryMemory: Sử dụng một LLM phụ chạy tóm tắt nội dung hội thoại cũ thành một đoạn văn ngắn cô đọng để làm ngữ cảnh cho lượt chat mới, giúp tiết kiệm token đáng kể.

---

## II. SECURITY, COST & PERFORMANCE OPTIMIZATION (Bảo mật và Tối ưu chi phí)

### 1. Security & Guardrails (Bảo mật ứng dụng AI)
* Prompt Injection: Tấn công chèn các câu lệnh tinh vi vào input đầu vào để lừa mô hình bỏ qua hướng dẫn an toàn của System Prompt nhằm đánh cắp thông tin bảo mật hoặc ép AI nói nội dung cấm.
* Jailbreaking: Dẫn dắt LLM đóng vai các tình huống giả định để vượt qua các bộ lọc an toàn tích hợp sẵn của mô hình.
* Input & Output Guardrails: Các lớp kiểm soát tự động chạy song song trước (quét input chặn injection) và sau (quét output chặn rò rỉ API Key, mã độc hoặc dữ liệu cá nhân PII) khi gọi LLM.
* Llama Guard / NeMo Guardrails: Các mô hình và thư viện chuyên dụng dùng để phân loại mức độ an toàn của văn bản đầu vào/đầu ra.

### 2. Cost Optimization & Caching (Tối ưu chi phí)
* Prompt Caching: Cơ chế giảm giá sâu phí Input Token của các nhà cung cấp API nếu phần prompt gửi lên trùng khớp với tiền tố prompt của request trước đó (như System prompt dài hoặc context tài liệu RAG).
* Semantic Caching: Lưu cặp (Câu hỏi - Câu trả lời) cũ vào Vector DB. Khi có câu hỏi mới, so sánh khoảng cách vector; nếu góc tương đồng lớn hơn một ngưỡng quy định (ví dụ Cosine similarity > 0.95), hệ thống trả về kết quả cũ trực tiếp từ cache mà không cần gọi API LLM ngoài, tiết kiệm 100% chi phí.
* Model Routing: Phân tích độ khó của câu hỏi người dùng ở đầu vào để định tuyến: câu hỏi đơn giản chuyển cho mô hình nhỏ/rẻ (như Llama-3-8B, GPT-4o-mini), câu hỏi phức tạp cần lập luận sâu chuyển cho mô hình lớn (GPT-4o, Claude 3.5 Sonnet).

---

## III. AI TESTING & MULTI-MODAL PIPELINES (Kiểm thử và Đa phương thức)

* Golden Dataset: Bộ dữ liệu kiểm thử chuẩn chứa các câu hỏi mẫu tiêu biểu và các đáp án/tiêu chí chấm điểm đi kèm để đánh giá chất lượng prompt.
* Flaky Tests: Hiện tượng bài test chạy lúc PASS lúc FAIL trên cùng một phiên bản code do tính chất ngẫu nhiên (non-deterministic) của LLM.
* Mocking: Giả lập phản hồi của LLM API trong quá trình viết unit test để tránh tốn chi phí gọi mạng và hỗ trợ test offline.
* Multi-modal AI: Mô hình tiếp nhận đồng thời nhiều dạng dữ liệu đầu vào.
  * Image payload: Mã hóa file ảnh sang chuỗi Base64 để nhét vào request body HTTP POST gửi tới Vision LLM.
  * Whisper Audio Pipeline: File âm thanh thô được chuyển sang biểu đồ phổ tần số Log-Mel Spectrogram trước khi đưa vào Audio Encoder để trích xuất đặc trưng giọng nói phục vụ cho việc dịch thuật tự động.
