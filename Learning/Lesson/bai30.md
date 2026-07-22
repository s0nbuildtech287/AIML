# Bài 30: Multi-turn Conversation & Memory Management - Quản lý bộ nhớ hội thoại

Mục tiêu bài học: Hiểu cách quản lý lịch sử hội thoại đa lượt, phân biệt bộ nhớ ngắn hạn và dài hạn, và xử lý vấn đề tràn ngưỡng context window.

---

## 1. Vấn đề cốt lõi: LLM không có bộ nhớ tự nhiên

LLM về bản chất là stateless (phi trạng thái). Mỗi lần gọi API là một cuộc hội thoại hoàn toàn mới, mô hình không nhớ bất kỳ điều gì từ lần gọi trước. Để xây chatbot có thể nhớ ngữ cảnh hội thoại, lập trình viên phải tự chèn lịch sử vào prompt mỗi lần gọi.

---

## 2. Short-term Memory - Bộ nhớ ngắn hạn (Buffer)

Cách đơn giản nhất: lưu toàn bộ lịch sử hội thoại trong bộ nhớ RAM và chèn vào prompt mỗi lần.

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

llm = ChatOpenAI(model="gpt-4o-mini")

# Lịch sử hội thoại là một danh sách các messages
chat_history = [
    SystemMessage(content="Bạn là trợ lý học tập AI/ML thân thiện.")
]

def chat(user_input: str) -> str:
    # Thêm tin nhắn mới của người dùng vào lịch sử
    chat_history.append(HumanMessage(content=user_input))
    
    # Gọi LLM với toàn bộ lịch sử
    response = llm.invoke(chat_history)
    
    # Lưu phản hồi của AI vào lịch sử
    chat_history.append(AIMessage(content=response.content))
    
    return response.content

# Thử nghiệm hội thoại đa lượt
print(chat("Gradient Descent là gì?"))
print(chat("Cho tôi ví dụ về nó."))  # AI sẽ nhớ ngữ cảnh câu hỏi trước
```

Hạn chế: Lịch sử ngày càng dài, chi phí token tăng tuyến tính, và sẽ vượt context window của mô hình.

---

## 3. Xử lý tràn Context Window - Kỹ thuật cắt cụt

Khi lịch sử quá dài, cần có chiến lược giữ lại thông tin quan trọng nhất:

Chiến lược 1 - Window Buffer (Giữ N tin nhắn gần nhất):
```python
MAX_MESSAGES = 10  # Chỉ giữ 10 cặp hội thoại gần nhất

def trim_history(history: list) -> list:
    # Luôn giữ SystemMessage ở đầu
    system_msg = history[0]
    # Chỉ lấy MAX_MESSAGES tin nhắn cuối cùng
    recent_msgs = history[-MAX_MESSAGES:]
    return [system_msg] + recent_msgs
```

Chiến lược 2 - Summarization (Tóm tắt lịch sử cũ):
```python
# Khi lịch sử dài, gọi LLM tóm tắt lại thành 1 đoạn ngắn
def summarize_history(old_history: list) -> str:
    summary_prompt = f"Tóm tắt ngắn gọn cuộc hội thoại này trong 3 câu: {old_history}"
    return llm.invoke(summary_prompt).content
```

---

## 4. Long-term Memory - Bộ nhớ dài hạn (Lưu vào DB)

Bộ nhớ ngắn hạn mất đi khi tắt server. Để chatbot nhớ người dùng qua nhiều phiên làm việc, cần lưu trữ vào cơ sở dữ liệu.

Hai loại thông tin cần lưu dài hạn:
- Thông tin hồ sơ người dùng: Tên, sở thích, ngữ cảnh nghề nghiệp.
- Sự kiện quan trọng trong lịch sử: Quyết định, thông tin đặt hàng.

```python
import json

# Giả lập lưu bộ nhớ người dùng vào file JSON (thực tế dùng Redis hoặc PostgreSQL)
def save_user_memory(user_id: str, memory: dict):
    with open(f"memory_{user_id}.json", "w") as f:
        json.dump(memory, f, ensure_ascii=False)

def load_user_memory(user_id: str) -> dict:
    try:
        with open(f"memory_{user_id}.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

# Sử dụng
memory = load_user_memory("user_001")
# memory = {"name": "Xuân Sơn", "learning_goal": "AI Engineer", "level": "Intermediate"}
```

---

## 5. Semantic Memory với Vector DB

Kỹ thuật nâng cao: Lưu toàn bộ hội thoại cũ vào Vector DB. Khi người dùng hỏi, truy xuất những đoạn hội thoại liên quan nhất từ DB thay vì chèn toàn bộ lịch sử vào prompt.

Luồng hoạt động:
1. Lưu mỗi tin nhắn vào Vector DB với embedding.
2. Khi nhận câu hỏi mới, tìm kiếm top 5 đoạn hội thoại liên quan nhất.
3. Chèn 5 đoạn đó vào prompt như một phần ngữ cảnh.

Ưu điểm: Có thể nhớ lịch sử dài hàng tháng mà không tốn thêm token.
