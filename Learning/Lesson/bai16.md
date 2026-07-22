# Bài 16: Prompt Engineering nâng cao

Mục tiêu bài học: Làm chủ các kỹ thuật Prompting nâng cao bao gồm Zero-shot, Few-shot, Chain-of-Thought và phương pháp thiết kế System Prompt tối ưu.

---

## 1. Zero-shot vs Few-shot Prompting

Mô hình ngôn ngữ lớn (LLM) là mô hình học theo ngữ cảnh (In-context learning). Cách chúng ta cung cấp ví dụ sẽ thay đổi hoàn toàn khả năng hiểu của mô hình.

* Zero-shot Prompting:
  - Yêu cầu mô hình thực hiện một tác vụ mà không đưa ra bất kỳ ví dụ minh họa nào.
  - Ví dụ: "Hãy dịch câu sau sang tiếng Anh: Tôi thích học lập trình."
  - Thích hợp cho các tác vụ đơn giản, quen thuộc mà LLM đã được học rất nhiều trong tập huấn luyện gốc.

* Few-shot Prompting:
  - Cung cấp cho mô hình một hoặc một vài ví dụ minh họa (cả đầu vào và đầu ra mẫu) trước khi đưa ra câu hỏi thực tế.
  - Ví dụ:
    Câu hỏi: Táo ➔ Trái cây
    Câu hỏi: Sắt ➔ Kim loại
    Câu hỏi: Cá rô ➔ [Mô hình sẽ tự điền: Loài cá]
  - Cực kỳ hữu dụng khi cần mô hình trả về định dạng đặc biệt, tuân thủ phong cách cụ thể, hoặc thực hiện các tác vụ phức tạp khó diễn tả bằng lời.

---

## 2. Chain-of-Thought (Chuỗi tư duy - CoT)

* Khái niệm:
  - Là kỹ thuật yêu cầu mô hình giải thích quy trình suy nghĩ từng bước trước khi đưa ra câu trả lời cuối cùng.
  - Cú pháp đơn giản nhất là thêm câu: "Hãy suy nghĩ từng bước một" (Let's think step by step) vào prompt.

* Tại sao CoT hiệu quả?
  - Giúp LLM phân rã một bài toán logic hoặc toán học phức tạp thành các bước tính toán nhỏ hơn.
  - LLM sinh từ theo cơ chế từ tiếp theo (next-token prediction). Khi cho phép mô hình viết ra các bước suy luận, các từ được sinh ra sau sẽ được thừa hưởng ngữ cảnh suy luận đúng ở phía trước, giúp tăng độ chính xác lên gấp nhiều lần.

---

## 3. Vai trò của System Prompt

Một cấu trúc prompt chuyên nghiệp trong ứng dụng phần mềm thường được chia làm 3 loại vai trò:
1. System Prompt (Lời nhắc hệ thống): Thiết lập cấu hình nền tảng, định hình tính cách, quy định định dạng đầu ra bắt buộc và các giới hạn bảo mật cho mô hình. Người dùng cuối thông thường không thể nhìn thấy hoặc chỉnh sửa trực tiếp.
2. User Prompt (Lời nhắc người dùng): Câu hỏi hoặc nội dung dữ liệu thực tế do người dùng nhập vào.
3. Assistant Response (Phản hồi của AI): Kết quả trả về của mô hình.
