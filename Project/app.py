import time
import os
import asyncio
import base64
import json
import numpy as np
import pandas as pd
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn

try:
    from sklearn.linear_model import LinearRegression
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import mean_squared_error, r2_score, accuracy_score, f1_score, confusion_matrix
    from sklearn.cluster import KMeans
except Exception:
    pass

app = FastAPI(title="AI/ML Interactive Visualizer & Playground")

# Lấy đường dẫn thư mục hiện tại của file app.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

static_dir = os.path.join(BASE_DIR, "static")
template_dir = os.path.join(BASE_DIR, "templates")

if not os.path.exists(static_dir):
    cwd = os.getcwd()
    alt_static = os.path.join(cwd, "Project", "static")
    alt_template = os.path.join(cwd, "Project", "templates")
    if os.path.exists(alt_static):
        static_dir = alt_static
        template_dir = alt_template

if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

templates = Jinja2Templates(directory=template_dir)

@app.get("/favicon.ico")
async def favicon():
    return HTMLResponse(content="", status_code=204)

@app.get("/", response_class=HTMLResponse)
@app.get("/mindmap", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

@app.get("/tabs/{tab_name}", response_class=HTMLResponse)
async def get_tab(tab_name: str, request: Request):
    tab_file = os.path.join(template_dir, "tabs", f"tab-{tab_name}.html")
    if not os.path.exists(tab_file):
        return HTMLResponse(content="Giao diện tab không tồn tại", status_code=404)
    return templates.TemplateResponse(request=request, name=f"tabs/tab-{tab_name}.html")

# =====================================================================
# API BÀI 1: NUMPY BENCHMARK
# =====================================================================
@app.get("/api/benchmark")
async def run_benchmark(n: int = 1000000):
    list_a = list(range(n))
    list_b = list(range(n))
    list_result = []
    
    start_time = time.time()
    for i in range(n):
        list_result.append(list_a[i] + list_b[i])
    loop_time = time.time() - start_time
    
    arr_a = np.arange(n)
    arr_b = np.arange(n)
    
    start_time = time.time()
    arr_result = arr_a + arr_b
    numpy_time = time.time() - start_time
    
    speedup = loop_time / numpy_time if numpy_time > 0 else 0
    
    return {
        "n": n,
        "loopTime": loop_time,
        "numpyTime": numpy_time,
        "speedup": round(speedup, 2)
    }

@app.get("/api/euclidean")
async def calculate_euclidean(x1: float, x2: float, x3: float, y1: float, y2: float, y3: float):
    a = np.array([x1, x2, x3])
    b = np.array([y1, y2, y3])
    distance = np.sqrt(np.sum((a - b) ** 2))
    return {
        "vectorA": [x1, x2, x3],
        "vectorB": [y1, y2, y3],
        "distance": round(float(distance), 4)
    }

@app.get("/api/minmax")
async def calculate_minmax(numbers: str):
    try:
        num_list = [float(x.strip()) for x in numbers.split(",") if x.strip()]
        if not num_list:
            return {"error": "Chuỗi số không hợp lệ."}
        
        arr = np.array(num_list)
        min_val = arr.min()
        max_val = arr.max()
        
        if max_val == min_val:
            scaled = np.zeros_like(arr)
        else:
            scaled = (arr - min_val) / (max_val - min_val)
            
        return {
            "original": num_list,
            "min": float(min_val),
            "max": float(max_val),
            "scaled": [round(float(x), 4) for x in scaled]
        }
    except Exception as e:
        return {"error": f"Lỗi xử lý: {str(e)}"}

# =====================================================================
# API BÀI 2: PANDAS DATA LAB
# =====================================================================
# Mock Datasets thô chứa dữ liệu trống (NaN) và trùng lặp
titanic_raw = pd.DataFrame({
    "PassengerId": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16],
    "Name": ["John", "Emily", "Michael", "Sophia", "Daniel", "Emma", "David", "Olivia", "James", "Isabella", "William", "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Amelia"],
    "Pclass": [3, 1, 3, 1, 3, 3, 1, 3, 2, 2, 1, 3, 2, 1, 3, 2, 2],
    "Sex": ["male", "female", "male", "female", "male", "female", "male", "female", "male", "female", "male", "female", "male", "female", "male", "female", "female"],
    "Age": [22.0, 38.0, 26.0, np.nan, 35.0, 29.0, np.nan, 2.0, 27.0, 14.0, 4.0, 58.0, 20.0, np.nan, 14.0, 55.0, 55.0],
    "Fare": [7.25, 71.28, 7.92, 53.10, 8.05, 8.46, 51.86, 21.07, 11.13, 30.07, 16.70, 26.55, 13.00, 108.90, 7.85, 16.00, 16.00],
    "Survived": [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1]
})

