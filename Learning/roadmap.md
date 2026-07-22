# Lộ trình học tập chi tiết: Trở thành AI Engineer (Applied AI)

Lộ trình này được thiết kế dành riêng cho lập trình viên đã có nền tảng phát triển phần mềm (Full-stack). Mục tiêu chính là làm chủ các công nghệ ứng dụng AI, tích hợp mô hình ngôn ngữ lớn (LLM), xây dựng hệ thống RAG, AI Agent và vận hành mô hình (MLOps).

Chương trình được chia làm 28 bài học thực chiến đi từ nền tảng đến nâng cao.

---

## GIAI ĐOẠN 1: NỀN TẢNG PYTHON CHO DATA & TOÁN TỐI THIỂU (BÀI 1 - 5)

### Bài 1: NumPy cơ bản - Mảng (Array), Vectorization & Phép toán Ma trận
- Lý thuyết cần nắm:
  + Sự khác biệt về bộ nhớ và tốc độ giữa Python List và NumPy Array.
  + Cơ chế Vectorization và lý do tại sao nó loại bỏ vòng lặp for.
  + Phép nhân ma trận chuẩn toán học (Dot product) và nhân từng phần tử (Element-wise).
  + Cơ chế Broadcasting (tự động khớp kích thước mảng).
- Thực hành: So sánh hiệu năng thời gian thực giữa For loop vs Vectorization; tự viết hàm tính khoảng cách Euclid và Min-max Scaling.

### Bài 2: Pandas cơ bản - Thao tác dữ liệu với Series & DataFrame
- Lý thuyết cần nắm:
  + Cấu trúc dữ liệu Series (1D) và DataFrame (2D).
  + Các kỹ thuật indexing, slicing dữ liệu bằng loc, iloc.
  + Các hàm lọc dữ liệu, sắp xếp và nhóm dữ liệu (groupby).
- Thực hành: Đọc tệp CSV dữ liệu thực tế, thực hiện lọc điều kiện và tính toán thống kê mô tả cơ bản.

### Bài 3: Làm sạch dữ liệu - Xử lý dữ liệu thiếu và lỗi
- Lý thuyết cần nắm:
  + Nguyên nhân và ảnh hưởng của dữ liệu khuyết thiếu (Missing data).
  + Các chiến lược xử lý dữ liệu thiếu: loại bỏ (dropna) hoặc điền giá trị thế thế (fillna bằng mean, median, mode).
  + Phát hiện và loại bỏ các bản ghi trùng lặp (duplicates).
- Thực hành: Làm sạch một tập dữ liệu thô bị thiếu thông tin và trùng lặp trước khi đưa vào phân tích.

### Bài 4: Khám phá dữ liệu (EDA) - Trực quan hóa dữ liệu
- Lý thuyết cần nắm:
  + Quy trình Exploratory Data Analysis (EDA) để hiểu phân phối và mối tương quan của dữ liệu.
  + Cách sử dụng biểu đồ phân phối (Histogram, Boxplot) để phát hiện Outliers.
  + Biểu đồ phân tán (Scatter plot) và Heatmap ma trận tương quan (Correlation).
- Thực hành: Sử dụng Matplotlib và Seaborn vẽ 5 biểu đồ phân tích sâu một tập dữ liệu thực tế.

### Bài 5: Toán tối thiểu cho AI - Đại số tuyến tính, Xác suất & Gradient Descent
- Lý thuyết cần nắm:
  + Vector, Ma trận, phép nhân ma trận và ý nghĩa hình học của chúng.
  + Các khái niệm thống kê: phân phối chuẩn, kỳ vọng, phương sai, độ lệch chuẩn.
  + Đạo hàm và nguyên lý tối ưu hóa bằng thuật toán Gradient Descent (độ dốc đi xuống).
- Thực hành: Mô phỏng thuật toán Gradient Descent tìm điểm cực tiểu bằng code Python thuần không dùng thư viện học máy.

