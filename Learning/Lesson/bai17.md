# Bài 17: Định dạng dữ liệu đầu ra (Structured Outputs) của LLM

Mục tiêu bài học: Hiểu lý do tại sao đầu ra văn bản tự do của LLM khó tích hợp vào phần mềm, nắm vững kỹ thuật ép định dạng JSON Schema và cách sử dụng thư viện Pydantic.

---

## 1. Vấn đề của đầu ra văn bản tự do

Mặc định, LLM trả về kết quả dưới dạng ngôn ngữ tự nhiên (văn bản thô). Khi xây dựng các ứng dụng phần mềm (ví dụ: hệ thống tự động phân tích đánh giá email khách hàng để đẩy vào cơ sở dữ liệu), việc nhận một đoạn văn bản thô như: "Chào bạn, sau khi phân tích tôi thấy email này có vẻ là phàn nàn..." là vô dụng vì code backend không thể tự phân tách (parse) thông tin một cách ổn định.

Chúng ta cần LLM trả về dữ liệu có cấu trúc chuẩn như JSON để code backend chạy `json.loads()` trực tiếp và lấy giá trị.

---

## 2. Kỹ thuật JSON Schema & API Structured Outputs

Các nhà cung cấp API LLM (như OpenAI, Anthropic, Gemini) hỗ trợ tính năng ép định dạng đầu ra (Structured Outputs):
- Chúng ta định nghĩa một cấu trúc dữ liệu mong muốn (JSON Schema) gồm các trường dữ liệu, kiểu dữ liệu (string, number, boolean) và các trường bắt buộc phải có.
- Gửi kèm Schema này khi gọi API.
- LLM sẽ tự động điều chỉnh xác suất sinh từ (Logit bias) ở lớp cuối cùng để đảm bảo các token sinh ra khớp 100% với cấu trúc cú pháp JSON đã khai báo. Mô hình sẽ không thể chèn thêm các câu chào hỏi tự do ngoài cấu trúc.

---

## 3. Khai báo Schema bằng Pydantic trong Python

Trong phát triển Python, Pydantic là thư viện kiểm định dữ liệu (data validation) tiêu chuẩn. Ta có thể khai báo cấu trúc trực quan bằng các class kế thừa BaseModel để truyền trực tiếp vào API của LLM.

```python
from pydantic import BaseModel, Field
from typing import List

class SentimentAnalysis(BaseModel):
    sentiment: str = Field(description="Sắc thái: Tích cực, Tiêu cực hoặc Trung lập")
    confidence_score: float = Field(description="Độ tự tin của dự đoán từ 0.0 đến 1.0")
    keywords: List[str] = Field(description="Danh sách các từ khóa chính rút gọn")
```

Khi tích hợp với API:
```python
# Ví dụ gọi OpenAI client
response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Sản phẩm dùng rất chán, nút bấm bị kẹt."}],
    response_format=SentimentAnalysis,
)
result = response.choices[0].message.parsed
print(result.sentiment) # Trả về: "Tiêu cực"
```
