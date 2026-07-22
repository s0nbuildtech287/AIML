# Bài 12: Lập trình PyTorch - Xây dựng mạng phân loại MNIST

Mục tiêu bài học: Nắm bắt các khái niệm cơ bản trong thư viện PyTorch (Tensor, Autograd) và quy trình xây dựng, huấn luyện một mạng MLP phân loại ảnh chữ số viết tay MNIST.

---

## 1. Các khái niệm cốt lõi trong PyTorch

PyTorch là một trong những thư viện Deep Learning phổ biến nhất hiện nay nhờ tính linh hoạt và đồ thị tính toán động (Dynamic Computation Graph).

* Tensor:
  - Cấu trúc dữ liệu trung tâm của PyTorch, tương tự như ndarray của NumPy nhưng có thể chạy trực tiếp trên GPU để tăng tốc độ tính toán gấp hàng trăm lần.
  - Khởi tạo: torch.tensor([1, 2, 3]) hoặc torch.zeros(3, 3).

* Autograd (Tự động tính đạo hàm):
  - PyTorch tự động lưu lại các phép toán đã thực hiện trên các Tensor có thuộc tính requires_grad=True.
  - Khi gọi loss.backward(), PyTorch tự động tính toán và lưu đạo hàm vào thuộc tính .grad của từng tensor biến số.

---

## 2. Quy trình thiết lập mô hình trong PyTorch

Một quy trình chuẩn gồm các bước:

* Bước 1: Định nghĩa kiến trúc mạng (Kế thừa nn.Module)
```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        # Lớp phẳng hóa ảnh 28x28 thành vector 784 chiều
        self.flatten = nn.Flatten()
        # Các lớp tuyến tính (Linear / Fully Connected layers)
        self.fc1 = nn.Linear(784, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10) # 10 lớp đầu ra tương ứng từ số 0-9
        
    def forward(self, x):
        x = self.flatten(x)
        x = self.fc1(x)
        x = self.relu(x)
        logits = self.fc2(x)
        return logits
```

* Bước 2: Thiết lập hàm Loss và Optimizer
  - Loss function: Thường dùng CrossEntropyLoss cho bài toán phân loại nhiều lớp.
  - Optimizer: Thuật toán cập nhật trọng số (ví dụ: Adam hoặc SGD).

---

## 3. Vòng lặp huấn luyện (Training Loop)

Mỗi chu kỳ (epoch) duyệt qua tập dữ liệu:
1. optimizer.zero_grad(): Xóa bộ nhớ đệm đạo hàm của bước trước để tránh bị cộng dồn.
2. outputs = model(inputs): Thực hiện truyền xuôi (Forward pass).
3. loss = criterion(outputs, labels): Tính toán sai số.
4. loss.backward(): Lan truyền ngược tính đạo hàm.
5. optimizer.step(): Cập nhật trọng số của mô hình.
