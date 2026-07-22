# Bài 34: Multi-modal AI - Xử lý hình ảnh, âm thanh và tài liệu phức tạp

Mục tiêu bài học: Hiểu cách tích hợp Vision API để phân tích hình ảnh, dùng Whisper để chuyển đổi giọng nói thành văn bản, và xây dựng ứng dụng AI đa phương thức.

---

## 1. Vision AI - Phân tích hình ảnh với LLM

Các model đa phương thức như GPT-4o, Gemini 1.5, Claude 3 có thể đọc hiểu hình ảnh cùng với văn bản trong cùng một lần gọi API.

Các use case thực tế phổ biến:
- Đọc và trích xuất thông tin từ hóa đơn, hợp đồng, giấy tờ scan.
- Phân tích ảnh sản phẩm để mô tả hoặc kiểm tra chất lượng.
- Nhận diện biểu đồ, sơ đồ kỹ thuật và giải thích nội dung.
- Hỗ trợ người dùng nhập ảnh chụp màn hình lỗi để debug.

```python
import base64
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-4o")

def analyze_image_from_file(image_path: str, question: str) -> str:
    # Đọc ảnh và chuyển sang base64
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode("utf-8")
    
    # Tạo message chứa cả text và ảnh
    message = HumanMessage(content=[
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}
        },
        {
            "type": "text",
            "text": question
        }
    ])
    
    return llm.invoke([message]).content

# Ví dụ 1: Đọc hóa đơn
result = analyze_image_from_file(
    "invoice.jpg",
    "Trích xuất thông tin: tên sản phẩm, số lượng, đơn giá, tổng tiền. Trả về dạng JSON."
)

# Ví dụ 2: Phân tích biểu đồ
result = analyze_image_from_file(
    "sales_chart.png",
    "Mô tả xu hướng trong biểu đồ này. Tháng nào có doanh số cao nhất và thấp nhất?"
)
```

---

## 2. Phân tích ảnh từ URL (không cần tải về)

```python
def analyze_image_from_url(image_url: str, question: str) -> str:
    message = HumanMessage(content=[
        {
            "type": "image_url",
            "image_url": {"url": image_url}
        },
        {
            "type": "text",
            "text": question
        }
    ])
    return llm.invoke([message]).content

# Phân tích ảnh sản phẩm trực tiếp từ URL
result = analyze_image_from_url(
    "https://example.com/product.jpg",
    "Sản phẩm này có khuyết điểm nào không? Mô tả màu sắc và tình trạng."
)
```

---

## 3. Whisper - Chuyển đổi giọng nói thành văn bản (Speech-to-Text)

Whisper là model ASR (Automatic Speech Recognition) mã nguồn mở của OpenAI, hỗ trợ hơn 90 ngôn ngữ bao gồm tiếng Việt.

```python
import openai

# Sử dụng Whisper API (nhanh, không cần GPU)
def transcribe_audio(audio_file_path: str) -> str:
    with open(audio_file_path, "rb") as audio_file:
        transcript = openai.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            language="vi"  # Chỉ định ngôn ngữ tiếng Việt để tăng độ chính xác
        )
    return transcript.text

# Ví dụ: Ghi chú cuộc họp tự động
transcript = transcribe_audio("meeting_recording.mp3")
print(transcript)  # "Chúng ta cần hoàn thành tính năng RAG trước ngày 15..."

# Bước tiếp theo: Dùng LLM tóm tắt bản ghi âm
summary_chain = prompt_template | llm
summary = summary_chain.invoke({"transcript": transcript, "task": "Tóm tắt điểm chính và action items"})
```

---

## 4. Xây dựng Pipeline Multi-modal hoàn chỉnh

Ứng dụng thực tế: Chatbot hỗ trợ kỹ thuật có thể nhận cả ảnh chụp màn hình lỗi lẫn câu hỏi văn bản.

```python
from fastapi import FastAPI, UploadFile, File, Form
import shutil

app = FastAPI()

@app.post("/support-chat")
async def support_chat(
    message: str = Form(...),
    image: UploadFile = File(None)  # Ảnh là tùy chọn
):
    if image:
        # Lưu tạm ảnh và phân tích
        temp_path = f"temp_{image.filename}"
        with open(temp_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        
        # Phân tích ảnh kết hợp với câu hỏi của người dùng
        context = analyze_image_from_file(temp_path, "Mô tả lỗi hoặc vấn đề trong ảnh này.")
        full_message = f"Người dùng nói: {message}\nThông tin từ ảnh: {context}"
    else:
        full_message = message
    
    # Gọi LLM trả lời
    response = support_chain.invoke({"question": full_message})
    return {"answer": response.content}
```

---

## 5. OCR nâng cao - Đọc tài liệu PDF phức tạp

Đối với tài liệu PDF có cả bảng, biểu đồ và văn bản (không thể dùng text extraction thông thường):

```python
# Dùng thư viện pdf2image để chuyển từng trang PDF thành ảnh
from pdf2image import convert_from_path

def extract_pdf_with_vision(pdf_path: str) -> str:
    pages = convert_from_path(pdf_path, dpi=200)
    full_text = []
    
    for i, page_image in enumerate(pages):
        # Lưu từng trang thành ảnh tạm
        page_path = f"page_{i}.jpg"
        page_image.save(page_path, "JPEG")
        
        # Dùng Vision LLM để đọc nội dung trang
        page_content = analyze_image_from_file(
            page_path,
            "Trích xuất toàn bộ văn bản trong trang này, bao gồm cả nội dung trong bảng."
        )
        full_text.append(f"--- Trang {i+1} ---\n{page_content}")
    
    return "\n\n".join(full_text)
```