---

## GIAI ĐOẠN 2: MACHINE LEARNING CƠ BẢN (BÀI 6 - 10)

### Bài 6: Học có giám sát (Supervised) - Hồi quy & Phân loại tuyến tính
- Lý thuyết cần nắm:
  + Phân biệt bài toán Hồi quy (Regression - dự đoán số liên tục) và Phân loại (Classification - dự đoán nhãn danh mục).
  + Thuật toán Hồi quy tuyến tính (Linear Regression) và Hồi quy Logistic (Logistic Regression).
- Thực hành: Sử dụng Scikit-learn huấn luyện mô hình dự đoán giá nhà (Regression) và phân loại dữ liệu nhị phân.

### Bài 7: Các mô hình cây - Decision Tree & Random Forest
- Lý thuyết cần nắm:
  + Cơ chế hoạt động của Cây quyết định (Decision Tree): cách chia nhánh dựa trên độ lợi thông tin.
  + Khái niệm Ensemble Learning (học máy kết hợp nhiều mô hình).
  + Thuật toán Random Forest (Rừng ngẫu nhiên) và tại sao nó giảm thiểu lỗi của một cây đơn lẻ.
- Thực hành: Huấn luyện mô hình Random Forest trên tập dữ liệu phân loại khách hàng và phân tích độ quan trọng của các thuộc tính (Feature Importance).

### Bài 8: Đánh giá hiệu năng mô hình (Model Evaluation Metrics)
- Lý thuyết cần nắm:
  + Các chỉ số đánh giá phân loại: Accuracy, Precision, Recall, F1-score và Confusion Matrix.
  + Các chỉ số đánh giá hồi quy: MAE, RMSE, R-squared.
  + Cơ chế kiểm thử chéo (Cross-Validation) để đánh giá tính tổng quát hóa của mô hình.
- Thực hành: Đánh giá mô hình phân loại trên tập dữ liệu mất cân bằng (Imbalanced dataset) và vẽ Confusion Matrix trực quan.

### Bài 9: feature Engineering - Tiền xử lý dữ liệu nâng cao
- Lý thuyết cần nắm:
  + Các kỹ thuật mã hóa dữ liệu danh mục: One-Hot Encoding, Label Encoding.
  + Chuẩn hóa khoảng dữ liệu: StandardScaler (chuẩn hóa Z-score) và MinMaxScaler.
  + Hiện tượng rò rỉ dữ liệu (Data Leakage) và cách phòng tránh bằng Scikit-learn Pipeline.
- Thực hành: Xây dựng một Pipeline tự động hóa từ bước xử lý dữ liệu thiếu, mã hóa, chuẩn hóa đến huấn luyện mô hình.

### Bài 10: Học không giám sát - Phân cụm K-Means & Giảm chiều PCA
- Lý thuyết cần nắm:
  + Khái niệm học không giám sát (Unsupervised Learning).
  + Cơ chế phân cụm dữ liệu của thuật toán K-Means.
  + Thuật toán phân tích thành phần chính (PCA) để giảm số lượng chiều của dữ liệu mà vẫn giữ tối đa thông tin.
- Thực hành: Áp dụng K-Means để phân khúc nhóm khách hàng và dùng PCA giảm chiều dữ liệu để trực quan lên biểu đồ 2D.

---

## GIAI ĐOẠN 3: DEEP LEARNING & TRANSFORMER (BÀI 11 - 15)

### Bài 11: Neural Network cơ bản - Perceptron & Backpropagation
- Lý thuyết cần nắm:
  + Cấu trúc một node mạng (Neuron), hàm kích hoạt (Activation functions: ReLU, Sigmoid, Softmax).
  + Cấu trúc mạng thần kinh nhân tạo nhiều lớp (Multi-Layer Perceptron - MLP).
  + Quá trình truyền xuôi (Forward pass) và truyền ngược (Backpropagation) để cập nhật trọng số.
