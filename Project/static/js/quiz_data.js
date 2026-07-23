// =====================================================================
// DỮ LIỆU BÀI TEST TRẮC NGHIỆM 10 CÂU HỎI CHO 37 CHỦ ĐỀ AI/ML ROADMAP
// =====================================================================

const lessonQuizzes = {
    numpy: [
        {
            q: "NumPy đạt hiệu năng cao hơn vòng lặp Python thuần là nhờ cơ chế nào?",
            options: ["A. Lưu trữ mảng kiểu động (Dynamic typing)", "B. Sử dụng bộ nhớ phân tán", "C. Lưu mảng liên tục trong RAM & tính toán SIMD bằng mã C", "D. Biên dịch mã thành bytecode ngẫu nhiên"],
            answer: 2,
            explain: "NumPy lưu trữ các phần tử cùng kiểu dữ liệu liên tiếp trong RAM, cho phép CPU thực hiện phép tính SIMD (Vectorization) ở cấp độ ngôn ngữ C nhanh gấp hàng trăm lần vòng lặp Python."
        },
        {
            q: "Cú pháp nào tạo mảng 1D chứa các số từ 0 đến 99 trong NumPy?",
            options: ["A. np.array(0, 100)", "B. np.arange(100)", "C. np.zeros(100)", "D. np.linspace(0, 99)"],
            answer: 1,
            explain: "np.arange(100) tạo mảng gồm 100 số nguyên liên tiếp từ 0 đến 99."
        },
        {
            q: "Thuộc tính nào của ndarray trả về kích thước các chiều ma trận (ví dụ (3, 4))?",
            options: ["A. arr.size", "B. arr.dim", "C. arr.shape", "D. arr.length"],
            answer: 2,
            explain: "arr.shape trả về một tuple mô tả số hàng và số cột của mảng multidimensional."
        },
        {
            q: "Broadcasting trong NumPy có ý nghĩa là gì?",
            options: ["A. Gửi dữ liệu qua mạng internet", "B. Tự động mở rộng kích thước mảng nhỏ hơn để thực hiện phép toán với mảng lớn hơn", "C. Chuyển đổi mảng 1D thành mảng 2D", "D. In dữ liệu ra màn hình console"],
            answer: 1,
            explain: "Broadcasting cho phép thực hiện các phép toán giữa các mảng có hình dạng (shape) khác nhau mà không cần tốn bộ nhớ sao chép lại dữ liệu."
        },
        {
            q: "Để thực hiện nhân ma trận A (3x2) và B (2x4) trong NumPy, ta dùng cú pháp nào?",
            options: ["A. A * B", "B. A + B", "C. A @ B hoặc np.matmul(A, B)", "D. np.multiply(A, B)"],
            answer: 2,
            explain: "Toán tử `@` hoặc `np.matmul()` dùng cho nhân ma trận (Matrix Multiplication). Dấu `*` chỉ thực hiện nhân từng phần tử tương ứng (element-wise)."
        },
        {
            q: "Phương thức nào đổi hình dạng mảng mà không thay đổi dữ liệu bên trong?",
            options: ["A. arr.resize()", "B. arr.reshape()", "C. arr.convert()", "D. arr.flatten()"],
            answer: 1,
            explain: "arr.reshape() biến đổi số chiều và hình dạng mảng theo tham số truyền vào mà giữ nguyên dữ liệu."
        },
        {
            q: "Cú pháp lọc các phần tử lớn hơn 5 trong mảng arr là:",
            options: ["A. arr[arr > 5]", "B. arr.filter(5)", "C. arr.where(5)", "D. arr.select(gt=5)"],
            answer: 0,
            explain: "Boolean indexing `arr[arr > 5]` sẽ tạo một mặt nạ boolean và chỉ giữ lại các phần tử thỏa mãn điều kiện."
        },
        {
            q: "Kiểu dữ liệu mặc định của mảng np.zeros(5) là gì?",
            options: ["A. int32", "B. int64", "C. float64", "D. string"],
            answer: 2,
            explain: "Các hàm tạo mảng của NumPy như np.zeros, np.ones mặc định sử dụng kiểu số thực `float64`."
        },
        {
            q: "Hàm nào tính giá trị trung bình của toàn bộ phần tử trong mảng NumPy?",
            options: ["A. np.sum()", "B. np.mean()", "C. np.median()", "D. np.std()"],
            answer: 1,
            explain: "np.mean(arr) tính giá trị trung bình đại số (Arithmetic Mean) của các phần tử."
        },
        {
            q: "Để tính khoảng cách Euclid giữa 2 vector a và b trong NumPy, câu lệnh nào đúng?",
            options: ["A. np.sqrt(np.sum((a - b)**2))", "B. np.abs(a - b)", "C. np.dot(a, b)", "D. np.sum(a + b)"],
            answer: 0,
            explain: "Khoảng cách Euclid được tính bằng căn bậc hai của tổng bình phương hiệu các tọa độ: sqrt(sum((a - b)^2))."
        }
    ],
    pandas: [
        {
            q: "Cấu hình dữ liệu 2 chiều có hàng và cột trong Pandas được gọi là gì?",
            options: ["A. Series", "B. Panel", "C. DataFrame", "D. Matrix"],
            answer: 2,
            explain: "DataFrame là cấu trúc dữ liệu bảng 2 chiều có gắn nhãn hàng (index) và nhãn cột (columns) trong Pandas."
        },
        {
            q: "Hàm nào dùng để đọc dữ liệu từ file CSV vào Pandas DataFrame?",
            options: ["A. pd.read_file()", "B. pd.load_csv()", "C. pd.read_csv()", "D. pd.import_csv()"],
            answer: 2,
            explain: "pd.read_csv('filepath') là hàm chuẩn để nạp dữ liệu từ file CSV."
        },
        {
            q: "Phương thức `df.head(10)` làm nhiệm vụ gì?",
            options: ["A. Trả về 10 dòng cuối cùng", "B. Trả về 10 dòng đầu tiên", "C. Lọc 10 cột đầu tiên", "D. Xóa 10 dòng đầu tiên"],
            answer: 1,
            explain: "df.head(n) trả về n dòng đầu tiên của DataFrame."
        },
        {
            q: "Sự khác biệt giữa `loc` và `iloc` trong Pandas là gì?",
            options: ["A. loc dựa vào chỉ số số nguyên, iloc dựa vào nhãn tên", "B. loc dựa vào nhãn tên/điều kiện, iloc dựa vào chỉ số số nguyên (0-indexed)", "C. loc chỉ dùng cho hàng, iloc chỉ dùng cho cột", "D. Cả hai giống hệt nhau"],
            answer: 1,
            explain: "df.loc dùng nhãn tên cột/hàng hoặc biểu thức điều kiện; df.iloc dùng vị trí số nguyên index (integer location)."
        },
        {
            q: "Cú pháp nào lọc các dòng trong df có cột 'Age' > 30?",
            options: ["A. df.filter('Age > 30')", "B. df[df['Age'] > 30]", "C. df.where('Age' > 30)", "D. df.select('Age' > 30)"],
            answer: 1,
            explain: "Cú pháp truy vấn boolean `df[df['Age'] > 30]` trả về các hàng thỏa điều kiện."
        },
        {
            q: "Hàm nào gom nhóm dữ liệu theo một cột để tính toán thống kê (ví dụ giá trung bình)?",
            options: ["A. df.aggregate()", "B. df.pivot()", "C. df.groupby()", "D. df.sort_values()"],
            answer: 2,
            explain: "df.groupby('Column_Name') nhóm các dòng có cùng giá trị lại để áp dụng hàm tổng hợp như sum, mean, count."
        },
        {
            q: "Phương thức nào kiểm tra tổng số ô dữ liệu bị khuyết (NaN) ở từng cột?",
            options: ["A. df.isna().sum()", "B. df.check_null()", "C. df.count_empty()", "D. df.missing()"],
            answer: 0,
            explain: "df.isna() (hoặc df.isnull()) tạo bảng boolean và .sum() đếm số lượng ô True (bị khuyết) ở từng cột."
        },
        {
            q: "Để loại bỏ cột 'Address' khỏi DataFrame df, lệnh nào chính xác?",
            options: ["A. df.remove('Address')", "B. df.drop('Address', axis=1)", "C. df.delete('Address')", "D. df.clear('Address')"],
            answer: 1,
            explain: "df.drop('Address', axis=1) xóa cột chỉ định (`axis=1` chỉ hướng cột)."
        },
        {
            q: "Hàm nào kết nối 2 DataFrame theo khóa chung (tương tự JOIN trong SQL)?",
            options: ["A. pd.concat()", "B. pd.append()", "C. pd.merge()", "D. pd.union()"],
            answer: 2,
            explain: "pd.merge(df1, df2, on='key', how='inner/left') thực hiện phép nối bảng tương tự INNER JOIN hay LEFT JOIN trong SQL."
        },
        {
            q: "Để hiển thị thông tin tổng quan về kiểu dữ liệu và số lượng ô non-null của từng cột, ta dùng:",
            options: ["A. df.describe()", "B. df.info()", "C. df.shape", "D. df.types"],
            answer: 1,
            explain: "df.info() in ra bảng tổng quan gồm số hàng, tên cột, số dòng khác null và kiểu dữ liệu (int, float, object...)."
        }
    ],
    cleaning: [
        {
            q: "Giá trị khuyết trong Pandas thường được biểu diễn bằng ký hiệu nào?",
            options: ["A. Null", "B. None", "C. NaN (Not a Number)", "D. Empty"],
            answer: 2,
            explain: "Pandas biểu diễn dữ liệu khuyết bằng NaN (Not a Number)."
        },
        {
            q: "Phương thức nào dùng để điền giá trị thay thế (ví dụ giá trị trung vị Median) vào các ô bị khuyết?",
            options: ["A. df.dropna()", "B. df.fillna()", "C. df.replace_null()", "D. df.fix_nan()"],
            answer: 1,
            explain: "df.fillna(value) dùng để lấp đầy các ô NaN bằng giá trị tùy chỉnh."
        },
        {
            q: "Khi nào nên dùng `fillna(df['col'].median())` thay vì `mean()`?",
            options: ["A. Dữ liệu có phân phối chuẩn", "B. Dữ liệu bị nhiễu chứa các giá trị ngoại lệ (Outliers) cực lớn", "C. Khi dữ liệu dạng chuỗi chữ", "D. Khi không có ô NaN nào"],
            answer: 1,
            explain: "Giá trị trung vị Median ít bị ảnh hưởng bởi giá trị ngoại lệ (Outliers) hơn giá trị trung bình Mean."
        },
        {
            q: "Lệnh nào dùng để xóa tất cả các hàng có chứa ít nhất 1 ô bị khuyết NaN?",
            options: ["A. df.drop_null()", "B. df.dropna()", "C. df.clean()", "D. df.remove_na()"],
            answer: 1,
            explain: "df.dropna() loại bỏ các hàng (hoặc cột) chứa giá trị khuyết."
        },
        {
            q: "Lệnh nào phát hiện và xóa các dòng dữ liệu bị lặp lại hoàn toàn (Duplicates)?",
            options: ["A. df.drop_duplicates()", "B. df.remove_same()", "C. df.unique()", "D. df.distinct()"],
            answer: 0,
            explain: "df.drop_duplicates() giữ lại dòng đầu tiên và loại bỏ các dòng bị lặp lại hoàn toàn."
        },
        {
            q: "Đoạn mã `df['Age'] = df['Age'].astype(int)` thực hiện công việc gì?",
            options: ["A. Đếm số tuổi", "B. Ép kiểu dữ liệu cột Age sang số nguyên int", "C. Kiểm tra tuổi có phải số nguyên không", "D. Làm tròn số tuổi lên"],
            answer: 1,
            explain: "astype(int) chuyển đổi kiểu dữ liệu của series sang kiểu integer."
        },
        {
            q: "Giá trị ngoại lệ (Outlier) trong tập dữ liệu là gì?",
            options: ["A. Giá trị bị thiếu NaN", "B. Giá trị khác biệt quá lớn so với phần còn lại của tập dữ liệu", "C. Giá trị xuất hiện nhiều lần nhất", "D. Giá trị trung bình của tập dữ liệu"],
            answer: 1,
            explain: "Outlier là điểm dữ liệu có khoảng cách bất thường so với phân phối chung của tập dữ liệu."
        },
        {
            q: "Phương pháp IQR (Interquartile Range) dùng để làm gì trong Data Cleaning?",
            options: ["A. Tính trung bình cộng", "B. Xác định và phát hiện giá trị ngoại lệ Outliers", "C. Điền giá trị khuyết", "D. Mã hóa biến phân loại"],
            answer: 1,
            explain: "Khoảng tứ phân vị IQR = Q3 - Q1 giúp phát hiện điểm ngoại lệ nằm ngoài vùng [Q1 - 1.5*IQR, Q3 + 1.5*IQR]."
        },
        {
            q: "Để xóa khoảng trắng thừa ở hai đầu chuỗi chữ trong cột 'Name', ta dùng:",
            options: ["A. df['Name'].str.strip()", "B. df['Name'].clean()", "C. df['Name'].trim()", "D. df['Name'].str.remove()"],
            answer: 0,
            explain: "Phương thức `.str.strip()` loại bỏ khoảng trắng ở đầu và cuối chuỗi trong Pandas."
        },
        {
            q: "Quy tắc quan trọng nhất trước khi đưa dữ liệu vào huấn luyện mô hình ML là gì?",
            options: ["A. Dữ liệu không còn chứa NaN và có kiểu dữ liệu phù hợp", "B. Xóa hết các dòng số chẵn", "C. Nhân tất cả số liệu với 100", "D. Đổi toàn bộ chữ sang tiếng Anh"],
            answer: 0,
            explain: "Hầu hết các thư viện ML như Scikit-Learn sẽ báo lỗi crash nếu dữ liệu đầu vào chứa NaN hoặc sai kiểu số."
        }
    ],
    eda: [
        {
            q: "EDA (Exploratory Data Analysis) có mục đích chính là gì?",
            options: ["A. Huấn luyện mô hình Deep Learning", "B. Khám phá, trực quan hóa và thấu hiểu đặc trưng tập dữ liệu trước khi modeling", "C. Viết ứng dụng giao diện web", "D. Đóng gói ứng dụng Docker"],
            answer: 1,
            explain: "EDA giúp khám phá phân phối, phát hiện xu hướng, mối tương quan và bất thường trong dữ liệu."
        },
        {
            q: "Biểu đồ Histogram phù hợp nhất để quan sát điều gì?",
            options: ["A. Mối quan hệ giữa 2 biến liên tục", "B. Phân phối tần suất của một biến số liên tục", "C. Tỷ lệ phần trăm các danh mục", "D. Tiến trình chạy theo thời gian"],
            answer: 1,
            explain: "Histogram chia giá trị số thành các khoảng (bins) và vẽ cột thể hiện tần suất xuất hiện."
        },
        {
            q: "Biểu đồ Scatter Plot (Đồ thị phân tán) dùng để làm gì?",
            options: ["A. Đếm số dòng trùng", "B. Khám phá mối quan hệ tương quan giữa 2 biến định lượng (X và Y)", "C. Hiển thị ma trận nhầm lẫn", "D. Biểu diễn cây quyết định"],
            answer: 1,
            explain: "Scatter Plot thể hiện từng điểm dữ liệu trên trục X-Y để quan sát xu hướng đồng biến/nghịch biến."
        },
        {
            q: "Hệ số tương quan Pearson có giá trị nằm trong khoảng nào?",
            options: ["A. [0, 1]", "B. [-1, 1]", "C. [0, 100]", "D. [-infinity, +infinity]"],
            answer: 1,
            explain: "Hệ số Pearson r nằm trong khoảng [-1, 1]. Trong đó 1 là tương quan thuận hoàn hảo, -1 là tương quan nghịch hoàn hảo, 0 là không tương quan."
        },
        {
            q: "Biểu đồ Heatmap thường dùng trong EDA để làm gì?",
            options: ["A. Trực quan hóa ma trận tương quan (Correlation Matrix) giữa các cặp cột số", "B. Đo nhiệt độ server", "C. Vẽ biểu đồ tròn", "D. Thể hiện tiến độ train epoch"],
            answer: 0,
            explain: "Heatmap hiển thị ma trận số dưới dạng màu sắc, giúp nhanh chóng phát hiện cặp biến tương quan mạnh."
        },
        {
            q: "Boxplot (Biểu đồ hộp) hiển thị những chỉ số thống kê nào?",
            options: ["A. Min, Q1, Median (Q2), Q3, Max và Outliers", "B. Mean và Standard Deviation", "C. Tần suất xuất hiện từ ngữ", "D. Độ chính xác Precision và Recall"],
            answer: 0,
            explain: "Boxplot biểu diễn 5 chỉ số thống kê cơ bản cùng các điểm ngoại lệ nằm ngoài râu hộp (whiskers)."
        },
        {
            q: "Thư viện Python nào chuyên vẽ biểu đồ đẹp tích hợp sâu với Pandas?",
            options: ["A. PyTorch", "B. Seaborn & Matplotlib", "C. Flask", "D. NumPy"],
            answer: 1,
            explain: "Matplotlib và Seaborn là 2 thư viện trực quan hóa dữ liệu phổ biến nhất trong Python."
        },
        {
            q: "Dữ liệu bị lệch trái (Left-skewed / Negatively skewed) có đặc điểm gì?",
            options: ["A. Đuôi dài nằm về phía trái (Mean < Median)", "B. Đuôi dài nằm về phía phải (Mean > Median)", "C. Phân phối cân bằng hoàn hảo", "D. Giá trị trung bình bằng 0"],
            answer: 0,
            explain: "Phân phối lệch trái có phần đuôi kéo dài về phía giá trị nhỏ (bên trái), làm cho Mean kéo thấp hơn Median."
        },
        {
            q: "Hàm nào trong Pandas tự động tính các chỉ số count, mean, std, min, 25%, 50%, 75%, max?",
            options: ["A. df.summary()", "B. df.stats()", "C. df.describe()", "D. df.analyze()"],
            answer: 2,
            explain: "df.describe() tự động tính toán các số liệu thống kê mô tả cho các cột định lượng."
        },
        {
            q: "Khi 2 biến độc lập có hệ số tương quan bằng +0.95, điều này thể hiện điều gì?",
            options: ["A. Không có mối quan hệ nào", "B. Tương quan thuận rất mạnh (khi X tăng thì Y tăng theo)", "C. Tương quan nghịch mạnh", "D. Mô hình bị lỗi"],
            answer: 1,
            explain: "Giá trị gần +1 thể hiện mối quan hệ tuyến tính thuận chiều rất mạnh."
        }
    ],
    gradient: [
        {
            q: "Gradient Descent là thuật toán nhằm mục đích gì?",
            options: ["A. Tìm cực đại hàm số", "B. Tìm cực tiểu hàm sai số (Loss Function) để tối ưu trọng số W", "C. Tạo thêm dữ liệu mới", "D. Nén dung lượng hình ảnh"],
            answer: 1,
            explain: "Gradient Descent di chuyển trọng số theo hướng ngược chiều đạo hàm để tìm điểm có sai số nhỏ nhất."
        },
        {
            q: "Đạo hàm (Gradient) đại diện cho điều gì của hàm số tại một điểm?",
            options: ["A. Độ dài của vector", "B. Hướng tăng nhanh nhất của hàm số", "C. Giá trị trung bình", "D. Số lượng tham số"],
            answer: 1,
            explain: "Gradient là vector chỉ hướng mà tại đó giá trị hàm số tăng nhanh nhất. Do đó di chuyển ngược hướng Gradient sẽ giảm Loss."
        },
        {
            q: "Tham số Learning Rate (Tốc độ học $\\alpha$) quyết định điều gì?",
            options: ["A. Số lượng mẫu dữ liệu", "B. Kích thước bước nhảy cập nhật trọng số ở mỗi lượt lặp", "C. Thời gian chạy máy tính", "D. Độ phân giải ảnh đầu vào"],
            answer: 1,
            explain: "Learning rate điều chỉnh độ lớn của bước cập nhật: $W_{new} = W_{old} - \\alpha \\times \\nabla Loss$."
        },
        {
            q: "Điều gì xảy ra nếu chọn Learning Rate quá lớn?",
            options: ["A. Mô hình hội tụ rất chậm", "B. Bước nhảy quá lớn làm dao động văng ra ngoài và không hội tụ (Divergence)", "C. Trọng số bằng 0", "D. Không ảnh hưởng gì"],
            answer: 1,
            explain: "Learning rate quá lớn khiến thuật toán nhảy qua lại qua điểm cực tiểu và có thể tiến tới vô cùng (diverge)."
        },
        {
            q: "Điều gì xảy ra nếu chọn Learning Rate quá nhỏ?",
            options: ["A. Trọng số bị bùng nổ", "B. Thuật toán mất rất nhiều thời gian mới hội tụ hoặc bị kẹt ở cực tiểu địa phương", "C. Độ chính xác giảm về 0", "D. Lỗi syntax error"],
            answer: 1,
            explain: "Learning rate quá nhỏ làm bước nhảy quá ngắn, tốn nhiều epoch tính toán và dễ mắc kẹt tại local minimum."
        },
        {
            q: "Công thức cập nhật trọng số trong Gradient Descent chuẩn là gì?",
            options: ["A. W = W + lr * grad", "B. W = W - lr * grad", "C. W = W * lr / grad", "D. W = grad - lr"],
            answer: 1,
            explain: "Công thức chuẩn: W = W - lr * grad (dấu trừ thể hiện đi ngược hướng tăng của Gradient)."
        },
        {
            q: "Stochastic Gradient Descent (SGD) khác Batch Gradient Descent ở điểm nào?",
            options: ["A. SGD tính gradient trên 1 mẫu ngẫu nhiên (hoặc mini-batch) mỗi bước thay vì toàn bộ tập dữ liệu", "B. SGD không dùng đạo hàm", "C. SGD chạy chậm hơn", "D. SGD chỉ dùng cho hình ảnh"],
            answer: 0,
            explain: "SGD cập nhật trọng số sau mỗi mẫu hoặc mini-batch, giúp tính toán nhanh hơn nhiều trên tập dữ liệu lớn."
        },
        {
            q: "Epoch trong quá trình huấn luyện nghĩa là gì?",
            options: ["A. Một bước nhảy của trọng số", "B. Một lượt duyệt qua toàn bộ tập dữ liệu huấn luyện (Training Set)", "C. Thời gian 1 giây", "D. Một lớp nơ-ron"],
            answer: 1,
            explain: "1 Epoch đánh dấu việc toàn bộ các mẫu dữ liệu huấn luyện đã được truyền qua mô hình 1 lần."
        },
        {
            q: "Điểm cực tiểu cục bộ (Local Minimum) là gì?",
            options: ["A. Điểm có Loss nhỏ nhất toàn cục", "B. Điểm có Gradient bằng 0 nhưng chỉ nhỏ nhất trong vùng lân cận", "C. Điểm có Loss bằng 100", "D. Điểm bắt đầu khởi tạo trọng số"],
            answer: 1,
            explain: "Local minimum là điểm có đạo hàm bằng 0, thấp hơn các điểm xung quanh nhưng chưa chắc là điểm thấp nhất toàn bộ hàm số (Global Minimum)."
        },
        {
            q: "Kỹ thuật Momentum bổ trợ cho Gradient Descent nhằm mục đích gì?",
            options: ["A. Xóa dữ liệu cũ", "B. Giúp thuật toán tích lũy đà vượt qua các vùng phẳng hoặc cực tiểu cục bộ", "C. Giảm bớt số cột", "D. Đổi màu biểu đồ"],
            answer: 1,
            explain: "Momentum thêm yếu tố quán tính từ các bước cập nhật trước đó, giúp luồn lách qua các hố cực tiểu cục bộ nhỏ."
        }
    ],
    linear: [
        {
            q: "Hồi quy tuyến tính (Linear Regression) dùng để giải quyết dạng bài toán nào?",
            options: ["A. Phân loại nhị phân (Binary Classification)", "B. Dự đoán giá trị số thực liên tục (Regression)", "C. Phân cụm dữ liệu (Clustering)", "D. Sinh ảnh tự động"],
            answer: 1,
            explain: "Linear Regression dự đoán đầu ra là một giá trị số thực liên tục (vd: giá nhà, nhiệt độ, doanh thu)."
        },
        {
            q: "Phương trình của mô hình Hồi quy tuyến tính đơn biến có dạng nào?",
            options: ["A. $y = \\frac{1}{1 + e^{-x}}$", "B. $y = w \\cdot x + b$", "C. $y = w \\cdot x^2 + b \\cdot x + c$", "D. $y = \\log(x)$"],
            answer: 1,
            explain: "Phương trình đường thẳng đơn giản: y = w*x + b với w là hệ số góc (weight) và b là sai số chặn (bias)."
        },
        {
            q: "Hàm sai số (Loss Function) phổ biến nhất của Linear Regression là gì?",
            options: ["A. Binary Cross Entropy", "B. Mean Squared Error (MSE)", "C. Hinge Loss", "D. Categorical Cross Entropy"],
            answer: 1,
            explain: "MSE tính trung bình bình phương chênh lệch giữa giá trị dự đoán và thực tế: $MSE = \\frac{1}{N}\\sum(y_{pred} - y_{true})^2$."
        },
        {
            q: "Chỉ số $R^2$ Score (Coefficient of Determination) bằng 0.85 có ý nghĩa gì?",
            options: ["A. Mô hình đoán sai 85%", "B. Mô hình giải thích được 85% biến thiên của dữ liệu thực tế", "C. Mô hình có 85 cây quyết định", "D. Thời gian chạy là 85 giây"],
            answer: 1,
            explain: "R2 score đo lường mức độ phù hợp của mô hình; 0.85 nghĩa là 85% sự biến thiên của y được giải thích bởi biến x."
        },
        {
            q: "Điều gì xảy ra khi mô hình Linear Regression bị Overfitting?",
            options: ["A. Hoạt động tốt trên tập Train nhưng kém trên tập Test", "B. Hoạt động kém trên cả tập Train lẫn Test", "C. Hoạt động hoàn hảo trên mọi tập dữ liệu", "D. Trọng số luôn bằng 0"],
            answer: 0,
            explain: "Overfitting xảy ra khi mô hình quá phức tạp, học thuộc lòng tập Train nhưng mất khả năng tổng quát hóa trên tập Test."
        },
        {
            q: "Regularization L2 (Ridge Regression) thêm thành phần nào vào hàm Loss?",
            options: ["A. Tổng giá trị tuyệt đối trọng số $\\sum |w|$", "B. Tổng bình phương trọng số $\\lambda \\sum w^2$", "C. Số lượng thuộc tính", "D. Hàm Logarit"],
            answer: 1,
            explain: "Ridge Regression phạt các trọng số có kích thước lớn bằng cách cộng thêm tổng bình phương trọng số $\\lambda \\sum w^2$ vào hàm Loss."
        },
        {
            q: "Regularization L1 (Lasso Regression) có đặc điểm nổi bật nào?",
            options: ["A. Làm trọng số của các thuộc tính không quan trọng về đúng bằng 0 (Feature Selection)", "B. Giữ nguyên mọi trọng số", "C. Làm tăng số lượng tham số", "D. Không dùng được cho dữ liệu số"],
            answer: 0,
            explain: "Lasso phạt bằng tổng giá trị tuyệt đối $|w|$, có khả năng triệt tiêu các trọng số không quan trọng về hẳn bằng 0."
        },
        {
            q: "Giả định đa cộng tuyến (Multicollinearity) trong Linear Regression là gì?",
            options: ["A. Các biến đầu vào X có mối quan hệ phụ thuộc tuyến tính mạnh lẫn nhau", "B. Các biến độc lập hoàn toàn", "C. Nhãn y là dạng chữ", "D. Dữ liệu bị thiếu 50%"],
            answer: 0,
            explain: "Multicollinearity xảy ra khi 2 hoặc nhiều biến độc lập X tương quan mạnh với nhau, làm mất ổn định hệ số ước lượng w."
        },
        {
            q: "Trong Scikit-Learn, lớp nào dùng để huấn luyện Linear Regression?",
            options: ["A. sklearn.linear_model.LinearRegression", "B. sklearn.tree.DecisionTreeRegressor", "C. sklearn.cluster.KMeans", "D. sklearn.svm.SVC"],
            answer: 0,
            explain: "Lớp `LinearRegression` thuộc module `sklearn.linear_model`."
        },
        {
            q: "Để đánh giá căn bậc hai của sai số bình phương trung bình, ta dùng chỉ số nào?",
            options: ["A. MAE", "B. RMSE (Root Mean Squared Error)", "C. R2", "D. MAPE"],
            answer: 1,
            explain: "RMSE = sqrt(MSE), có cùng đơn vị với biến mục tiêu y nên dễ giải thích thực tế hơn."
        }
    ],
    logistic: [
        {
            q: "Logistic Regression được sử dụng cho dạng bài toán nào?",
            options: ["A. Phân loại (Classification)", "B. Dự đoán số thực liên tục", "C. Giảm số chiều dữ liệu", "D. Phân cụm không nhãn"],
            answer: 0,
            explain: "Dù có chữ 'Regression' trong tên, Logistic Regression là thuật toán phân loại (nhị phân hoặc đa lớp)."
        },
        {
            q: "Hàm Sigmoid có công thức $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ nén đầu ra vào khoảng nào?",
            options: ["A. [-1, 1]", "B. [0, 1]", "C. [0, +infinity]", "D. [-infinity, +infinity]"],
            answer: 1,
            explain: "Hàm Sigmoid biến đổi mọi giá trị thực z về khoảng xác suất từ (0, 1)."
        },
        {
            q: "Hàm mất mát (Loss Function) chuẩn dùng trong Logistic Regression là gì?",
            options: ["A. Mean Squared Error (MSE)", "B. Binary Cross-Entropy (Log Loss)", "C. Huber Loss", "D. Absolute Error"],
            answer: 1,
            explain: "Binary Cross-Entropy đo lường sự chênh lệch giữa xác suất dự đoán và nhãn thực tế nhị phân (0 hoặc 1)."
        },
        {
            q: "Nếu ngưỡng quyết định (Decision Threshold) mặc định là 0.5, mẫu có $\\sigma(z) = 0.72$ sẽ được xếp vào lớp nào?",
            options: ["A. Lớp 0", "B. Lớp 1", "C. Không xác định", "D. Lớp -1"],
            answer: 1,
            explain: "Do 0.72 >= 0.5 nên mẫu dữ liệu được phân vào lớp 1."
        },
        {
            q: "Tỷ số Odds trong Logistic Regression được tính bằng công thức nào?",
            options: ["A. $p / (1 - p)$", "B. $1 / p$", "C. $p \\times (1 - p)$", "D. $p + (1 - p)$"],
            answer: 0,
            explain: "Odds là tỷ lệ giữa xác suất xảy ra sự kiện p và xác suất không xảy ra sự kiện (1 - p)."
        },
        {
            q: "Đường ranh giới quyết định (Decision Boundary) của Logistic Regression có dạng gì?",
            options: ["A. Đường cong đường tròn", "B. Siêu phẳng tuyến tính (Linear Hyperplane)", "C. Hình zigzag", "D. Đồ thị hình sin"],
            answer: 1,
            explain: "Phương trình z = W*X + b = 0 tạo ra một đường ranh giới tuyến tính phân tách các lớp."
        },
        {
            q: "Khi nào cần điều chỉnh Ngưỡng quyết định (Decision Threshold) xuống thấp hơn 0.5 (ví dụ 0.2)?",
            options: ["A. Khi muốn ưu tiên tăng độ nhạy Recall để không bỏ sót các trường hợp bệnh nguy hiểm/gian lận", "B. Khi muốn giảm bớt số lượng dữ liệu", "C. Khi dữ liệu hoàn toàn cân bằng", "D. Khi không muốn dùng hàm Sigmoid"],
            answer: 0,
            explain: "Trong chẩn đoán y khoa hoặc phát hiện gian lận, hạ ngưỡng giúp phát hiện nhiều ca dương tính hơn (tăng Recall)."
        },
        {
            q: "Kỹ thuật One-vs-Rest (OvR) dùng để làm gì trong Logistic Regression?",
            options: ["A. Xử lý bài toán phân loại đa lớp (Multi-class Classification)", "B. Tính khoảng cách Euclid", "C. Điền dữ liệu khuyết", "D. Tối ưu bộ nhớ RAM"],
            answer: 0,
            explain: "OvR huấn luyện N mô hình nhị phân độc lập để mở rộng Logistic Regression cho bài toán N lớp."
        },
        {
            q: "Trong thư viện Scikit-Learn, mô hình Logistic Regression nằm ở đâu?",
            options: ["A. sklearn.linear_model.LogisticRegression", "B. sklearn.neighbors.KNeighborsClassifier", "C. sklearn.tree.DecisionTreeClassifier", "D. sklearn.naive_bayes.GaussianNB"],
            answer: 0,
            explain: "Mô hình nằm trong module `sklearn.linear_model`."
        },
        {
            q: "Hàm Softmax khác hàm Sigmoid ở điểm nào?",
            options: ["A. Softmax nén đầu ra cho phân loại đa lớp (tổng các xác suất bằng 1)", "B. Softmax chỉ trả về số nguyên", "C. Softmax không chạy được trên GPU", "D. Softmax chạy chậm hơn 1000 lần"],
            answer: 0,
            explain: "Softmax mở rộng Sigmoid cho bài toán K lớp, đảm bảo tổng xác suất tất cả các lớp bằng 1."
        }
    ],
    tree: [
        {
            q: "Decision Tree (Cây quyết định) thực hiện việc phân loại bằng cơ chế nào?",
            options: ["A. Nhân ma trận trọng số", "B. Phân nhánh dữ liệu dựa trên chuỗi quy tắc câu hỏi If-Else", "C. Tính khoảng cách tới tâm cụm", "D. Biến đổi Fourier"],
            answer: 1,
            explain: "Cây quyết định chia nhỏ dữ liệu thành các nút nhánh thông qua các câu hỏi điều kiện If-Else."
        },
        {
            q: "Chỉ số Gini Impurity (Độ vẩn đục Gini) bằng 0 phản ánh điều gì tại một nút?",
            options: ["A. Nút chứa dữ liệu hỗn hợp 50-50", "B. Nút hoàn toàn tinh khiết (chỉ chứa các mẫu thuộc đúng 1 lớp)", "C. Nút bị lỗi", "D. Nút lá có 0 phần tử"],
            answer: 1,
            explain: "Gini = 0 có nghĩa là tất cả các phần tử tại nút đó đều thuộc cùng một nhãn (Pure Node)."
        },
        {
            q: "Khái niệm Information Gain (Độ lợi thông tin) dựa trên chỉ số nào trong lý thuyết thông tin?",
            options: ["A. Entropy", "B. Mean Squared Error", "C. Cosine Similarity", "D. Standard Deviation"],
            answer: 0,
            explain: "Information Gain = Entropy(Parent) - Average_Entropy(Children)."
        },
        {
            q: "Nhược điểm lớn nhất của mô hình Decision Tree không giới hạn độ sâu là gì?",
            options: ["A. Chạy quá chậm", "B. Rất dễ bị Overfitting do cây phát triển quá sâu học thuộc cả nhiễu", "C. Không xử lý được dữ liệu chữ", "D. Tốn quá nhiều dung lượng RAM"],
            answer: 1,
            explain: "Cây phát triển không giới hạn sẽ tạo quy tắc cho từng mẫu riêng lẻ, dẫn đến overfitting nghiêm trọng."
        },
        {
            q: "Tham số `max_depth` trong Scikit-Learn DecisionTree có tác dụng gì?",
            options: ["A. Giới hạn độ sâu tối đa của cây để chống Overfitting", "B. Quyết định số lượng cây trong rừng", "C. Chọn số thuộc tính", "D. Đổi hàm sai số"],
            answer: 0,
            explain: "Cắt tỉa tỉ mỉ độ sâu `max_depth` giúp cây bớt phức tạp và tổng quát hóa tốt hơn."
        },
        {
            q: "Nút lá (Leaf Node) của Cây quyết định là gì?",
            options: ["A. Nút gốc đầu tiên", "B. Nút cuối cùng đưa ra kết quả dự đoán nhãn/giá trị", "C. Nút chứa câu hỏi phân nhánh", "D. Nút bị xóa bỏ"],
            answer: 1,
            explain: "Leaf Node là nút kết thúc không phân nhánh nữa, trả về nhãn phân loại hoặc giá trị dự đoán."
        },
        {
            q: "Kỹ thuật Pruning (Cắt tỉa cây) có mục tiêu chính là gì?",
            options: ["A. Xóa bớt các nhánh dư thừa để giảm bớt hiện tượng Overfitting", "B. Thêm nhiều nhánh mới", "C. Tăng tốc độ đọc file CSV", "D. Đổi các biến số thành biến chữ"],
            answer: 0,
            explain: "Pruning loại bỏ các nhánh cây quá chi tiết không mang lại giá trị tổng quát."
        },
        {
            q: "Decision Tree có cần bước chuẩn hóa dữ liệu (Feature Scaling) trước khi train không?",
            options: ["A. Rất cần thiết", "B. Không cần thiết vì cây phân nhánh dựa trên so sánh ngưỡng bất biến với phép nhân/cộng thang đo", "C. Bắt buộc phải làm", "D. Chỉ cần khi dữ liệu có NaN"],
            answer: 1,
            explain: "Cây quyết định chỉ so sánh $X_i > \\text{threshold}$, do đó bất biến với các phép biến đổi thang đo (Scaling)."
        },
        {
            q: "Thuộc tính `feature_importances_` trong DecisionTree cung cấp thông tin gì?",
            options: ["A. Mức độ đóng góp/dẫn dắt của từng thuộc tính vào việc phân tách dữ liệu", "B. Tên của các dòng dữ liệu", "C. Độ sâu của từng lá", "D. Thời gian chạy của từng hàng"],
            answer: 0,
            explain: "feature_importances_ cho biết mỗi thuộc tính đóng góp bao nhiêu phần trăm vào việc giảm chỉ số Gini/Entropy."
        },
        {
            q: "Thuật toán CART (Classification and Regression Trees) tạo ra dạng cây như thế nào?",
            options: ["A. Cây nhị phân (mỗi nút phân thành tối đa 2 nhánh)", "B. Cây tam phân", "C. Cây vô số nhánh", "D. Đồ thị tròn"],
            answer: 0,
            explain: "CART xây dựng cây nhị phân (Binary Tree) với mỗi nút câu hỏi chỉ tách thành 2 nhánh Đúng/Sai."
        }
    ],
    forest: [
        {
            q: "Random Forest thuộc họ thuật toán Học máy nào?",
            options: ["A. Single Model", "B. Ensemble Learning (Học kết hợp nhiều mô hình)", "C. Unsupervised Clustering", "D. Reinforcement Learning"],
            answer: 1,
            explain: "Random Forest là mô hình Ensemble kết hợp dự đoán của tập hợp nhiều cây quyết định."
        },
        {
            q: "Kỹ thuật Bagging (Bootstrap Aggregating) trong Random Forest hoạt động ra sao?",
            options: ["A. Huấn luyện từng cây trên các tập mẫu con ngẫu nhiên được lấy mẫu có hoàn lại (Bootstrap)", "B. Chạy các cây theo thứ tự nối tiếp nhau", "C. Dùng chung 1 tập dữ liệu cho tất cả cây", "D. Xóa bớt các thuộc tính bị trùng"],
            answer: 0,
            explain: "Bagging tạo ra các tập dữ liệu con bằng cách lấy mẫu ngẫu nhiên có hoàn lại (bootstrap) để train từng cây độc lập."
        },
        {
            q: "Tính 'Ngẫu nhiên' (Randomness) trong Random Forest thể hiện ở 2 yếu tố nào?",
            options: ["A. Lấy mẫu dữ liệu ngẫu nhiên (Bootstrap) & Lựa chọn ngẫu nhiên tập thuộc tính (Feature Subspace) tại mỗi nút", "B. Đặt trọng số ngẫu nhiên & Đổi tên cột ngẫu nhiên", "C. Chọn giá trị ngẫu nhiên cho nhãn y & Xóa dòng ngẫu nhiên", "D. Chọn ngẫu nhiên số lượng CPU"],
            answer: 0,
            explain: "Hai yếu tố ngẫu nhiên cốt lõi: 1) Bootstrap mẫu dữ liệu; 2) Mỗi nút chỉ xem xét một tập con thuộc tính ngẫu nhiên."
        },
        {
            q: "Trong bài toán phân loại, Random Forest tổng hợp kết quả từ các cây bằng cách nào?",
            options: ["A. Lấy trung bình cộng", "B. Biểu quyết đa số (Majority Voting)", "C. Chọn cây đầu tiên", "D. Chọn cây sâu nhất"],
            answer: 1,
            explain: "Đối với Classification, kết quả cuối cùng là nhãn được nhiều cây bầu chọn nhất (Majority Vote)."
        },
        {
            q: "Đối với bài toán Hồi quy (Regression), Random Forest tổng hợp kết quả như thế nào?",
            options: ["A. Lấy giá trị trung bình (Average) từ dự đoán của tất cả các cây", "B. Lấy giá trị lớn nhất", "C. Biểu quyết đa số", "D. Nhân tất cả các kết quả lại với nhau"],
            answer: 0,
            explain: "Đối với Regression, kết quả dự đoán là trung bình cộng đầu ra của toàn bộ các cây."
        },
        {
            q: "Ưu điểm lớn nhất của Random Forest so với một Decision Tree đơn lẻ là gì?",
            options: ["A. Giảm thiểu rủi ro Overfitting và có độ ổn định/chính xác cao hơn nhiều", "B. Chạy nhanh hơn 100 lần", "C. Dễ vẽ biểu đồ hơn", "D. Không tốn bộ nhớ RAM"],
            answer: 0,
            explain: "Việc kết hợp nhiều cây đa dạng giúp triệt tiêu độ phương sai (Variance), chống overfitting hiệu quả."
        },
        {
            q: "Tham số `n_estimators` trong RandomForestClassifier đại diện cho điều gì?",
            options: ["A. Số lượng cây quyết định trong rừng", "B. Độ sâu tối đa", "C. Số thuộc tính tối đa", "D. Số lượng CPU sử dụng"],
            answer: 0,
            explain: "n_estimators quy định tổng số cây quyết định được tạo ra trong mô hình Random Forest."
        },
        {
            q: "Tham số `n_jobs=-1` trong Scikit-Learn có công dụng gì?",
            options: ["A. Tận dụng tối đa tất cả các nhân CPU có sẵn để huấn luyện các cây song song", "B. Tắt tất cả CPU", "C. Chạy trên 1 core duy nhất", "D. Bỏ qua các bước kiểm tra lỗi"],
            answer: 0,
            explain: "n_jobs=-1 cho phép Scikit-Learn phân chia các cây huấn luyện song song trên toàn bộ nhân CPU của máy."
        },
        {
            q: "Dữ liệu OOB (Out-of-Bag) trong Random Forest là gì?",
            options: ["A. Khoảng 1/3 mẫu dữ liệu không được chọn trong quá trình Bootstrap của một cây, dùng để đánh giá kiểm thử tự nhiên", "B. Dữ liệu bị lỗi", "C. Dữ liệu xuất ra file CSV", "D. Dữ liệu ngoài bộ nhớ RAM"],
            answer: 0,
            explain: "Khoảng 36.8% mẫu dữ liệu không nằm trong tập Bootstrap của một cây được gọi là OOB data, dùng để kiểm thử độ chính xác mà không cần tập validation riêng."
        },
        {
            q: "Nhược điểm chính của Random Forest so với Decision Tree đơn lẻ là gì?",
            options: ["A. Khó giải thích trực quan (Black-box) và tốn tài nguyên tính toán/bộ nhớ hơn", "B. Độ chính xác kém hơn", "C. Dễ bị rò rỉ dữ liệu", "D. Không làm việc được với dữ liệu bảng"],
            answer: 0,
            explain: "Do mô hình chứa hàng trăm cây, việc giải thích chính xác quy tắc đưa ra quyết định phức tạp hơn nhiều so với 1 cây đơn."
        }
    ],
    evaluation: [
        {
            q: "Công thức tính Độ chính xác tổng quan (Accuracy) là gì?",
            options: ["A. $(TP + TN) / (TP + TN + FP + FN)$", "B. $TP / (TP + FP)$", "C. $TP / (TP + FN)$", "D. $TN / (TN + FP)$"],
            answer: 0,
            explain: "Accuracy = Tổng số mẫu đoán đúng / Tổng số mẫu dữ liệu."
        },
        {
            q: "Khi tập dữ liệu bị mất cân bằng lớp nghiêm trọng (Imbalanced Data: 99% Âm tính, 1% Dương tính), chỉ số nào KHÔNG nên dùng làm thước đo chính?",
            options: ["A. F1-Score", "B. Precision", "C. Accuracy", "D. Recall"],
            answer: 2,
            explain: "Nếu mô hình đoán toàn bộ là Âm tính, Accuracy vẫn đạt 99% dù không phát hiện được mẫu Dương tính nào."
        },
        {
            q: "Chỉ số Precision (Độ chính xác trên các mẫu dự đoán Dương tính) tập trung vào điều gì?",
            options: ["A. Trong số các mẫu mô hình ĐOÁN là Dương tính, có bao nhiêu % thực sự Dương tính?", "B. Trong số các mẫu THỰC SỰ Dương tính, mô hình tìm ra được bao nhiêu %?", "C. Tổng số mẫu đúng", "D. Tỷ lệ đoán sai"],
            answer: 0,
            explain: "Precision = TP / (TP + FP). Giúp đánh giá mức độ tin cậy khi mô hình đưa ra cảnh báo."
        },
        {
            q: "Chỉ số Recall (Độ nhạy / Tỷ lệ tìm thấy) được tính bằng công thức nào?",
            options: ["A. $TP / (TP + FN)$", "B. $TP / (TP + FP)$", "C. $TN / (TN + FP)$", "D. $(TP + TN) / Total$"],
            answer: 0,
            explain: "Recall = TP / (TP + FN). Đo lường khả năng bắt trúng không bỏ sót các trường hợp thực tế Dương tính."
        },
        {
            q: "F1-Score là trung bình harmonica giữa 2 chỉ số nào?",
            options: ["A. Accuracy và Precision", "B. Precision và Recall", "C. Recall và Specificity", "D. Accuracy và MSE"],
            answer: 1,
            explain: "F1-Score = 2 * (Precision * Recall) / (Precision + Recall)."
        },
        {
            q: "Trong chẩn đoán bệnh ung thư hiểm nghèo, chỉ số nào quan trọng hơn để tránh bỏ sót bệnh nhân?",
            options: ["A. Precision", "B. Recall", "C. Accuracy", "D. Specificity"],
            answer: 1,
            explain: "Ưu tiên Recall cao để thà báo nhầm (False Positive) chứ không được bỏ sót người mắc bệnh (False Negative)."
        },
        {
            q: "Trong hệ thống lọc Email Spam, chỉ số nào quan trọng hơn để tránh chuyển nhầm thư quan trọng vào mục Rác?",
            options: ["A. Precision", "B. Recall", "C. MSE", "D. Loss"],
            answer: 0,
            explain: "Ưu tiên Precision cao để khi mô hình phán quyết 'Spam' thì phải cực kỳ chắc chắn, tránh làm mất mail quan trọng của người dùng."
        },
        {
            q: "Ma trận nhầm lẫn (Confusion Matrix) dạng nhị phân có kích thước bao nhiêu?",
            options: ["A. 2x2", "B. 3x3", "C. 4x4", "D. 1x4"],
            answer: 0,
            explain: "Ma trận nhầm lẫn nhị phân gồm 2 hàng (Thực tế 0/1) và 2 cột (Dự đoán 0/1) tạo thành 4 ô TP, FP, FN, TN."
        },
        {
            q: "Đường cong ROC (Receiver Operating Characteristic) biểu diễn mối quan hệ giữa 2 trục nào?",
            options: ["A. True Positive Rate (Recall) trên trục Y và False Positive Rate (FPR) trên trục X", "B. Precision trên trục Y và Recall trên trục X", "C. Loss trên trục Y và Epoch trên trục X", "D. Accuracy trên trục Y và Time trên trục X"],
            answer: 0,
            explain: "Đường cong ROC vẽ TPR theo FPR ứng với các ngưỡng phân loại (threshold) thay đổi khác nhau."
        },
        {
            q: "Chỉ số AUC-ROC bằng 1.0 thể hiện điều gì?",
            options: ["A. Mô hình phân loại ngẫu nhiên 50/50", "B. Mô hình phân loại hoàn hảo 100% giữa 2 lớp", "C. Mô hình bị lỗi nặng", "D. Dữ liệu hoàn toàn trùng nhau"],
            answer: 1,
            explain: "AUC = 1.0 đại diện cho một mô hình phân loại hoàn hảo, phân tách tuyệt đối 2 lớp mà không có sai sót."
        }
    ],
    feature: [
        {
            q: "Feature Engineering (Kỹ nghệ đặc trưng) là quá trình gì?",
            options: ["A. Cài đặt hệ điều hành", "B. Chuyển đổi, chuẩn hóa và tạo ra các đặc trưng dữ liệu mới để tối ưu hiệu năng mô hình", "C. Mua thêm phần cứng GPU", "D. Thiết kế giao diện đồ họa"],
            answer: 1,
            explain: "Kỹ nghệ đặc trưng biến đổi dữ liệu thô thành các biểu diễn số thích hợp giúp thuật toán học hiệu quả nhất."
        },
        {
            q: "Kỹ thuật Standard Scaling (Standardization) biến đổi dữ liệu về phân phối có thông số nào?",
            options: ["A. Mean = 0 và Standard Deviation (Độ lệch chuẩn) = 1", "B. Min = 0 và Max = 1", "C. Mean = 100", "D. Median = 0"],
            answer: 0,
            explain: "StandardScaler đưa dữ liệu về dạng $z = (x - \\mu) / \\sigma$ với trung bình bằng 0 và độ lệch chuẩn bằng 1."
        },
        {
            q: "Kỹ thuật Min-Max Scaling biến đổi giá trị dữ liệu nằm gọn trong khoảng nào?",
            options: ["A. [-1, 1]", "B. [0, 1]", "C. [-infinity, +infinity]", "D. [0, 100]"],
            answer: 1,
            explain: "MinMaxScaler nén dữ liệu về đoạn [0, 1] theo công thức $x_{new} = (x - min) / (max - min)$."
        },
        {
            q: "Kỹ thuật One-Hot Encoding biến cột phân loại (vd: ['Đỏ', 'Xanh', 'Vàng']) thành cấu trúc nào?",
            options: ["A. Các cột nhị phân 0 và 1 tương ứng cho mỗi nhãn danh mục", "B. Các số nguyên 1, 2, 3 trong cùng 1 cột", "C. Chuỗi mã hóa Base64", "D. Mã định danh UUID"],
            answer: 0,
            explain: "One-Hot Encoding tạo ra N cột mới dạng 0/1 tương ứng với N danh mục để tránh thứ tự ưu tiên giả định."
        },
        {
            q: "Tại sao không nên dùng Label Encoding (chuyển chữ sang số 1, 2, 3) cho các thuộc tính không có thứ tự (vd: ['Hà Nội', 'Đà Nẵng', 'TPHCM'])?",
            options: ["A. Vì thuật toán ML có thể nhầm tưởng TPHCM (3) có giá trị lớn gấp 3 lần Hà Nội (1)", "B. Vì làm dữ liệu bị phồng bộ nhớ", "C. Vì Python không hỗ trợ", "D. Vì gây lỗi chia cho 0"],
            answer: 0,
            explain: "Label Encoding gán các số thứ tự có thể khiến thuật toán tuyến tính/khoảng cách hiểu sai về thứ tự lớn bé giả tạo."
        },
        {
            q: "Hiện tượng Rò rỉ dữ liệu (Data Leakage) trong tiền xử lý xảy ra khi nào?",
            options: ["A. Khi tính toán các chỉ số Scaling (fit) trên toàn bộ tập dữ liệu trước khi chia Train/Test", "B. Khi chia tập Train/Test trước rồi mới fit trên tập Train", "C. Khi dữ liệu quá ít", "D. Khi dùng thư viện Scikit-Learn"],
            answer: 0,
            explain: "Nếu `fit` scaler trên toàn bộ dữ liệu bao gồm cả tập Test, thông tin từ tập Test đã bị rò rỉ vào tập Train."
        },
        {
            q: "Phương thức nào trong Scikit-Learn chỉ tính toán thông số (mean, std) mà không biến đổi dữ liệu?",
            options: ["A. fit()", "B. transform()", "C. fit_transform()", "D. predict()"],
            answer: 0,
            explain: "fit() học các thông số từ dữ liệu; transform() áp dụng biến đổi; fit_transform() thực hiện cả hai."
        },
        {
            q: "Tạo thuộc tính mới 'Diện tích = Chiều dài * Chiều rộng' là ví dụ của kỹ thuật nào?",
            options: ["A. Interaction Features (Đặc trưng tương tác / kết hợp)", "B. One-Hot Encoding", "C. Feature Reduction", "D. Imputation"],
            answer: 0,
            explain: "Kết hợp 2 hoặc nhiều thuộc tính gốc bằng phép toán để tạo đặc trưng mới mang ý nghĩa nghiệp vụ."
        },
        {
            q: "Phép biến đổi Log (Log Transformation: np.log1p(x)) thường áp dụng cho dữ liệu nào?",
            options: ["A. Dữ liệu bị lệch phải nặng (Right-skewed) với giá trị kéo dài để đưa về phân phối chuẩn hơn", "B. Dữ liệu đã chuẩn hóa", "C. Dữ liệu dạng chữ", "D. Dữ liệu toàn số 0"],
            answer: 0,
            explain: "Log transformation nén các giá trị cực lớn, giảm độ lệch phải của phân phối dữ liệu (như thu nhập, giá nhà)."
        },
        {
            q: "Trong Scikit-Learn, lớp nào dùng để mã hóa One-Hot Encoding?",
            options: ["A. OneHotEncoder", "B. LabelEncoder", "C. StandardScaler", "D. Binarizer"],
            answer: 0,
            explain: "`OneHotEncoder` nằm trong module `sklearn.preprocessing`."
        }
    ],
    kmeans_pca: [
        {
            q: "K-Means thuộc nhóm thuật toán nào trong Học máy?",
            options: ["A. Supervised Learning (Học có giám sát)", "B. Unsupervised Learning (Học không giám sát)", "C. Semi-supervised Learning", "D. Reinforcement Learning"],
            answer: 1,
            explain: "K-Means phân cụm các mẫu dữ liệu không có nhãn trước dựa vào khoảng cách tương đồng."
        },
        {
            q: "Chữ 'K' trong thuật toán K-Means đại diện cho điều gì?",
            options: ["A. Số lượng thuộc tính", "B. Số lượng cụm (Clusters) cần phân chia do người dùng chỉ định trước", "C. Kích thước tập dữ liệu", "D. Số vòng lặp"],
            answer: 1,
            explain: "K là số lượng cụm phân chia mà lập trình viên lựa chọn trước."
        },
        {
            q: "Thuật toán K-Means dừng lại khi nào?",
            options: ["A. Khi vị trí các tâm cụm (Centroids) không còn thay đổi hoặc đạt số vòng lặp tối đa", "B. Khi Loss bằng 0", "C. Khi hết dung lượng RAM", "D. Sau 1 vòng lặp duy nhất"],
            answer: 0,
            explain: "Thuật toán lặp lại việc gán mẫu vào tâm gần nhất và cập nhật lại vị trí tâm cụm cho đến khi hội tụ."
        },
        {
            q: "Phương pháp Elbow Method (Khuỷu tay) dùng để làm gì?",
            options: ["A. Tìm số lượng cụm K tối ưu bằng cách quan sát điểm gãy trên đồ thị WCSS / Inertia", "B. Tìm độ sâu của cây", "C. Chuẩn hóa dữ liệu", "D. Tính hệ số Pearson"],
            answer: 0,
            explain: "Elbow Method vẽ chỉ số tổng bình phương khoảng cách WCSS theo K; điểm 'khuỷu tay' chọn làm K tối ưu."
        },
        {
            q: "K-Means nhạy cảm với điều gì nhất?",
            options: ["A. Điểm khởi tạo tâm cụm ban đầu & Giá trị ngoại lệ Outliers", "B. Dữ liệu số nguyên", "C. Tên cột chữ", "D. Số lượng hàng lớn"],
            answer: 0,
            explain: "Khởi tạo tâm ngẫu nhiên kém hoặc có Outliers kéo lệch tâm cụm có thể dẫn đến kết quả phân cụm không tốt."
        },
        {
            q: "PCA (Principal Component Analysis - Phân tích thành phần chính) nhằm mục đích gì?",
            options: ["A. Giảm số chiều dữ liệu (Dimensionality Reduction) bằng cách chiếu dữ liệu lên các trục có phương sai cực đại", "B. Phân loại nhị phân", "C. Điền dữ liệu NaN", "D. Tăng số lượng cột"],
            answer: 0,
            explain: "PCA rút gọn số lượng cột dữ liệu nhưng giữ lại tối đa thông tin biến thiên (variance) gốc."
        },
        {
            q: "Thành phần chính thứ nhất (PC1) trong PCA có đặc điểm gì?",
            options: ["A. Trục giữ được độ phương sai (Variance) lớn nhất của dữ liệu", "B. Trục có phương sai bằng 0", "C. Trục vuông góc với tất cả các điểm", "D. Trục chứa ít thông tin nhất"],
            answer: 0,
            explain: "PC1 là hướng vector tích lũy được tỷ lệ phương sai thông tin lớn nhất."
        },
        {
            q: "Các thành phần chính (Principal Components) trong PCA có mối quan hệ như thế nào với nhau?",
            options: ["A. Trực giao (Orthogonal / Trực tiếp vuông góc và không tương quan với nhau)", "B. Tương quan hoàn hảo", "C. Song song hoàn toàn", "D. Trùng nhau"],
            answer: 0,
            explain: "Mọi trục PC mới đều vuông góc (orthogonal) với nhau, loại bỏ hoàn toàn hiện tượng đa cộng tuyến."
        },
        {
            q: "Tại sao nên thực hiện Feature Scaling (StandardScaler) trước khi chạy PCA?",
            options: ["A. Vì PCA bị chi phối bởi các biến có thang đo lớn làm sai lệch hướng phương sai cực đại", "B. Vì PCA bắt buộc dữ liệu ở dạng chữ", "C. Để tăng dung lượng dữ liệu", "D. Không cần thiết"],
            answer: 0,
            explain: "Nếu không scaling, biến có đơn vị lớn (vd: Lương 10,000,000) sẽ áp đảo hoàn toàn biến có đơn vị nhỏ (vd: Tuổi 30)."
        },
        {
            q: "Tỷ lệ phương sai giải thích tích lũy (Explained Variance Ratio) trong PCA cho biết điều gì?",
            options: ["A. Phần trăm thông tin gốc được giữ lại sau khi giảm bớt số chiều", "B. Số lượng dòng dữ liệu", "C. Thời gian huấn luyện", "D. Tỷ lệ lỗi đoán sai"],
            answer: 0,
            explain: "Ví dụ 2 thành phần chính giữ được 92% Explained Variance nghĩa là chỉ mất 8% thông tin sau khi giảm chiều."
        }
    ],
    mlp: [
        {
            q: "Kiến trúc Perceptron cơ bản nhất gồm các thành phần nào?",
            options: ["A. Đầu vào (Inputs), Trọng số (Weights), Tổng có trọng số + Bias, và Hàm kích hoạt (Activation Function)", "B. Cây quyết định và Rừng ngẫu nhiên", "C. Vector Database và Embeddings", "D. Lớp Convolution và Pooling"],
            answer: 0,
            explain: "Perceptron nhân đầu vào với trọng số, cộng bias và nén qua hàm kích hoạt để ra đầu ra."
        },
        {
            q: "MLP (Multi-Layer Perceptron) khác với Single-Layer Perceptron ở điểm nào?",
            options: ["A. MLP có thêm ít nhất một lớp ẩn (Hidden Layer) giữa đầu vào và đầu ra", "B. MLP không dùng trọng số", "C. MLP chỉ chạy trên CPU", "D. MLP không dùng hàm kích hoạt"],
            answer: 0,
            explain: "Các lớp ẩn (Hidden Layers) cho phép MLP học các biểu diễn đặc trưng trung gian phi tuyến phức tạp."
        },
        {
            q: "Tại sao cần sử dụng Hàm kích hoạt phi tuyến (Non-linear Activation Function) trong Mạng nơ-ron?",
            options: ["A. Nếu không có hàm phi tuyến, mạng nhiều lớp chỉ tương đương với một phép biến đổi tuyến tính đơn giản", "B. Để tăng tốc độ mạng 1000 lần", "C. Để làm đẹp code", "D. Để nén dung lượng file"],
            answer: 0,
            explain: "Các hàm kích hoạt phi tuyến cho phép mạng nơ-ron học và xấp xỉ bất kỳ hàm phi tuyến phức tạp nào (Universal Approximation Theorem)."
        },
        {
            q: "Hàm kích hoạt ReLU (Rectified Linear Unit) có công thức là gì?",
            options: ["A. $f(x) = \\max(0, x)$", "B. $f(x) = \\frac{1}{1 + e^{-x}}$", "C. $f(x) = \\tanh(x)$", "D. $f(x) = x^2$"],
            answer: 0,
            explain: "ReLU trả về 0 nếu x < 0 và giữ nguyên x nếu x >= 0."
        },
        {
            q: "Ưu điểm nổi bật của hàm kích hoạt ReLU so với Sigmoid trong mạng nơ-ron sâu là gì?",
            options: ["A. Giảm thiểu hiện tượng Triệt tiêu đạo hàm (Vanishing Gradient Problem) ở miền dương", "B. Luôn trả về giá trị âm", "C. Tốn nhiều phép tính phức tạp hơn", "D. Nén đầu ra về khoảng [0, 1]"],
            answer: 0,
            explain: "Đạo hàm của ReLU bằng 1 với mọi x > 0, giúp đạo hàm truyền ngược không bị giảm triệt tiêu về 0 khi qua nhiều lớp."
        },
        {
            q: "Thuật toán Lan truyền ngược (Backpropagation) sử dụng quy tắc toán học nào để tính đạo hàm riêng cho từng trọng số?",
            options: ["A. Quy tắc chuỗi (Chain Rule)", "B. Định lý Pythagoras", "C. Phép phân rã SVD", "D. Quy tắc Cramer"],
            answer: 0,
            explain: "Chain Rule cho phép tính đạo hàm của hàm hợp từ đầu ra ngược về các trọng số ở từng lớp phía trước."
        },
        {
            q: "Lớp liên kết đầy đủ (Dense Layer / Fully Connected Layer) có đặc điểm gì?",
            options: ["A. Mỗi nơ-ron ở lớp hiện tại kết nối với toàn bộ các nơ-ron ở lớp ngay trước đó", "B. Các nơ-ron không có kết nối nào", "C. Chỉ kết nối với nơ-ron chính giữa", "D. Chỉ nhận đầu vào dạng ảnh"],
            answer: 0,
            explain: "Trong Dense layer, mọi node ở lớp l đều nhận tín hiệu từ tất cả các node ở lớp l-1."
        },
        {
            q: "Kỹ thuật Dropout trong huấn luyện mạng nơ-ron làm nhiệm vụ gì?",
            options: ["A. Ngẫu nhiên 'tắt' một tỷ lệ nơ-ron ở mỗi lượt train để chống Overfitting", "B. Xóa bỏ dữ liệu hỏng", "C. Giảm độ phân giải ảnh", "D. Dừng cuộc họp"],
            answer: 0,
            explain: "Dropout ngắt ngẫu nhiên một số nơ-ron giúp mạng không bị phụ thuộc quá mức vào bất kỳ nơ-ron cá biệt nào."
        },
        {
            q: "Hiện tượng Bùng nổ đạo hàm (Exploding Gradient) xảy ra khi nào?",
            options: ["A. Giá trị đạo hàm tích lũy trong lan truyền ngược tăng quá lớn làm trọng số bị NaN/Inf", "B. Đạo hàm bằng 0", "C. Mạng chạy quá nhanh", "D. Bộ nhớ GPU bị trống"],
            answer: 0,
            explain: "Exploding gradient làm trọng số thay đổi những bước quá lớn, khiến quá trình train không thể hội tụ."
        },
        {
            q: "Hàm kích hoạt nào thích hợp nhất ở Lớp đầu ra (Output Layer) cho bài toán phân loại đa lớp (Multi-class)?",
            options: ["A. Softmax", "B. Linear", "C. ReLU", "D. Sigmoid"],
            answer: 0,
            explain: "Softmax chuyển đổi vector logit đầu ra thành phân phối xác suất cho tất cả các lớp với tổng bằng 1."
        }
    ],
    pytorch: [
        {
            q: "Khái niệm trung tâm Tensor trong PyTorch tương tự như cấu trúc dữ liệu nào trong NumPy?",
            options: ["A. ndarray", "B. List", "C. Dictionary", "D. Tuple"],
            answer: 0,
            explain: "PyTorch Tensor tương tự NumPy ndarray nhưng bổ sung khả năng tính toán trên GPU và tự động tính đạo hàm."
        },
        {
            q: "Để chuyển một Tensor `x` sang tính toán trên thiết bị GPU CUDA, cú pháp nào đúng?",
            options: ["A. x = x.to('cuda')", "B. x.convert_gpu()", "C. x.gpu()", "D. x.set_device('gpu')"],
            answer: 0,
            explain: "Phương thức `x.to('cuda')` hoặc `x.cuda()` di chuyển dữ liệu tensor vào bộ nhớ VRAM của GPU."
        },
        {
            q: "Thuộc tính nào của Tensor báo cho PyTorch biết cần theo dõi và tính đạo hàm lan truyền ngược?",
            options: ["A. requires_grad=True", "B. track_history=True", "C. autograd=True", "D. trainable=True"],
            answer: 0,
            explain: "Khi `requires_grad=True`, PyTorch sẽ xây dựng Đồ thị tính toán (Computational Graph) cho tensor đó."
        },
        {
            q: "Phương thức nào kích hoạt quá trình tự động tính đạo hàm (Autograd) từ giá trị Loss?",
            options: ["A. loss.backward()", "B. loss.compute()", "C. loss.grad()", "D. loss.step()"],
            answer: 0,
            explain: "loss.backward() thực hiện lan truyền ngược tính đạo hàm của loss theo tất cả các tham số có `requires_grad=True`."
        },
        {
            q: "Tại sao cần gọi `optimizer.zero_grad()` trước mỗi bước huấn luyện trong PyTorch?",
            options: ["A. Vì PyTorch mặc định cộng dồn (accumulate) đạo hàm ở các lần backward kế tiếp", "B. Để xóa dữ liệu đầu vào", "C. Để giải phóng VRAM", "D. Để reset trọng số về 0"],
            answer: 0,
            explain: "Đạo hàm được cộng dồn vào `.grad` theo thiết kế; do đó phải zero_grad() để xóa gradient của lượt trước."
        },
        {
            q: "Lệnh `optimizer.step()` làm nhiệm vụ gì?",
            options: ["A. Cập nhật các trọng số mô hình dựa trên đạo hàm vừa tính được", "B. Xóa mô hình", "C. Chuyển sang epoch tiếp theo", "D. In ra màn hình"],
            answer: 0,
            explain: "optimizer.step() thực thi thuật toán tối ưu (vd: Adam, SGD) để cập nhật giá trị tham số."
        },
        {
            q: "Trong PyTorch, tất cả các kiến trúc mạng nơ-ron tùy chỉnh phải kế thừa từ lớp nào?",
            options: ["A. torch.nn.Module", "B. torch.Tensor", "C. torch.autograd.Function", "D. torch.optim.Optimizer"],
            answer: 0,
            explain: "Lớp mô hình custom bắt buộc kế thừa từ `nn.Module` và đè lại phương thức `forward()`."
        },
        {
            q: "Phương thức bắt buộc phải khai báo trong mô hình PyTorch để định nghĩa luồng tính toán dữ liệu là gì?",
            options: ["A. forward(self, x)", "B. backward(self, x)", "C. predict(self, x)", "D. run(self, x)"],
            answer: 0,
            explain: "Phương thức `forward(self, x)` mô tả cách dữ liệu truyền qua các lớp từ đầu vào đến đầu ra."
        },
        {
            q: "Chế độ `with torch.no_grad():` thường được sử dụng khi nào?",
            options: ["A. Khi Đánh giá / Kiểm thử (Evaluation / Inference) để tắt tính đạo hàm, tiết kiệm bộ nhớ và tăng tốc", "B. Khi huấn luyện mô hình", "C. Khi khởi tạo trọng số", "D. Khi lưu file weights"],
            answer: 0,
            explain: "Khi dự đoán (Inference), không cần tính gradient nên `torch.no_grad()` giúp tiết kiệm bộ nhớ và chạy nhanh hơn."
        },
        {
            q: "Lớp `DataLoader` trong PyTorch giúp giải quyết vấn đề gì?",
            options: ["A. Tự động chia Mini-batch, xáo trộn dữ liệu (Shuffle) và nạp dữ liệu đa tiến trình (Multiprocessing)", "B. Viết mã HTML", "C. Tự động sửa lỗi syntax", "D. Nén ảnh JPG thành PNG"],
            answer: 0,
            explain: "DataLoader quản lý việc tạo các batch dữ liệu, shuffle và load song song bằng worker threads."
        }
    ],
    cnn: [
        {
            q: "Thao tác Tích chập (Convolution) trong CNN thực hiện bằng cách nào?",
            options: ["A. Trượt một bộ lọc (Kernel / Filter) qua ảnh để tính tổng tích từng phần tử, trích xuất đặc trưng không gian", "B. Xóa bỏ các điểm ảnh màu đen", "C. Đảo ngược thứ tự các dòng ảnh", "D. Nén ảnh thành file zip"],
            answer: 0,
            explain: "Ma trận Kernel nhỏ trượt qua ảnh để phát hiện cạnh, góc, họa tiết và cấu trúc thị giác."
        },
        {
            q: "Lớp Pooling (ví dụ Max-Pooling) có mục đích chính là gì?",
            options: ["A. Giảm kích thước không gian (chiều rộng x chiều cao) của Feature Map để giảm tính toán và tăng tính bất biến vị trí", "B. Tăng độ phân giải ảnh", "C. Đổi màu ảnh", "D. Thêm trọng số mới"],
            answer: 0,
            explain: "Max-Pooling giữ lại giá trị cực đại trong từng vùng nhỏ, giúp thu gọn kích thước và chống nhạy cảm vị trí."
        },
        {
            q: "Số bước dịch chuyển của bộ lọc Kernel trên ảnh được gọi là gì?",
            options: ["A. Stride", "B. Padding", "C. Channel", "D. Epoch"],
            answer: 0,
            explain: "Stride xác định số pixel mà Kernel dịch chuyển mỗi bước khi trượt trên ảnh."
        },
        {
            q: "Kỹ thuật Padding (ví dụ Zero-Padding) dùng để giải quyết vấn đề gì?",
            options: ["A. Giữ nguyên kích thước viền ảnh sau khi tích chập và tránh mất thông tin ở các mép ảnh", "B. Làm mờ ảnh", "C. Tăng số lượng màu", "D. Xóa bớt ô trống"],
            answer: 0,
            explain: "Padding thêm các hàng/cột số 0 bao quanh biên ảnh để kích thước output không bị thu hẹp quá nhanh."
        },
        {
            q: "Ở các lớp CNN đầu tiên (Early Layers), bộ lọc thường học được các đặc trưng gì?",
            options: ["A. Các đặc trưng đơn giản cấp thấp như đường nét, góc cạnh, mảng màu", "B. Toàn bộ khuôn mặt con người", "C. Chữ viết đoạn văn", "D. Nhãn phân loại cuối"],
            answer: 0,
            explain: "Các lớp đầu học đặc trưng hình học thô (cạnh, góc), các lớp sau ghép lại thành bộ phận và vật thể hoàn chỉnh."
        },
        {
            q: "Feature Map trong CNN đại diện cho điều gì?",
            options: ["A. Kết quả đầu ra của lớp tích chập thể hiện vị trí phản ứng của các bộ lọc đặc trưng", "B. Bản đồ địa lý", "C. Tệp cấu hình YAML", "D. Danh sách các class"],
            answer: 0,
            explain: "Feature Map chứa các giá trị thể hiện mức độ xuất hiện của đặc trưng tại từng vùng không gian."
        },
        {
            q: "Lớp `Flatten` trong kiến trúc CNN có nhiệm vụ gì?",
            options: ["A. Duỗi phẳng Feature Map 2D/3D thành Vector 1D trước khi đưa vào các lớp Dense/Fully Connected", "B. Làm phẳng màu ảnh", "C. Xóa các trọng số âm", "D. Đảo ngược các pixel"],
            answer: 0,
            explain: "Flatten biến ma trận đa chiều thành vector 1D để nạp vào lớp Fully Connected phân loại cuối cùng."
        },
        {
            q: "Kiến trúc CNN nổi tiếng nào đã giành chiến thắng cuộc thi ImageNet 2012 đánh dấu kỷ nguyên nổ của Deep Learning?",
            options: ["A. AlexNet", "B. LeNet-5", "C. ResNet-50", "D. VGG-16"],
            answer: 0,
            explain: "AlexNet chiến thắng ImageNet 2012 tạo nên bước ngoặt bùng nổ của mạng tích chập sâu trên GPU."
        },
        {
            q: "Khối kết nối tắt (Skip Connection / Residual Connection) trong kiến trúc ResNet giải quyết vấn đề gì?",
            options: ["A. Giải quyết hiện tượng Triệt tiêu đạo hàm (Vanishing Gradient) ở các mạng nơ-ron cực sâu (100+ lớp)", "B. Tăng gấp đôi số ảnh", "C. Giảm dung lượng RAM", "D. Tự động gán nhãn ảnh"],
            answer: 0,
            explain: "Residual Connection cộng trực tiếp đầu vào $x$ vào đầu ra $F(x) + x$, giúp đạo hàm truyền thẳng về các lớp trước."
        },
        {
            q: "Kỹ thuật Transfer Learning (Học chuyển giao) trong Computer Vision là gì?",
            options: ["A. Tái sử dụng trọng số của mô hình đã train trên tập dữ liệu khổng lồ (ImageNet) để fine-tune cho bài toán mới", "B. Chuyển ảnh từ PNG sang JPG", "C. Copy code từ GitHub", "D. Train mạng từ đầu với ngẫu nhiên weights"],
            answer: 0,
            explain: "Transfer Learning giúp tiết kiệm thời gian và tài nguyên bằng cách tận dụng đặc trưng thị giác đã học từ mô hình tiền huấn luyện."
        }
    ],
    rnn: [
        {
            q: "RNN (Recurrent Neural Network) được thiết kế đặc thù cho dạng dữ liệu nào?",
            options: ["A. Dữ liệu chuỗi tuần tự (Sequential Data) có yếu tố thời gian/ngữ cảnh trước sau", "B. Ảnh tĩnh đơn lẻ", "C. Bảng dữ liệu độc lập không thứ tự", "D. File âm thanh nén zip"],
            answer: 0,
            explain: "RNN xử lý dữ liệu chuỗi (văn bản, chuỗi thời gian, âm thanh) nhờ có vòng lặp lưu trữ trạng thái ẩn (Hidden State)."
        },
        {
            q: "Trạng thái ẩn (Hidden State $h_t$) trong RNN đóng vai trò như thế nào?",
            options: ["A. Như một bộ nhớ lưu trữ ngữ cảnh thông tin từ các bước thời gian quá khứ ($t-1, t-2...$)", "B. Lưu trữ địa chỉ IP", "C. Lưu trữ ảnh đầu vào", "D. Đếm số lượng từ"],
            answer: 0,
            explain: "Hidden State $h_t$ nén thông tin quá khứ và được truyền tiếp sang bước thời gian $t+1$."
        },
        {
            q: "Vấn đề nghiêm trọng nhất của RNN chuẩn khi xử lý chuỗi văn bản dài là gì?",
            options: ["A. Triệt tiêu đạo hàm (Vanishing Gradient) làm mất khả năng phụ thuộc khoảng xa (Long-term Dependency)", "B. Chạy quá nhanh", "C. Tốn ít RAM", "D. Không nhân được ma trận"],
            answer: 0,
            explain: "Khi chuỗi dài, đạo hàm lan truyền qua nhiều bước thời gian bị nhân liên tiếp với số nhỏ < 1 dẫn tới tiêu biến về 0."
        },
        {
            q: "Mạng LSTM (Long Short-Term Memory) khắc phục nhược điểm của RNN bằng cấu trúc nào?",
            options: ["A. Trạng thái ô (Cell State) và 3 Cổng điều khiển (Forget, Input, Output Gates)", "B. Thêm lớp Tích chập Conv2D", "C. Bỏ qua các bước quá khứ", "D. Tăng tốc độ CPU"],
            answer: 0,
            explain: "Cell State như đường cao tốc thông tin, điều tiết bởi 3 cổng để chọn lọc ghi/xóa/truyền thông tin dài hạn."
        },
        {
            q: "Cổng Quên (Forget Gate) trong tế bào LSTM làm nhiệm vụ gì?",
            options: ["A. Quyết định bao nhiêu phần trăm thông tin từ Cell State cũ cần bị xóa bỏ", "B. Xóa toàn bộ mô hình", "C. Bỏ qua câu hỏi người dùng", "D. Xóa file log"],
            answer: 0,
            explain: "Forget gate áp dụng hàm Sigmoid để quyết định giữ lại hay loại bỏ thông tin từ ô nhớ trước đó."
        },
        {
            q: "Kiến trúc GRU (Gated Recurrent Unit) khác LSTM ở điểm nào?",
            options: ["A. Đơn giản hơn, gộp Cell State & Hidden State và chỉ dùng 2 Cổng (Reset & Update Gate)", "B. Có thêm 5 cổng mới", "C. Không dùng hàm kích hoạt", "D. Chỉ chạy trên dữ liệu ảnh"],
            answer: 0,
            explain: "GRU giản lược hơn LSTM (bỏ Cell State riêng), tính toán nhanh hơn mà vẫn giữ được khả năng lưu nhớ ngữ cảnh dài."
        },
        {
            q: "Bidirectional RNN (RNN 2 chiều) hoạt động ra sao?",
            options: ["A. Duỗi chuỗi theo 2 chiều: Từ xuôi (trái sang phải) và Từ ngược (phải sang trái) để nắm trọn ngữ cảnh", "B. Nhân đôi số nơ-ron", "C. Chạy trên 2 GPU", "D. Đảo ngược các chữ cái trong từ"],
            answer: 0,
            explain: "Bidirectional RNN kết hợp thông tin cả quá khứ lẫn tương lai bằng cách duyệt chuỗi theo cả 2 chiều."
        },
        {
            q: "Kỹ thuật Gradient Clipping thường áp dụng cho RNN để xử lý vấn đề gì?",
            options: ["A. Cắt tỉa giới hạn độ lớn Gradient để chống hiện tượng Bùng nổ đạo hàm (Exploding Gradient)", "B. Xóa các từ dừng Stopwords", "C. Cắt ngắn câu", "D. Giảm số lượng epoch"],
            answer: 0,
            explain: "Gradient Clipping khống chế chuẩn của gradient không vượt quá ngưỡng cho phép, tránh bùng nổ trọng số."
        },
        {
            q: "Trong PyTorch, lớp khởi tạo LSTM đơn giản có cú pháp là gì?",
            options: ["A. torch.nn.LSTM(input_size, hidden_size, num_layers)", "B. torch.nn.RNNCell()", "C. torch.nn.Linear()", "D. torch.nn.Embedding()"],
            answer: 0,
            explain: "`nn.LSTM` nhận vào các thông số kích thước vector đầu vào, kích thước ẩn và số lớp LSTM xếp chồng."
        },
        {
            q: "Nhược điểm lớn nhất về hiệu năng tính toán của RNN/LSTM so với Transformer là gì?",
            options: ["A. Không thể tính toán song song hóa (Parallelization) vì bước $t$ bắt buộc phải chờ kết quả bước $t-1$", "B. Độ chính xác bằng 0", "C. Không dùng được GPU", "D. Không đọc được tiếng Việt"],
            answer: 0,
            explain: "Tính chất tuần tự tính theo từng bước thời gian $t$ ngăn cản việc tận dụng sức mạnh tính toán song song hàng loạt của GPU."
        }
    ],
    attention: [
        {
            q: "Cơ chế Attention (Chú ý) ra đời nhằm giải quyết hạn chế cốt lõi nào của RNN Encoder-Decoder?",
            options: ["A. Nút thắt cổ chai thông tin (Bottleneck) khi phải nén toàn bộ câu dài vào 1 vector ngữ cảnh cố định", "B. Tốc độ nạp file chậm", "C. Thiếu bộ nhớ RAM", "D. Không có hàm sai số"],
            answer: 0,
            explain: "Attention cho phép Decoder truy cập linh hoạt vào tất cả các trạng thái ẩn của Encoder thay vì phụ thuộc 1 vector cố định."
        },
        {
            q: "Trong cơ chế Attention chuẩn, 3 thành phần vector cốt lõi là gì?",
            options: ["A. Query (Q), Key (K), Value (V)", "B. Input, Hidden, Output", "C. Weight, Bias, Gradient", "D. Encoder, Decoder, Attention"],
            answer: 0,
            explain: "Cơ chế Attention hoạt động dựa trên việc so sánh câu hỏi Query với các khóa Key để lấy trọng số nhân với giá trị Value."
        },
        {
            q: "Ý nghĩa của ma trận Trọng số Chú ý (Attention Weights) là gì?",
            options: ["A. Thể hiện mức độ tập trung / liên quan của từ hiện tại tới từng từ khác trong chuỗi", "B. Độ dài của từ", "C. Số lần từ xuất hiện", "D. Vị trí dòng của từ"],
            answer: 0,
            explain: "Attention Weights (tổng bằng 1 nhờ Softmax) đo lường mức độ ảnh hưởng/chú ý giữa các vị trí từ."
        },
        {
            q: "Công thức tính Scaled Dot-Product Attention chuẩn là gì?",
            options: ["A. $\\text{Softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$", "B. $Q + K + V$", "C. $\\sigma(Q \\cdot K) \\cdot V$", "D. $Q \\times K \\times V$"],
            answer: 0,
            explain: "Tích vô hướng $Q K^T$ chia cho $\\sqrt{d_k}$ để thu nhỏ scale trước khi đưa qua hàm Softmax và nhân với V."
        },
        {
            q: "Tại sao cần chia cho $\\sqrt{d_k}$ trong công thức Scaled Dot-Product Attention?",
            options: ["A. Tránh giá trị tích vô hướng quá lớn làm hàm Softmax bị rơi vào vùng biến thiên cực nhỏ (bão hòa đạo hàm)", "B. Đổi từ float sang int", "C. Để loại bỏ các giá trị âm", "D. Để nén dung lượng ma trận"],
            answer: 0,
            explain: "Khi chiều $d_k$ lớn, tích vô hướng tăng vọt làm Softmax có gradient cực nhỏ; chia $\\sqrt{d_k}$ giúp giữ variance bằng 1."
        },
        {
            q: "Self-Attention (Tự chú ý) khác gì so với Cross-Attention?",
            options: ["A. In Self-Attention, Q, K, V đều được chiếu từ CÙNG MỘT chuỗi đầu vào", "B. Self-Attention chỉ dùng cho ảnh", "C. Self-Attention không cần tính Softmax", "D. Self-Attention chạy không cần GPU"],
            answer: 0,
            explain: "Self-Attention giúp các vị trí từ trong cùng 1 câu tự tương tác với nhau để tìm mối quan hệ ngữ nghĩa nội tại."
        },
        {
            q: "Trong câu 'Con mèo nằm trên thảm vì nó mệt', Self-Attention giúp từ 'nó' liên kết chính xác nhất tới từ nào?",
            options: ["A. Con mèo", "B. Thảm", "C. Nằm", "D. Trên"],
            answer: 0,
            explain: "Trọng số chú ý của từ 'nó' sẽ dồn cao nhất vào 'Con mèo', giải quyết tham chiếu đại từ trong tự nhiên."
        },
        {
            q: "Multi-Head Attention có tác dụng gì so với Single-Head Attention?",
            options: ["A. Cho phép mô hình đồng thời chú ý tới thông tin từ nhiều không gian biểu diễn (subspaces) khác nhau", "B. Tăng gấp đôi số lượng từ", "C. Xóa bỏ lớp Dense", "D. Chạy trên nhiều máy chủ"],
            answer: 0,
            explain: "Nhiều 'đầu' chú ý giúp mô hình học song song các khía cạnh cú pháp, ngữ nghĩa, quan hệ ngữ cảnh đa dạng."
        },
        {
            q: "Ma trận Masking (Cấu trúc che dấu) dùng trong Causal Self-Attention của Decoder nhằm mục đích gì?",
            options: ["A. Ngăn không cho vị trí hiện tại nhìn thấy các từ ở vị trí tương lai trong quá trình huấn luyện", "B. Che bớt các từ bị lỗi", "C. Xóa các dấu câu", "D. Ẩn API Key"],
            answer: 0,
            explain: "Masking gán giá trị $-\\infty$ cho các vị trí tương lai để mô hình không thể 'gian lận' nhìn trước câu trả lời."
        },
        {
            q: "Độ phức tạp tính toán theo độ dài chuỗi $N$ của thao tác Self-Attention chuẩn là bao nhiêu?",
            options: ["A. $O(N^2)$", "B. $O(N)$", "C. $O(\\log N)$", "D. $O(1)$"],
            answer: 0,
            explain: "So sánh cặp từ $N \\times N$ khiến độ phức tạp tính toán và bộ nhớ của Self-Attention tăng theo cấp số nhân $O(N^2)$."
        }
    ],
    transformer: [
        {
            q: "Bài báo khoa học kinh điển nào năm 2017 đã giới thiệu kiến trúc Transformer?",
            options: ["A. Attention Is All You Need", "B. Deep Residual Learning", "C. Generative Adversarial Nets", "D. Master Chess with AlphaZero"],
            answer: 0,
            explain: "Bài báo lịch sử 'Attention Is All You Need' của các tác giả Google đã khai sinh ra kiến trúc Transformer."
        },
        {
            q: "Tại sao Transformer không cần đến các lớp tuần tự RNN hay tích chập CNN mà vẫn nắm được thứ tự các từ trong câu?",
            options: ["A. Nhờ bổ sung Mã hóa Vị trí (Positional Encoding) vào Vector Embeddings đầu vào", "B. Nhờ sắp xếp từ theo bảng chữ cái", "C. Nhờ đếm số ký tự", "D. Nhờ xóa khoảng trắng"],
            answer: 0,
            explain: "Positional Encoding cộng các vector tần số hình sin/cosin vào từ để cung cấp thông tin vị trí thứ tự tuyệt đối và tương đối."
        },
        {
            q: "Kiến trúc Transformer nguyên bản gồm 2 khối chính nào?",
            options: ["A. Khối Mã hóa (Encoder) và Khối Giải mã (Decoder)", "B. Khối Generator và Discriminator", "C. Khối Conv2D và MaxPool", "D. Khối Frontend và Backend"],
            answer: 0,
            explain: "Transformer gốc gồm Encoder (xử lý đầu vào) và Decoder (sinh chuỗi đầu ra)."
        },
        {
            q: "Mô hình BERT được xây dựng dựa trên thành phần nào của Transformer?",
            options: ["A. Chỉ sử dụng khối Encoder (Encoder-only)", "B. Chỉ sử dụng khối Decoder (Decoder-only)", "C. Cả Encoder lẫn Decoder", "D. Không dùng Transformer"],
            answer: 0,
            explain: "BERT sử dụng Encoder bi-directional để học biểu diễn ngữ cảnh văn bản sâu hai chiều."
        },
        {
            q: "Dòng mô hình GPT (GPT-3, GPT-4) được xây dựng dựa trên thành phần nào của Transformer?",
            options: ["A. Chỉ sử dụng khối Decoder (Decoder-only với Causal Masking)", "B. Chỉ sử dụng khối Encoder", "C. Khối RNN nối tiếp", "D. Khối CNN 3D"],
            answer: 0,
            explain: "Dòng GPT sử dụng Decoder-only autoregressive để sinh từ tiếp theo dựa trên bối cảnh đã có."
        },
        {
            q: "Thành phần Layer Normalization trong mỗi khối Transformer có công dụng gì?",
            options: ["A. Chuẩn hóa các giá trị kích hoạt ở từng lớp về phân phối ổn định, giúp huấn luyện sâu nhanh và ổn định", "B. Giảm bớt số từ", "C. Tắt các nơ-ron ngẫu nhiên", "D. Lưu file checkpoint"],
            answer: 0,
            explain: "LayerNorm chuẩn hóa các giá trị đặc trưng theo chiều hidden dimension của từng mẫu."
        },
        {
            q: "Mạng Feed-Forward (FFN) nằm sau lớp Multi-Head Attention trong mỗi khối Transformer gồm có bao nhiêu lớp tuyến tính?",
            options: ["A. 2 lớp tuyến tính với một hàm kích hoạt (như ReLU/GELU) ở giữa", "B. 10 lớp", "C. 0 lớp", "D. 100 lớp"],
            answer: 0,
            explain: "Mỗi khối có một mạng FFN hai lớp: $FFN(x) = \\max(0, x W_1 + b_1) W_2 + b_2$."
        },
        {
            q: "Quá trình sinh chữ Autoregressive (Tự hồi quy) của LLM Decoder diễn ra như thế nào?",
            options: ["A. Sinh từng token một, token vừa sinh ra được nối tiếp vào đầu vào để dự đoán token kế tiếp", "B. Sinh toàn bộ cả đoạn văn cùng một lúc trong 1ms", "C. Dịch từ ngược từ cuối lên đầu", "D. Chọn ngẫu nhiên câu từ CSDL"],
            answer: 0,
            explain: "Decoder sinh từng token tuần tự, lấy output $t$ làm input tiếp theo để sinh $t+1$."
        },
        {
            q: "Kỹ thuật KV Cache (Key-Value Caching) trong LLM Inference dùng để làm gì?",
            options: ["A. Lưu lại các ma trận K và V của các token cũ để không phải tính lại ở mỗi bước sinh token mới, tăng tốc đáng kể", "B. Lưu trữ mật khẩu người dùng", "C. Nén ảnh", "D. Lưu file PDF"],
            answer: 0,
            explain: "KV Cache tránh việc phải tính lại ma trận Key và Value của các prompt cũ ở mỗi bước sinh 1 token tiếp theo."
        },
        {
            q: "Khái niệm Context Window (Cửa sổ ngữ cảnh) của một mô hình Transformer thể hiện điều gì?",
            options: ["A. Số lượng token tối đa (Prompt + Output) mà mô hình có thể xử lý trong một lần gọi", "B. Chiều rộng màn hình máy tính", "C. Số lượng GPU", "D. Kích thước file cài đặt"],
            answer: 0,
            explain: "Context Window giới hạn độ dài tổng số token tối đa mà Transformer có thể nạp vào bộ nhớ Self-Attention cùng lúc."
        }
    ],
    prompt: [
        {
            q: "Prompt Engineering là kỹ thuật gì?",
            options: ["A. Viết mã nguồn C++", "B. Thiết kế, tối ưu câu lệnh đầu vào để dẫn dắt LLM tạo ra kết quả chính xác và mong muốn", "C. Sửa chữa phần cứng máy tính", "D. Đóng gói ứng dụng Docker"],
            answer: 1,
            explain: "Prompt Engineering là nghệ thuật và kỹ thuật giao tiếp hiệu quả với LLM bằng ngôn ngữ tự nhiên."
        },
        {
            q: "Zero-shot Prompting có đặc điểm gì?",
            options: ["A. Cung cấp câu hỏi cho LLM mà KHÔNG kèm theo bất kỳ ví dụ mẫu nào", "B. Cung cấp 5 ví dụ mẫu", "C. Bắt LLM trả về số 0", "D. Gọi API 0 lần"],
            answer: 0,
            explain: "Zero-shot là đưa ra yêu cầu trực tiếp mà không cung cấp ví dụ minh họa trước."
        },
        {
            q: "Few-shot Prompting khác Zero-shot ở điểm nào?",
            options: ["A. Đưa kèm 1 hoặc nhiều ví dụ mẫu (input -> output) trong prompt để LLM bắt chước định dạng và tư duy", "B. Chạy chậm hơn 100 lần", "C. Không dùng được với GPT-4", "D. Yêu cầu nhập mật khẩu"],
            answer: 0,
            explain: "Few-shot cung cấp các cặp ví dụ minh họa giúp LLM hiểu rõ ngữ cảnh và định dạng phản hồi."
        },
        {
            q: "Chain-of-Thought (CoT) Prompting kích hoạt khả năng nào của LLM?",
            options: ["A. Yêu cầu LLM suy luận và giải thích chi tiết từng bước (Step-by-step reasoning) trước khi đưa ra kết luận", "B. Dịch sang tiếng Pháp", "C. Viết code HTML", "D. Tự động sửa lỗi sai chính tả"],
            answer: 0,
            explain: "CoT bằng các câu lệnh như 'Hãy suy nghĩ từng bước' giúp LLM giải quyết các bài toán logic phức tạp chính xác hơn nhiều."
        },
        {
            q: "Thành phần System Prompt trong API hội thoại đóng vai trò gì?",
            options: ["A. Định nghĩa vai trò (Role), quy tắc bảo mật và phong cách hành vi cốt lõi của trợ lý AI", "B. Chứa câu hỏi của người dùng", "C. Chứa mã khóa API", "D. Lưu lịch sử chat cũ"],
            answer: 0,
            explain: "System Prompt thiết lập chiếc khung chỉ dẫn nền tảng (ví dụ: 'Bạn là một chuyên gia AI thân thiện...')."
        },
        {
            q: "Tham số Temperature trong việc gọi LLM API điều chỉnh điều gì?",
            options: ["A. Mức độ ngẫu nhiên/sáng tạo của câu trả lời (0.0: Chính xác/Nhất quán, 1.0: Sáng tạo/Đa dạng)", "B. Nhiệt độ của chip GPU", "C. Độ dài tối đa câu câu trả lời", "D. Tốc độ kết nối mạng"],
            answer: 0,
            explain: "Temperature = 0 làm mô hình chọn token có xác suất cao nhất (Deterministic); Temperature cao làm tăng sự ngẫu nhiên."
        },
        {
            q: "Kỹ thuật Self-Consistency trong Prompting hoạt động ra sao?",
            options: ["A. Sinh nhiều đường suy luận CoT độc lập rồi chọn kết quả có số lượt đồng thuận (majority vote) cao nhất", "B. Hỏi lại người dùng 10 lần", "C. Kiểm tra cú pháp Python", "D. Xóa các câu trả lời trùng"],
            answer: 0,
            explain: "Self-Consistency lấy mẫu nhiều chuỗi tư duy CoT khác nhau và chọn câu trả lời phổ biến nhất."
        },
        {
            q: "Role Prompting (Gán vai trò) mang lại lợi ích gì?",
            options: ["A. Đặt LLM vào vị trí chuyên gia cụ thể (vd: 'Bạn là Luật sư 20 năm kinh nghiệm') để nâng cao chất lượng chuyên môn", "B. Tăng dung lượng bộ nhớ", "C. Giảm giá tiền API", "D. Tự động vẽ hình"],
            answer: 0,
            explain: "Gán vai trò giúp kích hoạt các vùng kiến thức và phong cách ngôn ngữ chuyên sâu tương ứng trong LLM."
        },
        {
            q: "Điều gì xảy ra khi thông tin trong Prompt bị mâu thuẫn hoặc mơ hồ?",
            options: ["A. LLM dễ bị ảo giác (Hallucination) hoặc trả về kết quả không đúng kỳ vọng", "B. Máy tính bị sập", "C. Tự động xóa prompt", "D. Trả về lỗi 404"],
            answer: 0,
            explain: "Prompt thiếu rõ ràng khiến LLM suy đoán sai lệch ý định của người dùng."
        },
        {
            q: "Kỹ thuật ReAct Prompting kết hợp 2 yếu tố nào?",
            options: ["A. Reasoning (Suy luận CoT) và Acting (Hành động gọi công cụ ngoại vi)", "B. Reaction và Action", "C. Read và Active", "D. Recall và Accuracy"],
            answer: 0,
            explain: "ReAct đan xen giữa bước tư duy suy luận (Thought) và bước thực thi công cụ (Action) để hoàn thành tác vụ."
        }
    ],
    structured: [
        {
            q: "Structured Output trong ứng dụng LLM có mục đích chính là gì?",
            options: ["A. Ép phản hồi của LLM tuân thủ chính xác một cấu trúc dữ liệu máy đọc được (như JSON Schema chuẩn)", "B. Trả về đoạn văn thơ tự do", "C. Đổi font chữ hiển thị", "D. Nén file zip"],
            answer: 0,
            explain: "Structured Output đảm bảo LLM trả về đúng định dạng JSON/Pydantic để code backend tích hợp trực tiếp."
        },
        {
            q: "Thư viện Pydantic trong Python đóng vai trò gì khi làm việc với Structured Output?",
            options: ["A. Khai báo schema kiểu dữ liệu với validate tự động trước khi ép LLM tuân thủ", "B. Vẽ biểu đồ đồ họa", "C. Train lại mô hình GPT", "D. Kết nối cơ sở dữ liệu SQL"],
            answer: 0,
            explain: "Pydantic giúp định nghĩa các Class data model sắc nét để validate và parse JSON từ LLM."
        },
        {
            q: "Phương thức `with_structured_output(Schema)` trong LangChain làm công việc gì?",
            options: ["A. Ép LLM trả về đối tượng Pydantic/JSON đúng theo cấu trúc Schema khai báo", "B. Dịch văn bản", "C. Xóa lịch sử chat", "D. Đổi API Key"],
            answer: 0,
            explain: "Hàm tích hợp sẵn của LangChain giúp chuyển đổi đầu ra LLM thành object Python theo Pydantic schema."
        },
        {
            q: "Tại sao việc dùng Regex parser đơn thuần để trích xuất JSON từ text tự do của LLM lại rủi ro?",
            options: ["A. Vì LLM có thể trả về JSON bị thiếu dấu ngoặc, dư thừa Markdown hoặc sai tên field", "B. Vì Regex chạy quá chậm", "C. Vì Python không hỗ trợ Regex", "D. Vì tốn nhiều tiền hơn"],
            answer: 0,
            explain: "Output tự do của LLM hay chứa thêm văn bản giải thích hoặc lỗi cú pháp JSON làm vỡ hàm parse."
        },
        {
            q: "Cơ chế JSON Mode trong OpenAI API đảm bảo điều gì?",
            options: ["A. Đảm bảo mô hình luôn sinh ra một chuỗi JSON hợp lệ (Valid JSON String)", "B. Tự động lưu file .json vào đĩa", "C. Giảm tiền API xuống 0", "D. Dịch từ tiếng Anh sang tiếng Việt"],
            answer: 0,
            explain: "JSON Mode hướng dẫn LLM chỉ trả về văn bản có cú pháp JSON đúng chuẩn."
        },
        {
            q: "Thư viện mã nguồn mở Instructor hỗ trợ điều gì cho việc trích xuất thông tin?",
            options: ["A. Tích hợp Pydantic với OpenAI/Claude để tự động retry nếu LLM trả về JSON sai schema", "B. Dạy học trực tuyến", "C. Tự động sửa code Python", "D. Quản lý server Docker"],
            answer: 0,
            explain: "Instructor tự động gửi lại thông báo lỗi validation cho LLM sửa cho đến khi đạt đúng Pydantic schema."
        },
        {
            q: "Trong Pydantic, decorator/field nào dùng để mô tả chi tiết ý nghĩa từng trường cho LLM hiểu?",
            options: ["A. Field(description='...')", "B. Label('...')", "C. Comment('...')", "D. Info('...')"],
            answer: 0,
            explain: "`Field(description='...')` cung cấp mô tả ngữ nghĩa cho trường dữ liệu để LLM điền đúng."
        },
        {
            q: "Khi trích xuất 5 thực thể tên người từ bài báo, kiểu dữ liệu Pydantic phù hợp cho trường này là gì?",
            options: ["A. List[str]", "B. int", "C. bool", "D. float"],
            answer: 0,
            explain: "Danh sách chuỗi `List[str]` đại diện cho mảng các tên người trích xuất được."
        },
        {
            q: "Structured Output mang lại lợi ích lớn nhất nào cho kiến trúc phần mềm?",
            options: ["A. Giúp chuyển giao dữ liệu tin cậy giữa LLM và các hệ thống backend API / CSDL", "B. Giảm 90% dung lượng RAM", "C. Tăng tốc độ mạng", "D. Không cần dùng Python"],
            answer: 0,
            explain: "Giúp lập trình viên gọi API, chèn DB hoặc gọi logic phía sau một cách nhất quán không sợ vỡ ứng dụng."
        },
        {
            q: "Grammar-based Sampling (như Outlines / llama.cpp grammar) ép cấu trúc bằng cách nào?",
            options: ["A. Can thiệp trực tiếp vào bước chọn Logits của LLM để chỉ cho phép sinh các token hợp lệ theo BNF Grammar", "B. Sửa lại code Python", "C. Xóa các token lạ", "D. Giới hạn độ dài max_tokens=10"],
            answer: 0,
            explain: "Grammar sampling lọc các token không tuân thủ quy tắc ngay từ bước sinh của LLM ở cấp độ thuật toán."
        }
    ],
    embedding: [
        {
            q: "Vector Embedding trong xử lý ngôn ngữ tự nhiên đại diện cho điều gì?",
            options: ["A. Một chuỗi các số thực (vector) biểu diễn tọa độ ngữ nghĩa của đoạn văn bản trong không gian nhiều chiều", "B. Địa chỉ lưu file trên đĩa cứng", "C. Mã hóa chữ dạng ASCII", "D. Mã khóa bảo mật MD5"],
            answer: 0,
            explain: "Embeddings chuyển đổi từ/câu thành vector số sao cho các khái niệm có nghĩa tương tự nằm gần nhau trong không gian."
        },
        {
            q: "Hai đoạn văn bản có ý nghĩa tương đồng nhau sẽ có đặc điểm vector như thế nào?",
            options: ["A. Khoảng cách giữa 2 vector nhỏ (Góc giữa 2 vector hẹp, Cosine Similarity gần 1.0)", "B. Độ dài bằng 0", "C. Tọa độ hoàn toàn trái ngược nhau", "D. Khoảng cách bằng vô cùng"],
            answer: 0,
            explain: "Các câu đồng nghĩa sẽ có vector nằm gần nhau trong không gian biểu diễn (Cosine Similarity cao)."
        },
        {
            q: "Phép đo Cosine Similarity giữa 2 vector $\\vec{A}$ và $\\vec{B}$ được tính bằng công thức nào?",
            options: ["A. $\\frac{\\vec{A} \\cdot \\vec{B}}{\\|\\vec{A}\\| \\|\\vec{B}\\|}$", "B. $\\vec{A} + \\vec{B}$", "C. $\\|\\vec{A} - \\vec{B}\\|$", "D. $\\vec{A} \\times \\vec{B}$"],
            answer: 0,
            explain: "Cosine Similarity là tích vô hướng chia cho tích độ dài của 2 vector, cho biết cosin góc giữa chúng."
        },
        {
            q: "Kích thước chiều (Dimensions) của model `text-embedding-3-small` của OpenAI là bao nhiêu?",
            options: ["A. 1536", "B. 512", "C. 768", "D. 4096"],
            answer: 0,
            explain: "Model `text-embedding-3-small` chuẩn tạo ra các vector có 1536 chiều."
        },
        {
            q: "Số chiều (Dimensions) của ma trận Embedding ảnh hưởng thế nào đến hệ thống?",
            options: ["A. Chiều càng lớn lưu được ngữ nghĩa càng tinh tế nhưng tốn nhiều dung lượng lưu trữ & tính toán hơn", "B. Không ảnh hưởng gì", "C. Chiều lớn làm mất thông tin", "D. Chiều nhỏ chạy chậm hơn"],
            answer: 0,
            explain: "Vector nhiều chiều chứa thông tin chi tiết hơn nhưng yêu cầu nhiều bộ nhớ RAM/Disk và tính toán tìm kiếm lâu hơn."
        },
        {
            q: "Khái niệm Semantic Search (Tìm kiếm ngữ nghĩa) khác gì so với Keyword Search (Tìm kiếm từ khóa truyền thống)?",
            options: ["A. Semantic Search tìm theo ý nghĩa câu mà không cần trùng khớp chính xác từ từ ngữ", "B. Semantic Search chỉ đếm chữ", "C. Semantic Search chạy không cần máy tính", "D. Semantic Search chỉ tìm được chữ tiếng Anh"],
            answer: 0,
            explain: "Semantic Search hiểu ý định (vd: 'máy tính xách tay' khớp với 'laptop') dù không trùng từ khóa."
        },
        {
            q: "Khoảng cách Euclidean Distance (L2) khác gì với Cosine Distance?",
            options: ["A. Euclidean đo độ dài khoảng cách trực tiếp giữa 2 điểm; Cosine đo góc giữa 2 vector hướng", "B. Cả hai giống hệt nhau", "C. Euclidean chỉ dùng cho 2D", "D. Cosine không dùng cho số thực"],
            answer: 0,
            explain: "Euclidean đo khoảng cách tuyệt đối; Cosine bỏ qua độ dài vector chỉ tập trung vào hướng góc."
        },
        {
            q: "Khi tính Embeddings cho một đoạn văn bản quá dài vượt giới hạn max_tokens của model embedding, điều gì xảy ra?",
            options: ["A. Văn bản bị cắt xén (Truncated) mất phần đuôi hoặc gây lỗi crash", "B. Tự động nhân đôi số chiều", "C. Mô hình tự động chia làm 2 file", "D. Không có vấn đề gì"],
            answer: 0,
            explain: "Mỗi model embedding có giới hạn độ dài nạp (vd: 8192 tokens); phần vượt quá sẽ bị xén mất."
        },
        {
            q: "Mô hình Embedding mã nguồn mở nổi tiếng chạy cục bộ (Local) thuộc thư viện nào?",
            options: ["A. Sentence-Transformers (HuggingFace)", "B. Pandas", "C. Scikit-Learn", "D. OpenCV"],
            answer: 0,
            explain: "Thư viện `sentence-transformers` cung cấp hàng ngàn mô hình embedding mã nguồn mở chạy tốt trên CPU/GPU."
        },
        {
            q: "Tại sao nên dùng cùng một Mô hình Embedding cho cả tài liệu nạp vào DB và câu hỏi tìm kiếm của người dùng?",
            options: ["A. Vì các mô hình khác nhau biểu diễn không gian tọa độ khác nhau hoàn toàn, không thể so sánh tương đồng", "B. Để tiết kiệm RAM", "C. Để tránh mua license", "D. Vì Python ép làm vậy"],
            answer: 0,
            explain: "Mỗi model tạo ra một không gian không gian vector riêng; phải dùng cùng 1 model mới tính khoảng cách chính xác."
        }
    ],
    vectordb: [
        {
            q: "Vector Database (Cơ sở dữ liệu Vector) được tối ưu hóa riêng cho tác vụ nào?",
            options: ["A. Lưu trữ và truy vấn tìm kiếm lân cận gần nhất (ANN - Approximate Nearest Neighbor) trên triệu vector", "B. Chạy truy vấn SQL JOIN", "C. Lưu trữ video HD", "D. Quản lý giao dịch ngân hàng ACID"],
            answer: 0,
            explain: "Vector DB được thiết kế chuyên biệt để index và tìm kiếm vector tương đồng quy mô lớn cực nhanh."
        },
        {
            q: "Cấu trúc chỉ mục HNSW (Hierarchical Navigable Small World) trong Vector DB có công dụng gì?",
            options: ["A. Xây dựng đồ thị đa tầng giúp tìm kiếm vector lân cận gần đúng cực nhanh với độ phức tạp $O(\\log N)$", "B. Nén file PDF", "C. Mã hóa mật khẩu", "D. Tự động dịch ngôn ngữ"],
            answer: 0,
            explain: "HNSW là thuật toán lập chỉ mục dạng đồ thị phổ biến nhất giúp tìm kiếm vector siêu tốc mà không cần duyệt toàn bộ DB."
        },
        {
            q: "Tìm kiếm Exact Nearest Neighbor (KNN) khác gì với Approximate Nearest Neighbor (ANN)?",
            options: ["A. KNN so sánh với TOÀN BỘ vector (chính xác 100% nhưng chậm); ANN tìm kiếm gần đúng trên đồ thị (nhanh gấp 1000 lần)", "B. KNN chạy nhanh hơn ANN", "C. ANN không dùng cho vector", "D. Cả hai giống nhau"],
            answer: 0,
            explain: "ANN chấp nhận đánh đổi một tỷ lệ độ chính xác rất nhỏ để đạt tốc độ tìm kiếm vượt trội trên dữ liệu lớn."
        },
        {
            q: "Cơ sở dữ liệu Vector mã nguồn mở chạy nhúng cục bộ (Embedded Vector DB) phổ biến trong Python là gì?",
            options: ["A. ChromaDB", "B. SQLite", "C. PostgreSQL", "D. Redis"],
            answer: 0,
            explain: "ChromaDB là cơ sở dữ liệu vector mã nguồn mở gọn nhẹ, chạy nhúng trực tiếp trong ứng dụng Python."
        },
        {
            q: "Khái niệm Metadata Filtering trong Vector Database cho phép làm gì?",
            options: ["A. Kết hợp lọc theo thuộc tính cấu trúc (vd: `category == 'AI'`) song song với tìm kiếm tương đồng vector", "B. Xóa bỏ dữ liệu cũ", "C. Đổi kiểu dữ liệu vector", "D. Nén dung lượng đĩa"],
            answer: 0,
            explain: "Metadata filtering giúp khoanh vùng tập vector cần tìm kiếm dựa trên các nhãn thuộc tính đi kèm."
        },
        {
            q: "Vector Database Cloud managed service nổi tiếng chuyên nghiệp là dịch vụ nào?",
            options: ["A. Pinecone", "B. MySQL", "C. MongoDB", "D. SQLite"],
            answer: 0,
            explain: "Pinecone là giải pháp Vector Database trên Cloud được quản lý hoàn toàn với khả năng mở rộng quy mô lớn."
        },
        {
            q: "Extension nào mở rộng cơ sở dữ liệu PostgreSQL truyền thống hỗ trợ tìm kiếm Vector?",
            options: ["A. pgvector", "B. pgsql", "C. postgis", "D. pgadmin"],
            answer: 0,
            explain: "`pgvector` cho phép lưu trữ và truy vấn chỉ mục vector HNSW/IVFFlat ngay trong PostgreSQL."
        },
        {
            q: "Chỉ số WCSS/Inertia trong phân cụm vector thể hiện điều gì?",
            options: ["A. Tổng bình phương khoảng cách từ các điểm vector tới tâm cụm", "B. Số lượng cột dữ liệu", "C. Tốc độ mạng", "D. Số lượng bảng"],
            answer: 0,
            explain: "Within-Cluster Sum of Squares đo lường độ tập trung nội tại của các cụm vector."
        },
        {
            q: "Khi thêm một tài liệu mới vào Vector DB, quy trình chuẩn gồm những bước nào?",
            options: ["A. Chia nhỏ văn bản (Chunk) -> Tạo Embedding cho từng Chunk -> Lưu Chunk + Vector + Metadata vào Vector DB", "B. Đưa thẳng file PDF vào DB", "C. Dịch sang tiếng Anh -> Xóa file", "D. Nén zip -> Upload"],
            answer: 0,
            explain: "Quy trình chuẩn nạp dữ liệu: Chunking -> Vector Embedding -> Indexing & Persistence."
        },
        {
            q: "Tham số `top_k` trong câu lệnh truy vấn Vector DB xác định điều gì?",
            options: ["A. Số lượng đoạn văn bản (chunks) có độ tương đồng cao nhất cần trả về", "B. Số lượng cột trong bảng", "C. Số lượng máy chủ", "D. Độ dài tối đa từ ngữ"],
            answer: 0,
            explain: "top_k=5 nghĩa là lấy ra 5 đoạn dữ liệu có khoảng cách vector gần nhất với câu hỏi."
        }
    ],
    chunking: [
        {
            q: "Kỹ thuật Chunking trong kiến trúc RAG là quá trình gì?",
            options: ["A. Chia cắt tài liệu dài thành nhiều đoạn văn ngắn (chunks) có kích thước phù hợp", "B. Đổi tên file PDF", "C. Gộp nhiều file thành 1", "D. Dịch ngôn ngữ tự động"],
            answer: 0,
            explain: "Chunking cắt nhỏ tài liệu giúp từng đoạn chứa thông tin tập trung và vừa vặn với cửa sổ ngữ cảnh LLM."
        },
        {
            q: "Tại sao không nên nạp nguyên một cuốn sách 500 trang vào 1 vector embedding duy nhất?",
            options: ["A. Vì thông tin bị pha loãng hoàn toàn (Information Loss) và vượt quá giới hạn token của model embedding", "B. Vì file quá nặng", "C. Vì Python không đọc được file dài", "D. Vì tốn băng thông mạng"],
            answer: 0,
            explain: "Vector của bài viết quá dài sẽ bị trung bình hóa ngữ nghĩa, làm mất đi các chi tiết cụ thể khi tìm kiếm."
        },
        {
            q: "Tham số `chunk_overlap` (Khoảng đè chồng) khi chia đoạn có công dụng quan trọng gì?",
            options: ["A. Giữ lại ngữ cảnh liên tục ở ranh giới cắt giữa 2 chunk kề nhau, tránh mất mát ý nghĩa câu bị chia đôi", "B. Nhân đôi dung lượng file", "C. Tăng tốc độ đọc", "D. Xóa các từ trùng"],
            answer: 0,
            explain: "Chunk overlap đảm bảo các câu nằm ở điểm cắt ranh giới vẫn xuất hiện trọn vẹn trong ít nhất một chunk."
        },
        {
            q: "Bộ chia `RecursiveCharacterTextSplitter` trong LangChain hoạt động theo cơ chế nào?",
            options: ["A. Thử tách theo danh sách ký tự phân đoạn (\\n\\n, \\n, khoảng trắng, '') từ lớn đến nhỏ để giữ nguyên cấu trúc đoạn văn", "B. Cắt cứng đúng từng 100 chữ cái", "C. Tách ngẫu nhiên", "D. Tách theo dấu chấm phẩy"],
            answer: 0,
            explain: "Bộ chia này ưu tiên cắt tại ranh giới đoạn văn (\\n\\n) rồi mới tới ranh giới câu (\\n) để bảo toàn mạch văn."
        },
        {
            q: "Semantic Chunking (Tách đoạn theo ngữ nghĩa) khác gì với Character Chunking truyền thống?",
            options: ["A. Tự động phát hiện điểm chuyển đổi ý nghĩa dựa trên sự thay đổi khoảng cách embedding giữa các câu liên tiếp", "B. Tách theo số trang", "C. Tách theo số ký tự cứng", "D. Tách theo màu chữ"],
            answer: 0,
            explain: "Semantic Chunking dùng vector embedding để gom các câu có cùng chủ đề vào 1 chunk bất kể độ dài."
        },
        {
            q: "Điều gì xảy ra nếu chọn `chunk_size` quá nhỏ (ví dụ 20 tokens)?",
            options: ["A. Chunk thiếu ngữ cảnh trầm trọng, không đủ thông tin cho LLM hiểu và trả lời câu hỏi", "B. Tràn bộ nhớ RAM", "C. Trả về lỗi 500", "D. Không tạo được vector"],
            answer: 0,
            explain: "Chunk quá ngắn chứa câu độc lập thiếu ngữ cảnh bổ trợ, dẫn tới thông tin mồ côi."
        },
        {
            q: "Điều gì xảy ra nếu chọn `chunk_size` quá lớn (ví dụ 4000 tokens)?",
            options: ["A. Chứa quá nhiều thông tin nhiễu, làm giảm độ chính xác của tìm kiếm tương đồng vector (Low Precision)", "B. Không đọc được file", "C. Làm giảm số lượng file", "D. Tự động xóa dữ liệu"],
            answer: 0,
            explain: "Chunk quá dài làm nhiễu vector embedding và tiêu tốn lượng lớn token không cần thiết khi gửi cho LLM."
        },
        {
            q: "Document Loader trong LangChain hỗ trợ công việc gì?",
            options: ["A. Đọc và trích xuất dữ liệu thô từ nhiều định dạng file khác nhau (PDF, Word, HTML, Markdown...)", "B. Tự động chỉnh sửa ảnh", "C. Viết code Python", "D. Tạo máy chủ web"],
            answer: 0,
            explain: "Document Loaders nạp văn bản từ đa dạng nguồn dữ liệu về định dạng Document chuẩn của LangChain."
        },
        {
            q: "Đối với tài liệu dạng Bảng biểu (Table) trong PDF, chiến lược Chunking nào tối ưu nhất?",
            options: ["A. Trích xuất toàn bộ bảng thành cấu trúc HTML/Markdown hoặc JSON và giữ nguyên cả bảng trong 1 chunk", "B. Tách ngẫu nhiên từng dòng", "C. Cắt đôi cột", "D. Xóa hết số liệu"],
            answer: 0,
            explain: "Bảng dữ liệu cần giữ nguyên cấu trúc dòng-cột dưới dạng Markdown/HTML để LLM hiểu đúng mối quan hệ."
        },
        {
            q: "Định dạng đối tượng `Document` chuẩn trong LangChain gồm 2 trường thông tin chính nào?",
            options: ["A. `page_content` (nội dung văn bản) và `metadata` (thông tin kèm theo như nguồn file, trang)", "B. `id` và `password`", "C. `name` và `size`", "D. `vector` và `loss`"],
            answer: 0,
            explain: "Đối tượng Document gồm `page_content` chứa đoạn text và `metadata` chứa các thông tin phụ trợ."
        }
    ],
    advrag: [
        {
            q: "Advanced RAG cải tiến thành phần nào so với Naive RAG (RAG cơ bản)?",
            options: ["A. Bổ sung các bước Pre-retrieval (Query Rewrite), Post-retrieval (Re-ranking) và Hybrid Search", "B. Không dùng Vector DB nữa", "C. Không dùng LLM", "D. Chỉ tìm kiếm theo từ khóa"],
            answer: 0,
            explain: "Advanced RAG tối ưu toàn diện các khâu xử lý truy vấn, tinh lọc kết quả và xếp hạng lại trước khi gửi LLM."
        },
        {
            q: "Kỹ thuật Re-ranking (Xếp hạng lại) trong RAG sử dụng mô hình nào để đánh giá lại độ tương quan?",
            options: ["A. Mô hình Cross-Encoder", "B. Mô hình Bi-Encoder", "C. K-Means", "D. Linear Regression"],
            answer: 0,
            explain: "Cross-Encoder xử lý đồng thời cả câu hỏi và chunk dữ liệu để tính điểm tương quan chính xác hơn nhiều so với Bi-Encoder."
        },
        {
            q: "Quy trình 2 giai đoạn (Two-stage Retrieval) trong Advanced RAG diễn ra như thế nào?",
            options: ["A. Giai đoạn 1: Lọc nhanh Top 50 chunks bằng Vector Search; Giai đoạn 2: Dùng Re-ranker chọn ra Top 3-5 chunks tinh túy nhất", "B. Giai đoạn 1: Dịch sang tiếng Anh; Giai đoạn 2: Xóa file", "C. Giai đoạn 1: Train LLM; Giai đoạn 2: Test", "D. Giai đoạn 1: Tạo PDF; Giai đoạn 2: In ra giấy"],
            answer: 0,
            explain: "Kết hợp tốc độ tìm kiếm nhanh của Vector DB với độ chính xác cao của Re-ranker giúp tối ưu cả tốc độ lẫn chất lượng."
        },
        {
            q: "Tìm kiếm kết hợp (Hybrid Search) là sự kết hợp giữa 2 phương pháp nào?",
            options: ["A. Dense Retrieval (Vector Similarity Search) và Sparse Retrieval (BM25 / Keyword Search)", "B. SQL Search và Excel Search", "C. Linear Search và Binary Search", "D. Voice Search và Image Search"],
            answer: 0,
            explain: "Hybrid Search bắt trọn cả ngữ nghĩa tương đồng (Dense) lẫn các thuật ngữ/mã số chính xác tuyệt đối (Sparse BM25)."
        },
        {
            q: "Thuật toán RRF (Reciprocal Rank Fusion) dùng để làm gì trong Hybrid Search?",
            options: ["A. Tổng hợp và kết hợp thứ hạng kết quả từ tìm kiếm Vector và tìm kiếm BM25 thành một danh sách điểm chung", "B. Nén dữ liệu vector", "C. Mã hóa mật khẩu", "D. Tự động viết lại prompt"],
            answer: 0,
            explain: "RRF chấm điểm thứ hạng từ các nguồn tìm kiếm khác nhau để đưa ra bảng xếp hạng kết hợp công bằng."
        },
        {
            q: "Kỹ thuật Query Rewriting / Query Expansion (Viết lại câu hỏi) có công dụng gì?",
            options: ["A. Dùng LLM biến đổi câu hỏi gốc của người dùng thành các phiên bản chi tiết/rõ ràng hơn trước khi tìm kiếm", "B. Sửa lỗi chính tả tiếng Anh", "C. Dịch câu hỏi sang tiếng Trung", "D. Xóa bớt câu hỏi"],
            answer: 0,
            explain: "Viết lại câu hỏi giúp làm rõ các từ mơ hồ hoặc tạo nhiều biến thể câu hỏi để tìm kiếm đa khía cạnh."
        },
        {
            q: "Kỹ thuật HyDE (Hypothetical Document Embeddings) hoạt động ra sao?",
            options: ["A. Dùng LLM sinh một câu trả lời giả định (Hypothetical Document), rồi dùng vector của tài liệu giả định đó để tìm kiếm", "B. Tạo file PDF giả", "C. Giả lập lỗi server", "D. Xóa dữ liệu cũ"],
            answer: 0,
            explain: "HyDE chuyển bài toán so sánh Query-Doc thành so sánh Doc-Doc tương đồng ngữ nghĩa hơn."
        },
        {
            q: "Parent-Document Retriever (Small-to-Big Retrieval) giải quyết mâu thuẫn nào?",
            options: ["A. Dùng Chunk nhỏ để tìm kiếm chính xác vector, nhưng trả về Parent Document lớn hơn cho LLM để có đủ ngữ cảnh", "B. Xóa các tài liệu con", "C. Chỉ lưu tài liệu cha", "D. Tăng giá tiền API"],
            answer: 0,
            explain: "Giúp việc match vector đạt độ nhạy cao trên đoạn nhỏ nhưng LLM vẫn nhận trọn vẹn ngữ cảnh rộng xung quanh."
        },
        {
            q: "Dịch vụ Re-ranking API thương mại nổi tiếng chất lượng cao hiện nay là gì?",
            options: ["A. Cohere Rerank API", "B. Google Maps API", "C. Stripe API", "D. Twilio API"],
            answer: 0,
            explain: "Cohere Rerank là dịch vụ Re-ranking phổ biến hàng đầu cung cấp mô hình Cross-Encoder chất lượng cao."
        },
        {
            q: "Hiện tượng 'Lost in the Middle' trong RAG nghĩa là gì?",
            options: ["A. LLM có xu hướng chỉ chú ý đến thông tin ở đầu và cuối ngữ cảnh, dễ bỏ qua thông tin nằm ở giữa đoạn context dài", "B. Mất file dữ liệu", "C. Quên mật khẩu", "D. Mạng bị ngắt kết nối giữa chừng"],
            answer: 0,
            explain: "Nghiên cứu cho thấy LLM chú ý kém nhất vào các đoạn thông tin nằm lọt ở giữa ngữ cảnh; do đó Re-ranking đặt chunk quan trọng nhất lên đầu."
        }
    ],
    rageval: [
        {
            q: "Khái niệm Ragas Triad trong đánh giá hệ thống RAG gồm 3 chỉ số chính nào?",
            options: ["A. Faithfulness (Độ trung thực), Answer Relevance (Độ liên quan câu trả lời), Context Precision/Recall", "B. Accuracy, Precision, F1-Score", "C. Speed, Cost, Memory", "D. Bleur, Rouge, Perplexity"],
            answer: 0,
            explain: "Bộ ba Ragas Triad tập trung đo lường tính ảo giác, sự đúng trọng tâm và chất lượng bộ tài liệu truy xuất."
        },
        {
            q: "Chỉ số Faithfulness (Độ trung thực) đo lường điều gì?",
            options: ["A. Câu trả lời của LLM có hoàn toàn dựa trên thông tin từ Ngữ cảnh (Context) được cung cấp hay không (phát hiện Ảo giác)", "B. Tốc độ sinh chữ", "C. Câu trả lời có đúng ngữ pháp tiếng Việt không", "D. Số lượng token tiêu tốn"],
            answer: 0,
            explain: "Faithfulness kiểm tra xem từng tuyên bố trong câu trả lời có bằng chứng suy ra từ Context hay bị phao tin ảo giác."
        },
        {
            q: "Chỉ số Answer Relevance (Độ liên quan của câu trả lời) đánh giá khía cạnh nào?",
            options: ["A. Câu trả lời của LLM có giải quyết trực tiếp và đúng trọng tâm Câu hỏi của người dùng hay không", "B. Tốc độ tải trang web", "C. Độ dài của file PDF", "D. Số lượng ký tự chữ"],
            answer: 0,
            explain: "Answer Relevance đo lường sự phù hợp giữa nội dung phản hồi và yêu cầu ban đầu của câu hỏi."
        },
        {
            q: "Chỉ số Context Precision (Độ chính xác của ngữ cảnh) đánh giá điều gì?",
            options: ["A. Tỷ lệ các Chunks liên quan thực sự được xếp lên các vị trí đầu tiên trong tập ngữ cảnh tìm được", "B. Độ dài câu hỏi", "C. Số lượng từ bị viết sai", "D. Tốc độ GPU"],
            answer: 0,
            explain: "Context Precision đánh giá khả năng của Retriever trong việc đưa thông tin chuẩn lên đầu danh sách."
        },
        {
            q: "Phương pháp đánh giá LLM-as-a-Judge là gì?",
            options: ["A. Sử dụng một mô hình LLM mạnh (như GPT-4) đóng vai trò giám khảo tự động chấm điểm phản hồi theo tiêu chuẩn", "B. Thuê con người chấm thủ công 100%", "C. Dùng hàm đếm số từ", "D. Kiểm tra bằng trình duyệt web"],
            answer: 0,
            explain: "LLM-as-a-Judge dùng prompt chuẩn hóa để LLM mạnh đánh giá chất lượng đầu ra của các ứng dụng AI tự động."
        },
        {
            q: "Khái niệm Golden Dataset trong kiểm thử RAG là gì?",
            options: ["A. Tập hợp các bộ mẫu câu hỏi + đáp án chuẩn do chuyên gia xây dựng làm mốc đối sánh chất lượng", "B. Tập dữ liệu đắt tiền", "C. File chứa mã nguồn", "D. Bộ nhớ đệm RAM"],
            answer: 0,
            explain: "Golden Dataset là tập dữ liệu chuẩn mực (Ground Truth) dùng để tự động đo lường độ chính xác sau mỗi lần thay đổi prompt/code."
        },
        {
            q: "Ảo giác (Hallucination) trong ứng dụng RAG xảy ra khi nào?",
            options: ["A. Khi LLM bịa đặt thông tin không có trong tài liệu ngữ cảnh được cung cấp", "B. Khi máy tính bị tắt nguồn", "C. Khi kết quả tìm kiếm quá nhanh", "D. Khi code bị lỗi syntax"],
            answer: 0,
            explain: "Ảo giác là việc LLM tự sinh ra thông tin sai sự thật hoặc tự suy đoán thông tin ngoài ngữ cảnh."
        },
        {
            q: "Thư viện Python mã nguồn mở chuyên dụng hàng đầu để đánh giá RAG hiện nay là gì?",
            options: ["A. Ragas", "B. Pandas", "C. NumPy", "D. Scipy"],
            answer: 0,
            explain: "`Ragas` là framework phổ biến nhất tích hợp sẵn các chỉ số đánh giá RAG tự động."
        },
        {
            q: "Chỉ số Context Recall đo lường khía cạnh nào trong truy xuất RAG?",
            options: ["A. Tập ngữ cảnh tìm được có bao quát đầy đủ tất cả các ý cần thiết để trả lời câu hỏi chuẩn không", "B. Số dòng của văn bản", "C. Tốc độ tìm kiếm vector", "D. Giá tiền API"],
            answer: 0,
            explain: "Context Recall so sánh ngữ cảnh tìm được với đáp án chuẩn Ground Truth xem có bị sót thông tin không."
        },
        {
            q: "Tại sao nên chạy tự động hóa đánh giá RAG (Continuous Evaluation) trong CI/CD pipeline?",
            options: ["A. Để kịp thời phát hiện sự sụt giảm chất lượng (Regression) khi nâng cấp mô hình hoặc sửa đổi Prompt/Chunking", "B. Để tăng giá tiền dịch vụ", "C. Để xóa bớt file rác", "D. Để gửi email cho khách hàng"],
            answer: 0,
            explain: "Tự động hóa giúp đảm bảo mọi thay đổi hệ thống không làm suy giảm chất lượng câu trả lời của chatbot."
        }
    ],
    funcall: [
        {
            q: "Tính năng Function Calling (Gọi hàm) của LLM cho phép ứng dụng làm được điều gì?",
            options: ["A. Cho phép LLM tự xuất lệnh cấu trúc JSON chỉ định tên hàm và tham số cần gọi để backend thực thi", "B. Tự động viết lại toàn bộ chương trình", "C. Đổi kiểu dữ liệu trong CSDL", "D. Tự động tắt máy tính"],
            answer: 0,
            explain: "Function Calling biến LLM thành bộ não ra quyết định chọn hàm và trích xuất tham số JSON chính xác."
        },
        {
            q: "LLM có trực tiếp chạy code của hàm (Function execution) trên server của OpenAI không?",
            options: ["A. KHÔNG, LLM chỉ trả về tên hàm & tham số JSON; chính mã backend của ứng dụng sẽ thực thi hàm đó", "B. CÓ, OpenAI chạy code trên server họ", "C. CÓ, LLM tự truy cập DB", "D. KHÔNG, hàm chạy trên trình duyệt web khách"],
            answer: 0,
            explain: "LLM chỉ sinh ra cấu trúc định dạng gọi hàm. Việc gọi API/DB thực tế hoàn toàn do backend ứng dụng kiểm soát."
        },
        {
            q: "Khai báo Tool Specification (Đặc tả công cụ) cho LLM bao gồm các thông tin chính nào?",
            options: ["A. Tên hàm (name), Mô tả chức năng (description), và JSON Schema định nghĩa các tham số (parameters)", "B. Mật khẩu CSDL", "C. Mã nguồn C++", "D. Số lượng CPU"],
            answer: 0,
            explain: "LLM dựa vào description và parameters schema để hiểu khi nào cần gọi hàm và truyền tham số gì."
        },
        {
            q: "Quy trình vòng lặp (Loop) chuẩn khi triển khai Function Calling gồm những bước nào?",
            options: ["A. User gửi prompt -> LLM trả về `tool_calls` -> Backend thực thi hàm -> Gửi kết quả lại cho LLM -> LLM trả lời tự nhiên", "B. User gửi prompt -> LLM trả lời ngay -> Kết thúc", "C. Backend chạy hàm -> Gửi LLM -> Xóa dữ liệu", "D. LLM chạy hàm -> Trả về file zip"],
            answer: 0,
            explain: "Quy trình 2 lượt lặp: Lượt 1 LLM quyết định tool_call; Lượt 2 LLM nhận kết quả thực thi để tổng hợp câu trả lời."
        },
        {
            q: "Tại sao `description` (Mô tả chức năng hàm) lại cực kỳ quan trọng trong Tool Spec?",
            options: ["A. Vì LLM dùng đoạn mô tả này để quyết định có nên chọn gọi công cụ đó cho câu hỏi của người dùng hay không", "B. Vì Python bắt buộc có", "C. Để in ra màn hình", "D. Để tính tiền API"],
            answer: 0,
            explain: "LLM đọc description để hiểu ý nghĩa và trường hợp sử dụng của từng tool."
        },
        {
            q: "Điều gì xảy ra khi người dùng hỏi 'Thời tiết Hà Nội hôm nay thế nào?' và ứng dụng có tool `get_weather`?",
            options: ["A. LLM trả về `tool_calls` chỉ định hàm `get_weather(location='Hà Nội')`", "B. LLM bị lỗi", "C. LLM bịa đặt thời tiết", "D. LLM tự động mở tab mới"],
            answer: 0,
            explain: "LLM trích xuất được ý định hỏi thời tiết và địa điểm 'Hà Nội' để điền vào tham số hàm."
        },
        {
            q: "Trong OpenAI API, tham số `tool_choice='auto'` nghĩa là gì?",
            options: ["A. LLM tự quyết định xem có nên gọi công cụ nào không hoặc chỉ trả lời bằng văn bản thông thường", "B. Bắt buộc gọi tất cả các công cụ", "C. Không cho phép gọi công cụ nào", "D. Tự động chọn ngẫu nhiên"],
            answer: 0,
            explain: "`tool_choice='auto'` cho phép LLM linh hoạt chọn dùng tool phù hợp hoặc trả lời thẳng."
        },
        {
            q: "Nếu muốn BẮT BUỘC LLM phải gọi một hàm cụ thể `search_db`, ta cài đặt tham số `tool_choice` như thế nào?",
            options: ["A. `tool_choice={'type': 'function', 'function': {'name': 'search_db'}}`", "B. `tool_choice=True`", "C. `tool_choice='must'`", "D. `tool_choice='search_db'`"],
            answer: 0,
            explain: "Cấu hình ép buộc giúp chỉ định chính xác tên hàm mà LLM bắt buộc phải gọi."
        },
        {
            q: "Khi backend gửi trả kết quả thực thi hàm cho LLM, vai trò của message (Role) đó được khai báo là gì?",
            options: ["A. role='tool' (hoặc role='function')", "B. role='user'", "C. role='system'", "D. role='assistant'"],
            answer: 0,
            explain: "Message chứa kết quả phản hồi của hàm được gán role='tool' kèm theo `tool_call_id` tương ứng."
        },
        {
            q: "Function Calling giải quyết điểm yếu cốt lõi nào của mô hình ngôn ngữ lớn?",
            options: ["A. Giúp LLM tiếp cận dữ liệu thời gian thực và thực hiện các hành động làm thay đổi trạng thái hệ thống", "B. Tăng tốc độ train", "C. Nén dung lượng model", "D. Giảm số lượng tham số"],
            answer: 0,
            explain: "Khắc phục triệt để điểm yếu không có dữ liệu thực tế và tính tĩnh của dữ liệu huấn luyện."
        }
    ],
    agent: [
        {
            q: "Khái niệm AI Agent (Tác nhân thông minh) khác gì so with một LLM Chatbot thông thường?",
            options: ["A. Agent có khả năng tự lập kế hoạch (Planning), sử dụng công cụ (Tools) và thực thi vòng lặp tự chủ để đạt mục tiêu", "B. Agent chạy không cần máy tính", "C. Agent chỉ trả lời câu hỏi ngắn", "D. Agent không dùng LLM"],
            answer: 0,
            explain: "Agent là hệ thống tự chủ dùng LLM làm bộ não để lên kế hoạch, chọn công cụ và lặp lại cho đến khi hoàn thành mục tiêu phức tạp."
        },
        {
            q: "Vòng lặp ReAct Framework trong AI Agent gồm 3 bước lặp lại nào?",
            options: ["A. Thought (Suy nghĩ) -> Action (Hành động) -> Observation (Quan sát kết quả)", "B. Read -> Act -> Text", "C. Request -> API -> Response", "D. Run -> Error -> Exit"],
            answer: 0,
            explain: "ReAct đan xen giữa Suy nghĩ tư duy (Thought), thực thi công cụ (Action) và thu nhận kết quả thực tế (Observation)."
        },
        {
            q: "Thành phần 'Memory' trong kiến trúc AI Agent có vai trò gì?",
            options: ["A. Lưu trữ ngắn hạn bước làm việc hiện tại và dài hạn kinh nghiệm/ngữ cảnh để phục vụ lập kế hoạch", "B. Lưu trữ file cài đặt Python", "C. Lưu mật khẩu máy tính", "D. Đo tốc độ GPU"],
            answer: 0,
            explain: "Bộ nhớ giúp Agent theo dõi tiến trình làm việc đa bước và không bị lặp lại các hành động sai."
        },
        {
            q: "Multi-Agent System (Hệ thống đa tác nhân) là mô hình như thế nào?",
            options: ["A. Phân chia công việc cho nhiều Agent chuyên hóa (vd: Researcher, Writer, Coder) hợp tác giải quyết bài toán lớn", "B. Dùng 1 Agent duy nhất làm mọi việc", "C. Nhiều máy tính chạy song song", "D. Đội ngũ con người làm việc"],
            answer: 0,
            explain: "Đa tác nhân phối hợp các Agent chuyên môn hóa riêng biệt để xử lý các quy trình làm việc phức tạp."
        },
        {
            q: "Trong framework LangGraph, Agent được biểu diễn dưới dạng cấu trúc dữ liệu nào?",
            options: ["A. Đồ thị có hướng (StateGraph) gồm các Nút (Nodes - xử lý) và Cạnh (Edges - điều kiện chuyển tiếp)", "B. Danh sách liên kết 1 chiều", "C. Mảng 2 chiều", "D. Bảng CSDL SQL"],
            answer: 0,
            explain: "LangGraph mô hình hóa Agent dưới dạng Đồ thị trạng thái, giúp kiểm soát vòng lặp và nhánh rẽ chính xác."
        },
        {
            q: "Hiện tượng Vòng lặp vô tận (Infinite Loop) của Agent xảy ra khi nào?",
            options: ["A. Khi Agent liên tục gọi 1 công cụ bị lỗi mà không đạt được kết quả quan sát mong muốn để dừng lại", "B. Khi mạng internet bị ngắt", "C. Khi hết dung lượng ổ cứng", "D. Khi tắt trình duyệt"],
            answer: 0,
            explain: "Nếu không có cơ chế giới hạn `max_iterations`, Agent có thể kẹt trong vòng lặp thử đi thử lại một hành động thất bại."
        },
        {
            q: "Cơ chế Human-in-the-loop (Con người can thiệp) trong thiết kế Agent dùng để làm gì?",
            options: ["A. Yêu cầu con người duyệt hoặc xác nhận trước khi Agent thực hiện các hành động rủi ro cao (vd: chuyển tiền, xóa CSDL)", "B. Để con người gõ code hộ Agent", "C. Để tắt Agent", "D. Để tính tiền dịch vụ"],
            answer: 0,
            explain: "Human-in-the-loop dừng Agent lại tại các bước nhạy cảm để chờ phê duyệt an toàn từ con người."
        },
        {
            q: "Công cụ 'Search API' trao cho AI Agent khả năng gì?",
            options: ["A. Tra cứu thông tin trực tuyến thời gian thực trên Internet (Google/Tavily) để cập nhật kiến thức mới nhất", "B. Tự động đổi mật khẩu", "C. Quản lý bộ nhớ RAM", "D. Tạo hình ảnh 3D"],
            answer: 0,
            explain: "Search Tool giúp Agent tự tìm kiếm tin tức, dữ liệu thực tế vượt ngoài phạm vi kiến thức đóng đóng trong LLM."
        },
        {
            q: "Framework phát triển AI Agent phổ biến hiện nay bao gồm những cái tên nào?",
            options: ["A. LangChain, LangGraph, CrewAI, AutoGen", "B. ReactJS, VueJS, Angular", "C. Django, Flask, FastAPI", "D. NumPy, Pandas, Scikit-Learn"],
            answer: 0,
            explain: "LangGraph, CrewAI, AutoGen là những framework chuyên dụng hàng đầu xây dựng hệ thống AI Agent."
        },
        {
            q: "Định nghĩa 'Plan-and-Solve' trong kỹ thuật Agent nghĩa là gì?",
            options: ["A. Agent chia bài toán thành danh sách các bước kế hoạch nhỏ trước, rồi mới thực thi từng bước một", "B. Làm ngẫu nhiên không cần tính toán", "C. Hỏi người dùng từng câu một", "D. Dừng ứng dụng"],
            answer: 0,
            explain: "Tách bạch giai đoạn Lập kế hoạch tổng thể (Planner) và giai đoạn Thực thi (Executor) giúp tăng độ chính xác."
        }
    ],
    lora: [
        {
            q: "Kỹ thuật PEFT (Parameter-Efficient Fine-Tuning) có mục tiêu cốt lõi là gì?",
            options: ["A. Tinh chỉnh LLM bằng cách chỉ cập nhật một số lượng rất nhỏ tham số bổ trợ, tiết kiệm tài nguyên GPU", "B. Huấn luyện lại toàn bộ 100% trọng số LLM", "C. Xóa bỏ các lớp Transformer", "D. Giảm số lượng từ tiếng Việt"],
            answer: 0,
            explain: "PEFT đóng băng mô hình gốc và chỉ huấn luyện một lượng nhỏ tham số mới, giúp fine-tune LLM trên GPU phổ thông."
        },
        {
            q: "LoRA (Low-Rank Adaptation) hoạt động dựa trên nguyên lý toán học nào?",
            options: ["A. Phân rã ma trận cập nhật trọng số $\\Delta W$ thành tích của 2 ma trận rank thấp $A$ và $B$ ($W = W_0 + B \\times A$)", "B. Phép chia ma trận", "C. Phép cộng vector đơn giản", "D. Hàm mũ số học"],
            answer: 0,
            explain: "LoRA xấp xỉ ma trận $\\Delta W (d \\times d)$ bằng tích hai ma trận ma trận nhỏ $B (d \\times r)$ và $A (r \\times d)$ với $r \\ll d$."
        },
        {
            q: "Trong LoRA, tham số `r` (Rank) có ý nghĩa như thế nào?",
            options: ["A. Hạng của ma trận bổ trợ (r nhỏ như 8, 16 làm giảm số tham số cần train nhưng vẫn giữ hiệu quả)", "B. Kích thước file PDF", "C. Tốc độ mạng", "D. Số lượng GPU"],
            answer: 0,
            explain: "Rank $r$ càng nhỏ thì số tham số huấn luyện thêm càng ít (ví dụ chỉ chiếm 0.1% tổng số tham số gốc)."
        },
        {
            q: "Điều gì xảy ra với các trọng số của Mô hình gốc (Base Model) trong quá trình huấn luyện LoRA?",
            options: ["A. Hoàn toàn bị đóng băng (Frozen), không bị thay đổi hay cập nhật", "B. Bị cập nhật 100%", "C. Bị xóa khỏi bộ nhớ VRAM", "D. Bị biến đổi về số 0"],
            answer: 0,
            explain: "Trọng số gốc $W_0$ được đóng băng hoàn toàn; chỉ có các ma trận LoRA mới ($A$ và $B$) là được cập nhật gradient."
        },
        {
            q: "Kỹ thuật QLoRA (Quantized LoRA) nâng cấp LoRA ở điểm nào?",
            options: ["A. Nén trọng số mô hình gốc xuống định dạng 4-bit (NF4), giúp Fine-tune LLM lớn trên 1 GPU tiêu chuẩn", "B. Tăng gấp 4 lần dung lượng VRAM", "C. Chạy trên CPU không cần GPU", "D. Xóa bớt dữ liệu train"],
            answer: 0,
            explain: "QLoRA nén mô hình gốc xuống 4-bit giúp giảm bộ nhớ VRAM đến 70-80% mà vẫn giữ nguyên độ chính xác."
        },
        {
            q: "Sau khi huấn luyện xong LoRA, thao tác 'Merge Weights' có tác dụng gì?",
            options: ["A. Cộng ma trận LoRA vào trọng số gốc $W_{final} = W_0 + B \\times A$ để tạo 1 file mô hình duy nhất không tốn độ trễ khi chạy", "B. Xóa file LoRA", "C. Chuyển mô hình thành file CSV", "D. Tách mô hình làm 2"],
            answer: 0,
            explain: "Gộp trọng số giúp ứng dụng khi deploy chạy trực tiếp với tốc độ gốc mà không cần tính 2 nhánh riêng lẻ."
        },
        {
            q: "So với Full Fine-Tuning (tinh chỉnh toàn bộ mô hình), LoRA giảm dung lượng file lưu trữ Adapter xuống khoảng bao nhiêu?",
            options: ["A. Từ hàng chục GB xuống chỉ còn vài MB đến vài chục MB", "B. Giảm 5%", "C. Không giảm dung lượng", "D. Tăng gấp đôi dung lượng"],
            answer: 0,
            explain: "File Adapter của LoRA chỉ chứa các ma trận rank thấp nên dung lượng rất nhỏ (ví dụ 10MB - 100MB)."
        },
        {
            q: "Thư viện Python mã nguồn mở phổ biến nhất của HuggingFace để triển khai LoRA là gì?",
            options: ["A. `peft`", "B. `pandas`", "C. `scikit-learn`", "D. `requests`"],
            answer: 0,
            explain: "Thư viện `peft` (PEFT library) của HuggingFace là công cụ tiêu chuẩn để tích hợp LoRA, QLoRA."
        },
        {
            q: "Khi nào nên dùng Fine-Tuning LoRA thay vì dùng RAG?",
            options: ["A. Khi muốn thay đổi phong cách ngôn ngữ, định dạng trả lời đặc thù hoặc dạy kiến thức chuyên ngành sâu định hình cố định", "B. Khi muốn tra cứu văn bản nội bộ thay đổi liên tục hàng ngày", "C. Khi không có dữ liệu train", "D. Khi không có GPU"],
            answer: 0,
            explain: "Fine-tuning tối ưu cho phong cách, cú pháp và hành vi; RAG tối ưu cho việc tra cứu thông tin động cập nhật liên tục."
        },
        {
            q: "Tham số `lora_alpha` trong cấu hình LoRA dùng để làm gì?",
            options: ["A. Hằng số tỉ lệ (Scaling factor) điều chỉnh mức độ ảnh hưởng của ma trận LoRA lên trọng số gốc", "B. Đặt số lượng epoch", "C. Đặt tên mô hình", "D. Mã hóa dữ liệu đầu vào"],
            answer: 0,
            explain: "Ma trận LoRA được nhân với tỷ lệ $\\frac{\\text{lora\\_alpha}}{r}$ trước khi cộng vào trọng số gốc."
        }
    ],
    serve: [
        {
            q: "FastAPI được ưa chuộng để phát triển ứng dụng AI API nhờ ưu điểm nổi bật nào?",
            options: ["A. Hiệu năng cao (Async I/O), hỗ trợ OpenAPI tự động và tích hợp sẵn Pydantic validation", "B. Dễ cài đặt trên điện thoại", "C. Không cần chạy server", "D. Viết bằng ngôn ngữ C++"],
            answer: 0,
            explain: "FastAPI xây dựng trên Starlette/Pydantic có tốc độ xử lý async cực nhanh và hỗ trợ auto-documentation."
        },
        {
            q: "Cơ chế Server-Sent Events (SSE) khác gì với WebSocket?",
            options: ["A. SSE là kết nối 1 chiều từ Server truyền dữ liệu liên tục về Client; WebSocket là kết nối 2 chiều (Bi-directional)", "B. SSE chỉ truyền được file ảnh", "C. WebSocket chậm hơn SSE 1000 lần", "D. SSE yêu cầu cài thêm plugin trình duyệt"],
            answer: 0,
            explain: "SSE là giao thức HTTP chuẩn 1 chiều lý tưởng cho việc stream chữ chạy từ LLM về trình duyệt web."
        },
        {
            q: "Định dạng Media Type chuẩn trong FastAPI để trả về một luồng SSE Stream là gì?",
            options: ["A. `text/event-stream`", "B. `application/json`", "C. `text/html`", "D. `multipart/form-data`"],
            answer: 0,
            explain: "Header `Content-Type: text/event-stream` báo cho trình duyệt biết đây là luồng dữ liệu SSE."
        },
        {
            q: "Từ khóa `async` và `await` trong Python dùng để làm gì?",
            options: ["A. Lập trình bất đồng bộ (Asynchronous Programming) giúp server xử lý hàng ngàn yêu cầu I/O mà không bị nghẽn thread", "B. Chạy code trên GPU", "C. Tự động dịch ngôn ngữ", "D. Xóa dữ liệu rác"],
            answer: 0,
            explain: "Async/await giúp giải phóng Event Loop trong khi chờ các tác vụ I/O (gọi API LLM, đọc DB)."
        },
        {
            q: "Cấu trúc dữ liệu của mỗi sự kiện truyền qua luồng SSE chuẩn có định dạng như thế nào?",
            options: ["A. `data: <nội dung>\\n\\n`", "B. `JSON: {...}`", "C. `<xml>content</xml>`", "D. `raw_text`"],
            answer: 0,
            explain: "Định dạng chuẩn của gói tin SSE bắt đầu bằng `data: ` và kết thúc bằng 2 ký tự xuống dòng `\\n\\n`."
        },
        {
            q: "Web Server ASGI phổ biến thường dùng để chạy ứng dụng FastAPI trong môi trường Production là gì?",
            options: ["A. Uvicorn / Gunicorn", "B. Apache", "C. Nginx đơn thuần", "D. Tomcat"],
            answer: 0,
            explain: "Uvicorn là máy chủ ASGI tốc độ cao dùng để thực thi các ứng dụng Python bất đồng bộ."
        },
        {
            q: "Khái niệm Streaming Response mang lại trải nghiệm người dùng (UX) như thế nào trong Chatbot?",
            options: ["A. Người dùng thấy chữ xuất hiện từng từ real-time ngay lập tức thay vì phải chờ 10-20 giây cho toàn bộ câu trả lời", "B. Giảm bớt số lượng từ", "C. Tự động đọc thành tiếng", "D. Làm đẹp chữ"],
            answer: 0,
            explain: "Streaming làm giảm chỉ số Time To First Token (TTFT), giúp ứng dụng phản hồi mượt mà như ChatGPT."
        },
        {
            q: "Trình duyệt Web phía Client sử dụng đối tượng JavaScript nào để lắng nghe luồng SSE?",
            options: ["A. `EventSource('/api/stream')`", "B. `fetchJSON()`", "C. `XMLHttpRequest()`", "D. `WebSocket()`"],
            answer: 0,
            explain: "API chuẩn `EventSource` của trình duyệt dùng để kết nối và nhận sự kiện từ endpoint SSE."
        },
        {
            q: "CORS (Cross-Origin Resource Sharing) trong FastAPI cần được cấu hình khi nào?",
            options: ["A. Khi ứng dụng Frontend (vd: React/Vue) nằm trên domain/port khác với Backend API", "B. Khi ứng dụng bị lỗi 500", "C. Khi dùng CSDL PostgreSQL", "D. Khi tắt mạng"],
            answer: 0,
            explain: "CORS Middleware cho phép trình duyệt ở domain khác gửi request tới API Backend an toàn."
        },
        {
            q: "Dịch vụ Vercel Serverless Function xử lý FastAPI theo cơ chế nào?",
            options: ["A. Đóng gói hàm thành WSGI/ASGI handler chạy theo sự kiện (Event-driven) trên hạ tầng Cloud", "B. Chạy 1 máy chủ ảo liên tục 24/7", "C. Chạy trên máy tính cá nhân", "D. Không hỗ trợ FastAPI"],
            answer: 0,
            explain: "Vercel khởi tạo các instance ngắn hạn xử lý request và tự động scale theo lưu lượng."
        }
    ],
    docker: [
        {
            q: "Docker giải quyết vấn đề kinh điển nào trong phát triển phần mềm?",
            options: ["A. 'Code chạy ngon trên máy tôi nhưng bị lỗi trên máy khác/production'", "B. Máy tính bị thiếu ổ cứng", "C. Mạng internet bị chậm", "D. Lỗi sai chính tả code"],
            answer: 0,
            explain: "Docker đóng gói mã nguồn cùng toàn bộ môi trường phụ thuộc (dependencies/OS) đảm bảo ứng dụng chạy nhất quán ở mọi nơi."
        },
        {
            q: "Sự khác biệt cốt lõi giữa Docker Container và Máy ảo (Virtual Machine - VM) là gì?",
            options: ["A. Container chia sẻ chung Kernel của OS máy host (nhẹ, khởi động vài giây); VM cần một OS khách riêng biệt (nặng, lâu)", "B. Container nặng hơn VM 10 lần", "C. VM không tốn RAM", "D. Container không chạy được trên Linux"],
            answer: 0,
            explain: "Container nhẹ hơn nhiều vì dùng chung Kernel của hệ điều hành gốc thay vì giả lập toàn bộ OS như VM."
        },
        {
            q: "Tệp `Dockerfile` là gì?",
            options: ["A. Tệp kịch bản chứa danh sách các câu lệnh hướng dẫn Docker từng bước build ra một Docker Image", "B. File nén zip", "C. File chứa cơ sở dữ liệu", "D. File cấu hình giao diện"],
            answer: 0,
            explain: "Dockerfile chứa các chỉ thị (FROM, WORKDIR, COPY, RUN, CMD) để tự động hóa việc tạo Image."
        },
        {
            q: "Chỉ thị `FROM python:3.10-slim` trong Dockerfile có ý nghĩa gì?",
            options: ["A. Khai báo Image nền (Base Image) chuẩn Python 3.10 phiên bản rút gọn để làm nền tảng", "B. Tải Python về máy tính", "C. Đổi tên file code", "D. Xóa môi trường cũ"],
            answer: 0,
            explain: "Chỉ thị `FROM` chỉ định Base Image khởi đầu để cài đặt ứng dụng lên đó."
        },
        {
            q: "Chỉ thị `RUN pip install -r requirements.txt` chạy vào thời điểm nào?",
            options: ["A. Chạy trong quá trình BUILD tạo ra Docker Image", "B. Chạy mỗi khi Container khởi động", "C. Chạy khi tắt Container", "D. Chạy trên máy client"],
            answer: 0,
            explain: "Các lệnh `RUN` được thực thi lúc build image để cài đặt thư viện và lưu vào các lớp (Layers)."
        },
        {
            q: "Sự khác nhau giữa lệnh `RUN` và `CMD` trong Dockerfile là gì?",
            options: ["A. `RUN` thi hành lúc Build Image; `CMD` khai báo câu lệnh mặc định sẽ chạy khi Container KHỞI ĐỘNG", "B. Cả hai giống hệt nhau", "C. `CMD` chạy trước `RUN`", "D. `RUN` dùng cho Windows, `CMD` dùng cho Linux"],
            answer: 0,
            explain: "RUN xây dựng các layer của Image; CMD là lệnh thực thi chính khi container bắt đầu chạy (Runtime)."
        },
        {
            q: "Docker Compose được sử dụng nhằm mục đích gì?",
            options: ["A. Định nghĩa và quản lý ứng dụng đa container (Multi-container) thông qua một file cấu hình `docker-compose.yml`", "B. Nén file ảnh", "C. Viết code Python", "D. Sửa lỗi hệ điều hành"],
            answer: 0,
            explain: "Docker Compose giúp khởi chạy đồng thời nhiều service (vd: FastAPI + Redis + Postgres) chỉ bằng 1 lệnh `docker compose up`."
        },
        {
            q: "Lệnh `docker run -p 8000:80` có ý nghĩa là gì?",
            options: ["A. Ánh xạ cổng (Port Forwarding): Port 8000 của máy thật (Host) trỏ vào Port 80 bên trong Container", "B. Chạy 8000 container cùng lúc", "C. Giới hạn RAM 8000MB", "D. Xóa port 80"],
            answer: 0,
            explain: "Tham số `-p host_port:container_port` cho phép truy cập dịch vụ bên trong container từ bên ngoài."
        },
        {
            q: "Docker Registry (ví dụ Docker Hub) là gì?",
            options: ["A. Kho lưu trữ trực tuyến để quản lý, chia sẻ và lưu trữ các Docker Image", "B. Nơi bán máy tính", "C. Trình duyệt web", "D. Cơ sở dữ liệu SQL"],
            answer: 0,
            explain: "Docker Hub là nơi lưu giữ và phân phối các Docker Image công khai hoặc riêng tư."
        },
        {
            q: "Tệp `.dockerignore` dùng để làm gì?",
            options: ["A. Khai báo các file/thư mục không muốn copy vào Docker Image (như `.git`, `venv`, `__pycache__`) để giảm dung lượng", "B. Khóa container", "C. Bỏ qua các lỗi syntax", "D. Xóa dữ liệu trên host"],
            answer: 0,
            explain: ".dockerignore giúp loại bỏ các tệp rác rưởi/tạm thời khỏi quá trình build, làm image nhẹ và build nhanh hơn."
        }
    ],
    tracing: [
        {
            q: "Tracing & Observability trong ứng dụng LLM/RAG giúp giải quyết vấn đề gì?",
            options: ["A. Theo dõi chi tiết đường đi, đo lường thời gian thực thi (Latency), chi phí token và debug các bước trong chuỗi gọi LLM", "B. Tự động sửa code Python", "C. Tăng dung lượng ổ cứng", "D. Khóa tài khoản người dùng"],
            answer: 0,
            explain: "Observability giúp soi sáng 'hộp đen' của các chuỗi gọi AI phức tạp, theo dõi chính xác từng bước xử lý."
        },
        {
            q: "Nền tảng quan sát và giám sát ứng dụng LLM nổi tiếng nhất của LangChain là gì?",
            options: ["A. LangSmith", "B. TensorBoard", "C. Grafana", "D. Postman"],
            answer: 0,
            explain: "LangSmith là nền tảng chuyên dụng hàng đầu để tracing, debug, test và giám sát các ứng dụng LLM."
        },
        {
            q: "Một 'Span' trong kết quả Tracing thể hiện điều gì?",
            options: ["A. Một đơn vị công việc/thao tác cụ thể (vd: 1 cuộc truy vấn Vector DB, 1 lần gọi LLM API) với thời gian bắt đầu/kết thúc", "B. Độ dài của prompt", "C. Số lượng máy chủ", "D. Tên của người dùng"],
            answer: 0,
            explain: "Span đại diện cho khoảng thời gian thực thi của một bước nhỏ nằm trong cây Trace tổng thể."
        },
        {
            q: "Chỉ số TTFT (Time To First Token) trong giám sát LLM đo lường điều gì?",
            options: ["A. Khoảng thời gian từ lúc người dùng gửi câu hỏi đến khi nhận được ký tự/token đầu tiên phát ra từ LLM", "B. Thời gian lưu file", "C. Tổng số token của câu", "D. Thời gian tắt server"],
            answer: 0,
            explain: "TTFT là chỉ số quan trọng đo lường độ nhạy phản hồi trải nghiệm người dùng khi dùng Streaming."
        },
        {
            q: "Để bật tự động Tracing LangChain lên LangSmith, ta cần cài đặt biến môi trường nào?",
            options: ["A. `LANGCHAIN_TRACING_V2='true'` và `LANGCHAIN_API_KEY='...'`", "B. `DEBUG=1`", "C. `TRACE_ALL=True`", "D. `ENABLE_LOGS=1`"],
            answer: 0,
            explain: "Cấu hình 2 biến môi trường này cho phép LangChain tự động đẩy toàn bộ trace log lên bảng điều khiển LangSmith."
        },
        {
            q: "Việc theo dõi chỉ số Token Usage (Input/Output Tokens) qua Tracing có ý nghĩa gì?",
            options: ["A. Kiểm soát và tính toán chi phí tài chính thực tế phát sinh trên mỗi cuộc hội thoại hoặc từng người dùng", "B. Đếm số trang sách", "C. Tính tốc độ gõ bàn phím", "D. Đổi đơn vị số"],
            answer: 0,
            explain: "Giúp lập trình viên nắm rõ lượng token tiêu tốn ở từng bước prompt để dự đoán và tối ưu ngân sách API."
        },
        {
            q: "Khái niệm Evaluation Run trong LangSmith cho phép làm gì?",
            options: ["A. Chạy tự động một tập dữ liệu thử nghiệm qua chuỗi ứng dụng và chấm điểm kết quả đối chiếu", "B. Xóa dữ liệu log cũ", "C. Khởi động lại server", "D. Khóa API Key"],
            answer: 0,
            explain: "Evaluation Runs giúp đánh giá hồi quy (Regression Testing) hiệu năng của ứng dụng AI qua thời gian."
        },
        {
            q: "Khi một bước trong Agent bị lỗi timeout, Tracing giúp lập trình viên phát hiện điều gì?",
            options: ["A. Xác định chính xác vị trí công cụ (Tool) hay nút (Node) nào đang kẹt và giá trị đầu vào dẫn đến lỗi đó", "B. Sửa code tự động", "C. Đổi mạng wifi", "D. Tự động mua thêm RAM"],
            answer: 0,
            explain: "Cây vết Trace hiển thị chính xác nút bị dừng cùng toàn bộ thông tin payload đầu vào/đầu ra tại điểm lỗi."
        },
        {
            q: "Công cụ mã nguồn mở tự host (Self-hosted) thay thế cho LangSmith là dự án nào?",
            options: ["A. Langfuse / Phoort / Arize Phoenix", "B. MySQL", "C. VS Code", "D. Docker Hub"],
            answer: 0,
            explain: "Langfuse hay Phoenix là các giải pháp mã nguồn mở tự host giúp giám sát LLM an toàn dữ liệu nội bộ."
        },
        {
            q: "Tại sao không nên in (print) prompt và response ra console một cách thủ công thay cho Tracing?",
            options: ["A. Vì print thủ công khó theo dõi luồng bất đồng bộ, thiếu chỉ số latency/token và không lưu lại lịch sử trực quan", "B. Vì print bị cấm trong Python", "C. Vì print làm sập máy", "D. Vì print tốn tiền hơn"],
            answer: 0,
            explain: "Tracing chuyên nghiệp thu thập có cấu trúc toàn bộ cây thực thi, metadata và các chỉ số đo lường mà print không làm được."
        }
    ],
    langchain: [
        {
            q: "Cú pháp toán tử | (Pipe Operator) trong LCEL (LangChain Expression Language) dùng để làm gì?",
            options: ["A. Ghép nối chuỗi các thành phần (Prompt | Model | OutputParser) thành một Pipeline liên tục", "B. Phép chia số học", "C. Phép OR logic nhị phân", "D. Tạo đường kẻ ngang"],
            answer: 0,
            explain: "Toán tử | trong LCEL nối đầu ra của phần tử phía trước làm đầu vào cho phần tử phía sau một cách thanh lịch."
        },
        {
            q: "Đối tượng `ChatPromptTemplate` trong LangChain dùng để tạo câu lệnh có đặc điểm gì?",
            options: ["A. Quản lý danh sách các mẫu tin nhắn có tham số biến số (như `{topic}`) và vai trò (System, Human, AI)", "B. Chỉ tạo được câu lệnh bằng tiếng Anh", "C. Xóa các biến số", "D. Lưu file ảnh"],
            answer: 0,
            explain: "ChatPromptTemplate hỗ trợ format động các biến số vào trong bộ tin nhắn đa vai trò."
        },
        {
            q: "Lớp `StrOutputParser` trong LangChain có công dụng gì?",
            options: ["A. Trích xuất văn bản chuỗi (string) thuần túy từ đối tượng `AIMessage` phản hồi của LLM", "B. Ép sang số nguyên", "C. Dịch tự động", "D. Đếm số từ"],
            answer: 0,
            explain: "StrOutputParser nén đối tượng `AIMessage` phức tạp về dạng chuỗi văn bản đơn thuần."
        },
        {
            q: "Phương thức `chain.invoke({'topic': 'AI'})` thực hiện công việc gì?",
            options: ["A. Kích hoạt thực thi toàn bộ chuỗi Pipeline với dữ liệu đầu vào truyền vào dạng dictionary", "B. Xóa chuỗi", "C. In chuỗi ra máy in", "D. Đóng kết nối API"],
            answer: 0,
            explain: "invoke() là phương thức đồng bộ chuẩn để chạy một Runnable chain với tham số đầu vào."
        },
        {
            q: "Phương thức `chain.stream({...})` mang lại khả năng gì?",
            options: ["A. Trả về một Iterator phát ra từng phần kết quả (Tokens) theo thời gian thực", "B. Lưu trữ file video", "C. Chạy trên 100 máy chủ", "D. Tự động xóa bộ nhớ"],
            answer: 0,
            explain: "stream() cho phép nhận các mảnh token ngay khi LLM vừa sinh ra mà không cần chờ cả câu."
        },
        {
            q: "LangGraph khác gì so với LangChain Runnable Chain tuyến tính chuẩn?",
            options: ["A. LangGraph hỗ trợ xây dựng luồng làm việc có VÒNG LẶP (Cyclic / Graphs) và quản lý trạng thái State có cấu trúc", "B. LangGraph chỉ chạy trên trình duyệt", "C. LangGraph không hỗ trợ Python", "D. LangGraph là giao diện thiết kế kéo thả"],
            answer: 0,
            explain: "LangGraph cho phép tạo đồ thị có vòng lặp (lý tưởng cho Agent thử-lỗi) điều mà chuỗi LCEL tuyến tính không làm được."
        },
        {
            q: "Trong LangGraph, đối tượng `State` đóng vai trò gì?",
            options: ["A. Bộ nhớ tập trung duy trì và chia sẻ dữ liệu giữa tất cả các Nút (Nodes) trong quá trình đồ thị thực thi", "B. Lưu mật khẩu", "C. Đổi màu giao diện", "D. Lưu phiên bản code"],
            answer: 0,
            explain: "State là nguồn dữ liệu sự thật duy nhất (Single Source of Truth) được truyền và cập nhật qua từng Node trong graph."
        },
        {
            q: "Conditional Edge (Cạnh điều kiện) trong LangGraph dùng để làm gì?",
            options: ["A. Định tuyến nhánh rẽ tiếp theo dựa trên logic kiểm tra trạng thái hiện tại (vd: có cần gọi Tool hay không)", "B. Khóa đồ thị", "C. Xóa các nút cũ", "D. Tạo vòng lặp vô tận"],
            answer: 0,
            explain: "Conditional Edge đưa ra quyết định chuyển hướng sang Node tiếp theo tùy theo đầu ra của Node trước."
        },
        {
            q: "Khái niệm RunnablePassthrough trong LangChain dùng để làm gì?",
            options: ["A. Truyền nguyên vẹn dữ liệu đầu vào sang bước tiếp theo mà không làm biến đổi nó", "B. Bỏ qua lỗi", "C. Dừng chuỗi", "D. Xóa dữ liệu"],
            answer: 0,
            explain: "RunnablePassthrough cho phép chuyển dữ liệu gốc song song đi cùng các luồng biến đổi khác."
        },
        {
            q: "Lớp `RunnableParallel` hỗ trợ điều gì?",
            options: ["A. Thực thi nhiều chuỗi nhánh (Runnables) song song đồng thời cùng lúc để tăng tốc độ", "B. Chạy tuần tự từng bước", "C. Xóa các nhánh bị chậm", "D. Tắt tính năng async"],
            answer: 0,
            explain: "RunnableParallel giúp chạy song song nhiều tác vụ độc lập (vd: vừa tìm Vector vừa lấy câu hỏi) nâng cao hiệu năng."
        }
    ],
    memory: [
        {
            q: "Tại sao ứng dụng Chatbot mặc định cần phải có cơ chế quản lý Bộ nhớ hội thoại (Memory)?",
            options: ["A. Vì các mô hình LLM về bản chất là Phi trạng thái (Stateless), không tự lưu nhớ các câu hội thoại cũ giữa các lần gọi API", "B. Vì Python không lưu được chuỗi", "C. Vì OpenAI bắt buộc phải làm", "D. Để tăng tốc độ mạng"],
            answer: 0,
            explain: "Mỗi lần gọi API LLM là độc lập; lập trình viên phải truyền lại lịch sử trò chuyện trong prompt thì LLM mới hiểu ngữ cảnh."
        },
        {
            q: "Bộ nhớ ngắn hạn (Short-term Memory) trong Chatbot thường được triển khai bằng cách nào?",
            options: ["A. Lưu danh sách các tin nhắn (`SystemMessage`, `HumanMessage`, `AIMessage`) trong bộ nhớ RAM hoặc Redis session", "B. Lưu ra file Excel", "C. In ra giấy", "D. Lưu vào ROM"],
            answer: 0,
            explain: "Lịch sử cuộc hội thoại hiện tại được duy trì trong RAM/Session và gửi đính kèm vào mỗi lượt hỏi tiếp theo."
        },
        {
            q: "Điều gì xảy ra khi cuộc hội thoại kéo dài hàng trăm lượt làm vượt quá Cửa sổ ngữ cảnh (Context Window) của LLM?",
            options: ["A. Gọi API bị lỗi tràn token (Context Length Exceeded) hoặc tốn rất nhiều chi phí token không cần thiết", "B. Chatbot tự động tắt", "C. Mô hình chạy nhanh hơn", "D. Máy tính bị sập"],
            answer: 0,
            explain: "Lịch sử quá dài sẽ gây tốn tiền API và vượt giới hạn token tối đa của mô hình."
        },
        {
            q: "Kỹ thuật `ConversationBufferWindowMemory` (Window Memory) giải quyết vấn đề tràn context bằng cách nào?",
            options: ["A. Chỉ giữ lại đúng $K$ lượt hội thoại gần nhất và bỏ qua các câu hội thoại quá cũ phía trước", "B. Tóm tắt toàn bộ sách", "C. Xóa toàn bộ tin nhắn người dùng", "D. Nén ảnh"],
            answer: 0,
            explain: "Window Memory duy trì một cửa sổ trượt chỉ lưu N lượt chat gần nhất để kiểm soát dung lượng token."
        },
        {
            q: "Kỹ thuật `ConversationSummaryMemory` xử lý lịch sử cũ như thế nào?",
            options: ["A. Dùng một LLM để tóm tắt các đoạn hội thoại cũ thành một đoạn văn bản ngắn gọn lưu vào ngữ cảnh", "B. Xóa hết lịch sử cũ", "C. Giữ nguyên 100% từng chữ", "D. Dịch sang tiếng Pháp"],
            answer: 0,
            explain: "Summary Memory dùng LLM cô đọng các ý chính của cuộc trò chuyện cũ để tiết kiệm không gian token mà không mất thông tin cốt lõi."
        },
        {
            q: "Bộ nhớ dài hạn (Long-term Memory) của Chatbot phục vụ mục đích gì?",
            options: ["A. Lưu trữ sở thích, thông tin cá nhân và sự kiện của người dùng qua nhiều phiên đăng nhập khác nhau vào Vector DB", "B. Lưu thông tin thẻ tín dụng", "C. Lưu file log ứng dụng", "D. Lưu các câu hỏi bị lỗi"],
            answer: 0,
            explain: "Bộ nhớ dài hạn giúp AI ghi nhớ thói quen và thông tin người dùng từ các cuộc trò chuyện từ nhiều ngày trước."
        },
        {
            q: "Cách nạp lịch sử hội thoại dài hạn từ Vector DB vào Prompt chuẩn là gì?",
            options: ["A. Tìm kiếm các đoạn hội thoại cũ có tương đồng ngữ nghĩa với câu hỏi mới rồi chèn vào làm Context", "B. Nạp toàn bộ CSDL", "C. Chọn ngẫu nhiên 5 câu", "D. Không nạp gì cả"],
            answer: 0,
            explain: "Semantic Memory dùng Vector Search để truy xuất lại các kỷ niệm/thông tin cũ liên quan nhất đến câu hỏi hiện tại."
        },
        {
            q: "Trong LangChain, các loại message đối tượng chính đại diện cho hội thoại là gì?",
            options: ["A. `SystemMessage`, `HumanMessage`, `AIMessage`, `ToolMessage`", "B. `StringMessage`, `IntMessage`", "C. `UserMsg`, `BotMsg`", "D. `InputData`, `OutputData`"],
            answer: 0,
            explain: "Đây là 4 lớp Message chuẩn đại diện cho các vai trò trong chuỗi hội thoại LangChain."
        },
        {
            q: "Chiến lược Trim Messages (Cắt tỉa tin nhắn) thông minh dựa trên điều gì?",
            options: ["A. Đếm tổng số token của danh sách tin nhắn và cắt bớt từ đầu sao cho luôn giữ đúng vai trò SystemMessage và nằm trong giới hạn max_tokens", "B. Cắt ngẫu nhiên", "C. Cắt bỏ các câu có chữ 'A'", "D. Xóa các dòng số chẵn"],
            answer: 0,
            explain: "Cắt tỉa theo token đảm bảo không bao giờ bị lỗi quá tải token mà vẫn bảo tồn System Prompt ban đầu."
        },
        {
            q: "Dịch vụ Redis thường được chọn làm nơi lưu trữ Session Memory vì ưu điểm gì?",
            options: ["A. Cơ sở dữ liệu In-Memory tốc độ đọc ghi cực nhanh (sub-millisecond) với tính năng đặt thời gian tự hủy (TTL)", "B. Lưu được file video 4K", "C. Miễn phí 100%", "D. Tự động viết code Python"],
            answer: 0,
            explain: "Redis lưu dữ liệu trực tiếp trên RAM giúp truy xuất bộ nhớ hội thoại tức thì với chi phí độ trễ thấp."
        }
    ],
    security: [
        {
            q: "Prompt Injection (Tấn công chèn câu lệnh) là loại lỗ hổng an ninh mạng như thế nào?",
            options: ["A. Người dùng cố tình chèn câu lệnh độc hại vào đầu vào để ghi đè hoặc vô hiệu hóa hướng dẫn trong System Prompt của AI", "B. Tấn công sập máy chủ bằng vô số request", "C. Trộm ổ cứng máy tính", "D. Đèn màn hình bị hỏng"],
            answer: 0,
            explain: "Prompt Injection xảy ra khi dữ liệu người dùng nhập vào điều khiển mô hình làm trái với System Prompt ban đầu."
        },
        {
            q: "Tấn công Jailbreak (Phá còng) nhằm mục đích gì?",
            options: ["A. Bẻ khóa các rào cản đạo đức/an toàn của LLM để ép mô hình tạo ra nội dung độc hại, vi phạm pháp luật", "B. Bẻ khóa điện thoại iPhone", "C. Tăng tốc độ mạng", "D. Xóa dữ liệu ổ C"],
            answer: 0,
            explain: "Jailbreak lừa LLM đóng vai hoặc chấp nhận tình huống giả định để phát ngôn nội dung bị cấm."
        },
        {
            q: "Hiện tượng Rò rỉ System Prompt (System Prompt Leakage) gây ra nguy cơ gì?",
            options: ["A. Lộ bí mật kinh doanh, thông tin bảo mật hoặc các quy tắc ẩn được viết bên trong System Prompt", "B. Làm máy tính bị cháy", "C. Mất file cài đặt Python", "D. Tự động khóa IP"],
            answer: 0,
            explain: "Kẻ tấn công lừa LLM in ra nguyên văn System Prompt chứa tài liệu nội bộ hoặc bí kíp công nghệ."
        },
        {
            q: "Khái niệm AI Guardrails (Rào chắn an toàn) có vai trò gì trong hệ thống?",
            options: ["A. Các lớp kiểm soát tự động kiểm tra cả Đầu vào (Input) lẫn Đầu ra (Output) để ngăn chặn độc hại và vi phạm", "B. Khóa bàn phím người dùng", "C. Tắt kết nối internet", "D. Tự động xóa tài khoản"],
            answer: 0,
            explain: "Guardrails đóng vai trò là màng lọc 2 chiều kiểm tra tính hợp lệ và an toàn trước và sau khi gọi LLM."
        },
        {
            q: "Quy tắc vàng quan trọng nhất về quản lý API Key (ví dụ OPENAI_API_KEY) là gì?",
            options: ["A. KHÔNG BAO GIỜ để lộ API Key ở code Frontend hay push công khai lên GitHub; luôn lưu trong biến môi trường `.env` phía Backend", "B. Dán API Key lên bài viết Facebook", "C. Đưa API Key vào code JavaScript client", "D. Gửi API Key qua email công khai"],
            answer: 0,
            explain: "Lộ API Key sẽ khiến kẻ xấu dùng trộm ngân sách tài khoản của bạn trên nền tảng Cloud."
        },
        {
            q: "Kỹ thuật Input Sanitization (Làm sạch đầu vào) bảo vệ ứng dụng bằng cách nào?",
            options: ["A. Lọc bỏ các từ khóa nghi vấn (vd: 'ignore previous instructions', 'act as DAN') trước khi chuyển cho LLM", "B. Xóa toàn bộ câu hỏi", "C. Dịch câu sang tiếng Việt", "D. Đổi font chữ"],
            answer: 0,
            explain: "Loại bỏ các cụm từ tấn công phổ biến để chặn đứng nguy cơ Prompt Injection từ sớm."
        },
        {
            q: "Tấn công Data Poisoning (Độc hại hóa dữ liệu) đối với RAG xảy ra khi nào?",
            options: ["A. Kẻ tấn công tải lên các tài liệu chứa thông tin sai lệch hoặc chứa lệnh Prompt Injection ẩn vào CSDL Vector", "B. Làm đổ nước vào máy chủ", "C. Xóa file CSDL", "D. Tắt công tắc điện"],
            answer: 0,
            explain: "Data Poisoning chèn các tài liệu xấu vào Vector DB để lừa LLM đưa ra câu trả lời sai hoặc thực thi lệnh độc hại khi RAG tìm kiếm."
        },
        {
            q: "Framework mã nguồn mở nổi tiếng chuyên về triển khai Guardrails cho LLM là gì?",
            options: ["A. Guardrails AI / NeMo Guardrails (NVIDIA)", "B. ReactJS", "C. Bootstrap", "D. jQuery"],
            answer: 0,
            explain: "Guardrails AI và NVIDIA NeMo Guardrails cung cấp giải pháp lập trình các lớp kiểm soát an toàn cho AI."
        },
        {
            q: "Kỹ thuật Rate Limiting (Giới hạn lưu lượng) bảo vệ API AI khỏi nguy cơ nào?",
            options: ["A. Ngăn chặn người dùng spam vô số request làm cạn kệt tài chính API Key hoặc gây sập hệ thống (DoS)", "B. Ngăn chặn virus máy tính", "C. Tăng tốc độ download", "D. Xóa tài liệu cũ"],
            answer: 0,
            explain: "Rate Limiting khống chế số lượng request tối đa một IP/user được gọi trong một khoảng thời gian."
        },
        {
            q: "Output Validation (Kiểm tra đầu ra) giúp ngăn ngừa rủi ro nào?",
            options: ["A. Đảm bảo LLM không vô tình phát tán mã độc, thông tin nhạy cảm (PII) hoặc nội dung vi phạm tiêu chuẩn cộng đồng", "B. Sửa lỗi chính tả", "C. Tự động lưu file Word", "D. Đổi định dạng video"],
            answer: 0,
            explain: "Soát lỗi đầu ra trước khi hiển thị cho người dùng đảm bảo tính tuân thủ pháp lý và an toàn thương hiệu."
        }
    ],
    cost: [
        {
            q: "Chi phí sử dụng các dịch vụ LLM thương mại (như OpenAI, Anthropic) được tính dựa trên chỉ số nào?",
            options: ["A. Số lượng Token (Input Tokens + Output Tokens)", "B. Số lần nhấp chuột", "C. Dung lượng đĩa cứng", "D. Số lượng người dùng đăng ký"],
            answer: 0,
            explain: "API LLM tính phí trên số lượng token xử lý (1 token khoảng 0.75 từ tiếng Anh)."
        },
        {
            q: "Giá của Input Token và Output Token thường có sự chênh lệch như thế nào?",
            options: ["A. Output Token thường đắt hơn Input Token gấp 3 - 4 lần (do LLM tốn nhiều tài nguyên sinh từ hơn)", "B. Input Token đắt hơn 100 lần", "C. Bằng giá nhau 100%", "D. Output Token hoàn toàn miễn phí"],
            answer: 0,
            explain: "Quá trình sinh chữ (Generation) của Output Token tốn nhiều tài nguyên GPU tính toán hơn so với đọc Input."
        },
        {
            q: "Kỹ thuật Semantic Caching (Bộ nhớ đệm ngữ nghĩa) giúp tiết kiệm chi phí bằng cách nào?",
            options: ["A. Lưu lại cặp (Câu hỏi - Câu trả lời) và tái sử dụng phản hồi cũ khi câu hỏi mới có độ tương đồng vector cao (vd: > 0.95)", "B. Xóa bớt thông tin CSDL", "C. Tắt máy chủ vào ban đêm", "D. Dùng model cũ nhất"],
            answer: 0,
            explain: "Semantic Caching trả về câu trả lời đã cache cho các câu hỏi đồng nghĩa mà KHÔNG cần gọi API LLM tốn tiền."
        },
        {
            q: "Kỹ thuật Model Routing (Định tuyến mô hình) hoạt động theo nguyên lý nào?",
            options: ["A. Tự động chuyển tác vụ đơn giản cho mô hình rẻ (GPT-4o-mini) và chỉ dùng mô hình đắt (GPT-4o) cho tác vụ phức tạp", "B. Dùng 1 mô hình duy nhất cho tất cả", "C. Đổi nhà mạng internet", "D. Chuyển request sang máy in"],
            answer: 0,
            explain: "Phân loại tác vụ để chọn mô hình vừa đủ năng lực giúp tối ưu chi phí lên tới 10-30 lần."
        },
        {
            q: "Cú pháp tóm tắt Prompt (Prompt Compression) nhằm mục tiêu gì?",
            options: ["A. Loại bỏ các từ thừa/từ dừng mà vẫn giữ nguyên ý nghĩa để giảm thiểu số lượng Input Tokens", "B. Làm câu văn ngắn lại cho dễ đọc", "C. Đổi câu sang tiếng Anh", "D. Xóa hết các ví dụ"],
            answer: 0,
            explain: "Rút gọn prompt giúp tiết kiệm trực tiếp lượng token tính tiền khi gọi API."
        },
        {
            q: "Khoảng độ tương đồng Cosine Similarity phù hợp để quyết định một 'Cache Hit' trong Semantic Caching là bao nhiêu?",
            options: ["A. Ngưỡng cao từ 0.95 đến 0.98", "B. Ngưỡng 0.10", "C. Ngưỡng 0.50", "D. Ngưỡng -1.0"],
            answer: 0,
            explain: "Cần ngưỡng tương đồng cao (0.95+) để đảm bảo hai câu hỏi thực sự đồng nghĩa trước khi trả kết quả cache."
        },
        {
            q: "Công cụ nào trong LangChain hỗ trợ theo dõi chính xác số token và chi phí phát sinh của cuộc gọi?",
            options: ["A. `get_openai_callback()`", "B. `get_ram_usage()`", "C. `count_words()`", "D. `check_wallet()`"],
            answer: 0,
            explain: "`with get_openai_callback() as cb:` theo dõi chính xác tổng token và số tiền tiêu tốn."
        },
        {
            q: "Trường hợp nào KHÔNG NÊN sử dụng Semantic Caching?",
            options: ["A. Các câu hỏi yêu cầu dữ liệu thời gian thực (vd: 'Giá vàng hôm nay?', 'Mấy giờ rồi?')", "B. Câu hỏi về chính sách bảo hành cố định", "C. Tra cứu định nghĩa thuật ngữ", "D. Câu hỏi FAQ phổ biến"],
            answer: 0,
            explain: "Các thông tin thay đổi theo thời gian thực nếu dùng cache sẽ trả về dữ liệu cũ lỗi thời."
        },
        {
            q: "Cơ sở dữ liệu In-memory nào thích hợp nhất để lưu trữ Semantic Cache kèm tìm kiếm Vector?",
            options: ["A. Redis Vector Search / Qdrant", "B. File txt", "C. SQLite", "D. Excel"],
            answer: 0,
            explain: "Redis hỗ trợ Vector Search trực tiếp trên RAM mang lại độ trễ tìm kiếm cache cực thấp (vài millisecond)."
        },
        {
            q: "Việc sử dụng Structured Output (JSON) thay cho văn bản giải thích dài dòng giúp ích gì cho chi phí?",
            options: ["A. Giảm thiểu số lượng Output Tokens dư thừa, giúp tiết kiệm chi phí đáng kể", "B. Tăng giá tiền API", "C. Không ảnh hưởng gì", "D. Làm chậm tốc độ mạng"],
            answer: 0,
            explain: "Ép LLM trả về đúng JSON ngắn gọn loại bỏ toàn bộ các lời chào và đoạn giải thích dài dòng không cần thiết."
        }
    ],
    testing: [
        {
            q: "Tại sao việc kiểm thử ứng dụng AI/LLM lại khó hơn phần mềm truyền thống?",
            options: ["A. Vì LLM là hệ thống phi xác định (Non-deterministic), cùng 1 prompt có thể trả về câu chữ khác nhau ở mỗi lần gọi", "B. Vì phần mềm AI không có code", "C. Vì không thể cài đặt pytest", "D. Vì Python không có hàm assert"],
            answer: 0,
            explain: "Tính phi xác định khiến câu trả lời không thể so sánh bằng phép `==` chính xác tuyệt đối như lập trình truyền thống."
        },
        {
            q: "Kỹ thuật LLM-as-a-Judge trong kiểm thử tự động nghĩa là gì?",
            options: ["A. Sử dụng một mô hình LLM năng lực cao (như GPT-4) để chấm điểm câu trả lời của ứng dụng theo tiêu chí định sẵn", "B. Đưa câu hỏi ra tòa án", "C. Thuê lập trình viên chấm điểm", "D. Dùng thuật toán sắp xếp"],
            answer: 0,
            explain: "LLM mạnh đóng vai trò giám khảo tự động đánh giá độ chính xác và chất lượng phản hồi."
        },
        {
            q: "Kiểm thử Hồi quy (Regression Testing) trong AI App nhằm mục đích gì?",
            options: ["A. Đảm bảo chất lượng hệ thống không bị suy giảm trên tập test chuẩn khi thay đổi Prompt hay nâng cấp Model", "B. Kiểm tra tốc độ bàn phím", "C. Đếm số dòng code", "D. Kiểm tra nợ xấu ngân hàng"],
            answer: 0,
            explain: "Regression testing chạy lại Golden Dataset để chắc chắn việc sửa code/prompt mới không làm hỏng các tính năng cũ đang chạy tốt."
        },
        {
            q: "Tập dữ liệu Golden Dataset dùng trong AI Testing chứa những thông tin gì?",
            options: ["A. Danh sách các câu hỏi kiểm thử kèm theo tiêu chí đánh giá hoặc câu trả lời mẫu chuẩn (Ground Truth)", "B. Mã nguồn ứng dụng", "C. Mật khẩu server", "D. File cấu hình Docker"],
            answer: 0,
            explain: "Golden Dataset chứa bộ dữ liệu chuẩn mực đại diện cho các kịch bản thực tế để đo lường tỷ lệ vượt qua (Pass rate)."
        },
        {
            q: "Khai báo `temperature=0` khi khởi tạo LLM trong Unit Test nhằm mục đích gì?",
            options: ["A. Tối đa hóa tính nhất quán (Deterministic) giúp câu trả lời ổn định nhất có thể giữa các lần test", "B. Tắt mô hình", "C. Tăng độ ngẫu nhiên sáng tạo", "D. Giảm dung lượng file"],
            answer: 0,
            explain: "Temperature = 0 làm giảm tối đa độ biến thiên ngẫu nhiên của mô hình, giúp kết quả test ổn định."
        },
        {
            q: "Phương thức assertion nào phù hợp khi viết Unit Test đơn giản cho prompt phân loại cảm xúc?",
            options: ["A. `assert 'tích cực' in response.lower()`", "B. `assert response == 'Tích cực'` tuyệt đối", "C. `assert len(response) == 0`", "D. `assert response is None`"],
            answer: 0,
            explain: "Kiểm tra chứa từ khóa (`in`) linh hoạt hơn so với so sánh bằng tuyệt đối `==`."
        },
        {
            q: "Tự động hóa kiểm thử trong CI/CD pipeline (như GitHub Actions) giúp ích gì cho đội ngũ phát triển?",
            options: ["A. Tự động kích hoạt toàn bộ suite test mỗi khi dev tạo Pull Request, chặn merge nếu có lỗi phát sinh", "B. Tự động viết prompt mới", "C. Tự động trả tiền API", "D. Tự động gửi tin nhắn chat"],
            answer: 0,
            explain: "CI/CD tự động phát hiện lỗi hỏng hóc ngay lập tức trước khi code mới được đưa lên môi trường Production."
        },
        {
            q: "Tiêu chí 'Must Contain' và 'Must Not Contain' trong test case dùng để kiểm tra điều gì?",
            options: ["A. Đảm bảo câu trả lời chứa thông tin bắt buộc và KHÔNG chứa các từ cấm (vd: 'tôi không biết', từ nhạy cảm)", "B. Đếm số chữ", "C. Kiểm tra màu sắc", "D. Kiểm tra font chữ"],
            answer: 0,
            explain: "Rào chắn kiểm tra sự có mặt của thông tin cốt lõi và loại trừ các câu trả lời né tránh/vi phạm."
        },
        {
            q: "Framework kiểm thử phổ biến nhất trong hệ sinh thái Python được dùng để chạy test AI là gì?",
            options: ["A. `pytest`", "B. `npm`", "C. `maven`", "D. `cargo`"],
            answer: 0,
            explain: "`pytest` là framework unit test phổ biến hàng đầu trong Python."
        },
        {
            q: "Tỷ lệ Đạt (Pass Rate) tối thiểu khuyến nghị trước khi chấp nhận deploy một prompt nâng cấp là bao nhiêu?",
            options: ["A. Đạt từ 80% đến 95%+ trên tập Golden Dataset", "B. Chỉ cần 10%", "C. Không cần chạy test", "D. Đạt đúng 0%"],
            answer: 0,
            explain: "Cần tỷ lệ vượt qua cao (80%+) trên tập test chuẩn để đảm bảo sự ổn định của hệ thống."
        }
    ],
    multimodal: [
        {
            q: "Khái niệm Multi-modal AI (AI đa phương thức) đề cập đến khả năng nào?",
            options: ["A. Khả năng tiếp nhận và xử lý đồng thời nhiều loại dữ liệu khác nhau (Văn bản, Hình ảnh, Âm thanh, Video)", "B. Chạy trên nhiều máy tính", "C. Dịch nhiều ngôn ngữ", "D. Dùng nhiều bàn phím"],
            answer: 0,
            explain: "Multi-modal AI vượt khỏi ranh giới văn bản để hiểu và kết hợp thông tin thị giác, âm thanh, dữ liệu cấu trúc."
        },
        {
            q: "Cách phổ biến nhất để truyền dữ liệu hình ảnh trực tiếp vào Vision LLM API (như GPT-4o) là gì?",
            options: ["A. Mã hóa file ảnh thành chuỗi Base64 hoặc truyền URL truy cập trực tiếp của hình ảnh", "B. Đổi tên file ảnh thành .txt", "C. In ảnh ra giấy", "D. Nén ảnh thành file zip"],
            answer: 0,
            explain: "Vision API nhận ảnh dưới dạng URL công khai hoặc chuỗi mã hóa `data:image/jpeg;base64,...`."
        },
        {
            q: "Model Whisper của OpenAI là công cụ chuyên dụng cho tác vụ nào?",
            options: ["A. Chuyển đổi giọng nói / âm thanh thành văn bản (Speech-to-Text / ASR)", "B. Tạo hình ảnh từ văn bản", "C. Tạo video 3D", "D. Chơi cờ vua"],
            answer: 0,
            explain: "Whisper là mô hình nhận dạng giọng nói tự động (ASR) hỗ trợ hơn 90 ngôn ngữ bao gồm tiếng Việt."
        },
        {
            q: "Tác vụ trích xuất thông tin từ Hóa đơn scan (Invoice Processing) kết hợp công nghệ nào?",
            options: ["A. Vision LLM đọc hiểu bố cục ảnh hóa đơn và trích xuất dữ liệu ra định dạng JSON cấu trúc", "B. Thuật toán phân cụm K-Means", "C. Phép nhân vector đơn giản", "D. Thư viện Pandas"],
            answer: 0,
            explain: "Vision LLM hiểu cả chữ lẫn vị trí không gian trên hóa đơn để bóc tách chính xác các số liệu."
        },
        {
            q: "Để chuyển các trang tài liệu PDF chứa bảng biểu phức tạp thành ảnh cho Vision LLM đọc, ta dùng thư viện Python nào?",
            options: ["A. `pdf2image`", "B. `requests`", "C. `numpy`", "D. `math`"],
            answer: 0,
            explain: "`pdf2image` giúp chuyển đổi các trang của file PDF thành các file ảnh (JPEG/PNG) để nạp cho Vision Model."
        },
        {
            q: "Ứng dụng Chatbot hỗ trợ kỹ thuật Multi-modal mang lại lợi ích gì?",
            options: ["A. Cho phép người dùng chụp ảnh màn hình lỗi (Screenshot) gửi kèm mô tả để AI chẩn đoán chính xác hơn", "B. Tự động sửa máy tính", "C. Giảm tiền mạng", "D. Thay thế hoàn toàn nhân viên"],
            answer: 0,
            explain: "Xem ảnh lỗi thực tế giúp AI nắm bắt thông tin trực quan mà người dùng khó mô tả bằng lời."
        },
        {
            q: "Tham số `language='vi'` khi gọi Whisper API giúp ích gì?",
            options: ["A. Chỉ định trước ngôn ngữ tiếng Việt giúp mô hình nhận dạng chính xác hơn và tránh nhầm lẫn âm điệu", "B. Dịch sang tiếng Anh", "C. Tăng độ dài file", "D. Xóa bớt tạp âm"],
            answer: 0,
            explain: "Khai báo ngôn ngữ nguồn giúp Whisper tập trung bộ từ vựng và mô hình âm học tiếng Việt tương ứng."
        },
        {
            q: "Mô hình GPT-4o khác gì so với mô hình GPT-3.5 truyền thống?",
            options: ["A. GPT-4o là mô hình Đa phương thức gốc (Native Multimodal), xử lý trực tiếp Text, Audio và Vision đồng thời", "B. GPT-4o chỉ xử lý được văn bản", "C. GPT-4o chạy chậm hơn 10 lần", "D. GPT-4o không dùng được API"],
            answer: 0,
            explain: "GPT-4o được thiết kế ngay từ đầu để tiếp nhận và suy luận trên cả văn bản, hình ảnh và âm thanh."
        },
        {
            q: "Quy trình xây dựng hệ thống 'Ghi chú cuộc họp tự động' (Meeting Summarizer) gồm những bước nào?",
            options: ["A. Ghi âm cuộc họp -> Dùng Whisper chuyển Audio thành Text -> Dùng LLM tóm tắt ý chính & Action Items", "B. Chụp ảnh cuộc họp -> Dùng Python in ra", "C. Gửi email cho từng người", "D. Tắt máy âm thanh"],
            answer: 0,
            explain: "Kết hợp Speech-to-Text (Whisper) và Text Summarization (LLM) để tạo biên bản cuộc họp tự động."
        },
        {
            q: "Trường hợp nào nên ưu tiên dùng Vision LLM thay vì thư viện OCR truyền thống (như Tesseract)?",
            options: ["A. Khi tài liệu có bố cục phức tạp, chữ viết tay, bảng biểu không chuẩn hoặc cần hiểu NGỮ CẢNH hình ảnh", "B. Khi chỉ cần đọc 1 con số trên biển số xe thẳng", "C. Khi không có kết nối internet", "D. Khi muốn tiết kiệm chi phí tuyệt đối"],
            answer: 0,
            explain: "Vision LLM hiểu được ý nghĩa ngữ cảnh và bố cục phức tạp mà các công cụ OCR truyền thống hay đọc sót hoặc rác chữ."
        }
    ]
};
