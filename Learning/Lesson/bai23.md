# Bài 23: Gọi hàm (Function Calling) & Sử dụng Công cụ (Tool Use)

Mục tiêu bài học: Hiểu cơ chế hoạt động của Function Calling, cách định nghĩa đặc tả JSON cho hàm và quy trình tích hợp các công cụ ngoại vi vào LLM.

---

## 1. Function Calling là gì?

Mặc định, LLM không thể tương tác trực tiếp với thế giới bên ngoài (không thể truy vấn cơ sở dữ liệu SQL, không thể gửi email, không thể tự chạy tính toán chính xác hoặc gọi API thời tiết).

Function Calling là tính năng cho phép lập trình viên khai báo danh sách các hàm Python có sẵn trong hệ thống cho LLM biết. LLM sẽ tự động nhận diện câu hỏi của người dùng và quyết định xem có cần sử dụng hàm nào hay không. Nếu cần, LLM sẽ trả về một chuỗi JSON chứa tên hàm và các tham số truyền vào phù hợp, thay vì trả về văn bản thông thường.

---

## 2. Quy trình 4 bước của Function Calling

1. Khai báo (Declare): Lập trình viên gửi câu hỏi kèm theo mô tả chi tiết của các hàm (tên hàm, chức năng, danh sách tham số và kiểu dữ liệu dưới dạng JSON Schema) cho LLM.
2. Quyết định (Decide): LLM phân tích câu hỏi. Nếu phát hiện cần gọi hàm, LLM sẽ tạm dừng sinh câu trả lời tự nhiên và trả về một yêu cầu gọi hàm (Tool Call) chứa JSON tham số (ví dụ: `{"name": "get_weather", "arguments": {"location": "Hanoi"}}`).
3. Thực thi (Execute): Code backend của bạn nhận chuỗi JSON này, tự động chạy hàm `get_weather("Hanoi")` thực tế trên server để lấy kết quả (ví dụ: `{"temp": "28C", "condition": "Sunny"}`).
4. Phản hồi (Respond): Backend gửi kết quả của hàm quay trở lại cho LLM. LLM đọc kết quả và tổng hợp thành câu trả lời tự nhiên bằng ngôn ngữ bình thường gửi cho người dùng: "Thời tiết tại Hà Nội hôm nay là 28 độ C và có nắng."

---

## 3. Cách mô tả hàm bằng JSON Schema

Khi khai báo công cụ, phần mô tả (description) của hàm và của từng tham số cực kỳ quan trọng vì LLM dựa vào các đoạn mô tả này để hiểu khi nào nên dùng hàm và trích xuất đúng tham số từ câu nói của người dùng.

```json
{
  "name": "calculate_loan",
  "description": "Tính toán số tiền phải trả hàng tháng cho khoản vay ngân hàng",
  "parameters": {
    "type": "object",
    "properties": {
      "amount": {
        "type": "number",
        "description": "Tổng số tiền vay (ví dụ: 100000000)"
      },
      "interest_rate": {
        "type": "number",
        "description": "Lãi suất năm dưới dạng số thực (ví dụ: 0.08 cho 8%)"
      }
    },
    "required": ["amount", "interest_rate"]
  }
}
```
