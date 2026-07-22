# Bài 26: Triển khai API phục vụ mô hình - FastAPI & Streaming SSE

Mục tiêu bài học: Nắm vững các bước xây dựng API hiệu năng cao cho ứng dụng AI bằng FastAPI, cơ chế Server-Sent Events (SSE) để truyền phát (stream) dữ liệu ký tự thời gian thực.

---

## 1. Tại sao chọn FastAPI cho ứng dụng AI?

FastAPI là framework web Python hiện đại, tốc độ cực nhanh nhờ hỗ trợ bất đồng bộ (Asynchronous programming với async/await) và tự động tạo tài liệu API tương tác chuẩn OpenAPI (Swagger UI).

Ưu điểm cho AI:
- Xử lý bất đồng bộ giúp FastAPI không bị nghẽn khi phải xử lý nhiều yêu cầu gọi mô hình AI hoặc API LLM cùng lúc.
- Sử dụng Pydantic để kiểm tra kiểu dữ liệu đầu vào và đầu ra cực kỳ chặt chẽ.

---

## 2. Cơ chế Streaming với Server-Sent Events (SSE)

Khi gọi API của LLM để sinh văn bản dài, mô hình có thể mất từ 10 đến 30 giây để hoàn thành toàn bộ câu trả lời. Nếu để người dùng chờ đợi trên màn hình trắng trơn trong suốt thời gian đó, trải nghiệm người dùng sẽ rất tệ.

Giải pháp: Server-Sent Events (SSE):
- Là giao thức truyền thông một chiều từ máy chủ (Server) đến máy khách (Client) thông qua một kết nối HTTP duy nhất được giữ mở.
- Máy chủ sẽ gửi dữ liệu theo từng gói nhỏ (từng token/ký tự của LLM ngay khi nó vừa được sinh ra) dạng luồng (Stream) dữ liệu.
- Client nhận được đến đâu sẽ hiển thị lên màn hình đến đó, tạo hiệu ứng chữ chạy mượt mà ngay lập tức cho người dùng giống như giao diện của ChatGPT.

Trong FastAPI, ta sử dụng lớp StreamingResponse để stream dữ liệu:
```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def generate_tokens():
    tokens = ["Tôi ", "đang ", "học ", "lập ", "trình ", "AI."]
    for token in tokens:
        yield f"data: {token}\n\n"
        await asyncio.sleep(0.3)

@app.get("/api/stream")
async def stream_response():
    return StreamingResponse(generate_tokens(), media_type="text/event-stream")
```
