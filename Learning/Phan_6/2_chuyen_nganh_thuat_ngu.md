# Phần 6: Tác nhân thông minh và Vận hành MLOps (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ kiến thức chuyên môn về Xây dựng AI Agent, Phục vụ API phục vụ mô hình, Đóng gói Docker, và Giám sát vận hành (MLOps).

---

## I. FUNCTION CALLING & AI AGENT PATTERNS (Gọi hàm và Tác nhân tự trị)

### 1. Function Calling (Gọi hàm ngoại vi)
* Khái niệm: Khai báo đặc tả (specification) của hàm Python dưới dạng JSON Schema gửi kèm request tới LLM. LLM tự động trích xuất các đối số cần thiết từ prompt người dùng và trả về cấu trúc JSON chứa tên hàm và giá trị tham số tương ứng.
* Nguyên lý: LLM không trực tiếp thực thi hàm. Phía backend ứng dụng chịu trách nhiệm nhận JSON, thực thi hàm vật lý và gửi lại kết quả (tool message) cho LLM để tổng hợp câu trả lời cuối cùng.
* Parallel Tool Calling: Khả năng của LLM cho ra đồng thời nhiều lệnh gọi hàm trong một lượt phản hồi để tăng hiệu năng xử lý song song.

### 2. AI Agent Loop (Vòng lặp ReAct)
* ReAct (Reasoning and Acting): Vòng lặp phản hồi của tác nhân AI kết hợp hai bước:
  * Thought (Suy nghĩ): LLM lập luận bước tiếp theo cần làm gì dựa trên trạng thái hiện tại.
  * Action (Hành động): LLM sinh ra lệnh gọi công cụ (Tool Call) để lấy thêm thông tin từ thế giới thực.
  * Observation (Quan sát): Đọc kết quả trả về từ công cụ để làm tiền đề cho lượt suy nghĩ tiếp theo.
* Infinite Loop Prevention (Chặn vòng lặp vô tận): Đặt giới hạn tham số số lượt lặp tối đa (max_iterations) hoặc thời gian chạy tối đa (timeout) để ngắt tiến trình Agent nếu công cụ gặp lỗi liên tục.

---

## II. MODEL SERVING & STREAMING (Phục vụ mô hình & Luồng truyền)

* FastAPI for AI: Framework Python bất đồng bộ hiệu năng cao sử dụng Pydantic để tự động xác thực dữ liệu đầu vào/đầu ra và tự động sinh tài liệu API Swagger.
* Server-Sent Events (SSE): Giao thức truyền phát một chiều thời gian thực từ Server về Client dựa trên kết nối HTTP mở dài hạn.
  * Content-Type: Phải khai báo text/event-stream ở header phản hồi.
  * Định dạng gói tin: data: [nội dung]\n\n
* Time to First Token (TTFT): Chỉ số đo lường thời gian từ lúc gửi prompt đến khi token đầu tiên hiển thị trên giao diện người dùng. Kỹ thuật streaming qua SSE giúp tối thiểu hóa chỉ số này, cải thiện đáng kể trải nghiệm người dùng (UX).

---

## III. DOCKER & CLOUD DEPLOYMENT (Đóng gói và Triển khai)

* Docker Containerization: Đóng gói toàn bộ mã nguồn, thư viện phụ thuộc (như PyTorch, OpenCV) và cấu hình hệ điều hành vào một Docker Image cô lập, giải quyết triệt để lỗi xung đột môi trường runtime giữa máy local và server production.
* docker-compose.yml: Tệp cấu hình YAML định nghĩa và phối hợp vận hành đa dịch vụ container chạy cùng nhau (ví dụ: container app FastAPI, container ChromaDB, container Redis cache).
* .dockerignore: Ngăn cản việc sao chép các thư mục thừa hoặc nhạy cảm (.env, .venv, git logs, checkpoint nặng) vào Docker Image để tối ưu kích thước image và bảo mật thông tin.
* GPU Passthrough (NVIDIA Container Toolkit): Cầu nối cho phép container Docker truy cập trực tiếp vào nhân phần cứng CUDA của card đồ họa NVIDIA vật lý trên máy chủ.

---

## IV. OBSERVABILITY & TRACING (Giám sát chuỗi gọi)

* Tracing: Theo dõi đường đi phân cấp (parent-child runs) của dữ liệu qua toàn bộ các module trong chuỗi RAG/Agent (đo thời gian chạy ở từng nút, hiển thị rõ prompt đầu vào và câu trả lời đầu ra của từng lượt gọi).
* LangSmith / Phoenix: Các nền tảng chuyên dụng thu thập log và trực quan hóa luồng chạy của LLM Application để phục vụ việc gỡ lỗi (debugging) và tối ưu hóa prompt.
* Token Tracking: Giám sát lượng prompt_tokens (đầu vào) và completion_tokens (đầu ra) tiêu thụ của từng cuộc gọi để kiểm soát chi phí hóa đơn API và phát hiện kịp thời các tình huống Agent bị lặp vô tận.
* Feedback Loop (Phản hồi người dùng): Liên kết đánh giá của người dùng cuối (nút Like/Dislike trên UI) trực tiếp vào ID của Trace chạy tương ứng để lọc nhanh các ca lỗi phục vụ cho việc tinh chỉnh hệ thống.
