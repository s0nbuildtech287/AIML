# Bài 32: Cost Optimization & Semantic Caching - Tối ưu chi phí AI

Mục tiêu bài học: Hiểu cách tính toán và kiểm soát chi phí API, áp dụng Semantic Caching để giảm số lần gọi API, và lựa chọn mô hình phù hợp theo từng tác vụ.

---

## 1. Cách tính chi phí API LLM

Chi phí sử dụng LLM tính theo số lượng token (đơn vị nhỏ hơn từ, khoảng 0.75 từ/token tiếng Anh).

Ví dụ giá của OpenAI (tham khảo, giá thay đổi theo thời gian):
- GPT-4o: $5 / 1 triệu input token + $15 / 1 triệu output token.
- GPT-4o-mini: $0.15 / 1 triệu input token + $0.60 / 1 triệu output token.
- text-embedding-3-small: $0.02 / 1 triệu token.

Ước tính chi phí thực tế:
- Mỗi cuộc hội thoại RAG trung bình: 2000 input token (prompt + ngữ cảnh) + 300 output token.
- 1000 cuộc hội thoại/ngày x (2300 token / 1 triệu) x $5 = $11.5 / ngày = $345 / tháng.

```python
# Theo dõi token sử dụng trong mỗi lần gọi
response = llm.invoke(messages)

# Truy cập thông tin usage trong response
print(response.usage_metadata)
# {'input_tokens': 1850, 'output_tokens': 312, 'total_tokens': 2162}
```

---

## 2. Chiến lược chọn model phù hợp (Model Routing)

Không phải tác vụ nào cũng cần GPT-4o. Dùng model nhỏ hơn cho tác vụ đơn giản có thể giảm chi phí 10-30 lần.

```python
def route_to_model(task_type: str, user_input: str) -> str:
    # Tác vụ đơn giản: tóm tắt, phân loại, trả lời FAQ
    if task_type in ["classify", "summarize", "faq"]:
        model = "gpt-4o-mini"
    # Tác vụ phức tạp: lập luận nhiều bước, code generation
    elif task_type in ["reasoning", "code", "analysis"]:
        model = "gpt-4o"
    # Tác vụ chỉ cần tìm kiếm: không cần gọi LLM nếu câu trả lời đã cache
    else:
        model = "gpt-4o-mini"
    
    return ChatOpenAI(model=model).invoke(user_input).content
```

---

## 3. Semantic Caching - Tái sử dụng câu trả lời tương đồng

Đây là kỹ thuật mạnh nhất để giảm chi phí. Ý tưởng:
- Lưu cache câu hỏi + câu trả lời vào Vector DB.
- Khi có câu hỏi mới, kiểm tra xem có câu hỏi nào trong cache có ngữ nghĩa tương đồng (độ tương đồng > 0.95) không.
- Nếu có: trả về câu trả lời đã cache, không gọi API.
- Nếu không: gọi API bình thường, lưu kết quả vào cache.

```python
import numpy as np
from langchain_openai import OpenAIEmbeddings

embeddings_model = OpenAIEmbeddings()

# Giả lập bộ nhớ cache đơn giản (thực tế dùng Redis + pgvector)
cache = []

def cosine_similarity(a: list, b: list) -> float:
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def semantic_cache_get(query: str, threshold: float = 0.95):
    query_vec = embeddings_model.embed_query(query)
    for item in cache:
        sim = cosine_similarity(query_vec, item["embedding"])
        if sim >= threshold:
            print(f"Cache hit! Similarity: {sim:.3f}")
            return item["answer"]
    return None

def semantic_cache_set(query: str, answer: str):
    cache.append({
        "query": query,
        "embedding": embeddings_model.embed_query(query),
        "answer": answer
    })

def cached_chat(user_input: str) -> str:
    # Kiểm tra cache trước
    cached = semantic_cache_get(user_input)
    if cached:
        return cached  # Tiết kiệm hoàn toàn chi phí API
    
    # Gọi API nếu không có trong cache
    answer = llm.invoke(user_input).content
    semantic_cache_set(user_input, answer)
    return answer
```

Ví dụ hiệu quả của cache:
- Câu đã cache: "Chính sách đổi trả là gì?"
- Câu hỏi mới: "Tôi muốn hoàn trả sản phẩm, thủ tục ra sao?"
- Độ tương đồng Cosine: 0.97 > 0.95 - Cache hit, không tốn tiền.

---

## 4. Tối ưu Prompt để giảm token

```python
# Thay vì prompt dài dòng:
bad_prompt = """Bạn là một trợ lý AI thông minh và thân thiện. 
Nhiệm vụ của bạn là phân tích cảm xúc của văn bản dưới đây.
Hãy xem xét kỹ lưỡng từng từ và xác định xem đoạn văn bản đó 
mang cảm xúc tích cực, tiêu cực hay trung tính."""

# Dùng prompt ngắn, súc tích hơn (ít token hơn ~60%):
good_prompt = "Phân tích cảm xúc (Tích cực/Tiêu cực/Trung tính): {text}"

# Dùng structured output để tránh output dài thừa
# Thay vì để LLM giải thích dài dòng, ép trả về JSON ngắn
```

---

## 5. Monitoring chi phí theo thời gian thực

```python
# Tích hợp theo dõi chi phí vào callback của LangChain
from langchain_community.callbacks import get_openai_callback

with get_openai_callback() as cb:
    result = chain.invoke({"question": "RAG là gì?"})
    print(f"Token tiêu tốn: {cb.total_tokens}")
    print(f"Chi phí: ${cb.total_cost:.6f}")
```
