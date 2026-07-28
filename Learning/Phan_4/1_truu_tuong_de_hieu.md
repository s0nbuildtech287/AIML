# Phần 4: Mô hình ngôn ngữ và Tinh chỉnh (Góc nhìn trực quan & Trừu tượng)

Chào mừng bạn đến với giai đoạn làm việc trực tiếp với Mô hình ngôn ngữ lớn (LLM) và các kỹ thuật tùy biến chuyên sâu. Hãy tưởng tượng chúng ta đang tuyển dụng và đào tạo một Nhân viên tư vấn khách hàng AI cho quán sinh tố.

Dưới đây là cách chúng ta thiết lập và nâng cấp năng lực cho nhân viên AI này:

---

## 1. Prompt Engineering – Hướng dẫn nhân viên làm việc
* Ý nghĩa: Thiết kế câu lệnh đầu vào tối ưu để dẫn dắt LLM giải quyết bài toán nghiệp vụ mà không cần huấn luyện lại mô hình.
* Hình ảnh trừu tượng: Bạn tuyển một nhân viên mới đã có sẵn kiến thức xã hội rộng lớn (nhân viên AI). Thay vì đổi lại não họ, bạn viết một bản hướng dẫn công việc rõ ràng:
  * System Prompt: "Hãy đóng vai nhân viên lễ tân vô cùng lịch sự và chu đáo."
  * Few-shot: Đưa ra 3 ví dụ mẫu về cách trả lời khách hàng khi bị phàn nàn.
  * Chain-of-Thought (CoT): Dạy nhân viên: *"Khi khách hỏi, hãy nghĩ xem khách có bị dị ứng gì không, kiểm tra nguyên liệu còn không, rồi mới gợi ý món cụ thể"*.

---

## 2. Structured Output – Xuất hóa đơn đúng chuẩn phần mềm
* Ý nghĩa: Ép buộc LLM trả lời đúng định dạng cấu trúc định sẵn (như JSON khớp Schema) để các hệ thống code backend xử lý tự động dễ dàng.
* Hình ảnh trừu tượng: Khi khách hàng gọi món bằng ngôn ngữ nói tự nhiên: *"Cho tôi một cốc sinh tố bơ nhiều sữa đá xay nhuyễn"*. Bạn không muốn nhân viên AI viết một đoạn văn dài dòng kể chuyện pha chế. Bạn ép nhân viên AI phải viết thông tin vào một tờ phiếu gọi món đúng chuẩn cấu trúc:
  ```json
  {
    "mon_an": "Sinh tố bơ",
    "nguyen_lieu_phu": "Sữa đặc",
    "da": "đá xay nhuyễn"
  }
  ```
  Nếu tờ phiếu này viết sai định dạng, máy pha chế tự động ở quầy bar sẽ bị lỗi không chạy được.

---

## 3. PEFT LoRA – Khóa học ngắn hạn cho nhân viên
* Ý nghĩa: Tinh chỉnh hiệu quả tham số bằng cách đóng băng mô hình gốc và chỉ huấn luyện thêm các ma trận bổ trợ có dung lượng rất nhẹ.
* Hình ảnh trừu tượng: Bạn tuyển một nhân viên AI xuất sắc đã biết giao tiếp tiếng Việt thành thạo (Mô hình nền tảng gốc). Bây giờ, bạn muốn nhân viên này nắm vững menu đặc biệt của riêng quán sinh tố của bạn.
  * Full Fine-tuning (Truyền thống): Bắt nhân viên này đi học lại từ đầu toàn bộ sách giáo khoa tiểu học, trung học để liên kết kiến thức mới (cực kỳ tốn kém và mất thời gian).
  * LoRA (Hiện đại): Bạn đóng băng toàn bộ kiến thức cũ của nhân viên đó. Bạn chỉ gửi họ đi học một khóa đào tạo ngắn hạn 2 ngày chuyên sâu về menu quán của bạn (huấn luyện thêm adapter LoRA siêu nhẹ). Nhân viên học rất nhanh, tốn ít chi phí và phục vụ được ngay lập tức.
