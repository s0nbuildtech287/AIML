# Bài 25: Fine-Tuning nhẹ với LoRA & QLoRA trên Hugging Face

Mục tiêu bài học: Phân biệt khi nào nên dùng Prompt/RAG vs Fine-tuning, nắm vững nguyên lý hoạt động của LoRA/QLoRA để huấn luyện mô hình ngôn ngữ lớn hiệu quả trên phần cứng giới hạn.

---

## 1. RAG vs Fine-Tuning: Chọn phương pháp nào?

Khi muốn mô hình ngôn ngữ lớn (LLM) làm việc với tri thức mới hoặc nhiệm vụ chuyên biệt:
- RAG (Thêm ngữ cảnh): Giống như việc bạn cho học sinh đi thi được phép mở tài liệu. RAG rất tốt khi cần truy xuất thông tin chính xác, cập nhật liên tục, dễ dàng kiểm chứng nguồn. RAG không làm thay đổi hành vi hay khả năng suy luận của mô hình.
- Fine-Tuning (Huấn luyện lại): Giống như việc đào tạo học sinh học chuyên sâu một môn học. Fine-tuning thay đổi trọng số của mô hình để nó học phong cách nói chuyện, học định dạng đầu ra đặc thù, hoặc tối ưu hóa hiệu năng trên một tác vụ cực kỳ hẹp. Fine-tuning không tốt trong việc ghi nhớ các dữ kiện thông tin chi tiết vì dễ gây ảo giác nếu dữ liệu không phủ rộng.

---

## 2. Công nghệ LoRA (Low-Rank Adaptation) là gì?

Mô hình LLM có hàng tỷ tham số. Việc cập nhật toàn bộ các trọng số này (Full Fine-tuning) đòi hỏi tài nguyên bộ nhớ GPU khổng lồ (vài trăm GB VRAM) và rất dễ làm hỏng kiến thức nền tảng của mô hình (Catastrophic forgetting).

LoRA giải quyết bài toán này bằng cách đóng băng toàn bộ trọng số gốc của LLM:
- Chèn thêm một nhánh song song nhỏ chứa hai ma trận có rank thấp (kích thước rất nhỏ, gọi là ma trận A và B) vào các lớp Attention của mô hình.
- Trong quá trình huấn luyện, chỉ có trọng số của hai ma trận nhỏ này được cập nhật, trong khi toàn bộ mô hình gốc được giữ nguyên.
- Số lượng tham số cần huấn luyện giảm xuống chỉ còn dưới 1% (ví dụ: từ 7 tỷ xuống còn vài triệu tham số).
- Sau khi train xong, ta cộng trực tiếp trọng số của ma trận LoRA vào mô hình gốc để không phát sinh thêm độ trễ khi chạy suy luận (inference latency).

QLoRA (Quantized LoRA) nâng cấp LoRA bằng cách lượng tử hóa mô hình gốc xuống định dạng 4-bit, cho phép chạy fine-tune mô hình 7 tỷ tham số chỉ trên một card đồ họa phổ thông duy nhất (ví dụ: RTX 3090/4090).

---

## 3. Quy trình Fine-Tuning trên Hugging Face

1. Chuẩn bị Dataset: Tập hợp dữ liệu định dạng câu hỏi - trả lời (Instruction-Response) dạng JSON.
2. Load Base Model: Sử dụng thư viện transformers để load mô hình gốc ở dạng 4-bit (bitsandbytes).
3. Thiết lập PEFT (Parameter-Efficient Fine-Tuning): Cấu hình các tham số LoRA (như r, lora_alpha, target_modules).
4. Huấn luyện bằng SFTTrainer: Sử dụng thư viện trl của Hugging Face để tự động hóa vòng lặp training và lưu lại Adapter weights (chỉ nặng vài chục MB).