students_raw = pd.DataFrame({
    "StudentId": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 116],
    "Name": ["An", "Bình", "Chi", "Dũng", "Giang", "Hương", "Khánh", "Linh", "Minh", "Nam", "Oanh", "Phong", "Quỳnh", "Sơn", "Trang", "Vy", "Vy"],
    "Class": ["10A", "10A", "10B", "10A", "10B", "10A", "10B", "10A", "10A", "10B", "10B", "10A", "10B", "10B", "10A", "10B", "10B"],
    "Subject": ["Math", "Math", "Literature", "English", "Math", "Literature", "English", "Math", "Literature", "English", "Math", "Literature", "English", "Math", "Literature", "English", "English"],
    "Grade": [8.5, 6.0, 7.5, np.nan, 5.5, 8.0, np.nan, 9.5, 7.0, 8.5, 6.5, 7.0, np.nan, 5.0, 8.8, 6.0, 6.0],
    "Age": [16, 16, 16, 15, 16, 15, 16, 16, 15, 16, 15, 16, 16, 15, 16, 15, 15]
})

session_data = {
    "titanic": titanic_raw.copy(),
    "students": students_raw.copy()
}

def get_df_by_name(name: str):
    return session_data.get(name, titanic_raw)

@app.get("/api/pandas/dataset")
async def get_dataset(name: str = "titanic"):
    df = get_df_by_name(name)
    return {
        "columns": df.columns.tolist(),
        "data": df.head(10).to_dict(orient="records")
    }

@app.get("/api/pandas/query")
async def query_pandas(
    dataset: str = "titanic",
    filter_col: str = "",
    filter_op: str = "",
    filter_val: str = "",
    group_col: str = "",
    agg_op: str = ""
):
    df = get_df_by_name(dataset).copy()
    code_history = "df"
    
    if filter_col and filter_op and filter_val:
        try:
            if '.' in filter_val:
                typed_val = float(filter_val)
            else:
                typed_val = int(filter_val)
        except ValueError:
            typed_val = filter_val
            
        code_history = f"df[df['{filter_col}'] {filter_op} {repr(typed_val)}]"
        
        if filter_op == '==':
            df = df[df[filter_col] == typed_val]
        elif filter_op == '!=':
            df = df[df[filter_col] != typed_val]
        elif filter_op == '>':
            df = df[df[filter_col] > typed_val]
        elif filter_op == '<':
            df = df[df[filter_col] < typed_val]
        elif filter_op == '>=':
            df = df[df[filter_col] >= typed_val]
        elif filter_op == '<=':
            df = df[df[filter_col] <= typed_val]
            
    if group_col:
        code_history = f"{code_history}.groupby('{group_col}')"
        
        if agg_op == 'mean':
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            if group_col not in numeric_cols:
                cols_to_keep = [group_col] + [c for c in numeric_cols if c != group_col]
            else:
                cols_to_keep = numeric_cols
            df = df[cols_to_keep].groupby(group_col).mean()
            code_history += ".mean()"
        elif agg_op == 'sum':
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            if group_col not in numeric_cols:
                cols_to_keep = [group_col] + [c for c in numeric_cols if c != group_col]
            else:
                cols_to_keep = numeric_cols
            df = df[cols_to_keep].groupby(group_col).sum()
            code_history += ".sum()"
        elif agg_op == 'count':
            df = df.groupby(group_col).count()
            code_history += ".count()"
            
        df = df.reset_index()
        
    return {
        "columns": df.columns.tolist(),
        "data": df.to_dict(orient="records"),
        "code": code_history
    }

# =====================================================================
# API BÀI 3: DATA CLEANING LAB
# =====================================================================
@app.get("/api/eda/status")
async def get_cleaning_status(dataset: str = "titanic"):
    df = get_df_by_name(dataset)
    null_counts = df.isnull().sum().to_dict()
    dup_count = int(df.duplicated().sum())
    return {
        "nulls": null_counts,
        "duplicates": dup_count,
        "totalRows": len(df)
    }

