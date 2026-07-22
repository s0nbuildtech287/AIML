# Bài 22: Đánh giá RAG (RAG Evaluation) - Đo lường ảo giác mô hình

Mục tiêu bài học: Nắm bắt các chỉ số đo lường hiệu năng của hệ thống RAG, cơ chế LLM-as-a-judge và cách áp dụng thư viện Ragas/TruLens để chấm điểm tự động.

---

## 1. Tại sao đánh giá RAG lại khó?

Không giống như các bài toán phân loại truyền thống có nhãn đúng/sai rõ ràng để tính Accuracy, câu trả lời của RAG Chatbot là văn bản tự do. Một câu trả lời có thể viết bằng nhiều cách khác nhau mà vẫn đúng, hoặc ngược lại, trông rất trôi chảy nhưng thực chất chứa thông tin bịa đặt (ảo giác).

Chúng ta không thể thuê con người ngồi đọc và chấm điểm hàng nghìn cuộc hội thoại mỗi ngày. Do đó, cần một bộ chỉ số chấm điểm tự động.

---

## 2. Các chỉ số đánh giá RAG cốt lõi (Ragas Triad)

Hệ thống RAG được chia làm 3 trục đánh giá chính dựa trên 3 yếu tố: Câu hỏi (Query), Ngữ cảnh truy xuất (Context), và Câu trả lời (Response).

1. Faithfulness (Độ trung thực - Đo lường ảo giác):
   - Trục đánh giá: Ngữ cảnh ➔ Câu trả lời.
   - Đo lường xem câu trả lời của LLM có hoàn toàn dựa trên các thông tin được cung cấp trong ngữ cảnh truy xuất hay không. Nếu câu trả lời chứa thông tin không có trong tài liệu ➔ Faithfulness thấp (bị ảo giác).

2. Answer Relevance (Độ liên quan của câu trả lời):
   - Trục đánh giá: Câu hỏi ➔ Câu trả lời.
   - Đo lường xem câu trả lời của AI có đi đúng vào trọng tâm câu hỏi của người dùng hay không, tránh việc trả lời dài dòng nhưng lạc đề.

3. Context Precision (Độ chuẩn xác của ngữ cảnh):
   - Trục đánh giá: Câu hỏi ➔ Ngữ cảnh.
   - Đo lường xem các chunk tài liệu mà Vector DB tìm được có thực sự liên quan và chứa thông tin cần thiết để trả lời câu hỏi hay không.

---

## 3. Cơ chế LLM-as-a-judge (Dùng LLM làm giám khảo)

Để tính toán các chỉ số trên tự động, các thư viện như Ragas hoặc TruLens sử dụng một mô hình LLM thông minh và mạnh mẽ (ví dụ: GPT-4) đóng vai trò làm giám khảo.
Cách thức hoạt động:
- Gửi câu hỏi, ngữ cảnh và câu trả lời mẫu cho LLM giám khảo kèm theo một Prompt chứa tiêu chí chấm điểm và thang điểm chi tiết (Rubric).
- LLM giám khảo sẽ phân tích, phân rã câu trả lời thành các luận điểm nhỏ, đối chiếu với ngữ cảnh để đếm số lượng luận điểm đúng và trả về điểm số cụ thể từ 0.0 đến 1.0.
Phương pháp này đạt độ tương đồng rất cao (trên 80-90%) so với việc chuyên gia con người ngồi chấm thủ công.
