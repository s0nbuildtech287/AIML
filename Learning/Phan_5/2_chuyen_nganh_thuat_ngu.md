# Phần 5: Kiến trúc RAG - Truy xuất thông tin (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ các kỹ thuật chuyên sâu xây dựng hệ thống Retrieval-Augmented Generation (RAG) và các phương pháp đánh giá chất lượng chống ảo giác.

---

## I. INGESTION, CHUNKING & EMBEDDINGS (Nạp và Xử lý dữ liệu)

### 1. Text Embeddings
* Khái niệm: Chuyển đổi ngữ nghĩa của một đoạn văn bản thành một vector số thực có số chiều cố định (ví dụ 1536 hoặc 3072 chiều).
* Khoảng đo tương đồng Cosine (Cosine Similarity): Đo góc giữa hai vector trong không gian đa chiều để đánh giá độ tương quan ngữ nghĩa độc lập với độ dài văn bản.
  * Công thức: Similarity = (A . B) / (||A|| * ||B||)
  * Cosine Distance = 1 - Cosine Similarity

### 2. Chunking Strategies (Chiến lược phân mảnh)
* Fixed-size Chunking: Chia nhỏ văn bản theo số lượng ký tự hoặc token cố định (ví dụ chunk size 500 tokens).
* Chunk Overlap: Nhân bản một phần cuối của chunk cũ sang phần đầu chunk mới (khoảng 10-20%) để bảo toàn ngữ cảnh liền mạch tại điểm cắt ranh giới câu.
* Semantic Chunking: Đo sự thay đổi khoảng cách vector embedding giữa các câu liên tiếp, thực hiện cắt mảnh khi khoảng cách ngữ nghĩa vượt quá một ngưỡng xác định để đảm bảo mỗi chunk chỉ tập trung vào một chủ đề thống nhất.

---

## II. RETRIEVAL & VECTOR DATABASE (Lưu trữ và Truy xuất)

### 1. Vector Database Indicies (Lập chỉ mục CSDL Vector)
* Exact kNN: Duyệt tuyến tính tính toán khoảng cách với mọi vector trong cơ sở dữ liệu. Cho độ chính xác 100% nhưng độ phức tạp O(N) quá chậm khi dữ liệu lớn.
* ANN (Approximate Nearest Neighbors - Lân cận gần nhất xấp xỉ): Đánh đổi một phần nhỏ độ chính xác để tăng tốc độ tìm kiếm lên O(log N).
  * HNSW (Hierarchical Navigable Small World): Lập chỉ mục dạng đồ thị đa tầng, duyệt tìm điểm gần nhất tương tự cấu trúc Skip List.
  * IVF (Inverted File Index): Phân vùng không gian vector thành các cụm bằng K-Means, chỉ thực hiện quét tìm kiếm trong cụm gần câu hỏi nhất.

### 2. Advanced Retrieval (Truy xuất nâng cao)
* Hybrid Search: Kết hợp tìm kiếm từ khóa truyền thống (như thuật toán BM25) với tìm kiếm tương đồng ngữ nghĩa (Dense Retrieval). Sử dụng thuật toán RRF (Reciprocal Rank Fusion) để gộp và xếp hạng lại kết quả trả về.
* Parent Document Retriever: Cắt tài liệu thành các chunk con rất nhỏ để tìm kiếm vector nhạy bén, nhưng khi gửi ngữ cảnh cho LLM thì lấy toàn bộ tài liệu cha (chunk lớn hơn chứa chunk con đó) để bảo toàn ngữ cảnh rộng.
* Re-ranking: Chạy mô hình Cross-Encoder phân tích chéo sâu sắc tương tác giữa câu hỏi và Top K ứng viên thô để tính điểm liên quan chính xác, loại bỏ các chunk rác nằm ở đầu danh sách.

---

## III. RAG EVALUATION (Đo lường & Đánh giá RAG)

* Lost in the Middle: Hiện tượng LLM chú ý tốt thông tin ở phần đầu và cuối prompt, dễ bỏ sót thông tin quan trọng nằm ở giữa nếu prompt quá dài.
* Ragas Metrics (Đánh giá bằng LLM-as-a-Judge):
  * Faithfulness (Độ trung thực): Tỷ lệ các ý tuyên bố trong câu trả lời được chứng minh trực tiếp bởi thông tin có trong Context (đo lường mức độ chống ảo giác).
  * Answer Relevance: Đo lường mức độ câu trả lời giải quyết trực tiếp câu hỏi người dùng, không bị lan man lạc đề.
  * Context Recall: Đo lường xem bộ phận Retriever có tìm thấy đầy đủ các thông tin của đáp án chuẩn (Ground Truth) hay không.
  * Context Precision: Đo lường xem các chunk thực sự liên quan có được ưu tiên xếp ở các vị trí đầu tiên của danh sách ngữ cảnh hay không.
