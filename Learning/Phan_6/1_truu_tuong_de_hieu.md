# Phần 6: Tác nhân thông minh và Vận hành MLOps (Góc nhìn trực quan & Trừu tượng)

Chào mừng bạn đến với giai đoạn xây dựng hệ thống tự trị và vận hành ứng dụng thực tế. Hãy tưởng tượng chúng ta chế tạo một Robot quản lý tự động hoàn toàn cho quán sinh tố. Robot này không chỉ biết nói chuyện mà còn tự biết làm việc, kiểm tra kho và đặt hàng khi thiếu.

Dưới đây là cách hệ thống này hoạt động dưới góc nhìn trực quan:

---

## 1. Function Calling (Gọi hàm) – Robot điều khiển máy móc ngoại vi
* Ý nghĩa: LLM phân tích ý định của người dùng và xuất ra lệnh gọi các công cụ phần mềm (API, Database) tương ứng dưới dạng JSON để backend thực thi.
* Hình ảnh trừu tượng: Khi khách bảo: *"Đặt cho tôi 1 cốc sinh tố dâu"* hoặc *"Kiểm tra đơn hàng DH102 giao chưa"*. Robot AI không thể tự chạy đi làm cốc nước hay tự đọc cơ sở dữ liệu. Thay vào đó, nó xuất ra một lệnh JSON gửi cho máy pha chế tự động hoặc phần mềm POS. Sau khi máy pha chế chạy xong báo *"Đã làm xong"*, Robot AI đọc kết quả đó và vui vẻ báo lại với khách hàng.

---

## 2. AI Agents (Tác nhân tự trị) – Robot tự lên kế hoạch và xử lý công việc
* Ý nghĩa: Hệ thống AI sử dụng vòng lặp suy nghĩ và hành động (ReAct) để tự chọn công cụ, tự lập kế hoạch và sửa lỗi để đạt được mục tiêu cuối cùng.
* Hình ảnh trừu tượng: Bạn giao nhiệm vụ cho Robot AI: *"Hãy chuẩn bị nguyên liệu bơ cho ngày mai"*. Robot tự vận hành:
  * Thought (Nghĩ): Đầu tiên cần biết ngày mai thời tiết thế nào để ước tính lượng khách. Tôi sẽ gọi tool dự báo thời tiết.
  * Action (Làm): Gọi weather_api("Hà Nội", "2026-07-29").
  * Observation (Quan sát): Kết quả trả về là nắng nóng 39 độ.
  * Thought (Nghĩ): Nắng nóng thì khách sẽ đông gấp đôi. Cần tối thiểu 50kg bơ. Tôi phải kiểm tra kho xem còn bao nhiêu bơ.
  * Action (Làm): Gọi check_inventory("bơ").
  * Observation (Quan sát): Kho chỉ còn 10kg bơ.
  * Thought (Nghĩ): Vậy thiếu 40kg bơ. Tôi phải tự động gọi điện đặt hàng từ nhà vườn.
  * Action (Làm): Gọi order_fruit("Nhà vườn Lam", "bơ", 40).
  Robot tự hoàn thành công việc mà không cần bạn phải chỉ dẫn từng bước If-Else.

---

## 3. Serve API & SSE – Dòng chảy chữ mượt mà như người gõ
* Ý nghĩa: Đóng gói logic AI thành các cổng kết nối API (FastAPI) và truyền dữ liệu dạng luồng (Server-Sent Events) về giao diện người dùng.
* Hình ảnh trừu tượng: Khi khách hàng trò chuyện với Robot AI qua màn hình điện thoại. Thay vì Robot ngồi im lặng trong 15 giây rồi đột ngột hiện ra cả một trang giấy chữ dài (khiến khách nghĩ app bị đơ), Robot sử dụng cơ chế truyền phát SSE để hiển thị chữ chạy ra mượt mà từng từ một ngay lập tức, mang lại trải nghiệm trò chuyện vô cùng sinh động.

---

## 4. Docker & Cloud – Hộp container di động chạy mọi nơi ổn định
* Ý nghĩa: Đóng gói toàn bộ mã nguồn, thư viện và cấu hình hệ điều hành vào một container cô lập để deploy lên server internet.
* Hình ảnh trừu tượng: Môi trường cài đặt AI rất phức tạp, dễ bị lỗi đụng độ phiên bản thư viện. Docker giống như việc bạn đóng gói toàn bộ quán sinh tố tự động của bạn vào một chiếc thùng container tiêu chuẩn. Bạn có thể đặt chiếc container này ở bất kỳ đâu (máy tính cá nhân của bạn, máy chủ đám mây AWS, hay Render), quán sinh tố đều tự động mở cửa hoạt động trơn tru và giống hệt nhau mà không bao giờ gặp lỗi lệch hệ điều hành.

---

## 5. Tracing & Observability – Camera giám sát hành trình của Robot
* Ý nghĩa: Ghi lại vết chi tiết đường đi của luồng xử lý AI để kiểm tra, đo đạc độ trễ và debug lỗi prompt.
* Hình ảnh trừu tượng: Khi khách hàng phàn nàn robot phục vụ nhầm món. Bạn mở camera giám sát (sử dụng công cụ Tracing như LangSmith) để xem lại lịch sử từng bước chạy của Robot: Robot đã nghe câu lệnh gì, đã phân tích thế nào, gọi tool nào bị lỗi. Nhờ đó bạn tìm ra đúng chỗ robot bị đơ để sửa đổi prompt hoặc nâng cấp công cụ.