@app.post("/api/eda/clean")
async def clean_dataset(dataset: str = "titanic", action: str = "reset"):
    global session_data
    code_history = ""
    
    if action == "reset":
        session_data[dataset] = titanic_raw.copy() if dataset == "titanic" else students_raw.copy()
        code_history = f"# Reset dữ liệu về trạng thái thô ban đầu\ndf = raw_{dataset}_df.copy()"
    
    elif action == "fillna":
        df = session_data[dataset]
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        for col in numeric_cols:
            if df[col].isnull().any():
                mean_val = float(df[col].mean())
                df[col] = df[col].fillna(mean_val)
        code_history = f"# Điền các ô trống dạng số bằng giá trị trung bình cột\nfor col in df.select_dtypes(include=['number']).columns:\n    df[col] = df[col].fillna(df[col].mean())"
        
    elif action == "dropna":
        df = session_data[dataset]
        session_data[dataset] = df.dropna()
        code_history = f"# Xóa toàn bộ hàng chứa giá trị khuyết thiếu (NaN)\ndf = df.dropna()"
        
    elif action == "drop_duplicates":
        df = session_data[dataset]
        session_data[dataset] = df.drop_duplicates()
        code_history = f"# Xóa các bản ghi trùng lặp hoàn toàn\ndf = df.drop_duplicates()"
        
    df_updated = get_df_by_name(dataset)
    null_counts = df_updated.isnull().sum().to_dict()
    dup_count = int(df_updated.duplicated().sum())
    
    return {
        "nulls": null_counts,
        "duplicates": dup_count,
        "totalRows": len(df_updated),
        "code": code_history,
        "columns": df_updated.columns.tolist(),
        "data": df_updated.head(10).to_dict(orient="records")
    }

# =====================================================================
# API BÀI 4: EXPLORATORY DATA ANALYSIS (EDA) PLOTTING
# =====================================================================
@app.get("/api/eda/plot")
async def get_eda_plot_data(dataset: str = "titanic", col_x: str = "", col_y: str = ""):
    df = get_df_by_name(dataset)
    
    if not col_x:
        return {"error": "Cần chọn ít nhất cột X để vẽ biểu đồ."}
        
    if not col_y:
        values = df[col_x].dropna().values
        if len(values) == 0:
            return {"error": "Cột chọn không có dữ liệu số hoặc bị trống hoàn toàn."}
            
        mean_val = float(values.mean())
        median_val = float(np.median(values))
        min_val = float(values.min())
        max_val = float(values.max())
        
        counts, bin_edges = np.histogram(values, bins=5)
        bins_data = []
        for i in range(len(counts)):
            label = f"{bin_edges[i]:.1f} - {bin_edges[i+1]:.1f}"
            bins_data.append({
                "label": label,
                "count": int(counts[i])
            })
            
        code_str = f"# Tính toán phân phối Histogram của cột {col_x}\ncounts, bin_edges = np.histogram(df['{col_x}'].dropna(), bins=5)\n\n# Tính thống kê mô tả cơ bản\nmean = df['{col_x}'].mean()\nmedian = df['{col_x}'].median()"
            
        return {
            "type": "histogram",
            "bins": bins_data,
            "stats": {
                "mean": round(mean_val, 2),
                "median": round(median_val, 2),
                "min": round(min_val, 2),
                "max": round(max_val, 2)
            },
            "code": code_str
        }
    
    else:
        if col_x == col_y:
            clean_series = df[col_x].dropna()
            if len(clean_series) == 0:
                return {"error": "Không có dữ liệu hợp lệ sau khi lọc bỏ giá trị trống."}
            x_vals = clean_series.values
            y_vals = x_vals
            r_val = 1.0
        else:
            clean_df = df[[col_x, col_y]].dropna()
            if len(clean_df) == 0:
                return {"error": "Không có dữ liệu hợp lệ sau khi lọc bỏ giá trị trống."}
            x_vals = clean_df[col_x].values
            y_vals = clean_df[col_y].values
            r_val = float(clean_df[col_x].corr(clean_df[col_y]))
            if np.isnan(r_val):
                r_val = 0.0
            
        points = [{"x": float(x), "y": float(y)} for x, y in zip(x_vals, y_vals)]
        
        abs_r = abs(r_val)
        desc = "Không tương quan tuyến tính"
        if abs_r > 0.7:
            desc = "Tương quan thuận mạnh" if r_val > 0 else "Tương quan nghịch mạnh"
        elif abs_r > 0.4:
            desc = "Tương quan thuận vừa" if r_val > 0 else "Tương quan nghịch vừa"
        elif abs_r > 0.1:
            desc = "Tương quan yếu"
            
        code_str = f"# Tính hệ số tương quan Pearson giữa {col_x} và {col_y}\ncorrelation = df['{col_x}'].corr(df['{col_y}'])\nprint(f'Hệ số tương quan: {{correlation}}')"
        
        return {
            "type": "scatter",
            "points": points,
            "r": round(r_val, 4),
            "correlationText": desc,
            "code": code_str
        }

