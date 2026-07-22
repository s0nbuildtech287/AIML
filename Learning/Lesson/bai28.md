# Bài 28: Giám sát và Tracing hệ thống AI trong vận hành

Mục tiêu bài học: Hiểu tầm quan trọng của giám sát hệ thống LLM trong thực tế và cách tích hợp công cụ Tracing chuyên dụng LangSmith để kiểm tra chi tiết các bước xử lý của Agent và RAG.

---

## 1. Tại sao cần Giám sát & Tracing ứng dụng LLM?

Khi đưa ứng dụng Chatbot RAG hoặc AI Agent ra phục vụ người dùng thực tế, hệ thống sẽ gặp rất nhiều lỗi ẩn khó debug:
- Tại sao câu trả lời này bị sai hoặc lạc đề? Lỗi do bước tìm kiếm tài liệu (Retrieval) lấy sai chunk hay do LLM đọc hiểu sai?
- Tại sao thời gian phản hồi của cuộc hội thoại mất tới 10 giây? Bước nào trong chuỗi xử lý (truy vấn Vector DB, gọi API LLM, hay gọi tool ngoài) đang gây nghẽn cổ chai (bottleneck)?
- Chi phí token hàng tháng đang bị tiêu tốn nhiều nhất ở API nào?

Tracing là kỹ thuật ghi nhật ký chi tiết hành trình của một yêu cầu đi qua toàn bộ các bước trong hệ thống AI, giúp lập trình viên kiểm tra sâu từng tham số đầu vào/đầu ra của mọi lời gọi mô hình.

---

## 2. Công cụ Tracing chuyên dụng: LangSmith

LangSmith (được phát triển bởi đội ngũ sáng lập LangChain) là nền tảng SaaS hàng đầu phục vụ việc tracing, giám sát và kiểm thử các ứng dụng LLM.

Các tính năng nổi bật:
- Visual Tracing (Bản đồ vết trực quan): Vẽ sơ đồ cây hiển thị thời gian chạy, số lượng token tiêu tốn, prompt chi tiết và kết quả trả về của từng thành phần (Chain, Tool, LLM) trong chuỗi.
- Playground: Cho phép bạn sửa nhanh prompt trực tiếp trên web của LangSmith và chạy thử nghiệm lại ngay vết lỗi đó mà không cần sửa code chạy lại backend.
- Feedback Collection: Thu thập đánh giá từ người dùng (như nút like/dislike) gắn kèm với vết hội thoại để lọc ra các cuộc hội thoại lỗi cần cải tiến prompt.

---

## 3. Cách tích hợp LangSmith vào ứng dụng Python

Việc tích hợp cực kỳ đơn giản vì LangSmith tự động lắng nghe luồng xử lý dưới nền thông qua các biến môi trường hệ thống. Bạn không cần sửa đổi bất kỳ dòng code logic nào của LangChain.

Chỉ cần cấu hình các biến môi trường trước khi chạy ứng dụng:
```bash
export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY="lsv2_pt_xxxx..."
export LANGCHAIN_PROJECT="my-ai-app"
```

Khi máy chủ khởi chạy, mọi thao tác gọi xích (Chains), gọi LLM hay truy vấn Vector DB sẽ tự động được gửi trace an toàn về giao diện quản lý Cloud của LangSmith để bạn debug thời gian thực.
