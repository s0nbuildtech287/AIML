# Bài 27: Đóng gói Docker & Triển khai cloud (Deployment)

Mục tiêu bài học: Hiểu cách đóng gói ứng dụng AI bằng Docker container, quản lý biến môi trường bảo mật và cách deploy lên các nền tảng đám mây.

---

## 1. Vai trò của Docker trong ứng dụng AI

Các ứng dụng AI và Machine Learning thường phụ thuộc vào rất nhiều thư viện Python nặng (như PyTorch, TensorFlow, Scikit-learn) và các gói cài đặt hệ thống C++ phức tạp. Việc chạy code trực tiếp trên các máy tính khác nhau rất dễ xảy ra lỗi xung đột phiên bản (Dependency hell).

Docker giải quyết triệt để vấn đề này bằng cách đóng gói toàn bộ mã nguồn, thư viện Python, hệ điều hành cơ sở và các cấu hình hệ thống vào một container duy nhất, đảm bảo ứng dụng chạy đồng nhất trên mọi môi trường (local, staging, cloud).

Một tệp cấu hình Dockerfile tiêu chuẩn cho ứng dụng Python AI:
```dockerfile
# Sử dụng base image Python chính thức, mỏng nhẹ
FROM python:3.10-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file khai báo dependencies và cài đặt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng kết nối của container
EXPOSE 8080

# Lệnh khởi chạy server uvicorn
CMD ["uvicorn", "Project.app:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

## 2. Quản lý biến môi trường bảo mật (Environment Variables)

Khi làm việc với các API của bên thứ ba (như OpenAI, Anthropic, Vector DB cloud), chúng ta tuyệt đối không được ghi đè trực tiếp các mã khóa bảo mật (API keys, Database passwords) vào mã nguồn. Nếu đẩy code lên GitHub, các khóa này sẽ bị rò rỉ ngay lập tức.

Giải pháp:
- Tạo một file `.env` ở local để lưu trữ các biến môi trường:
  OPENAI_API_KEY=sk-proj-xxxx...
- Dùng thư viện python-dotenv để tự động load các biến này vào hệ thống khi chạy local.
- Khi triển khai lên cloud, cấu hình các biến này trong phần Variables/Secrets của nền tảng lưu trữ đám mây.

---

## 3. Triển khai lên Cloud (Deployment platforms)

Các tùy chọn hosting đám mây phù hợp cho ứng dụng AI cá nhân/thử nghiệm:
- Render / Railway: Các nền tảng PaaS cực kỳ dễ dùng, cho phép bạn kết nối trực tiếp với tài khoản GitHub, tự động nhận diện Dockerfile và deploy ứng dụng lên internet chỉ sau vài phút.
- AWS / GCP / Azure: Dùng cho các dự án lớn của doanh nghiệp, cung cấp máy chủ GPU chuyên dụng (như EC2 với NVIDIA GPU) để phục vụ suy luận mô hình cục bộ hiệu năng cao.