# =====================================================================
# API BÀI 6-10: MACHINE PLAYGROUND (SCIKIT-LEARN)
# =====================================================================
@app.get("/api/ml/train")
async def run_ml_train(algo: str, dataset: str, estimators: int = 10, depth: int = 5, clusters: int = 3):
    df = get_df_by_name(dataset)
    
    if algo == "linear":
        # Hồi quy tuyến tính: dự đoán Fare dựa trên Age
        clean_df = df[["Age", "Fare"]].dropna()
        X = clean_df[["Age"]]
        y = clean_df["Fare"]
        model = LinearRegression()
        model.fit(X, y)
        y_pred = model.predict(X)
        
        rmse = float(np.sqrt(mean_squared_error(y, y_pred)))
        r2 = float(r2_score(y, y_pred))
        
        # Điểm vẽ scatter
        data_points = [{"x": float(r["Age"]), "y": float(r["Fare"])} for _, r in clean_df.iterrows()]
        
        # Đường thẳng hồi quy
        min_x, max_x = float(X.min().iloc[0]), float(X.max().iloc[0])
        y_min = float(model.predict([[min_x]])[0])
        y_max = float(model.predict([[max_x]])[0])
        
        code = f"from sklearn.linear_model import LinearRegression\n\n# Chuẩn bị X, y\nX = df[['Age']]\ny = df['Fare']\n\n# Train\nmodel = LinearRegression()\nmodel.fit(X, y)"
        
        return {
            "metrics": {"rmse": rmse, "r2": r2},
            "data_points": data_points,
            "line_coords": {"x1": min_x, "y1": y_min, "x2": max_x, "y2": y_max},
            "code": code
        }
        
    elif algo == "forest":
        # Phân loại Random Forest: dự đoán sống sót dựa trên các trường
        clean_df = df[["Age", "Fare", "Pclass", "Survived"]].dropna()
        X = clean_df[["Age", "Fare", "Pclass"]]
        y = clean_df["Survived"]
        
        model = RandomForestClassifier(n_estimators=estimators, max_depth=depth, random_state=42)
        model.fit(X, y)
        y_pred = model.predict(X)
        
        acc = float(accuracy_score(y, y_pred))
        f1 = float(f1_score(y, y_pred))
        cm = confusion_matrix(y, y_pred).tolist()
        
        importance = {
            "Age": float(model.feature_importances_[0]),
            "Fare": float(model.feature_importances_[1]),
            "Pclass": float(model.feature_importances_[2])
        }
        
        code = f"from sklearn.ensemble import RandomForestClassifier\n\n# Trích xuất thuộc tính\nX = df[['Age', 'Fare', 'Pclass']]\ny = df['Survived']\n\n# Train\nmodel = RandomForestClassifier(n_estimators={estimators}, max_depth={depth})\nmodel.fit(X, y)"
        
        return {
            "metrics": {"accuracy": acc, "f1": f1, "matrix": cm},
            "importance": importance,
            "code": code
        }
        
    elif algo == "kmeans":
        # Phân cụm K-Means
        clean_df = df[["Age", "Fare"]].dropna()
        X = clean_df[["Age", "Fare"]]
        
        model = KMeans(n_clusters=clusters, random_state=42, n_init=10)
        model.fit(X)
        labels = model.labels_
        wcss = float(model.inertia_)
        
        points = [{"x": float(r["Age"]), "y": float(r["Fare"]), "cluster": int(lbl)} for (_, r), lbl in zip(clean_df.iterrows(), labels)]
        
        code = f"from sklearn.cluster import KMeans\n\n# Trích xuất dữ liệu không nhãn\nX = df[['Age', 'Fare']]\n\n# Phân cụm\nmodel = KMeans(n_clusters={clusters}, n_init=10)\nmodel.fit(X)"
        
        return {
            "metrics": {"wcss": wcss},
            "points": points,
            "code": code
        }

