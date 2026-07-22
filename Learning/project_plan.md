# Kế hoạch phát triển dự án thực hành: AI/ML Interactive Visualizer & Playground

Tệp này mô tả kế hoạch xây dựng dự án thực hành tích hợp chạy trên nền web dùng làm phương tiện học tập trực quan cho toàn bộ 28 bài học trong lộ trình chuyển ngành AI Engineer.

---

## 1. Cấu Trúc Thư Mục Dự Án

Dự án nằm trọn trong thư mục Project/ với cấu trúc lũy tiến ban đầu:

Project/
├── app.py                  # File chạy chính (FastAPI Server / Logic xử lý thuật toán)
├── templates/              # Thư mục chứa giao diện HTML
│   └── index.html          # Giao diện chính phân tab cao cấp
└── static/                 # Chứa các tài nguyên tĩnh
    ├── css/                # Định kiểu phong cách hiện đại (Sleek Dark Mode)
    └── js/                 # Logic gọi API, vẽ biểu đồ và hoạt họa gói tin

---

## 2. Lộ Trình Phát Triển Tích Hợp Lũy Tiến

Mỗi bài học lý thuyết sẽ đi kèm với việc mở rộng mã nguồn dự án để thêm các tính năng trực quan dưới đây:

### Giai đoạn 1: Xử lý dữ liệu & Toán tối thiểu (Bài 1 - 5)
* Tab tích hợp: Data Analyzer & Gradient Descent Visualizer
- Tính năng:
  + Uploader dữ liệu: Cho phép tải lên tệp dữ liệu CSV (như tệp Titanic hoặc giá nhà).
  + Bảng dữ liệu thông minh: Trực quan hóa dữ liệu thô, thống kê các cột trống và xử lý làm sạch dữ liệu (dropna, fillna) trực tiếp qua nút bấm trên UI.
  + Đo đạc hiệu năng: Biểu diễn so sánh thời gian thực thi của phép toán ma trận NumPy vs vòng lặp For bằng biểu đồ cột.
  + Mô phỏng tối ưu hóa: Đồ thị hoạt họa 2D hiển thị quả bóng lăn xuống dốc tìm điểm cực tiểu theo thuật toán Gradient Descent dựa trên Learning Rate người dùng tùy chỉnh.

### Giai đoạn 2: Trình huấn luyện mô hình ML Playground (Bài 6 - 10)
* Tab tích hợp: Machine Learning Training Lab
- Tính năng:
  + Bảng điều khiển tham số: Slider chọn tỷ lệ chia dữ liệu train/test, chọn thuật toán (Linear Regression, Random Forest, KNN) và điều chỉnh siêu tham số (Hyperparameters).
  + Trực quan kết quả huấn luyện: Biểu diễn Learning Curve (đường cong học tập để phát hiện Overfitting/Underfitting), Confusion Matrix (ma trận nhầm lẫn) và hiển thị các điểm số đánh giá (Accuracy, Precision, Recall, F1).
  + Phân cụm & Giảm chiều: Vẽ biểu đồ phân cụm dữ liệu K-Means 2D sau khi chạy PCA để giảm chiều dữ liệu.

### Giai đoạn 3: Nhận diện chữ viết tay MNIST (Bài 11 - 15)
* Tab tích hợp: MNIST Drawing Canvas & Neural Net Visualizer
- Tính năng:
  + Vẽ số tương tác: Khung vẽ canvas cho phép người dùng dùng chuột vẽ các chữ số từ 0 đến 9.
  + Dự đoán bằng CNN PyTorch: Gửi nét vẽ về backend xử lý qua mạng tích chập và trả lời nhãn dự đoán.
  + Trực quan hóa mạng Neuron: Vẽ sơ đồ các lớp liên kết của mạng neuron nhân tạo. Các nút mạng (node) và đường truyền sẽ sáng lên dựa vào giá trị activation thực tế khi chạy Forward pass.

### Giai đoạn 4: Động cơ LLM & Hệ thống RAG (Bài 16 - 22)
* Tab tích hợp: Knowledge RAG Chatbot
- Tính năng:
  + Trình quản lý tài liệu: Cho phép kéo thả file tài liệu văn bản (.txt, .pdf, .md) của người dùng lên.
  + Chunking & Embedding Tracker: Chia nhỏ tài liệu, hiển thị danh sách các phân đoạn văn bản và vector tương ứng lưu vào cơ sở dữ liệu ChromaDB.
  + Semantic Search Visualizer: Hiển thị các phân đoạn văn bản liên quan nhất được tìm thấy kèm điểm tương đồng ngữ nghĩa Cosine Similarity.
  + RAG Chat: Ô chat hội thoại thông minh trả lời dựa trên tài liệu.
  + Đánh giá RAG: Nút bấm hiển thị điểm số đo lường ảo giác (Faithfulness) dựa trên Ragas.

### Giai đoạn 5: AI Agent & Vận hành MLOps (Bài 23 - 28)
* Tab tích hợp: AI Agent Hub & Production
- Tính năng:
  + Agent Reasoning Tracker: Hiển thị luồng tư duy của AI Agent dạng terminal console (Thought -> Action -> Observation) khi nó quyết định lựa chọn sử dụng các công cụ bổ trợ (search_db, calculator, weather_api).
  + Dockerization & Tracing: Đóng gói Docker toàn bộ ứng dụng, kết nối trace lỗi bằng LangSmith và deploy chạy thực tế lên máy chủ đám mây (Railway/Render) chia sẻ liên kết sử dụng thực tế.
