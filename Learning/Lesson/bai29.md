# Bài 29: LangChain & LangGraph - Xây dựng ứng dụng AI dạng chuỗi và đồ thị

Mục tiêu bài học: Hiểu cách dùng LangChain để xây chuỗi xử lý (Chain) và LangGraph để xây Agent có trạng thái phức tạp.

---

## 1. LangChain là gì và tại sao cần nó?

Khi xây ứng dụng AI thực tế, bạn thường cần ghép nối nhiều bước lại với nhau:
- Nhận câu hỏi từ người dùng.
- Tìm kiếm tài liệu liên quan trong Vector DB.
- Đưa tài liệu + câu hỏi vào LLM.
- Trả kết quả về.

Nếu code thủ công, bạn phải tự quản lý việc truyền dữ liệu giữa các bước, xử lý lỗi, và logging. LangChain cung cấp một bộ khung chuẩn hóa (LCEL - LangChain Expression Language) để ghép nối các thành phần này thành một Pipeline gọn gàng.

---

## 2. LCEL - Cú pháp chuỗi với toán tử |

LangChain sử dụng toán tử pipe | để ghép các thành phần lại thành chuỗi, dữ liệu chảy từ trái sang phải:

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Định nghĩa template prompt
prompt = ChatPromptTemplate.from_template("Giải thích khái niệm {topic} trong 2 câu ngắn gọn.")

# Khởi tạo mô hình
llm = ChatOpenAI(model="gpt-4o-mini")

# Ghép chuỗi: prompt -> LLM -> parser
chain = prompt | llm | StrOutputParser()

# Gọi chuỗi
result = chain.invoke({"topic": "Gradient Descent"})
print(result)
```

Cách đọc chuỗi trên:
1. prompt nhận dict và render thành ChatMessage có nội dung đầy đủ.
2. llm nhận ChatMessage và gọi API trả về AIMessage.
3. StrOutputParser trích xuất chuỗi text thuần từ AIMessage.

---

## 3. RAG Chain đầy đủ với LangChain

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.runnables import RunnablePassthrough

# Tải Vector DB đã lưu trên đĩa
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# Template cho RAG
prompt = ChatPromptTemplate.from_template("""
Trả lời câu hỏi dựa CHÍNH XÁC vào ngữ cảnh dưới đây.
Nếu không tìm thấy thông tin, hãy nói "Tôi không có thông tin này".

Ngữ cảnh: {context}
Câu hỏi: {question}
""")

# Chuỗi RAG hoàn chỉnh
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

answer = rag_chain.invoke("Chính sách bảo hành sản phẩm là bao lâu?")
```

---

## 4. LangGraph - Agent có trạng thái phức tạp

LangChain phù hợp với chuỗi tuyến tính. Khi cần Agent có thể rẽ nhánh điều kiện, lặp lại hoặc có bộ nhớ trạng thái phức tạp hơn, ta dùng LangGraph.

LangGraph mô hình hóa Agent như một Đồ thị có hướng (Directed Graph):
- Node (Nút): Mỗi bước xử lý (gọi LLM, gọi tool, kiểm tra điều kiện).
- Edge (Cạnh): Đường đi giữa các nút, có thể là điều kiện.
- State (Trạng thái): Dữ liệu được truyền qua toàn bộ đồ thị.

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

# Định nghĩa kiểu trạng thái
class AgentState(TypedDict):
    messages: list
    next_action: str

# Khởi tạo đồ thị
graph = StateGraph(AgentState)

# Thêm các nút xử lý
graph.add_node("call_llm", call_llm_function)
graph.add_node("use_tool", use_tool_function)

# Thêm cạnh có điều kiện: nếu LLM quyết định dùng tool thì sang nút use_tool, ngược lại kết thúc
graph.add_conditional_edges("call_llm", should_use_tool, {"tool": "use_tool", "end": END})

# Biên dịch đồ thị thành ứng dụng có thể chạy
app = graph.compile()
```

---

## 5. Khi nào dùng LangChain vs LangGraph?

- Dùng LangChain (LCEL) khi luồng xử lý tuyến tính: Input -> Bước 1 -> Bước 2 -> Output.
- Dùng LangGraph khi cần: Agent lặp lại nhiều bước, rẽ nhánh theo điều kiện, hoặc cần trạng thái phức tạp theo dõi xuyên suốt nhiều cuộc hội thoại.