# =====================================================================
# API BÀI 11-15: DEEP LEARNING (MNIST & PYTORCH)
# =====================================================================
class MnistRequest(BaseModel):
    image: str

@app.post("/api/deep/mnist")
async def run_mnist_prediction(req: MnistRequest):
    # Nhận base64 vẽ từ Client và tính toán pixel density để sinh giả lập chữ viết tay
    try:
        header, encoded = req.image.split(",", 1)
        data = base64.b64decode(encoded)
        # Giả lập tính mật độ nét vẽ dựa trên chiều dài chuỗi base64
        hash_val = len(data)
    except Exception:
        hash_val = int(time.time())
        
    digit = hash_val % 10
    
    # Tạo phân phối xác suất ngẫu nhiên nhưng có đỉnh cao tại digit dự đoán
    probs = np.random.dirichlet(np.ones(10))
    probs[digit] = max(probs) + 0.35
    probs = probs / np.sum(probs)
    
    code = f"import torch\nimport torch.nn as nn\n\n# Chuyển ảnh đầu vào thành Tensor\nimg_tensor = torch.tensor(canvas_pixels).unsqueeze(0)\n\n# Truyền xuôi Forward pass qua MLP model\nlogits = model(img_tensor)\nprobabilities = torch.softmax(logits, dim=1)\npredicted_digit = torch.argmax(probabilities).item()"
    
    return {
        "digit": int(digit),
        "probabilities": [float(p) for p in probs],
        "code": code
    }

# =====================================================================
# API BÀI 16-17: LLM & STRUCTURED OUTPUT
# =====================================================================
class LlmRequest(BaseModel):
    tech: str
    text: str

@app.post("/api/llm/structured")
async def run_llm_structured(req: LlmRequest):
    # Giả lập prompt và Structured Output trả về định dạng JSON
    tech = req.tech
    text = req.text
    
    prompt_templates = {
        "zeroshot": f"System: Bạn là trợ lý trích xuất dữ liệu. Hãy phân loại ý kiến khách hàng sau thành JSON.\n\nUser: {text}\n\nOutput JSON:",
        "fewshot": f"System: Bạn là trợ lý trích xuất. Hãy phân loại ý kiến khách hàng thành JSON.\n\nVí dụ 1:\nUser: Áo quá chật, tôi muốn đổi size\nOutput JSON: {{\"intent\": \"Đổi size sản phẩm\", \"urgency\": 3, \"summary\": \"Khách hàng muốn đổi kích thước áo\"}}\n\nVí dụ 2:\nUser: Giao lộn màu rồi, làm ăn chán quá!\nOutput JSON: {{\"intent\": \"Giao sai mẫu\", \"urgency\": 4, \"summary\": \"Khách nhận sai màu sắc sản phẩm\"}}\n\nUser: {text}\n\nOutput JSON:",
        "cot": f"System: Bạn là chuyên gia phân loại. Hãy suy nghĩ từng bước và điền kết quả cuối vào JSON.\n\nUser: {text}\n\nOutput JSON (Cần suy nghĩ từng bước dưới dạng \"reasoning\" trước):"
    }
    
    assembled = prompt_templates.get(tech, text)
    
    # Kết quả cấu trúc đầu ra dựa trên text đầu vào
    urgency = 2
    intent = "Hỏi thông tin sản phẩm"
    summary = "Khách hàng gửi tin nhắn"
    
    lower_text = text.lower()
    if "chán" in lower_text or "trễ" in lower_text or "lộn" in lower_text or "không hài lòng" in lower_text:
        urgency = 4
        intent = "Phản ánh dịch vụ giao hàng chậm"
        summary = "Khách hàng phàn nàn thời gian giao hàng quá lâu và không hài lòng."
        
    json_output = {
        "intent": intent,
        "urgency": urgency,
        "summary": summary
    }
    
    if tech == "cot":
        json_output = {
            "reasoning": "1. Khách hàng sử dụng từ 'trễ', 'chán', 'không hài lòng' thể hiện sự bức xúc.\n2. Vấn đề chính liên quan đến thời gian giao nhận hàng hóa.\n3. Đánh giá mức độ khẩn cấp mức 4 vì khách hàng đã chờ từ thứ Hai tới thứ Sáu.",
            "intent": intent,
            "urgency": urgency,
            "summary": summary
        }
        
    code = f"from pydantic import BaseModel, Field\n\nclass CustomerAnalysis(BaseModel):\n    intent: str\n    urgency: int\n    summary: str\n\n# Gọi API ép cấu trúc đầu ra bằng JSON Schema\nresponse = client.beta.chat.completions.parse(\n    model='gpt-4o-mini',\n    messages=[{{'role': 'user', 'content': '{text}'}}],\n    response_format=CustomerAnalysis\n)"
    
    return {
        "assembled_prompt": assembled,
        "json_output": json_output,
        "code": code
    }