- Thực hành: Tính toán thủ công một bước truyền xuôi của mạng neuron đơn giản trên giấy hoặc code Python thô.

### Bài 12: Lập trình PyTorch - Xây dựng mạng phân loại MNIST
- Lý thuyết cần nắm:
  + Các khái niệm cốt lõi trong PyTorch: Tensor, tính toán tự động đạo hàm (Autograd), mô-đun nn.Module.
  + Quy trình huấn luyện mạng thần kinh: Loss function, Optimizer (SGD, Adam), vòng lặp huấn luyện (Training loop).
- Thực hành: Viết mã nguồn PyTorch huấn luyện mạng MLP nhận dạng chữ số viết tay từ bộ dữ liệu MNIST.

### Bài 13: Mạng CNN cho dữ liệu hình ảnh
- Lý thuyết cần nắm:
  + Hạn chế của mạng MLP khi xử lý ảnh.
  + Phép toán tích chập (Convolution), lớp Pooling (giảm mẫu) trong mạng CNN.
  + Kỹ thuật Transfer Learning (học chuyển giao) bằng các mô hình pre-trained (ResNet).
- Thực hành: Huấn luyện một mô hình phân loại ảnh chó/mèo bằng cách tận dụng một mạng CNN pre-trained thông qua PyTorch.

### Bài 14: Dữ liệu chuỗi thời gian & Text - Từ RNN/LSTM đến Attention
- Lý thuyết cần nắm:
  + Mạng tuần tự RNN và LSTM để xử lý dữ liệu có thứ tự thời gian hoặc văn bản.
  + Hạn chế của RNN/LSTM đối với các câu dài (Vanishing gradient, nghẽn thông tin).
  + Ý tưởng cốt lõi của cơ chế chú ý (Attention Mechanism): cho phép mô hình tập trung vào các từ quan trọng trong câu mà không bị giới hạn khoảng cách.
- Thực hành: Mô phỏng cơ chế tự chú ý (Self-Attention) đơn giản bằng phép nhân ma trận NumPy.

### Bài 15: Kiến trúc Transformer - Tìm hiểu bài báo Attention Is All You Need
- Lý thuyết cần nắm:
  + Kiến trúc tổng quan Encoder-Decoder của Transformer.
  + Quá trình Tokenization (tách từ), Word Embedding và Positional Encoding (mã hóa vị trí từ).
  + Cơ chế Multi-Head Self-Attention.
- Thực hành: Vẽ và giải thích luồng đi của dữ liệu từ một câu văn bản thô đi qua các khối của Transformer.

---

## GIAI ĐOẠN 4: LLM & AI ENGINEERING (BÀI 16 - 25)

### Bài 16: Prompt Engineering nâng cao
- Lý thuyết cần nắm:
  + Các kỹ thuật viết prompt: Zero-shot, Few-shot (đưa ví dụ minh họa).
  + Chain-of-Thought (chuỗi tư duy) giúp mô hình suy nghĩ từng bước trước khi trả lời.
  + Phân biệt System Prompt và User Prompt.
- Thực hành: Thiết kế prompt template tối ưu để trích xuất thông tin có cấu trúc từ một đoạn văn bản thô phức tạp.

### Bài 17: Cấu trúc đầu ra (Structured Outputs) của LLM
- Lý thuyết cần nắm:
  + Tại sao đầu ra dạng text tự do khó tích hợp vào hệ thống phần mềm.
  + Phương pháp ép mô hình trả về định dạng JSON chuẩn theo JSON Schema định nghĩa trước.
  + Sử dụng thư viện Pydantic kết hợp với API của OpenAI/Anthropic để parse dữ liệu đầu ra an toàn.
- Thực hành: Viết script gọi LLM API để phân tích sắc thái bình luận khách hàng và trả về định dạng JSON chuẩn gồm 3 trường: sentiment, confidence, keywords.

