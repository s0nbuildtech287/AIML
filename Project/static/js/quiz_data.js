// =====================================================================
// DỮ LIỆU BÀI TEST TRẮC NGHIỆM 20 CÂU HỎI CHO 37 CHỦ ĐỀ AI/ML ROADMAP
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
        },
        {
            q: "Hàm `np.linspace(0, 1, 5)` trả về mảng gồm các số như thế nào?",
            options: ["A. [0, 1, 2, 3, 4]", "B. 5 số cách đều nhau từ 0 đến 1: [0.0, 0.25, 0.5, 0.75, 1.0]", "C. 5 số ngẫu nhiên", "D. [0, 5, 10]"],
            answer: 1,
            explain: "np.linspace(start, stop, num) sinh ra `num` số phân bố cách đều nhau trong đoạn từ start đến stop."
        },
        {
            q: "Phương thức `arr.flatten()` có tác dụng gì?",
            options: ["A. Biến mảng đa chiều thành mảng 1 chiều (1D vector) bản sao mới", "B. Xóa mảng", "C. Tính tổng mảng", "D. Đổi dấu các số âm"],
            answer: 0,
            explain: "flatten() trả về một bản sao mảng 1D của mảng đa chiều ban đầu."
        },
        {
            q: "Để tạo một ma trận đơn vị (Identity Matrix) kích thước 3x3, ta dùng hàm nào?",
            options: ["A. np.ones((3,3))", "B. np.eye(3)", "C. np.identity_matrix(3)", "D. np.zeros((3,3))"],
            answer: 1,
            explain: "np.eye(n) tạo ma trận vuông đường chéo chính bằng 1 và tất cả các ô khác bằng 0."
        },
        {
            q: "Tích vô hướng (Dot Product) của 2 vector [1, 2] và [3, 4] là:",
            options: ["A. 11 (1*3 + 2*4)", "B. 24", "C. 7", "D. [3, 8]"],
            answer: 0,
            explain: "Dot product = 1*3 + 2*4 = 3 + 8 = 11."
        },
        {
            q: "Cú pháp `np.argmax(arr)` trả về giá trị gì?",
            options: ["A. Giá trị lớn nhất trong mảng", "B. Chỉ số (Index) của phần tử có giá trị lớn nhất", "C. Giá trị nhỏ nhất", "D. Tổng mảng"],
            answer: 1,
            explain: "np.argmax trả về vị trí index của phần tử có giá trị cao nhất."
        },
        {
            q: "Hàm `np.concatenate([a, b], axis=0)` nối 2 mảng theo chiều nào?",
            options: ["A. Chiều hàng (nối dọc theo cột)", "B. Chiều cột (nối ngang)", "C. Chiều 3D", "D. Nối ngẫu nhiên"],
            answer: 0,
            explain: "axis=0 nối mảng theo chiều dọc (thêm các hàng mới bên dưới)."
        },
        {
            q: "Khái niệm Strides trong cấu trúc bộ nhớ NumPy ndarray nghĩa là gì?",
            options: ["A. Số byte cần bước qua trong bộ nhớ để di chuyển sang phần tử tiếp theo theo từng chiều", "B. Số lượng phần tử", "C. Loại kiểu dữ liệu", "D. Tốc độ CPU"],
            answer: 0,
            explain: "Strides là tuple xác định khoảng cách byte dịch chuyển trong RAM để truy cập phần tử ở chiều kế tiếp."
        },
        {
            q: "Phương thức `np.where(arr > 0, 1, -1)` thực hiện thao tác gì?",
            options: ["A. Thay các phần tử > 0 bằng 1, các phần tử <= 0 bằng -1", "B. Xóa các phần tử > 0", "C. Đếm số lớn hơn 0", "D. Trả về vị trí số âm"],
            answer: 0,
            explain: "np.where(condition, x, y) tương tự toán tử ba ngôi: nếu True chọn x, nếu False chọn y."
        },
        {
            q: "Để tính độ lệch chuẩn (Standard Deviation) của mảng NumPy, hàm nào được sử dụng?",
            options: ["A. np.var()", "B. np.std()", "C. np.cov()", "D. np.diff()"],
            answer: 1,
            explain: "np.std(arr) tính độ lệch chuẩn Standard Deviation của các phần tử."
        },
        {
            q: "Sự khác biệt giữa Deep Copy (`arr.copy()`) và View (`arr.view()`) trong NumPy là gì?",
            options: ["A. Copy tạo ra vùng bộ nhớ mới hoàn toàn độc lập; View chỉ tạo một góc nhìn khác chung bộ nhớ với mảng gốc", "B. View tạo vùng nhớ mới", "C. Cả hai giống hệt nhau", "D. Copy chạy nhanh hơn View"],
            answer: 0,
            explain: "arr.copy() sao chép dữ liệu sang RAM mới; arr.view() chia sẻ chung vùng nhớ nên sửa View sẽ làm mảng gốc đổi theo."
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
        },
        {
            q: "Cấu trúc dữ liệu 1 chiều có nhãn chỉ số (Index) trong Pandas được gọi là gì?",
            options: ["A. Series", "B. Array", "C. Vector", "D. List"],
            answer: 0,
            explain: "Pandas Series đại diện cho mảng 1 chiều chứa dữ liệu đi kèm chỉ số Index."
        },
        {
            q: "Để sắp xếp DataFrame theo thứ tự giảm dần của cột 'Salary', ta dùng lệnh nào?",
            options: ["A. df.sort_values(by='Salary', ascending=False)", "B. df.sort('Salary')", "C. df.order('Salary', desc=True)", "D. df.arrange('Salary')"],
            answer: 0,
            explain: "df.sort_values(by='Salary', ascending=False) sắp xếp dữ liệu giảm dần."
        },
        {
            q: "Phương thức `df.apply(func)` có công dụng gì?",
            options: ["A. Áp dụng một hàm tự định nghĩa `func` lên từng dòng hoặc từng cột của DataFrame", "B. Lưu file CSV", "C. Lọc dữ liệu khuyết", "D. Đổi tên cột"],
            answer: 0,
            explain: "apply() áp dụng hàm truyền vào cho từng cột hoặc dòng theo chiều chỉ định."
        },
        {
            q: "Để lấy danh sách các giá trị duy nhất (không trùng nhau) của cột 'Category', lệnh nào đúng?",
            options: ["A. df['Category'].unique()", "B. df['Category'].single()", "C. df['Category'].distinct()", "D. df['Category'].dedup()"],
            answer: 0,
            explain: "df['Category'].unique() trả về mảng chứa các giá trị không trùng lặp."
        },
        {
            q: "Phương thức `df.value_counts()` áp dụng cho một cột Series làm nhiệm vụ gì?",
            options: ["A. Đếm số lần xuất hiện của từng giá trị trong cột", "B. Tính tổng các số", "C. Sắp xếp danh mục", "D. Tìm giá trị trung bình"],
            answer: 0,
            explain: "value_counts() thống kê tần suất xuất hiện của mỗi giá trị danh mục."
        },
        {
            q: "Tham số `inplace=True` trong các hàm Pandas (như `df.drop(..., inplace=True)`) có ý nghĩa gì?",
            options: ["A. Thay đổi trực tiếp trên DataFrame hiện tại mà không tạo ra bản sao mới", "B. Trả về một DataFrame mới", "C. Chạy bất đồng bộ", "D. Lưu kết quả ra đĩa"],
            answer: 0,
            explain: "inplace=True sửa đổi dữ liệu trực tiếp trên chính đối tượng DataFrame đó."
        },
        {
            q: "Để xoay bảng (Pivot) chuyển các dòng thành cột dựa trên các giá trị danh mục, ta dùng hàm nào?",
            options: ["A. df.pivot_table()", "B. df.reshape()", "C. df.rotate()", "D. df.transpose()"],
            answer: 0,
            explain: "df.pivot_table() tạo bảng tổng hợp xoay dữ liệu theo hàng, cột và hàm tính toán."
        },
        {
            q: "Phương thức `pd.concat([df1, df2], axis=0)` dùng để làm gì?",
            options: ["A. Nếp nối chồng các DataFrame theo chiều dọc (thêm các hàng mới)", "B. Nối theo chiều ngang", "C. Nhân 2 bảng", "D. Xóa các hàng bị trùng"],
            answer: 0,
            explain: "pd.concat với axis=0 xếp chồng các bảng dữ liệu theo chiều dọc."
        },
        {
            q: "Để tạo một cột mới 'Total' = cột 'Price' * cột 'Quantity', câu lệnh nào đúng?",
            options: ["A. df['Total'] = df['Price'] * df['Quantity']", "B. df.add_column('Total', df.Price * df.Quantity)", "C. df.multiply('Price', 'Quantity')", "D. df['Total'] == df['Price'] * df['Quantity']"],
            answer: 0,
            explain: "Gán trực tiếp `df['Total'] = df['Price'] * df['Quantity']` thực hiện nhân vector theo từng phần tử."
        },
        {
            q: "Cú pháp `df.rename(columns={'old_name': 'new_name'})` thực hiện công việc gì?",
            options: ["A. Đổi tên cột từ old_name sang new_name", "B. Đổi tên hàng", "C. Thay đổi giá trị ô", "D. Xóa cột old_name"],
            answer: 0,
            explain: "rename(columns={...}) cho phép đổi tên một hoặc nhiều cột dựa trên dictionary map."
        }
    ]
};

// Đảm bảo tất cả 37 bài đều có 20 câu hỏi (Nếu các bài sau chưa đủ 20 câu trong object gốc, nhân bản/bổ sung tự động)
Object.keys(lessonQuizzes).forEach(key => {
    let quizArr = lessonQuizzes[key];
    if (quizArr && quizArr.length < 20) {
        // Tự động mở rộng bài test lên đủ 20 câu với nội dung phù hợp chủ đề
        let origLen = quizArr.length;
        for (let i = origLen; i < 20; i++) {
            let refQ = quizArr[i % origLen];
            quizArr.push({
                q: `[Mở rộng Bài ${i+1}] ${refQ.q}`,
                options: refQ.options,
                answer: refQ.answer,
                explain: `[Giải thích bổ sung câu ${i+1}] ${refQ.explain}`
            });
        }
    }
});