# =====================================================================
# API BÀI 18-22: RAG & VECTOR SEARCH (MOCK CHROMADB)
# =====================================================================
class MockCollection:
    def __init__(self):
        self.documents = []
        self.metadatas = []
        
    def add(self, documents, metadatas=None):
        self.documents = documents
        if metadatas:
            self.metadatas = metadatas
        else:
            self.metadatas = [{} for _ in documents]
            
    def query(self, query_text: str, n_results: int = 2):
        results = []
        q_words = set(query_text.lower().split())
        for doc, meta in zip(self.documents, self.metadatas):
            doc_words = set(doc.lower().split())
            overlap = q_words.intersection(doc_words)
            # Tính độ tương đồng bag-of-words
            sim = len(overlap) / max(1, len(q_words.union(doc_words)))
            sim += np.random.random() * 0.03 # cộng nhiễu nhỏ tránh trùng lặp điểm
            results.append({
                "text": doc,
                "metadata": meta,
                "similarity": min(0.99, max(0.1, sim))
            })
        # Sắp xếp độ tương đồng giảm dần
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:n_results]

# Đối tượng lưu trữ collection RAG cục bộ
rag_collection = MockCollection()

class IngestRequest(BaseModel):
    text: str
    chunk_size: int
    overlap: int

@app.post("/api/rag/ingest")
async def run_rag_ingest(req: IngestRequest):
    # Tiến hành phân đoạn (Chunking) văn bản
    text = req.text
    size = req.chunk_size
    overlap = req.overlap
    
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        chunks.append(text[start:end])
        if end == len(text):
            break
        start += size - overlap
        
    # Nạp vào database vector giả lập
    rag_collection.add(documents=chunks)
    
    return {
        "chunks_count": len(chunks),
        "status": "success"
    }

class ChatRequest(BaseModel):
    query: str

@app.post("/api/rag/chat")
async def run_rag_chat(req: ChatRequest):
    query = req.query
    
    # 1. Truy xuất Vector DB
    matches = rag_collection.query(query, n_results=2)
    if not matches:
        # Nếu chưa nạp gì, tạo một tài liệu mặc định
        default_docs = [
            "Chính sách đổi trả hàng: Đổi trả trong 7 ngày, khách chịu phí ship.",
            "Lỗi từ nhà sản xuất: Cửa hàng chịu toàn bộ chi phí đổi trả và vận chuyển."
        ]
        rag_collection.add(default_docs)
        matches = rag_collection.query(query, n_results=2)
        
    # 2. Xếp hạng lại giả lập (Re-ranking)
    # Re-ranker sẽ đẩy điểm của chunk phù hợp nhất lên cao
    retrieved = []
    for idx, m in enumerate(matches):
        rerank_score = m["similarity"] + 0.15 if idx == 0 else m["similarity"] - 0.05
        retrieved.append({
            "text": m["text"],
            "similarity": m["similarity"],
            "rerank_score": min(0.99, max(0.05, rerank_score))
        })
        
    # Sắp xếp lại dựa vào điểm Re-ranker
    retrieved.sort(key=lambda x: x["rerank_score"], reverse=True)
    
    # 3. Tổng hợp câu trả lời
    best_chunk = retrieved[0]["text"]
    answer = f"Dựa trên chính sách đổi trả của tài liệu: {best_chunk.strip()} Do đó, câu trả lời cho câu hỏi '{query}' là: Khách hàng cần tự thanh toán phí vận chuyển khi gửi hàng đổi trả, trừ khi sản phẩm bị lỗi trực tiếp từ khâu sản xuất."
    
    # 4. Đánh giá RAG tự động (Faithfulness & Relevance)
    eval_metrics = {
        "faithfulness": 0.95, # 95% không ảo giác
        "answer_relevance": 0.88
    }
    
    return {
        "answer": answer,
        "retrieved_chunks": retrieved,
        "eval_metrics": eval_metrics
    }

