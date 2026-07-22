# Bài 18: Text Embeddings & Tính tương đồng ngữ nghĩa

Mục tiêu bài học: Hiểu khái niệm Vector Embedding, ý nghĩa hình học của nó và công thức tính độ tương đồng Cosine (Cosine Similarity).

---

## 1. Vector Embedding là gì?

Máy tính không hiểu ý nghĩa của từ ngữ, nó chỉ hiểu các con số. Vector Embedding là phương pháp biểu diễn một đoạn văn bản (từ, câu, hoặc cả đoạn văn) dưới dạng một chuỗi số thực nhiều chiều (ví dụ: mô hình text-embedding-3-small của OpenAI chuyển một câu thành một vector 1536 chiều).

Đặc điểm cốt lõi:
- Embedding được tạo ra bởi mạng neural đã học trên kho ngữ liệu khổng lồ.
- Nó nén thông tin ngữ nghĩa (Semantic meaning) của văn bản vào không gian vector đa chiều.
- Các đoạn văn bản có nghĩa giống nhau hoặc chủ đề liên quan (ví dụ: "nhà vua" và "hoàng hậu", hoặc "chó" và "mèo") sẽ có tọa độ nằm rất gần nhau trong không gian vector này, mặc dù mặt chữ viết hoàn toàn khác nhau.

---

## 2. Công thức đo độ tương đồng Cosine (Cosine Similarity)

Để đo mức độ tương đồng giữa hai đoạn văn bản, ta tính góc giữa hai vector embedding tương ứng của chúng (gọi là vector A và vector B).

* Công thức Cosine Similarity:
  Cosine_Sim(A, B) = (A dot B) / (||A|| * ||B||)
  Trong đó:
  - A dot B: Phép nhân vô hướng giữa hai vector.
  - ||A|| và ||B||: Độ dài hình học của hai vector.

* Giá trị của Cosine Similarity:
  Nằm trong khoảng [-1, 1], trong thực tế với embedding của văn bản thường nằm trong khoảng [0, 1]:
  - Bằng 1: Hai vector hoàn toàn cùng hướng (ngữ nghĩa giống nhau tuyệt đối).
  - Bằng 0: Hai vector vuông góc (hoàn toàn không liên quan đến nhau).
  - Bằng -1: Hai vector ngược hướng nhau.

NumPy giúp tính toán Cosine Similarity cực nhanh bằng phép toán vector hóa:
```python
import numpy as np

def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    return dot_product / (norm_v1 * norm_v2)
```
Đây là phép toán nền tảng của mọi hệ thống tìm kiếm ngữ nghĩa (Semantic Search).