### Bài 18: Text Embeddings & Tính tương đồng ngữ nghĩa
- Lý thuyết cần nắm:
  + Cách chuyển đổi một đoạn văn bản thành một vector số thực nhiều chiều (Embedding).
  + Ý nghĩa hình học của vector embedding: các đoạn văn có nội dung giống nhau sẽ nằm gần nhau trong không gian vector.
  + Công thức đo khoảng cách tương đồng Cosine (Cosine Similarity).
- Thực hành: Sử dụng OpenAI Embedding API để tính toán độ tương đồng ngữ nghĩa giữa các câu hỏi của người dùng và tìm câu khớp nhất.

### Bài 19: Lưu trữ Vector - Vector Database với ChromaDB & pgvector
- Lý thuyết cần nắm:
  + Cơ sở dữ liệu Vector là gì và tại sao CSDL quan hệ truyền thống không đáp ứng được tìm kiếm vector hiệu năng cao.
  + Cách thức lưu trữ, lập chỉ mục (Indexing) và truy vấn K láng giềng gần nhất (ANN search).
  + Sử dụng ChromaDB (nhẹ, chạy local) và pgvector (tích hợp PostgreSQL).
- Thực hành: Thiết lập ChromaDB lưu trữ danh sách sản phẩm dưới dạng vector và thực hiện truy vấn tìm kiếm sản phẩm theo mô tả ngôn ngữ tự nhiên.

### Bài 20: Kỹ thuật RAG - Tiền xử lý dữ liệu văn bản (Ingestion & Chunking)
- Lý thuyết cần nắm:
  + Kiến trúc tổng quan Retrieval-Augmented Generation (RAG).
  + Các chiến lược phân tách văn bản (Chunking strategies): cắt theo độ dài cố định (Fixed-size), cắt theo ngữ nghĩa (Semantic chunking), hoặc cấu trúc tài liệu.
  + Ảnh hưởng của kích thước chunk đến độ chính xác của LLM.
- Thực hành: Viết script phân tách một cuốn sách hướng dẫn sử dụng sản phẩm dạng PDF thành các chunk tối ưu, tạo embedding và lưu vào Vector DB.

### Bài 21: Kỹ thuật RAG nâng cao - Tối ưu hóa truy xuất với LangChain/LlamaIndex
- Lý thuyết cần nắm:
  + Hiện tượng mất thông tin ở giữa (Lost in the Middle) của mô hình ngôn ngữ.
  + Kỹ thuật xếp hạng lại (Re-ranking) để lọc ra các chunk liên quan nhất.
  + Các framework hỗ trợ build RAG: LangChain và LlamaIndex (sự khác biệt và khi nào nên dùng).
- Thực hành: Xây dựng hoàn chỉnh một ứng dụng RAG Chatbot trả lời câu hỏi dựa trên tài liệu PDF nội bộ, sử dụng LangChain và tích hợp mô hình Re-ranker.

### Bài 22: Đánh giá RAG (RAG Evaluation) - Đo lường ảo giác mô hình
- Lý thuyết cần nắm:
  + Các chỉ số đánh giá RAG cơ bản: Faithfulness (độ trung thực - có bị ảo giác không), Answer Relevance (câu trả lời có đúng trọng tâm câu hỏi không), Context Precision (các chunk tìm được có đúng không).
  + Cơ chế LLM-as-a-judge (dùng một LLM thông minh hơn để chấm điểm hệ thống).
- Thực hành: Sử dụng thư viện Ragas hoặc TruLens chạy chấm điểm tự động cho RAG Chatbot đã xây dựng ở Bài 21.

