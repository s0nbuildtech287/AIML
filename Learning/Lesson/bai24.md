# Bài 24: AI Agent Patterns - Reasoning & Action Loop

Mục tiêu bài học: Hiểu khái niệm AI Agent, kiến trúc suy luận ReAct và cách thiết lập vòng lặp tự quyết định của tác nhân thông minh.

---

## 1. AI Agent là gì?

Khác với chatbot thông thường chỉ phản hồi thụ động theo câu hỏi, Tác nhân AI (AI Agent) là một thực thể thông minh có khả năng:
- Tự động lập kế hoạch (Planning) để giải quyết một mục tiêu phức tạp do người dùng giao cho.
- Tự động lựa chọn và sử dụng nhiều công cụ (Tools) phối hợp.
- Có khả năng tự đánh giá kết quả từ công cụ và điều chỉnh kế hoạch tiếp theo (Feedback loop) cho đến khi đạt được mục tiêu cuối cùng.

---

## 2. Kiến trúc ReAct (Reasoning + Acting)

ReAct là một trong những thiết kế Agent phổ biến nhất, kết hợp giữa khả năng suy luận (Reasoning) và hành động (Acting) trong một vòng lặp liên tục:

Vòng lặp ReAct gồm 3 trạng thái lặp đi lặp lại:
1. Suy nghĩ (Thought): LLM phân tích trạng thái hiện tại của nhiệm vụ và tự đặt câu hỏi: "Tôi cần phải làm gì tiếp theo?". Nó viết ra suy luận của mình.
2. Hành động (Action): Dựa trên suy nghĩ, LLM quyết định gọi một công cụ cụ thể (ví dụ: tìm kiếm internet hoặc tra cứu DB) và trả về tham số gọi.
3. Quan sát (Observation): Hệ thống thực thi công cụ và trả về kết quả cho LLM đọc. LLM quan sát kết quả này để tự đánh giá: "Thông tin này đã đủ để trả lời chưa? Nếu chưa, tôi cần hành động gì tiếp theo?".

Chu kỳ này lặp lại liên tục. Khi LLM quyết định thông tin đã đủ, nó sẽ đưa ra câu trả lời cuối cùng (Final Answer) cho người dùng.

---

## 3. Quản lý trạng thái (State) của Agent

Khi Agent chạy vòng lặp ReAct phức tạp gồm nhiều bước (ví dụ: lặp 5-10 lần mới ra kết quả), việc lưu giữ bộ nhớ trạng thái (State Management) là cực kỳ quan trọng để Agent không bị lặp vô hạn (infinite loop) hoặc quên mất mục tiêu ban đầu.

Các thư viện như LangGraph hoặc các framework Agent chuyên dụng giúp xây dựng mô hình Agent dưới dạng một Đồ thị có hướng (Directed Graph) nơi mỗi bước suy nghĩ, hành động là một nút (Node) và việc chuyển đổi giữa các nút được kiểm soát bởi các điều kiện logic chặt chẽ.
