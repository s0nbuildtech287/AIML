# Phần 3: Mạng Neural và Học sâu (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ kiến thức nâng cao về Mạng nơ-ron thần kinh nhân tạo (Artificial Neural Networks) và Deep Learning.

---

## I. NEURAL NETWORKS FOUNDATIONS (Móng mạng Nơ-ron)

### 1. Neuron & MLP (Multi-Layer Perceptron)
* Khái niệm: Đơn vị tính toán cơ bản của mạng nơ-ron (Neuron) nhận đầu vào, nhân với trọng số tương ứng w, cộng hệ số bias b, rồi đi qua hàm kích hoạt phi tuyến tính để xuất kết quả.
* Activation Function (Hàm kích hoạt):
  * Sigmoid / Tanh: Nén giá trị về khoảng (0, 1) hoặc (-1, 1). Dễ bị hiện tượng bão hòa đạo hàm ở 2 đầu dải giá trị.
  * ReLU (Rectified Linear Unit): f(x) = max(0, x). Tính toán cực nhanh, giải quyết tốt bài toán triệt tiêu gradient ở miền số dương.
  * Softmax: Biến đổi đầu ra của lớp cuối cùng thành phân phối xác suất có tổng bằng 1 cho bài toán phân loại đa lớp.
* Backpropagation (Lan truyền ngược): Thuật toán tính đạo hàm riêng của hàm mất mát so với từng trọng số trong mạng bằng quy tắc chuỗi (Chain Rule), đi từ lớp đầu ra ngược về lớp đầu vào để cập nhật trọng số.

### 2. PyTorch Workflow
* Tensor: Cấu trúc dữ liệu mảng đa chiều cốt lõi của PyTorch, hỗ trợ tính toán song song trên GPU qua CUDA.
* Autograd: Động cơ tự động tính đạo hàm của PyTorch dựa trên đồ thị tính toán động (DAG).
* Training Loop (Vòng lặp huấn luyện):
  * zero_grad(): Xóa sạch đạo hàm cũ của các tham số trước khi tính lượt mới.
  * backward(): Chạy lan truyền ngược tính gradient.
  * step(): Cập nhật trọng số theo thuật toán tối ưu hóa (như Adam, SGD).

---

## II. COMPUTER VISION - CNN (Mạng Tích chập)

* Convolutional Layer (Lớp tích chập): Sử dụng các bộ lọc (Kernels) trượt trên không gian 2D của bức ảnh để trích xuất đặc trưng cục bộ (đường nét, họa tiết). Giúp chia sẻ trọng số (Weight Sharing) và giữ nguyên cấu trúc không gian ảnh.
* Stride & Padding:
  * Stride: Bước nhảy của bộ lọc khi quét qua ảnh.
  * Padding: Đệm thêm viền (thường là số 0) quanh ảnh để bảo toàn kích thước không gian và tránh mất thông tin ở rìa ảnh.
* Max Pooling: Lấy giá trị lớn nhất trong một cửa sổ trượt để giảm chiều kích thước không gian của Feature Map, tăng tính bất biến dịch chuyển (Translation Invariance).
* Receptive Field (Trường thụ cảm): Vùng không gian trên ảnh đầu vào chịu trách nhiệm trực tiếp quyết định giá trị kích hoạt của một điểm đặc trưng ở tầng sâu hơn.

---

## III. SEQUENCE MODELS - RNN & TRANSFORMER (Xử lý Chuỗi)

### 1. RNN & LSTM
* Recurrent Neural Network (RNN): Mạng tuần tự sử dụng trạng thái ẩn (Hidden State) truyền dọc theo bước thời gian để xử lý chuỗi.
* Vanishing Gradient (Triệt tiêu đạo hàm): Khi chuỗi quá dài, việc nhân liên tiếp các đạo hàm nhỏ qua nhiều bước thời gian làm gradient tiến sát về 0, khiến các lớp đầu chuỗi ngừng học (mất trí nhớ dài hạn).
* LSTM (Long Short-Term Memory): Khắc phục lỗi triệt tiêu gradient bằng cách bổ sung đường truyền Cell State chạy thẳng và 3 cổng kiểm soát luồng thông tin:
  * Forget Gate (Cổng quên): Quyết định lượng thông tin cũ từ Cell State cần xóa bỏ.
  * Input Gate (Cổng nạp): Quyết định lượng thông tin mới cần ghi đè vào Cell State.
  * Output Gate (Cổng xuất): Quyết định giá trị Hidden State tiếp theo xuất ra từ Cell State.

### 2. Attention Mechanism & Transformer
* Scaled Dot-Product Attention: Cơ chế tính toán độ tương đồng giữa vector truy vấn Query (Q) với các vector khóa Key (K), chuẩn hóa bằng chia căn bậc hai của số chiều (d_k), đi qua Softmax lấy trọng số chú ý để nhân với vector giá trị Value (V).
  * Công thức: Attention(Q, K, V) = Softmax( Q * K.T / sqrt(d_k) ) * V
* Transformer Architecture: Loại bỏ hoàn toàn cấu trúc tuần tự của RNN, thay bằng cơ chế Multi-Head Self-Attention hoạt động song song hóa 100% trên GPU.
* Positional Encoding (Mã hóa vị trí): Bổ sung thông tin thứ tự/vị trí của từ trong câu vào vector nhúng (vì Self-Attention không có tính tuần tự tự nhiên).
* Masked Self-Attention: Cơ chế che giấu các từ ở phía tương lai trong khối Decoder để đảm bảo mô hình chỉ học dự đoán từ tiếp theo dựa trên lịch sử quá khứ khi huấn luyện.