# =====================================================================
# API BÀI 23-24: AI AGENT REACT SIMULATOR
# =====================================================================
class AgentRequest(BaseModel):
    command: str

@app.post("/api/agent/run")
async def run_agent_loop(req: AgentRequest):
    cmd = req.command
    # Trả về các bước suy nghĩ và quan sát của Agent ReAct giả lập
    steps = [
        "🤖 [BƯỚC 1 - THOUGHT] Phân tích nhiệm vụ của người dùng: 'DH102, kiểm tra giao chưa, tính tiền sau giảm 15%'. Để giải quyết, đầu tiên tôi cần kiểm tra thông tin đơn hàng này trong cơ sở dữ liệu bán hàng. Tôi quyết định gọi công cụ check_order_db.",
        "🔧 [BƯỚC 2 - ACTION] Gọi công cụ: check_order_db(order_id=\"DH102\")",
        "📥 [BƯỚC 3 - OBSERVATION] Kết quả công cụ trả về: {\"order_id\": \"DH102\", \"item\": \"Giày thể thao Sneaker\", \"price\": 1200000}",
        "🤖 [BƯỚC 4 - THOUGHT] Tôi đã có thông tin về mặt hàng và giá trị đơn hàng là 1,200,000đ. Tiếp tục, tôi cần biết trạng thái vận chuyển để xác nhận đơn hàng đã giao thành công chưa. Tôi sẽ gọi công cụ check_delivery_status.",
        "🔧 [BƯỚC 5 - ACTION] Gọi công cụ: check_delivery_status(order_id=\"DH102\")",
        "📥 [BƯỚC 6 - OBSERVATION] Kết quả công cụ trả về: {\"order_id\": \"DH102\", \"status\": \"Delivered\", \"delivery_date\": \"2026-07-16\"}",
        "🤖 [BƯỚC 7 - THOUGHT] Đơn hàng đã giao thành công. Cuối cùng, tôi cần tính số tiền thực tế khách phải trả sau khi được giảm giá 15% của 1,200,000đ. Tôi sẽ sử dụng công cụ calculate_discount.",
        "🔧 [BƯỚC 8 - ACTION] Gọi công cụ: calculate_discount(price=1200000, rate=0.15)",
        "📥 [BƯỚC 9 - OBSERVATION] Kết quả công cụ trả về: {\"net_price\": 1020000}",
        "🤖 [BƯỚC 10 - THOUGHT] Tôi đã thu thập đầy đủ thông tin: đơn hàng DH102 là Giày Sneaker, đã giao thành công vào 2026-07-16, giá gốc 1.2M và giá sau giảm 15% là 1.02M. Tôi đã sẵn sàng kết luận.",
        "🏆 [FINAL ANSWER] Đơn hàng DH102 (Giày thể thao Sneaker) đã được giao thành công vào ngày 16/07/2026. Tổng giá trị ban đầu là 1,200,000đ, sau khi áp dụng giảm giá 15%, số tiền khách hàng thực tế phải chi trả là 1,020,000đ."
    ]
    return {"steps": steps}

# =====================================================================
# API BÀI 26: SERVER-SENT EVENTS (SSE) STREAMING
# =====================================================================
@app.get("/api/mlops/stream")
async def mlops_sse_stream(text: str):
    async def sse_generator():
        # Cắt chuỗi văn bản thành các từ và gửi từng từ kèm khoảng nghỉ delay
        words = text.split(" ")
        for i, word in enumerate(words):
            # Tạo hiệu ứng stream chữ mượt mà
            yield f"data: {word + (' ' if i < len(words)-1 else '')}\n\n"
            await asyncio.sleep(0.12)
        yield "data: [DONE]\n\n"
        
    return StreamingResponse(sse_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
