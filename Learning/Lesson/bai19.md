# Bài 19: Lưu trữ Vector - Vector Database với ChromaDB & pgvector

Mục tiêu bài học: Hiểu rõ vai trò của Cơ sở dữ liệu Vector, các thuật toán lập chỉ mục (Indexing) và cách sử dụng ChromaDB trong lập trình Python.

---

## 1. Tại sao cần Cơ sở dữ liệu Vector?

Khi xây dựng các ứng dụng tìm kiếm ngữ nghĩa hoặc RAG quy mô lớn chứa hàng triệu tài liệu:
- Nếu lưu trữ vector trong mảng thường và chạy so sánh vòng lặp (Linear search) để tính Cosine Similarity với từng bản ghi, thời gian phản hồi sẽ cực kỳ lâu (độ phức tạp O(N)).
- Cơ sở dữ liệu Vector (Vector Database) được thiết kế chuyên dụng để lưu trữ hàng triệu vector và tìm kiếm K láng giềng gần nhất (K-Nearest Neighbors) với tốc độ mili-giây nhờ các kỹ thuật lập chỉ mục thông minh.

Các thuật toán Indexing nổi bật:
- HNSW (Hierarchical Navigable Small World): Xây dựng đồ thị đa lớp liên kết giữa các vector nằm gần nhau, cho phép nhảy cực nhanh qua các vùng dữ liệu để tiếp cận vector đích (tốc độ tìm kiếm O(log N)).
- IVF (Inverted File Index): Phân cụm các vector trước, khi tìm kiếm chỉ quét các điểm trong cụm gần nhất.

---

## 2. Các thư viện Vector DB phổ biến

1. ChromaDB: Nhẹ, mã nguồn mở, hỗ trợ chạy trực tiếp trong bộ nhớ RAM hoặc lưu trữ file cục bộ dưới thư mục dự án (Local database). Cực kỳ thích hợp cho giai đoạn thử nghiệm và các dự án nhỏ.
2. pgvector: Tiện ích mở rộng (extension) cho hệ quản trị CSDL PostgreSQL phổ biến, cho phép lưu trữ và tìm kiếm vector trực tiếp bằng câu lệnh SQL chuẩn.
3. Pinecone / Milvus / Qdrant: CSDL vector dạng cloud hoặc phân tán mạnh mẽ, dùng cho môi trường production quy mô doanh nghiệp lớn.

---

## 3. Lập trình cơ bản với ChromaDB

```python
import chromadb

# Khởi tạo client lưu trữ database cục bộ vào ổ đĩa
client = chromadb.PersistentClient(path="./chroma_db")

# Tạo hoặc kết nối tới một bảng lưu trữ (Collection)
collection = client.get_or_create_collection(name="products")

# Thêm dữ liệu (Nếu không truyền embeddings, Chroma tự gọi model mặc định để tạo)
collection.add(
    documents=["Laptop Dell văn phòng mỏng nhẹ", "Điện thoại iPhone chụp ảnh đẹp"],
    metadatas=[{"category": "laptop"}, {"category": "phone"}],
    ids=["id1", "id2"]
)

# Truy vấn tìm kiếm ngữ nghĩa
results = collection.query(
    query_texts=["Tôi muốn mua máy tính làm việc"],
    n_results=1
)
print(results["documents"]) # Trả về: "Laptop Dell văn phòng mỏng nhẹ"
```