### Bài 23: Gọi hàm (Function Calling) & Sử dụng Công cụ (Tool Use)
- Lý thuyết cần nắm:
  + Cách khai báo các hàm Python dưới dạng đặc tả JSON gửi cho LLM.
  + Cơ chế LLM quyết định khi nào cần gọi hàm và trả về tham số hàm dạng JSON.
  + Quy trình thực thi hàm trên backend và gửi trả kết quả cho LLM biên dịch thành câu trả lời tự nhiên.
- Thực hành: Viết chương trình tích hợp LLM với 2 công cụ thực tế: 1 hàm tính toán số học phức tạp và 1 hàm gọi API lấy thông tin thời tiết thời gian thực.

### Bài 24: AI Agent Patterns - Reasoning & Action Loop
- Lý thuyết cần nắm:
  + Khái niệm AI Agent: Hệ thống tự ra quyết định và hành động dựa trên vòng lặp phản hồi.
  + Kiến trúc ReAct (Reasoning + Acting) hoạt động ra sao.
  + Xây dựng Agent có trạng thái bằng LangGraph hoặc tự triển khai vòng lặp code thuần.
- Thực hành: Xây dựng một AI Agent hỗ trợ kỹ thuật khách hàng, tự động nhận diện yêu cầu, quyết định truy vấn cơ sở dữ liệu hoặc chuyển hướng cho nhân viên hỗ trợ.

### Bài 25: Fine-Tuning nhẹ với LoRA & QLoRA trên Hugging Face
- Lý thuyết cần nắm:
  + Khi nào cần Fine-tune mô hình vs khi nào chỉ cần dùng Prompt/RAG.
  + Nguyên lý của kỹ thuật thích ứng thứ hạng thấp LoRA (Low-Rank Adaptation) và QLoRA (LoRA lượng tử hóa) để giảm thiểu tài nguyên phần cứng cần thiết.
  + Thư viện Transformers và Trainer API của Hugging Face.
- Thực hành: Viết mã nguồn fine-tune một mô hình open-source cỡ nhỏ (ví dụ Qwen-1.5B) để học phong cách nói chuyện cụ thể dựa trên tập dữ liệu hội thoại mẫu.

---

## GIAI ĐOẠN 5: MLOPS & TRIỂN KHAI PHÁT HÀNH (BÀI 26 - 28)

### Bài 26: Triển khai API phục vụ mô hình - FastAPI & Streaming SSE
- Lý thuyết cần nắm:
  + Cách xây dựng REST API bằng FastAPI để bao bọc các logic xử lý AI.
  + Giao thức Server-Sent Events (SSE) để stream kết quả trả về của LLM theo từng ký tự thời gian thực lên giao diện.
- Thực hành: Tạo API FastAPI nhận câu hỏi RAG và trả lời dưới dạng stream ký tự mượt mà giống như ChatGPT.

### Bài 27: Đóng gói Docker & Triển khai cloud (Deployment)
- Lý thuyết cần nắm:
  + Viết Dockerfile tối ưu cho ứng dụng AI (quản lý thư viện PyTorch nặng, các biến môi trường API keys).
  + Quản lý chi phí token (Token counting) và cài đặt ngân sách giới hạn cuộc gọi API.
  + Triển khai ứng dụng lên các Cloud Platform (Render, Railway hoặc AWS).
- Thực hành: Đóng gói Docker ứng dụng RAG Chatbot của bạn và deploy thành công lên môi trường cloud chạy thử nghiệm thực tế.

### Bài 28: Giám sát & Tracing hệ thống AI trong vận hành
- Lý thuyết cần nắm:
  + Tầm quan trọng của việc thu thập và giám sát dữ liệu người dùng (Prompt logging) để cải tiến prompt.
  + Sử dụng công cụ Tracing chuyên dụng (LangSmith hoặc Arize Phoenix) để phát hiện nghẽn ở bước Vector DB, LLM hay Tool Calling.
- Thực hành: Tích hợp công cụ LangSmith vào ứng dụng Agent và phân tích vết của một cuộc hội thoại bị lỗi để tìm nguyên nhân.