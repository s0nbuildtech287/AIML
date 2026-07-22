# Bài 33: AI App Testing & CI/CD - Kiểm thử và triển khai tự động

Mục tiêu bài học: Hiểu cách viết unit test cho prompt AI, thực hiện regression testing khi đổi model, và tự động hóa kiểm thử trong CI/CD pipeline.

---

## 1. Tại sao kiểm thử AI App khó hơn phần mềm thông thường?

Với phần mềm truyền thống, kết quả của một hàm là xác định: f(2+2) luôn trả về 4.

Với LLM, kết quả là phi xác định: cùng một prompt, LLM có thể trả về câu trả lời khác nhau mỗi lần gọi. Điều này khiến việc dùng assertEqual truyền thống không thể áp dụng. Ta cần dùng LLM-as-a-judge để chấm điểm chất lượng câu trả lời.

---

## 2. Viết Unit Test cho Prompt

```python
import pytest
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# Mô hình và chain cần test
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)  # temperature=0 cho kết quả ổn định hơn
prompt = ChatPromptTemplate.from_template("Phân tích cảm xúc của câu sau (Tích cực/Tiêu cực/Trung tính): {text}")
chain = prompt | llm

class TestSentimentChain:
    
    def test_positive_sentiment(self):
        result = chain.invoke({"text": "Sản phẩm tuyệt vời, tôi rất hài lòng!"}).content.lower()
        assert "tích cực" in result or "positive" in result
    
    def test_negative_sentiment(self):
        result = chain.invoke({"text": "Hàng kém chất lượng, giao hàng chậm kinh khủng."}).content.lower()
        assert "tiêu cực" in result or "negative" in result
    
    def test_neutral_sentiment(self):
        result = chain.invoke({"text": "Sản phẩm được giao vào thứ Ba."}).content.lower()
        assert "trung tính" in result or "neutral" in result
    
    def test_response_format(self):
        # Kiểm tra output không quá dài (chỉ cần nhãn, không cần giải thích)
        result = chain.invoke({"text": "Tôi thích ăn phở."}).content
        assert len(result) < 100  # Câu trả lời phải ngắn gọn
```

---

## 3. LLM-as-a-Judge - Dùng AI chấm điểm AI

Khi câu trả lời cần đánh giá chất lượng phức tạp hơn, ta dùng một LLM mạnh hơn làm giám khảo.

```python
def llm_judge(question: str, expected_criteria: str, actual_answer: str) -> dict:
    judge_llm = ChatOpenAI(model="gpt-4o")
    
    judge_prompt = f"""
    Chấm điểm câu trả lời sau từ 1-5 theo tiêu chí đã cho.
    Trả về JSON: {{"score": <1-5>, "reason": "<lý do ngắn>"}}
    
    Câu hỏi: {question}
    Tiêu chí đánh giá: {expected_criteria}
    Câu trả lời cần chấm: {actual_answer}
    """
    
    response = judge_llm.invoke(judge_prompt).content
    return json.loads(response)

# Ví dụ sử dụng
result = llm_judge(
    question="RAG là gì?",
    expected_criteria="Phải đề cập đến Retrieval, Generation và Vector DB",
    actual_answer=chain.invoke({"question": "RAG là gì?"}).content
)
print(result)  # {"score": 4, "reason": "Đề cập Retrieval và Generation nhưng thiếu Vector DB"}
```

---

## 4. Regression Testing khi đổi Model hoặc Prompt

Khi nâng cấp từ GPT-4o-mini lên GPT-4o, hoặc sửa System Prompt, cần đảm bảo chất lượng không bị giảm sút.

```python
# Tập test cases chuẩn (Golden Dataset)
TEST_CASES = [
    {
        "input": "Chính sách hoàn tiền của bạn là gì?",
        "must_contain": ["30 ngày", "hoàn tiền 100%"],
        "must_not_contain": ["tôi không biết", "xin lỗi"]
    },
    {
        "input": "Làm sao liên hệ hỗ trợ?",
        "must_contain": ["email", "hotline"],
        "must_not_contain": []
    }
]

def run_regression_tests(chain, test_cases: list) -> dict:
    results = {"passed": 0, "failed": 0, "details": []}
    
    for tc in test_cases:
        response = chain.invoke({"question": tc["input"]}).content.lower()
        
        passed = True
        for phrase in tc["must_contain"]:
            if phrase.lower() not in response:
                passed = False
        for phrase in tc["must_not_contain"]:
            if phrase.lower() in response:
                passed = False
        
        if passed:
            results["passed"] += 1
        else:
            results["failed"] += 1
        
        results["details"].append({"input": tc["input"], "passed": passed, "response": response})
    
    return results
```

---

## 5. CI/CD Pipeline cho AI App

Cấu hình GitHub Actions để tự động chạy test khi push code:

```yaml
# .github/workflows/ai_tests.yml
name: AI App Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run prompt unit tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}  # API Key lưu trong GitHub Secrets
        run: pytest tests/test_prompts.py -v
      
      - name: Run regression tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: python scripts/run_regression.py
```

Quy trình CI/CD hoàn chỉnh:
1. Developer sửa prompt hoặc đổi model, push lên nhánh feature.
2. GitHub Actions tự động chạy toàn bộ test cases.
3. Nếu tất cả test pass, Pull Request được phê duyệt merge vào main.
4. Tự động build Docker image mới và deploy lên production.
