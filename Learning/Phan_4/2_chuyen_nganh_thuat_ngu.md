# Phần 4: Mô hình ngôn ngữ và Tinh chỉnh (Thuật ngữ & Kiến thức chuyên ngành)

Hệ thống hóa toàn bộ kiến thức chuyên sâu về Kỹ nghệ gợi ý (Prompt Engineering), Khai thác đầu ra cấu trúc, và Tinh chỉnh hiệu quả mô hình ngôn ngữ lớn (LLM Fine-tuning).

---

## I. ADVANCED PROMPT ENGINEERING (Kỹ nghệ Gợi ý Nâng cao)

* Zero-shot Prompting: Yêu cầu LLM thực hiện tác vụ trực tiếp mà không cung cấp ví dụ minh họa nào, dựa hoàn toàn vào tri thức pre-train của mô hình.
* Few-shot Prompting: Cung cấp một vài ví dụ mẫu (cặp input-output mong muốn) ngay trong prompt đầu vào để LLM bắt chước định dạng và phong cách phản hồi.
* Chain-of-Thought (CoT - Chuỗi suy nghĩ): Thêm chỉ dẫn "Hãy suy nghĩ từng bước" (Let's think step by step) để ép LLM tự sinh ra các dòng lập luận logic tuần tự trước khi đưa ra đáp án cuối cùng, giúp giảm thiểu đáng kể các lỗi tính toán và suy diễn.
* System Prompt vs User Prompt:
  * System Prompt: Thiết lập vai trò, tính cách, quy định an toàn và định dạng đầu ra dài hạn cho LLM.
  * User Prompt: Chứa thông tin ngữ cảnh và câu hỏi cụ thể cần xử lý tức thì của người dùng.
* Hyperparameters (Siêu tham số API):
  * Temperature (Nhiệt độ): Điều chỉnh độ ngẫu nhiên khi sinh từ tiếp theo. Bằng 0 để lập luận cố định (Greedy search); lớn hơn 0.7 để tăng tính sáng tạo.
  * Top-P (Nucleus Sampling): Giới hạn lựa chọn từ tiếp theo trong nhóm các từ có tổng xác suất tích lũy đạt giá trị P (ví dụ 0.9), loại bỏ các từ quá phi logic.

---

## II. STRUCTURED OUTPUTS (Định dạng Đầu ra Cấu trúc)

* Ý nghĩa: Đảm bảo phản hồi của LLM tuân thủ chính xác các cấu trúc dữ liệu chuẩn (như JSON) để hệ thống phần mềm (Backend) tự động parse dữ liệu an toàn mà không bị crash.
* Pydantic Schema: Thư viện Python khai báo cấu trúc dữ liệu bằng các class định kiểu dữ liệu nghiêm ngặt. Được các framework (Instructor, OpenAI Structured Output) trích xuất thành JSON Schema gửi làm chỉ dẫn hệ thống cho LLM.
* Self-Correction (Tự sửa lỗi): Khi backend phát hiện JSON trả về từ LLM bị lỗi cấu trúc (ValidationError), hệ thống tự động bắt lỗi và gửi chuỗi lỗi chi tiết ngược lại cho LLM để nó tự phân tích và sinh lại JSON chuẩn xác ở lượt kế tiếp.

---

## III. PARAMETER-EFFICIENT FINE-TUNING (PEFT - Tinh chỉnh Hiệu quả)

* Full Fine-Tuning: Huấn luyện cập nhật lại toàn bộ tham số của mô hình lớn (đòi hỏi tài nguyên phần cứng GPU khổng lồ).
* LoRA (Low-Rank Adaptation): Kỹ thuật tinh chỉnh hiệu quả bằng cách đóng băng toàn bộ trọng số gốc của mô hình nền (W_gốc). Thêm vào các nhánh ma trận nhỏ A và B chạy song song.
  * Lượng thay đổi trọng số thực tế: delta W = B * A, với rank r của ma trận A và B rất thấp (ví dụ r = 8 hoặc 16), giúp giảm số lượng tham số cần huấn luyện đi 99%.
* QLoRA: Cải tiến LoRA bằng cách lượng tử hóa (Quantization) ma trận trọng số gốc mô hình nền xuống kiểu dữ liệu 4-bit (NormalFloat4), giúp tiết kiệm cực lớn dung lượng bộ nhớ VRAM của GPU khi huấn luyện.
* Adapter Merge: Phép cộng ma trận trực tiếp W_merged = W_gốc + delta W sau khi huấn luyện xong để có mô hình nhất thể, loại bỏ hoàn toàn độ trễ tính toán chéo chéo (Inference Latency) khi deploy ứng dụng lên production.
