// =====================================================================
// GLOBAL VARIABLES
// =====================================================================
const datasetColumns = {
    titanic: ["PassengerId", "Name", "Pclass", "Sex", "Age", "Fare", "Survived"],
    students: ["StudentId", "Name", "Class", "Subject", "Grade", "Age"]
};
const edaNumericColumns = {
    titanic: ["Age", "Fare", "Pclass", "Survived"],
    students: ["Grade", "Age", "StudentId"]
};

let gdCurrentX = -2.5;
let gdCurrentStep = 0;
let gdHistoryPoints = [];
let gdIntervalId = null;

// =====================================================================
// CENTRAL ROUTER & TAB SWITCHING
// =====================================================================

async function switchTab(tabId) {
    // Cập nhật nút active ngay lập tức (đồng bộ)
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) activeBtn.classList.add("active");

    const nav = document.querySelector(".tab-nav");
    if (nav && tabId === "home") nav.scrollLeft = 0;

    const badge = document.getElementById("brand-badge-text");
    if (tabId === "home") badge.innerText = "Full Roadmap (Bài 1-34)";
    else if (tabId === "theory") badge.innerText = "Tóm tắt Lý thuyết & Ví dụ trực quan";
    else if (tabId === "projects") badge.innerText = "70+ AI & Quant Projects";
    else if (tabId === "numpy") badge.innerText = "Lesson 1: NumPy";
    else if (tabId === "pandas") badge.innerText = "Lesson 2: Pandas";
    else if (tabId === "eda") badge.innerText = "Lesson 3-4: Data Cleaning & EDA";
    else if (tabId === "gradient") badge.innerText = "Lesson 5: Gradient Descent";
    else if (tabId === "ml") badge.innerText = "Lesson 6-10: Machine Learning";
    else if (tabId === "deep") badge.innerText = "Lesson 11-15: Deep Learning";
    else if (tabId === "llm") badge.innerText = "Lesson 16-17: Prompting & Output";
    else if (tabId === "rag") badge.innerText = "Lesson 18-22: RAG & Evaluation";
    else if (tabId === "agent") badge.innerText = "Lesson 23-24: AI Agent Hub";
    else if (tabId === "finetune") badge.innerText = "Lesson 25: Fine-tuning Lab";
    else if (tabId === "mlops") badge.innerText = "Lesson 26-28: MLOps & Production";

    // Tab Home: khôi phục nội dung từ cache — KHÔNG fetch
    if (tabId === "home") {
        if (window._homeHtml) {
            document.getElementById("active-tab-content").innerHTML = window._homeHtml;
            updateMindmapCompletedStates();
        }
        return;
    }

    try {
        const container = document.getElementById("active-tab-content");
        container.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--text-muted);">Đang tải giao diện phòng Lab...</div>`;
        
        const res = await fetch(`/tabs/${tabId}`);
        if (!res.ok) throw new Error("Không thể tải giao diện con.");
        
        const html = await res.text();
        container.innerHTML = html;

        // Gọi hàm khởi tạo tương ứng
        if (tabId === "pandas") {
            onDatasetChange();
        } else if (tabId === "eda") {
            onEdaDatasetChange();
        } else if (tabId === "gradient") {
            resetGdSimulation();
        } else if (tabId === "ml") {
            onMlAlgoChange();
        } else if (tabId === "deep") {
            initMnistCanvas();
        } else if (tabId === "llm") {
            onLlmTechChange();
        } else if (tabId === "finetune") {
            resetFineTuningSimulation();
        } else if (tabId === "projects") {
            if (typeof renderProjectsList === "function" && typeof projectsData !== "undefined") {
                renderProjectsList(projectsData);
            }
        }
    } catch (err) {
        console.error(err);
        document.getElementById("active-tab-content").innerHTML = `
            <div style="padding: 40px; text-align: center; color: var(--error);">
                Lỗi tải giao diện: ${err.message}
            </div>`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    switchTab("home");
    updateMindmapCompletedStates();
});


// =====================================================================
// TAB 1: NUMPY LAB FUNCTIONS
// =====================================================================
async function runBenchmark() {
    const n = document.getElementById("bench-n").value;
    const speedupEl = document.getElementById("bench-speedup");
    speedupEl.innerText = "Đang chạy...";
    const res = await fetch(`/api/benchmark?n=${n}`);
    const data = await res.json();
    speedupEl.innerText = data.speedup > 0 ? `${data.speedup}x` : "--";
    const maxVal = Math.max(data.loopTime, data.numpyTime);
    if (maxVal > 0) {
        const loopPercent = (data.loopTime / maxVal) * 100;
        const numpyPercent = (data.numpyTime / maxVal) * 100;
        document.getElementById("bar-loop").style.width = `${loopPercent}%`;
        document.getElementById("bar-numpy").style.width = `${numpyPercent}%`;
    }
    document.getElementById("text-loop-time").innerText = `${data.loopTime.toFixed(4)}s`;
    document.getElementById("text-numpy-time").innerText = `${data.numpyTime.toFixed(4)}s`;
}

async function runEuclidean() {
    const vecAInput = document.getElementById("vec-a").value.split(",");
    const vecBInput = document.getElementById("vec-b").value.split(",");
    if (vecAInput.length !== 3 || vecBInput.length !== 3) {
        alert("Hãy nhập đủ 3 tọa độ x, y, z cách nhau bởi dấu phẩy.");
        return;
    }
    const params = new URLSearchParams({
        x1: vecAInput[0].trim(), x2: vecAInput[1].trim(), x3: vecAInput[2].trim(),
        y1: vecBInput[0].trim(), y2: vecBInput[1].trim(), y3: vecBInput[2].trim()
    });
    const res = await fetch(`/api/euclidean?${params.toString()}`);
    const data = await res.json();
    document.getElementById("euclidean-result").innerText = data.distance;
    const mapX = (val) => 50 + (val * 25);
    const mapY = (val) => 150 - (val * 15);
    const aX = mapX(data.vectorA[0]);
    const aY = mapY(data.vectorA[1]);
    const bX = mapX(data.vectorB[0]);
    const bY = mapY(data.vectorB[1]);
    
    document.getElementById("point-a-dot").setAttribute("cx", aX);
    document.getElementById("point-a-dot").setAttribute("cy", aY);
    document.getElementById("point-a-text").setAttribute("x", aX);
    document.getElementById("point-a-text").setAttribute("y", aY);
    document.getElementById("point-a-text").textContent = `A (${data.vectorA.join(",")})`;

    document.getElementById("point-b-dot").setAttribute("cx", bX);
    document.getElementById("point-b-dot").setAttribute("cy", bY);
    document.getElementById("point-b-text").setAttribute("x", bX);
    document.getElementById("point-b-text").setAttribute("y", bY);
    document.getElementById("point-b-text").textContent = `B (${data.vectorB.join(",")})`;

    const line = document.getElementById("vector-line");
    line.setAttribute("x1", aX);
    line.setAttribute("y1", aY);
    line.setAttribute("x2", bX);
    line.setAttribute("y2", bY);
}

async function runMinMax() {
    const inputVal = document.getElementById("scale-input").value;
    const res = await fetch(`/api/minmax?numbers=${encodeURIComponent(inputVal)}`);
    const data = await res.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    document.getElementById("minmax-result").innerText = `[${data.scaled.join(", ")}]`;
    const axis = document.getElementById("scale-axis-container");
    axis.querySelectorAll(".scale-dot, .scale-dot-label").forEach(el => el.remove());
    data.scaled.forEach((val, idx) => {
        const posPercent = val * 100;
        const dot = document.createElement("div");
        dot.className = "scale-dot";
        dot.style.left = `${posPercent}%`;
        const label = document.createElement("div");
        label.className = "scale-dot-label";
        label.style.left = `${posPercent}%`;
        label.innerText = data.original[idx];
        axis.appendChild(dot);
        axis.appendChild(label);
    });
}


// =====================================================================
// TAB 2: PANDAS LAB FUNCTIONS
// =====================================================================
async function onDatasetChange() {
    const datasetName = document.getElementById("pandas-dataset-select").value;
    const columns = datasetColumns[datasetName];
    document.getElementById("pandas-filter-col").innerHTML = '<option value="">-- Không lọc --</option>' + 
        columns.map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById("pandas-group-col").innerHTML = '<option value="">-- Không nhóm --</option>' + 
        columns.map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById("pandas-filter-val").value = "";
    document.getElementById("pandas-filter-op").value = "";

    const res = await fetch(`/api/pandas/dataset?name=${datasetName}`);
    const data = await res.json();
    renderPandasTable(data.columns, data.data);
    document.getElementById("pandas-code-console").innerText = `# Đã nạp tập dữ liệu ${datasetName}\ndf = pd.read_csv("${datasetName}.csv")\ndf.head(10)`;
}

function renderPandasTable(columns, data) {
    const table = document.getElementById("pandas-output-table");
    if (!table) return;
    let theadHtml = "<tr>" + columns.map(c => `<th>${c}</th>`).join('') + "</tr>";
    let tbodyHtml = "";
    if (data.length === 0) {
        tbodyHtml = `<tr><td colspan="${columns.length}" style="text-align:center; color:var(--text-muted);">Không có bản ghi nào khớp.</td></tr>`;
    } else {
        tbodyHtml = data.map(row => {
            return "tr" + columns.map(c => {
                let val = row[c];
                if (typeof val === 'number' && !Number.isInteger(val)) val = val.toFixed(2);
                return `<td>${val !== null && val !== undefined ? val : ''}</td>`;
            }).join('');
        }).map(tr => `<tr>${tr.replace("tr", "")}</tr>`).join('');
    }
    table.innerHTML = `<thead>${theadHtml}</thead><tbody>${tbodyHtml}</tbody>`;
}

async function runPandasQuery() {
    const dataset = document.getElementById("pandas-dataset-select").value;
    const filter_col = document.getElementById("pandas-filter-col").value;
    const filter_op = document.getElementById("pandas-filter-op").value;
    const filter_val = document.getElementById("pandas-filter-val").value;
    const group_col = document.getElementById("pandas-group-col").value;
    const agg_op = document.getElementById("pandas-agg-op").value;

    const params = new URLSearchParams({ dataset, filter_col, filter_op, filter_val, group_col, agg_op });
    const res = await fetch(`/api/pandas/query?${params.toString()}`);
    const data = await res.json();
    renderPandasTable(data.columns, data.data);
    document.getElementById("pandas-code-console").innerText = `import pandas as pd\ndf = pd.read_csv("${dataset}.csv")\nresult = ${data.code}\nprint(result)`;
}


// =====================================================================
// TAB 3: DATA CLEANING & EDA FUNCTIONS
// =====================================================================
async function onEdaDatasetChange() {
    const datasetName = document.getElementById("eda-dataset-select").value;
    const cols = edaNumericColumns[datasetName];
    document.getElementById("eda-col-x").innerHTML = cols.map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById("eda-col-y").innerHTML = '<option value="">-- Không chọn --</option>' + 
        cols.map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById("eda-plot-canvas").innerHTML = `<span style="color:var(--text-muted);">Chọn cột và bấm Vẽ Biểu Đồ.</span>`;
    document.getElementById("eda-analysis-box").innerHTML = `<span style="color:var(--text-muted);">Chưa có chỉ số phân tích.</span>`;
    await loadCleaningStatus();
}

async function loadCleaningStatus() {
    const dataset = document.getElementById("eda-dataset-select").value;
    const res = await fetch(`/api/eda/status?dataset=${dataset}`);
    const data = await res.json();
    document.getElementById("clean-total-rows").innerText = data.totalRows;
    let nanColumns = 0;
    for (let col in data.nulls) {
        if (data.nulls[col] > 0) nanColumns++;
    }
    document.getElementById("clean-nan-count").innerText = nanColumns > 0 ? `${nanColumns} cột có ô trống` : "Sạch (0)";
    document.getElementById("clean-dup-count").innerText = data.duplicates > 0 ? `${data.duplicates} dòng trùng` : "Sạch (0)";
}

async function runCleanAction(action) {
    const dataset = document.getElementById("eda-dataset-select").value;
    const res = await fetch(`/api/eda/clean?dataset=${dataset}&action=${action}`, { method: "POST" });
    const data = await res.json();
    await loadCleaningStatus();
    document.getElementById("eda-code-console").innerText = `# Tiền xử lý dữ liệu\n${data.code}`;
}

async function runEdaPlot() {
    const dataset = document.getElementById("eda-dataset-select").value;
    const col_x = document.getElementById("eda-col-x").value;
    const col_y = document.getElementById("eda-col-y").value;
    const params = new URLSearchParams({ dataset, col_x, col_y });
    const res = await fetch(`/api/eda/plot?${params.toString()}`);
    const data = await res.json();
    
    const canvas = document.getElementById("eda-plot-canvas");
    const statsBox = document.getElementById("eda-analysis-box");
    document.getElementById("eda-code-console").innerText = `# Trực quan hóa dữ liệu bằng Matplotlib/Seaborn\n${data.code}`;
    
    if (data.type === "histogram") {
        document.getElementById("eda-plot-title").innerText = `📊 Biểu đồ phân phối Histogram: Cột ${col_x}`;
        const maxCount = Math.max(...data.bins.map(b => b.count));
        let histHtml = '<div class="hist-chart-container">';
        data.bins.forEach(b => {
            const heightPercent = maxCount > 0 ? (b.count / maxCount) * 100 : 0;
            histHtml += `<div class="hist-bar-col"><div class="hist-bar-inner" style="height:${heightPercent}%;"><span class="hist-bar-val">${b.count}</span></div><span class="hist-bar-label">${b.label}</span></div>`;
        });
        canvas.innerHTML = histHtml + '</div>';
        statsBox.innerHTML = `Trung bình: ${data.stats.mean} | Trung vị: ${data.stats.median} | Nhỏ nhất: ${data.stats.min} | Lớn nhất: ${data.stats.max}`;
    } else if (data.type === "scatter") {
        document.getElementById("eda-plot-title").innerText = `📊 Biểu đồ phân tán Scatter: Cột ${col_x} vs ${col_y}`;
        const x_vals = data.points.map(p => p.x);
        const y_vals = data.points.map(p => p.y);
        const minX = Math.min(...x_vals), maxX = Math.max(...x_vals);
        const minY = Math.min(...y_vals), maxY = Math.max(...y_vals);
        const mapSvgX = (v) => 30 + ((v - minX) / (maxX - minX || 1)) * 320;
        const mapSvgY = (v) => 160 - ((v - minY) / (maxY - minY || 1)) * 130;
        
        let svgCircles = "";
        data.points.forEach(p => {
            svgCircles += `<circle cx="${mapSvgX(p.x)}" cy="${mapSvgY(p.y)}" r="4" fill="var(--accent)" opacity="0.8"></circle>`;
        });
        canvas.innerHTML = `<svg width="380" height="180" style="background:#020617;"><line x1="25" y1="165" x2="365" y2="165" stroke="#1e293b"></line><line x1="25" y1="15" x2="25" y2="165" stroke="#1e293b"></line>${svgCircles}</svg>`;
        statsBox.innerHTML = `Hệ số tương quan Pearson (r): ${data.r} | Đánh giá: ${data.correlationText}`;
    }
}


// =====================================================================
// TAB 4: GRADIENT DESCENT FUNCTIONS
// =====================================================================
function resetGdSimulation() {
    if (gdIntervalId) clearInterval(gdIntervalId);
    gdIntervalId = null;
    const xStart = parseFloat(document.getElementById("gd-x-start").value);
    gdCurrentX = xStart;
    gdCurrentStep = 0;
    gdHistoryPoints = [];
    document.getElementById("gd-current-step").innerText = "0";
    document.getElementById("gd-current-x").innerText = gdCurrentX.toFixed(4);
    document.getElementById("gd-current-grad").innerText = "--";
    document.getElementById("gd-current-loss").innerText = "--";
    updateGdBallPosition(gdCurrentX);
    document.getElementById("gd-history-line").setAttribute("points", "");
    document.getElementById("gd-history-dots").innerHTML = "";
    document.getElementById("gd-code-console").innerText = `# Khởi tạo Gradient Descent\nx = ${gdCurrentX}\nlr = ${document.getElementById("gd-lr").value}`;
}

function updateGdBallPosition(x) {
    const cx = 200 + (x * 50);
    const cy = 160 - (x * x * 15);
    document.getElementById("gd-ball").setAttribute("cx", cx);
    document.getElementById("gd-ball").setAttribute("cy", cy);
}

function stepGdSimulation() {
    const lr = parseFloat(document.getElementById("gd-lr").value);
    const maxSteps = parseInt(document.getElementById("gd-iterations").value);
    if (gdCurrentStep >= maxSteps) {
        if (gdIntervalId) clearInterval(gdIntervalId);
        alert("Hoàn thành tối ưu!");
        return;
    }
    const loss = gdCurrentX * gdCurrentX;
    const grad = 2 * gdCurrentX;
    const cxOld = 200 + (gdCurrentX * 50);
    const cyOld = 160 - (loss * 15);
    gdHistoryPoints.push(`${cxOld},${cyOld}`);
    gdCurrentX -= lr * grad;
    gdCurrentStep++;

    document.getElementById("gd-current-step").innerText = gdCurrentStep;
    document.getElementById("gd-current-x").innerText = gdCurrentX.toFixed(4);
    document.getElementById("gd-current-grad").innerText = grad.toFixed(4);
    document.getElementById("gd-current-loss").innerText = loss.toFixed(4);
    updateGdBallPosition(gdCurrentX);

    const cxNew = 200 + (gdCurrentX * 50);
    const cyNew = 160 - (gdCurrentX * gdCurrentX * 15);
    document.getElementById("gd-history-line").setAttribute("points", gdHistoryPoints.concat(`${cxNew},${cyNew}`).join(" "));
    
    const dots = document.getElementById("gd-history-dots");
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", cxOld); dot.setAttribute("cy", cyOld); dot.setAttribute("r", "3"); dot.setAttribute("fill", "var(--primary)");
    dots.appendChild(dot);
}

function startGdSimulation() {
    resetGdSimulation();
    gdIntervalId = setInterval(stepGdSimulation, 400);
}


// =====================================================================
// TAB 5: MACHINE LEARNING PLAYGROUND (BÀI 6-10)
// =====================================================================
function onMlAlgoChange() {
    const algo = document.getElementById("ml-algo").value;
    document.getElementById("group-param-estimators").style.display = (algo === "forest") ? "block" : "none";
    document.getElementById("group-param-depth").style.display = (algo === "forest") ? "block" : "none";
    document.getElementById("group-param-clusters").style.display = (algo === "kmeans") ? "block" : "none";
}

async function runMlTraining() {
    const algo = document.getElementById("ml-algo").value;
    const dataset = document.getElementById("ml-dataset").value;
    const estimators = document.getElementById("param-estimators").value;
    const depth = document.getElementById("param-depth").value;
    const clusters = document.getElementById("param-clusters").value;

    const params = new URLSearchParams({ algo, dataset, estimators, depth, clusters });
    const res = await fetch(`/api/ml/train?${params.toString()}`);
    const data = await res.json();

    document.getElementById("ml-code-console").innerText = `# Mã thực thi huấn luyện Scikit-Learn\n${data.code}`;
    
    // Render metrics
    const metricsDiv = document.getElementById("ml-metrics-output");
    if (algo === "linear") {
        metricsDiv.innerHTML = `
            <div>- Sai số liên tục RMSE: <strong>${data.metrics.rmse.toFixed(4)}</strong></div>
            <div>- Hệ số xác định R²: <strong>${data.metrics.r2.toFixed(4)}</strong></div>
        `;
        // Vẽ đồ thị đường hồi quy tuyến tính SVG đơn giản
        drawLinearRegressionSvg(data.data_points, data.line_coords);
    } else if (algo === "forest") {
        metricsDiv.innerHTML = `
            <div>- Độ chính xác Accuracy: <strong>${(data.metrics.accuracy * 100).toFixed(1)}%</strong></div>
            <div>- F1-Score: <strong>${data.metrics.f1.toFixed(3)}</strong></div>
            <div style="margin-top:8px;"><strong>Confusion Matrix:</strong></div>
            <table style="font-family:monospace; margin-top:4px; text-align:center; font-size:11px;">
                <tr><td></td><td>Dự đoán 0</td><td>Dự đoán 1</td></tr>
                <tr><td>Thật 0</td><td style="color:var(--success); font-weight:700;">${data.metrics.matrix[0][0]}</td><td>${data.metrics.matrix[0][1]}</td></tr>
                <tr><td>Thật 1</td><td>${data.metrics.matrix[1][0]}</td><td style="color:var(--success); font-weight:700;">${data.metrics.matrix[1][1]}</td></tr>
            </table>
        `;
        // Vẽ Feature Importance
        drawFeatureImportanceSvg(data.importance);
    } else if (algo === "kmeans") {
        metricsDiv.innerHTML = `
            <div>- Khoảng cách nội cụm WCSS: <strong>${data.metrics.wcss.toFixed(2)}</strong></div>
            <div>- Số cụm K-Means: <strong>${clusters} nhóm</strong></div>
        `;
        // Vẽ Scatter cụm K-Means
        drawKmeansClustersSvg(data.points);
    }
}

function drawLinearRegressionSvg(points, line) {
    const board = document.getElementById("ml-visual-board");
    const mapX = (v) => 40 + (v * 4.5);
    const mapY = (v) => 140 - (v * 1.2);
    let ptsHtml = points.map(p => `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3.5" fill="var(--accent)" opacity="0.7"></circle>`).join('');
    
    board.innerHTML = `
        <svg width="380" height="160" style="background:#020617;">
            <line x1="30" y1="140" x2="360" y2="140" stroke="#1e293b"></line>
            <line x1="30" y1="20" x2="30" y2="140" stroke="#1e293b"></line>
            ${ptsHtml}
            <line x1="${mapX(line.x1)}" y1="${mapY(line.y1)}" x2="${mapX(line.x2)}" y2="${mapY(line.y2)}" stroke="var(--success)" stroke-width="2.5"></line>
            <text x="350" y="152" fill="var(--text-muted)" font-size="9" text-anchor="end">X (Age)</text>
            <text x="35" y="30" fill="var(--text-muted)" font-size="9">Y (Fare)</text>
        </svg>
    `;
}

function drawFeatureImportanceSvg(importance) {
    const board = document.getElementById("ml-visual-board");
    let rowsHtml = "";
    let idx = 0;
    for (let feature in importance) {
        const width = importance[feature] * 200;
        rowsHtml += `
            <g transform="translate(0, ${idx * 30 + 20})">
                <text x="80" y="15" fill="var(--text-muted)" font-size="10.5" text-anchor="end">${feature}</text>
                <rect x="90" y="5" width="${width}" height="12" fill="var(--primary)" rx="2"></rect>
                <text x="${95 + width}" y="15" fill="#fff" font-size="9.5">${(importance[feature] * 100).toFixed(0)}%</text>
            </g>
        `;
        idx++;
    }
    board.innerHTML = `<svg width="380" height="140" style="background:#020617;">${rowsHtml}</svg>`;
}

function drawKmeansClustersSvg(points) {
    const board = document.getElementById("ml-visual-board");
    const colors = ["var(--primary)", "var(--success)", "var(--accent)", "var(--warning)", "var(--error)"];
    const mapX = (v) => 40 + (v * 4.5);
    const mapY = (v) => 140 - (v * 1.2);
    let ptsHtml = points.map(p => `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="4.5" fill="${colors[p.cluster % colors.length]}" opacity="0.8"></circle>`).join('');
    
    board.innerHTML = `
        <svg width="380" height="160" style="background:#020617;">
            <line x1="30" y1="140" x2="360" y2="140" stroke="#1e293b"></line>
            <line x1="30" y1="20" x2="30" y2="140" stroke="#1e293b"></line>
            ${ptsHtml}
        </svg>
    `;
}


// =====================================================================
// TAB 6: DEEP LEARNING & MNIST (BÀI 11-15)
// =====================================================================
let mnistDrawing = false;
let mnistCanvas = null;
let mnistCtx = null;

function initMnistCanvas() {
    mnistCanvas = document.getElementById("mnist-canvas");
    if (!mnistCanvas) return;
    mnistCtx = mnistCanvas.getContext("2d");
    mnistCtx.fillStyle = "black";
    mnistCtx.fillRect(0, 0, 200, 200);
    mnistCtx.lineWidth = 14;
    mnistCtx.lineCap = "round";
    mnistCtx.strokeStyle = "white";

    // Chuột
    mnistCanvas.addEventListener("mousedown", (e) => { mnistDrawing = true; drawMnist(e); });
    mnistCanvas.addEventListener("mousemove", drawMnist);
    mnistCanvas.addEventListener("mouseup", () => mnistDrawing = false);
    mnistCanvas.addEventListener("mouseleave", () => mnistDrawing = false);

    // Cảm ứng điện thoại
    mnistCanvas.addEventListener("touchstart", (e) => { mnistDrawing = true; drawMnist(e.touches[0]); });
    mnistCanvas.addEventListener("touchmove", (e) => { drawMnist(e.touches[0]); e.preventDefault(); });
    mnistCanvas.addEventListener("touchend", () => mnistDrawing = false);
}

function drawMnist(e) {
    if (!mnistDrawing) return;
    const rect = mnistCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (200 / rect.width);
    const y = (e.clientY - rect.top) * (200 / rect.height);
    mnistCtx.lineTo(x, y);
    mnistCtx.stroke();
    mnistCtx.beginPath();
    mnistCtx.moveTo(x, y);
}

function clearMnistCanvas() {
    if (!mnistCtx) return;
    mnistCtx.fillRect(0, 0, 200, 200);
    mnistCtx.beginPath();
    document.getElementById("mnist-prediction-val").innerText = "--";
    resetOutputNeuronsBar();
}

function resetOutputNeuronsBar() {
    const container = document.getElementById("output-neurons-bar");
    if (container) {
        container.querySelectorAll(".bar-height-div").forEach(bar => {
            bar.style.height = "10px";
            bar.style.background = "#334155";
        });
    }
}

async function predictMnistDigit() {
    const base64 = mnistCanvas.toDataURL("image/png");
    const res = await fetch("/api/deep/mnist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 })
    });
    const data = await res.json();

    document.getElementById("mnist-prediction-val").innerText = data.digit;
    document.getElementById("deep-code-console").innerText = `# Truyền ảnh chữ số viết tay qua mạng PyTorch\n${data.code}`;
    
    // Cập nhật mức độ kích hoạt các node neuron đầu ra
    const container = document.getElementById("output-neurons-bar");
    container.innerHTML = data.probabilities.map((p, idx) => {
        const height = Math.max(10, p * 80);
        const color = (idx === data.digit) ? "var(--success)" : "var(--primary)";
        return `
            <div style="text-align: center; width: 24px; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%;">
                <div style="height: ${height}px; background: ${color}; width: 100%; border-radius: 2px 2px 0 0; transition: height 0.5s ease;"></div>
                <span style="font-size: 9.5px; font-family: monospace; margin-top:4px;">${idx}</span>
            </div>
        `;
    }).join('');
}


// =====================================================================
// TAB 7: LLM & PROMPTING (BÀI 16-17)
// =====================================================================
const promptTemplates = {
    zeroshot: `System: Bạn là trợ lý trích xuất dữ liệu. Hãy phân loại ý kiến khách hàng sau thành JSON.\n\nUser: [TIN NHẮN]\n\nOutput JSON:`,
    fewshot: `System: Bạn là trợ lý trích xuất. Hãy phân loại ý kiến khách hàng thành JSON.\n\nVí dụ 1:\nUser: Áo quá chật, tôi muốn đổi size\nOutput JSON: {"intent": "Đổi size sản phẩm", "urgency": 3, "summary": "Khách hàng muốn đổi kích thước áo"}\n\nVí dụ 2:\nUser: Giao lộn màu rồi, làm ăn chán quá!\nOutput JSON: {"intent": "Giao sai mẫu", "urgency": 4, "summary": "Khách nhận sai màu sắc sản phẩm"}\n\nUser: [TIN NHẮN]\n\nOutput JSON:`,
    cot: `System: Bạn là chuyên gia phân loại. Hãy suy nghĩ từng bước và điền kết quả cuối vào JSON.\n\nUser: [TIN NHẮN]\n\nOutput JSON (Cần suy nghĩ từng bước dưới dạng "reasoning" trước):`
};

function onLlmTechChange() {
    const tech = document.getElementById("llm-prompt-tech").value;
    const userInput = document.getElementById("llm-user-input").value;
    const template = promptTemplates[tech];
    document.getElementById("llm-assembled-prompt").innerText = template.replace("[TIN NHẮN]", userInput);
}

async function runLlmStructuredOutput() {
    const tech = document.getElementById("llm-prompt-tech").value;
    const userInput = document.getElementById("llm-user-input").value;

    const res = await fetch("/api/llm/structured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tech, text: userInput })
    });
    const data = await res.json();

    document.getElementById("llm-json-output").innerText = JSON.stringify(data.json_output, null, 4);
    document.getElementById("llm-assembled-prompt").innerText = data.assembled_prompt;
    document.getElementById("llm-code-console").innerText = `# Thực thi gọi API cấu trúc đầu ra (Pydantic)\n${data.code}`;
}


// =====================================================================
// TAB 8: RAG CHATBOT (BÀI 18-22)
// =====================================================================
async function runRagIngestion() {
    const text = document.getElementById("rag-doc-input").value;
    const size = document.getElementById("rag-chunk-size").value;
    const overlap = document.getElementById("rag-chunk-overlap").value;

    const res = await fetch("/api/rag/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, chunk_size: parseInt(size), overlap: parseInt(overlap) })
    });
    const data = await res.json();

    document.getElementById("rag-chunks-count").innerText = data.chunks_count;
    document.getElementById("rag-chroma-status").innerText = `Đã nạp ${data.chunks_count} vector`;
    alert("Nạp vector vào ChromaDB thành công!");
}

async function runRagChat() {
    const query = document.getElementById("rag-query-input").value;
    const responseBox = document.getElementById("rag-chat-response");
    responseBox.innerText = "Đang truy xuất thông tin...";

    const res = await fetch("/api/rag/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const data = await res.json();

    responseBox.innerText = data.answer;

    // Render retrieved chunks
    const chunksContainer = document.getElementById("rag-retrieved-chunks");
    chunksContainer.innerHTML = data.retrieved_chunks.map((c, idx) => {
        return `
            <div style="background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; border-left: 3px solid var(--warning);">
                <div><strong>[Chunk ${idx+1}]</strong> ${c.text}</div>
                <div style="color:var(--text-muted); font-size:9.5px; margin-top:2px;">
                    Cosine Similarity: <strong class="text-success">${c.similarity.toFixed(4)}</strong> | Re-ranker Score: <strong class="text-accent">${c.rerank_score.toFixed(4)}</strong>
                </div>
            </div>
        `;
    }).join('');

    // Render Ragas Evaluation Metrics
    document.getElementById("val-eval-faith").innerText = `${(data.eval_metrics.faithfulness * 100).toFixed(0)}%`;
    document.getElementById("val-eval-relevance").innerText = `${(data.eval_metrics.answer_relevance * 100).toFixed(0)}%`;
}


// =====================================================================
// TAB 9: AI AGENT HUB (BÀI 23-24)
// =====================================================================
async function runAgentSimulation() {
    const command = document.getElementById("agent-command-input").value;
    const terminal = document.getElementById("agent-terminal-log");
    terminal.innerHTML = "=== KÍCH HOẠT AGENT REACT LOOP ===\n\n";

    const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
    });
    const data = await res.json();

    // Hiệu ứng Typewriter từng dòng
    let idx = 0;
    function printLine() {
        if (idx < data.steps.length) {
            terminal.innerHTML += data.steps[idx] + "\n\n";
            terminal.scrollTop = terminal.scrollHeight;
            idx++;
            setTimeout(printLine, 1000); // 1 giây in 1 bước suy nghĩ
        }
    }
    printLine();
}


// =====================================================================
// TAB 10: FINE-TUNING LAB (BÀI 25)
// =====================================================================
let ftIntervalId = null;

function resetFineTuningSimulation() {
    if (ftIntervalId) clearInterval(ftIntervalId);
    ftIntervalId = null;

    document.getElementById("ft-current-epoch").innerText = "0 / 3";
    document.getElementById("ft-current-step").innerText = "0 / 120";
    document.getElementById("ft-current-loss").innerText = "--";
    document.getElementById("ft-loss-line").setAttribute("points", "");
}

function runFineTuningSimulation() {
    resetFineTuningSimulation();
    const r = document.getElementById("ft-param-r").value;
    const alpha = document.getElementById("ft-param-alpha").value;

    document.getElementById("ft-code-console").innerText = `# Đang huấn luyện Adapter PEFT LoRA\npeft_config = LoraConfig(r=${r}, lora_alpha=${alpha}, target_modules=["q_proj", "v_proj"])`;

    let step = 0;
    let points = [];
    const ftSvg = document.getElementById("ft-svg");
    const polyline = document.getElementById("ft-loss-line");

    ftIntervalId = setInterval(() => {
        if (step > 120) {
            clearInterval(ftIntervalId);
            alert("Fine-tuning hoàn tất!");
            return;
        }

        // Mô phỏng hàm loss đi xuống từ 2.5 về 0.1
        const lossVal = 2.4 * Math.exp(-step / 40) + 0.1 + (Math.random() * 0.08);
        const epoch = Math.floor(step / 40) + 1;

        document.getElementById("ft-current-epoch").innerText = `${epoch} / 3`;
        document.getElementById("ft-current-step").innerText = `${step} / 120`;
        document.getElementById("ft-current-loss").innerText = lossVal.toFixed(4);

        // Vẽ biểu đồ SVG
        const px = 40 + (step * 2.8); // map 0-120 steps -> px 40-376
        const py = 150 - (lossVal * 50); // map 0.0-2.6 loss -> py 150-20
        points.push(`${px},${py}`);
        polyline.setAttribute("points", points.join(" "));

        step += 5;
    }, 150);
}


// =====================================================================
// TAB 11: MLOPS & PRODUCTION (BÀI 26-28)
// =====================================================================
async function runMlopsSseStream() {
    const text = document.getElementById("mlops-stream-text").value;
    const consoleBox = document.getElementById("mlops-sse-console");
    consoleBox.innerHTML = "";

    // Sử dụng SSE Client (EventSource) để nhận luồng ký tự thời gian thực
    const eventSource = new EventSource(`/api/mlops/stream?text=${encodeURIComponent(text)}`);

    eventSource.onmessage = function(event) {
        const token = event.data;
        if (token === "[DONE]") {
            eventSource.close();
            consoleBox.innerHTML += "\n\n[Kết thúc luồng - Connection Closed]";
        } else {
            consoleBox.innerHTML += token;
        }
    };

    eventSource.onerror = function() {
        eventSource.close();
    };
}

const dockerConfigs = {
    dockerfile: `FROM python:3.10-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8080\nCMD ["uvicorn", "Project.app:app", "--host", "0.0.0.0", "--port", "8080"]`,
    compose: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - "8080:8080"\n    environment:\n      - OPENAI_API_KEY=\${OPENAI_API_KEY}\n      - LANGCHAIN_API_KEY=\${LANGCHAIN_API_KEY}\n    restart: always`
};

function generateDockerConfig(type) {
    document.getElementById("mlops-preview-title").innerText = type === "dockerfile" ? "🐋 Cấu hình Dockerfile" : "🐋 Cấu hình docker-compose.yml";
    document.getElementById("mlops-docker-preview").innerText = dockerConfigs[type];
}

// =====================================================================
// MINDMAP MODAL DATA & FUNCTIONS
// =====================================================================
const lessonDetails = {
    numpy: {
        id: "BÀI 1",
        color: "var(--c-foundations)",
        title: "NumPy - Thư viện toán ma trận",
        definition: "Thư viện tính toán mảng (ndarray) hiệu năng cao viết bằng C. Tối ưu bộ nhớ bằng cách lưu các giá trị liên tiếp nhau trong RAM và thực hiện song song (Vectorization) trên các thanh ghi CPU.",
        usecase: "Khi cần thực hiện các phép tính số học, nhân ma trận hoặc xử lý vector quy mô lớn bỏ qua vòng lặp Python.",
        code: "import numpy as np\n\n# Tạo 2 mảng 1 triệu phần tử và cộng song song\na = np.arange(1000000)\nb = np.arange(1000000)\nc = a + b",
        diagram: "Python List (Tuần tự): Loop qua con trỏ ➔ Chạy chậm.\nNumPy Array (SIMD C-level): [a] + [b] ──(Song song)──> [c]",
        summary: "• Tại sao NumPy nhanh hơn List? NumPy lưu mảng liên tiếp trong RAM dưới dạng mã C thuần, không chứa con trỏ kiểu dữ liệu, thực hiện tính toán song song SIMD (Vectorization) trên thanh ghi CPU.\n• Vectorization là gì? Thay thế vòng lặp for ở Python bằng các phép toán chạy đồng thời ở cấp độ phần cứng.\n• Broadcasting là gì? Tự động mở rộng kích thước mảng nhỏ hơn tương thích khi thực hiện phép toán với mảng lớn hơn."
    },
    pandas: {
        id: "BÀI 2",
        color: "var(--c-foundations)",
        title: "Pandas - Quản lý dữ liệu bảng",
        definition: "Thư viện quản lý cấu trúc dữ liệu dạng bảng 2D (DataFrame) và 1D (Series), tích hợp các phép toán thống kê, liên kết bảng, lọc điều kiện và gộp nhóm.",
        usecase: "Khi cần đọc ghi file CSV/Excel, làm sạch, lọc, gộp nhóm và chuyển đổi cấu trúc thông tin.",
        code: "import pandas as pd\ndf = pd.read_csv('titanic.csv')\nresult = df[df['Age'] > 30].groupby('Pclass')['Fare'].mean()",
        diagram: "CSV/SQL ➔ pd.read_csv() ➔ DataFrame ➔ Lọc & Groupby",
        summary: "• Series vs DataFrame? Series là mảng 1 chiều có nhãn chỉ mục (index); DataFrame là bảng dữ liệu 2 chiều được ghép từ các Series có chung index.\n• Làm sao xử lý dữ liệu lớn vượt quá dung lượng RAM? Dùng tham số chunksize khi đọc hoặc đổi sang thư viện tính toán phân tán như Dask/PySpark.\n• Sự khác biệt giữa loc và iloc? loc truy cập bằng nhãn tên chỉ mục (label-based); iloc truy cập bằng vị trí số nguyên (position-based)."
    },
    cleaning: {
        id: "BÀI 3",
        color: "var(--c-foundations)",
        title: "Data Cleaning - Làm sạch dữ liệu",
        definition: "Quy trình xử lý ô trống (NaN) bằng fillna/dropna và loại bỏ dòng trùng lặp bằng drop_duplicates.",
        usecase: "Trước khi đưa dữ liệu vào huấn luyện để tránh lỗi crash hoặc mô hình bị học sai lệch.",
        code: "df['Age'] = df['Age'].fillna(df['Age'].median())\ndf = df.drop_duplicates()",
        diagram: "Dữ liệu thô ➔ Xóa dòng trùng ➔ Điền khuyết (median) ➔ Dữ liệu sạch",
        summary: "• Tại sao dropna vô tội vạ lại nguy hiểm? Làm mất đi một lượng lớn mẫu quý giá của dữ liệu; thay vào đó nên dùng Imputation điền giá trị khuyết.\n• Khi nào nên điền mean, median, mode? mean dùng khi phân phối chuẩn; median dùng khi phân phối bị lệch có outliers; mode dùng cho biến phân loại.\n• Phát hiện dòng trùng lặp? Dùng drop_duplicates() và cần chỉ rõ tham số subset để định danh khóa chính."
    },
    eda: {
        id: "BÀI 4",
        color: "var(--c-foundations)",
        title: "EDA & Plotting - Trực quan hóa dữ liệu",
        definition: "Khám phá phân phối biến số bằng biểu đồ (Histogram, Scatter) và hệ số tương quan Pearson.",
        usecase: "Khi bắt đầu tiếp cận dự án để tìm quy luật ẩn và chọn lọc đặc trưng.",
        code: "import seaborn as sns\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')",
        diagram: "Histogram (Tần suất) | Scatter Plot (Tương quan 2 cột)",
        summary: "• Phân biệt Correlation và Causation? Tương quan (Correlation) đo mối quan hệ tuyến tính giữa 2 biến, nhưng không chứng minh biến này gây ra biến kia (Causation).\n• Cách phát hiện Outliers trực quan? Dùng Boxplot (biểu đồ râu hộp) để xem điểm dữ liệu vượt quá khoảng 1.5 * IQR.\n• Xem phân phối dữ liệu liên tục bằng gì? Dùng Histogram hoặc KDE (Kernel Density Estimate) để xem dữ liệu bị lệch (skewed) hay chuẩn."
    },
    gradient: {
        id: "BÀI 5",
        color: "var(--c-foundations)",
        title: "Gradient Descent - Tối ưu hóa dốc",
        definition: "Thuật toán tìm cực tiểu của hàm sai số (Loss) bằng cách đi ngược hướng đạo hàm với tốc độ học lr.",
        usecase: "Huấn luyện điều chỉnh trọng số của mọi mô hình ML/DL.",
        code: "for epoch in range(100):\n    grad = 2 * w\n    w = w - lr * grad",
        diagram: "Hàm Loss ➔ Tính đạo hàm grad ➔ Cập nhật w = w - lr * grad ➔ Cực tiểu",
        summary: "• Gradient Descent tìm cực trị bằng cách nào? Đi ngược hướng đạo hàm riêng của Loss function so với trọng số W với bước nhảy Learning Rate (lr).\n• Phân biệt Batch, Stochastic (SGD) và Mini-batch GD? Batch GD tính Loss trên toàn bộ dữ liệu (chậm); SGD tính trên từng dòng (nhiễu); Mini-batch tính trên cụm nhỏ (cân bằng nhất).\n• Lỗi Vanishing và Exploding Gradient? Vanishing làm đạo hàm triệt tiêu về 0 khiến mạng ngừng học; Exploding làm đạo hàm tăng vọt gây phân kỳ mất kiểm soát."
    },
    feature: {
        id: "BÀI 9",
        color: "var(--c-foundations)",
        title: "Feature Engineering - Tiền xử lý đặc trưng",
        definition: "Chuẩn hóa thang đo (Standard Scaling) và mã hóa biến chữ thành số (One-Hot Encoding).",
        usecase: "Khi các biến lệch thang đo hoặc dữ liệu chứa thuộc tính dạng phân loại.",
        code: "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X)",
        diagram: "[Tuổi 80, Lương 10M] ➔ Scaling ➔ [1.2, 0.95]\n[Nam, Nữ] ➔ One-Hot ➔ [1,0], [0,1]",
        summary: "• Tại sao phải chuẩn hóa dữ liệu (Scaling)? Tránh việc các cột có đơn vị đo lớn hơn (ví dụ lương) áp đảo các cột có đơn vị nhỏ (tuổi) trong thuật toán dựa trên khoảng cách (KNN, K-Means, SVM).\n• Label Encoding vs One-Hot Encoding? Label Encoding gán số 0,1,2 dễ làm mô hình học sai thứ tự lớn nhỏ; One-Hot tách cột nhị phân giúp các lớp bình đẳng vô hướng."
    },
    linear: {
        id: "BÀI 6",
        color: "var(--c-ml)",
        title: "Linear Regression - Hồi quy tuyến tính",
        definition: "Mô hình tìm phương trình đường thẳng y = w*x + b sao cho tổng sai số bình phương MSE nhỏ nhất.",
        usecase: "Dự đoán giá trị số thực liên tục như giá nhà, doanh số.",
        code: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)",
        diagram: "y = w*x + b (Đường thẳng tối ưu qua các điểm dữ liệu thực tế)",
        summary: "• Các giả định chính của Linear Regression? Quan hệ tuyến tính, phương sai sai số đồng nhất (Homoscedasticity), sai số phân phối chuẩn độc lập, không có đa cộng tuyến.\n• R2-Score ý nghĩa gì? Tỷ lệ phần trăm sự biến thiên của biến mục tiêu y được giải thích bởi các đặc trưng X của mô hình (từ 0 đến 1).\n• MSE vs MAE? MSE phạt nặng các sai số lớn do có bình phương; MAE đo khoảng cách trung bình thực tế, ít bị ảnh hưởng bởi outliers hơn."
    },
    logistic: {
        id: "BÀI 6",
        color: "var(--c-ml)",
        title: "Logistic Regression - Phân loại nhị phân",
        definition: "Tính z = W*X + b rồi đưa qua hàm Sigmoid để nén về xác suất từ 0 đến 1.",
        usecase: "Phân loại nhị phân như Spam/Bình thường, Đậu/Rớt.",
        code: "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression().fit(X_train, y_train)",
        diagram: "z = WX + b ➔ Sigmoid(z) ➔ Xác suất [0.0 - 1.0] (Ngưỡng 0.5)",
        summary: "• Tại sao không dùng MSE loss cho Logistic Regression? MSE kết hợp hàm Sigmoid tạo ra hàm phi lồi (non-convex), có nhiều cực tiểu cục bộ khó tối ưu; bắt buộc dùng Cross-Entropy loss.\n• Hàm Sigmoid làm nhiệm vụ gì? Nén mọi giá trị số thực từ z = WX+b về khoảng xác suất từ [0, 1].\n• Ngưỡng phân loại (Decision Threshold)? Mặc định là 0.5; có thể thay đổi ngưỡng để tối ưu Precision hoặc Recall tùy thuộc bài toán thực tế."
    },
    tree: {
        id: "BÀI 7",
        color: "var(--c-ml)",
        title: "Decision Tree - Cây quyết định",
        definition: "Phân nhánh dữ liệu bằng các câu hỏi điều kiện If-Else dựa trên Gini hoặc Entropy.",
        usecase: "Khi cần mô hình dễ giải thích trực quan cho con người.",
        code: "from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(max_depth=3).fit(X, y)",
        diagram: "[Giá vé > 50?] ➔ (Có) ➔ [Tuổi > 15?] ➔ Sống/Chết",
        summary: "• Gini Impurity vs Entropy? Gini tính toán nhanh hơn; Entropy đo độ hỗn loạn thông tin chặt chẽ hơn. Cả hai đều dùng để chọn thuộc tính phân nhánh có thông tin lớn nhất.\n• Cơ chế chống Overfitting của cây quyết định? Cắt tỉa (Pruning), giới hạn độ sâu tối đa (max_depth), yêu cầu số lượng mẫu tối thiểu để phân nhánh (min_samples_split).\n• Node lá thuần khiết (Pure Node) là gì? Node chứa 100% mẫu thuộc về cùng một lớp phân loại duy nhất."
    },
    forest: {
        id: "BÀI 7",
        color: "var(--c-ml)",
        title: "Random Forest - Rừng ngẫu nhiên",
        definition: "Kết hợp hàng trăm cây quyết định độc lập (Bagging) và biểu quyết kết quả đa số.",
        usecase: "Tăng độ chính xác và chống overfitting trên dữ liệu bảng.",
        code: "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100).fit(X, y)",
        diagram: "Bootstrap Data ➔ Cây 1, Cây 2... Cây 100 ➔ Biểu quyết đa số",
        summary: "• Tại sao Random Forest chống Overfitting tốt hơn Decision Tree? Do cơ chế Bagging (Bootstrap Aggregating) lấy mẫu ngẫu nhiên có lặp lại cả về dòng và cột để xây hàng trăm cây độc lập rồi lấy trung bình.\n• Out-of-Bag (OOB) Score là gì? Điểm đánh giá hiệu năng mô hình bằng cách kiểm thử trên các dòng dữ liệu không tham gia huấn luyện của từng cây con.\n• Feature Importance được tính thế nào? Đo lượng giảm trung bình của độ vẩn đục (Gini/Entropy) trên tất cả các cây khi cột đó được sử dụng phân nhánh."
    },
    evaluation: {
        id: "BÀI 8",
        color: "var(--c-ml)",
        title: "Model Evaluation - Đánh giá mô hình",
        definition: "Đo lường hiệu năng bằng Accuracy, Precision, Recall và F1-Score.",
        usecase: "Đánh giá chất lượng mô hình trên tập kiểm thử Test set.",
        code: "from sklearn.metrics import classification_report\nprint(classification_report(y_true, y_pred))",
        diagram: "Confusion Matrix: TP, FP, FN, TN ➔ F1-Score = 2*(P*R)/(P+R)",
        summary: "• Khi nào dùng F1-Score thay vì Accuracy? Khi tập dữ liệu bị lệch lớp nghiêm trọng (Imbalanced Data). Accuracy lúc này bị ảo giác chính xác cao.\n• Precision vs Recall? Precision đo tỷ lệ đoán trúng trong số các ca báo Dương tính; Recall đo khả năng truy quét không bỏ sót các ca Dương tính thực tế.\n• ROC-AUC đo lường điều gì? Đo khả năng phân biệt giữa 2 lớp của mô hình ở mọi ngưỡng phân loại. AUC = 1 là hoàn hảo."
    },
    kmeans_pca: {
        id: "BÀI 10",
        color: "var(--c-ml)",
        title: "K-Means & PCA - Phân cụm & Giảm chiều",
        definition: "K-Means phân cụm tự động bằng khoảng cách Euclid. PCA rút gọn số chiều dữ liệu.",
        usecase: "Phân khúc khách hàng không nhãn hoặc chiếu dữ liệu về 2D để vẽ đồ thị.",
        code: "from sklearn.decomposition import PCA\nX_2d = PCA(n_components=2).fit_transform(X)",
        diagram: "K-Means: Cập nhật tâm cụm Centroids.\nPCA: Trục phương sai lớn nhất PC1 & PC2.",
        summary: "• K-Means phân cụm dựa trên khoảng cách nào? Khoảng cách Euclid từ điểm dữ liệu đến tâm cụm (Centroids).\n• Phương pháp Elbow xác định số cụm K tốt nhất? Tìm điểm gãy (khuỷu tay) nơi tổng bình phương khoảng cách trong cụm (WCSS) giảm chậm lại rõ rệt.\n• PCA giảm chiều như thế nào? Chiếu dữ liệu lên các trục tọa độ mới (Principal Components) có phương sai lớn nhất để giữ lại nhiều thông tin nhất."
    },
    mlp: {
        id: "BÀI 11",
        color: "var(--c-deep)",
        title: "Perceptron & MLP - Mạng nơ-ron cơ bản",
        definition: "Lớp nơ-ron liên kết đầy đủ xếp chồng kết hợp hàm kích hoạt phi tuyến (ReLU).",
        usecase: "Học các mối quan hệ phi tuyến phức tạp mà ML cổ điển không giải được.",
        code: "import torch.nn as nn\nmodel = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))",
        diagram: "Inputs ──(x Trọng số W)──➔ Tổng z + b ➔ [ReLU] ➔ Output",
        summary: "• Vai trò của hàm kích hoạt phi tuyến (ReLU, Sigmoid)? Cho phép mạng học các mối quan hệ phi tuyến; không có nó, mạng MLP dù sâu bao nhiêu cũng chỉ tương đương 1 lớp tuyến tính.\n• Khác biệt giữa Feedforward và Backpropagation? Feedforward tính toán đầu ra từ Input; Backpropagation truyền ngược sai số từ đầu ra để tính đạo hàm riêng điều chỉnh trọng số."
    },
    pytorch: {
        id: "BÀI 12",
        color: "var(--c-deep)",
        title: "PyTorch Basics - Lập trình Deep Learning",
        definition: "Cấu trúc Tensor hỗ trợ GPU và Autograd tự động tính đạo hàm lan truyền ngược.",
        usecase: "Xây dựng mọi mô hình AI học sâu hiện đại.",
        code: "import torch\nx = torch.tensor([3.0], requires_grad=True)\ny = x**2; y.backward(); print(x.grad)",
        diagram: "Inputs ➔ Forward Pass ➔ Compute Loss ➔ loss.backward() ➔ optimizer.step()",
        summary: "• Cơ chế Autograd hoạt động như thế nào? Xây dựng đồ thị tính toán động DAG tại runtime, gọi .backward() để tự động tính gradient theo luật dây chuyền (Chain Rule).\n• Tại sao cần zero_grad() trong PyTorch? Vì mặc định PyTorch cộng dồn gradient ở mỗi lượt backward(), cần xóa sạch trước khi tính toán lượt mới."
    },
    cnn: {
        id: "BÀI 13",
        color: "var(--c-deep)",
        title: "CNN - Mạng nơ-ron tích chập",
        definition: "Trích xuất đặc trưng hình ảnh bằng cách trượt quét bộ lọc tích chập Kernels.",
        usecase: "Phân loại ảnh, nhận diện vật thể trong máy tính tự lái.",
        code: "conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3)",
        diagram: "[Ảnh 28x28] ➔ [Bộ lọc 3x3 trượt] ➔ [Feature Map 26x26] ➔ [MaxPool]",
        summary: "• Tại sao CNN hiệu quả cho ảnh hơn MLP? CNN có cơ chế chia sẻ trọng số (Weight Sharing) và giữ được cấu trúc không gian 2D/3D của ảnh qua phép tích chập.\n• Tác dụng của Pooling Layer? Giảm kích thước ảnh để bớt tính toán, tăng trường thụ cảm (receptive field), tạo tính bất biến dịch chuyển (translation invariance)."
    },
    rnn: {
        id: "BÀI 14",
        color: "var(--c-deep)",
        title: "RNN & LSTM - Xử lý chuỗi tuần tự",
        definition: "Truyền trạng thái ẩn Hidden State để làm bộ nhớ quá khứ. LSTM bổ sung cổng nhớ.",
        usecase: "Xử lý văn bản, chuỗi thời gian, giá cổ phiếu.",
        code: "lstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=2)",
        diagram: "Từ (t-1) ➔ Hidden State (t-1) ──┐\n                               ├──➔ Hidden State (t)",
        summary: "• Tại sao RNN truyền thống bị mất trí nhớ ngắn hạn? Do hiện tượng Vanishing Gradient khi nhân liên tiếp ma trận trọng số trong quá trình lan truyền ngược qua thời gian BPTT.\n• Cấu trúc cốt lõi giúp LSTM giải quyết vanishing? Cell State hoạt động như một đường cao tốc lưu giữ thông tin lâu dài, được điều phối bởi 3 cổng: Cổng quên (Forget), Cổng nạp (Input), Cổng xuất (Output)."
    },
    attention: {
        id: "BÀI 14",
        color: "var(--c-deep)",
        title: "Attention - Cơ chế tập trung",
        definition: "Tính toán ma trận tương tác chéo Q, K, V để gán trọng số tập trung vào thông tin quan trọng.",
        usecase: "Xử lý câu văn dài mà LSTM bị trôi ngữ cảnh.",
        code: "# Attention = Softmax(Q * K.T / sqrt(d_k)) * V",
        diagram: "Query x Key ➔ Softmax ➔ Trọng số chú ý ➔ Nhân với Value",
        summary: "• Cơ chế Self-Attention hoạt động thế nào? Tính điểm tương đồng ngữ nghĩa giữa mỗi từ với tất cả các từ khác trong câu thông qua ma trận truy vấn Q (Query), K (Key), V (Value).\n• Tại sao cần chia cho căn bậc hai của d_k? Tránh việc tích vô hướng quá lớn làm hàm Softmax bị bão hòa, khiến gradient bị triệt tiêu cực nhỏ."
    },
    transformer: {
        id: "BÀI 15",
        color: "var(--c-deep)",
        title: "Transformer - Tự chú ý song song",
        definition: "Kiến trúc song song hóa 100% dựa trên Multi-Head Self-Attention và Positional Encoding.",
        usecase: "Nền tảng cốt lõi của mọi LLM (GPT, Claude, Gemini).",
        code: "encoder = nn.TransformerEncoderLayer(d_model=512, nhead=8)",
        diagram: "Tokens ➔ Positional Encoding ➔ Multi-Head Self-Attention ➔ FeedForward",
        summary: "• Tại sao Transformer huấn luyện nhanh hơn LSTM? Không xử lý tuần tự từng từ một; Transformer xử lý song song toàn bộ các từ cùng lúc nhờ cơ chế Self-Attention.\n• Vai trò của Positional Encoding? Bù đắp việc thiếu tính tuần tự của Transformer bằng cách cộng thêm thông tin vị trí hình sin/cosin của từng từ vào vector nhúng đầu vào."
    },
    prompt: {
        id: "BÀI 16",
        color: "var(--c-llm)",
        title: "Prompt Engineering - Thiết kế câu lệnh",
        definition: "Dẫn dắt LLM bằng Zero-shot, Few-shot (ví dụ) và Chain-of-Thought (tư duy từng bước).",
        usecase: "Khai thác sức mạnh lập luận của LLM mà không cần train lại.",
        code: "prompt = 'Ví dụ: Táo->Trái cây. Hỏi: Sắt->? Hướng dẫn: Suy nghĩ từng bước.'",
        diagram: "System Prompt + Few-shot Samples + CoT ➔ LLM API ➔ Phản hồi chuẩn",
        summary: "• Phân biệt Zero-shot và Few-shot? Zero-shot yêu cầu LLM thực hiện nhiệm vụ ngay lập tức; Few-shot cung cấp thêm một vài ví dụ mẫu để LLM hiểu cấu trúc mong muốn.\n• Chain-of-Thought (CoT) hoạt động ra sao? Yêu cầu LLM suy nghĩ và diễn giải logic từng bước trước khi đưa ra kết quả cuối, giúp tăng độ chính xác lập luận."
    },
    structured: {
        id: "BÀI 17",
        color: "var(--c-llm)",
        title: "Structured Output - Ép định dạng JSON",
        definition: "Ép LLM trả về đúng JSON Schema khai báo sẵn thông qua thư viện Pydantic.",
        usecase: "Kết nối dữ liệu phản hồi từ LLM trực tiếp vào backend.",
        code: "from pydantic import BaseModel, Field\nclass Output(BaseModel):\n    intent: str\n    urgency: int",
        diagram: "Text tự do ➔ LLM + Pydantic Schema ➔ JSON: { 'intent': 'Support', 'urgency': 5 }",
        summary: "• Tại sao Structured Output quan trọng cho ứng dụng thực tế? Ép LLM trả về định dạng cố định (như JSON) để hệ thống backend có thể parse và chạy code tự động không bị crash.\n• JSON Mode vs Function Calling? JSON Mode ép đầu ra dạng JSON tự do; Function Calling ép đầu ra khớp chính xác với Schema tham số của hàm ngoại vi cần gọi."
    },
    lora: {
        id: "BÀI 25",
        color: "var(--c-llm)",
        title: "PEFT LoRA - Tinh chỉnh mô hình nhẹ",
        definition: "Đóng băng trọng số gốc LLM, chỉ huấn luyện ma trận tích rank thấp bổ trợ.",
        usecase: "Fine-tune LLM trên GPU cá nhân/giới hạn.",
        code: "from peft import LoraConfig, get_peft_model\npeft_config = LoraConfig(r=8, lora_alpha=16)\nmodel = get_peft_model(base_model, peft_config)",
        diagram: "Input X ──┬──> Base Model W (Đóng băng 7B) ──┬──> Output\n          └──> LoRA Matrix A x B (Train 8MB) ┘",
        summary: "• LoRA tiết kiệm bộ nhớ GPU bằng cách nào? Đóng băng toàn bộ trọng số gốc của mô hình nền, chỉ huấn luyện bổ sung ma trận tích rank thấp (A x B) với số lượng tham số cực nhỏ.\n• Giá trị Rank (r) trong LoRA? Rank nhỏ (r=8 hoặc r=16) giúp giảm đáng kể bộ nhớ huấn luyện mà vẫn giữ được hiệu năng tinh chỉnh cao."
    },
    embedding: {
        id: "BÀI 18",
        color: "var(--c-rag)",
        title: "Embeddings - Vector hóa ngữ nghĩa",
        definition: "Chuyển đổi văn bản thành vector số thực biểu diễn tọa độ ngữ nghĩa.",
        usecase: "So khớp khoảng cách Cosine giữa câu hỏi và tài liệu.",
        code: "vec = openai.Embedding.create(input='Học máy', model='text-embedding-3-small')",
        diagram: "'Vua' - 'Nam' + 'Nữ' ➔ Vector góc hẹp sát vector 'Hoàng Hậu'",
        summary: "• Tọa độ vector embedding đại diện cho điều gì? Đại diện cho tọa độ ngữ nghĩa của từ/văn bản trong không gian nhiều chiều. Các từ có nghĩa tương tự sẽ nằm gần nhau.\n• Cosine Similarity hoạt động thế nào? Đo góc giữa hai vector ngữ nghĩa trong không gian. Giá trị từ -1 đến 1; càng gần 1 tức là ý nghĩa càng tương đồng."
    },
    vectordb: {
        id: "BÀI 19",
        color: "var(--c-rag)",
        title: "Vector Database - Cơ sở dữ liệu Vector",
        definition: "CSDL chuyên dụng lập chỉ mục (HNSW) giúp truy vấn lân cận nhanh nhất.",
        usecase: "Lưu trữ và tìm kiếm tương đồng trên hàng triệu tài liệu RAG.",
        code: "import chromadb\nclient = chromadb.PersistentClient('./chroma')\ncollection = client.get_or_create_collection('docs')",
        diagram: "Vector câu hỏi ➔ Query HNSW Index ➔ Top K Chunks tương đồng",
        summary: "• Tại sao CSDL quan hệ truyền thống không dùng cho Vector Search? Vì thuật toán tìm kiếm vector lân cận gần nhất (kNN) trên hàng triệu vector đòi hỏi lập chỉ mục chuyên dụng như HNSW để đạt tốc độ thời gian thực.\n• Thuật toán HNSW hoạt động ra sao? Xây dựng đồ thị tìm kiếm nhiều tầng giống như skip list, giúp tìm kiếm nhanh chóng với độ phức tạp thời gian logarit."
    },
    chunking: {
        id: "BÀI 20",
        color: "var(--c-rag)",
        title: "Ingestion & Chunking - Tiền xử lý RAG",
        definition: "Cắt nhỏ văn bản dài thành các mảnh Chunks có khoảng đè chồng Overlap.",
        usecase: "Chuẩn bị dữ liệu PDF/Word tránh tràn context LLM.",
        code: "splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)",
        diagram: "Doc dài ➔ Chunk 1 [0-120] ➔ Overlap [100-120] ➔ Chunk 2 [100-220]",
        summary: "• Tại sao cần có tham số Chunk Overlap? Để giữ lại ngữ cảnh liền mạch ở các điểm cắt, tránh mất thông tin khi một câu quan trọng bị chia đôi sang 2 chunks khác nhau.\n• Các chiến lược Chunking phổ biến? Cắt theo ký tự (Character), cắt theo số lượng token (Token-based), hoặc cắt theo ngữ nghĩa (Semantic Chunking)."
    },
    advrag: {
        id: "BÀI 21",
        color: "var(--c-rag)",
        title: "Advanced RAG - Truy xuất nâng cao",
        definition: "Lọc nhanh Top 50 vector thô rồi dùng Cross-Encoder Re-ranker chọn Top 3.",
        usecase: "Khi kết quả tìm kiếm vector bị nhiễu thông tin.",
        code: "results = cohere_client.rerank(query=query, documents=chunks, top_n=3)",
        diagram: "Query ➔ Vector Search (50 chunks) ➔ Re-ranker ➔ 3 Chunks chuẩn ➔ LLM",
        summary: "• Tại sao cần Re-ranking trong Advanced RAG? Vì Vector Search thô tìm kiếm bằng độ tương đồng cosine có thể lẫn lộn nhiều nhiễu; Re-ranker (Cross-Encoder) đánh giá độ liên quan sâu hơn để chọn ra Top K chất lượng nhất.\n• Query Rewriting là gì? LLM viết lại câu hỏi gốc của người dùng thành nhiều dạng khác nhau để tăng xác suất tìm thấy tài liệu liên quan."
    },
    rageval: {
        id: "BÀI 22",
        color: "var(--c-rag)",
        title: "RAG Evaluation - Đánh giá RAG",
        definition: "Chấm điểm Ragas Triad: Faithfulness, Answer Relevance, Context Precision.",
        usecase: "Tự động hóa đo lường độ trung thực và ảo giác chatbot.",
        code: "from ragas import evaluate\nresults = evaluate(dataset, metrics=[faithfulness, answer_relevance])",
        diagram: "Faithfulness: Trả lời có dựa trên Context?\nRelevance: Trả lời có đúng trọng tâm Query?",
        summary: "• Đo lường Faithfulness thế nào? Xác minh câu trả lời của LLM có hoàn toàn dựa trên dữ liệu từ tài liệu tìm được (Context) hay tự bịa ra (ảo giác).\n• Context Recall là gì? Đo lường xem hệ thống tìm kiếm vector có truy xuất được đầy đủ các thông tin cần thiết để trả lời câu hỏi gốc hay không."
    },
    funcall: {
        id: "BÀI 23",
        color: "var(--c-ops)",
        title: "Function Calling - Gọi hàm ngoại vi",
        definition: "LLM trích xuất ý định và sinh tham số JSON để backend gọi API/DB.",
        usecase: "Kết nối LLM với thế giới bên ngoài (DB, API thời tiết, Email).",
        code: "tool_spec = {'name': 'check_order', 'parameters': {'order_id': 'string'}}\n# LLM output: tool_call('check_order', order_id='DH10')",
        diagram: "User: 'Đơn DH10 sao rồi?' ➔ LLM: call(check_order) ➔ API ➔ Result ➔ LLM trả lời",
        summary: "• LLM có tự động thực thi code của Function không? Không! LLM chỉ phân tích văn bản và sinh ra cấu trúc JSON chứa tên hàm và tham số cần gọi. Phía backend Server phải nhận JSON này để chạy hàm thực tế.\n• Xử lý thế nào khi LLM sinh sai tham số? Bắt lỗi try-catch ở server, gửi lại text thông báo lỗi chi tiết cho LLM để nó tự động sửa và sinh lại JSON chuẩn."
    },
    agent: {
        id: "BÀI 24",
        color: "var(--c-ops)",
        title: "AI Agents - Tác nhân lập kế hoạch",
        definition: "Vòng lặp ReAct: Thought (suy nghĩ) ➔ Action (gọi tool) ➔ Observation (kết quả).",
        usecase: "Giải quyết bài toán phức tạp đòi hỏi nhiều bước xử lý.",
        code: "while not done:\n    thought = llm.think()\n    action = llm.act()\n    obs = execute(action)",
        diagram: "Thought ➔ Action ➔ Observation ──(Lặp phản hồi)──> Final Answer",
        summary: "• AI Agent khác gì RAG pipeline thông thường? RAG thông thường chạy theo chuỗi cố định; AI Agent tự sử dụng LLM để lập kế hoạch, chọn công cụ và tự động quyết định bước đi tiếp theo theo vòng lặp ReAct.\n• Làm sao chặn Agent rơi vào vòng lặp vô hạn (Infinite Loop)? Thiết lập tham số số lượt lặp tối đa (max_iterations) hoặc giới hạn thời gian chạy (timeout)."
    },
    serve: {
        id: "BÀI 26",
        color: "var(--c-ops)",
        title: "Serve API & SSE - Streaming chữ",
        definition: "Tạo API bất đồng bộ với FastAPI và truyền phát token real-time qua SSE.",
        usecase: "Build app chat mượt mà như ChatGPT không bắt chờ lâu.",
        code: "async def sse_gen():\n    for token in ['Tôi ', 'là ', 'AI']:\n        yield f'data: {token}\\n\\n'\n# StreamingResponse(sse_gen(), media_type='text/event-stream')",
        diagram: "Server ➔ Stream Token 1 ➔ Stream Token 2 ➔ Client hiển thị chữ chạy",
        summary: "• Server-Sent Events (SSE) hoạt động ra sao? Thiết lập kết nối HTTP một chiều bền vững từ Server sang Client, cho phép server đẩy text chạy trực tiếp (Streaming Response) giống ChatGPT.\n• Tại sao SSE tối ưu hơn WebSocket cho Chatbot? Vì chat chỉ cần truyền phát văn bản 1 chiều từ AI sang User; SSE nhẹ hơn, dễ cấu hình và chạy trên HTTP thường."
    },
    docker: {
        id: "BÀI 27",
        color: "var(--c-ops)",
        title: "Docker & Cloud - Đóng gói container",
        definition: "Đóng gói mã nguồn, thư viện và OS base thành Docker Image chạy nhất quán.",
        usecase: "Triển khai ứng dụng AI lên môi trường cloud sản xuất.",
        code: "FROM python:3.10-slim\nWORKDIR /app\nCOPY . .\nCMD ['uvicorn', 'Project.app:app', '--host', '0.0.0.0', '--port', '8080']",
        diagram: "Code + Libs + OS ➔ Docker Build ➔ Run Container trên Cloud",
        summary: "• Tại sao ứng dụng AI cần Docker? Đảm bảo tính nhất quán tuyệt đối về phiên bản PyTorch, CUDA, Python giúp tránh lỗi xung đột hệ thống khi deploy lên cloud.\n• Khác biệt giữa Image và Container? Image là bản đóng gói tĩnh (tương tự file installer); Container là một thực thể chạy sống của Image đó."
    },
    tracing: {
        id: "BÀI 28",
        color: "var(--c-ops)",
        title: "Tracing & Observability - Giám sát",
        definition: "Theo dõi chi tiết vết thời gian thực thi, prompt và token tiêu hao trên LangSmith.",
        usecase: "Debug chuỗi gọi LLM chạy chậm hoặc tính chi phí.",
        code: "os.environ['LANGCHAIN_TRACING_V2'] = 'true'\nos.environ['LANGCHAIN_API_KEY'] = 'lsv2_pt_xxx'",
        diagram: "User Call ➔ [RAG Pipeline] ➔ Trace Logs ➔ LangSmith Web UI",
        summary: "• Mục đích của Tracing trong giám sát LLM? Cho phép nhìn thấy toàn bộ vết thực thi của hệ thống (RAG, Agent, Tools), thời gian chạy từng bước, prompt đầu vào đầu ra và số lượng token tiêu thụ."
    },
    langchain: {
        id: "BÀI 29",
        color: "var(--c-prod)",
        title: "LangChain & LangGraph - Framework AI",
        definition: "LangChain cung cấp cú pháp LCEL (|) để ghép chuỗi AI. LangGraph xây Agent dạng Đồ thị có hướng.",
        usecase: "Xây RAG chain phức tạp hoặc Agent có trạng thái lặp nhiều bước.",
        code: "chain = prompt | llm | StrOutputParser()\nresult = chain.invoke({'topic': 'Gradient Descent'})",
        diagram: "LCEL: Prompt | LLM | Parser\nLangGraph: [Node LLM] ─(Condition)─> [Node Tool] ➔ [END]",
        summary: "• LCEL là gì? LangChain Expression Language - cú pháp khai báo đường ống giúp tự động hóa xử lý luồng, stream và chạy song song tự động.\n• Khi nào dùng LangGraph? Khi cần xây dựng Agent có logic phức tạp, chứa các vòng lặp rẽ nhánh (stateful multi-agent) dạng đồ thị có hướng và quản lý trạng thái (State) chặt chẽ mà LangChain thường không làm được."
    },
    memory: {
        id: "BÀI 30",
        color: "var(--c-prod)",
        title: "Multi-turn Memory - Bộ nhớ hội thoại",
        definition: "Quản lý lịch sử chat cho LLM phi trạng thái. Bộ nhớ ngắn hạn dùng RAM Buffer, dài hạn dùng Vector DB.",
        usecase: "Mọi ứng dụng chatbot cần nhớ lịch sử trò chuyện.",
        code: "chat_history.append(HumanMessage(content=user_input))\nresponse = llm.invoke(chat_history)",
        diagram: "Short-term: [System] + [History] + [User query] ➔ LLM\nLong-term: Query ➔ Vector Search hội thoại cũ ➔ Context",
        summary: "• Tại sao LLM cần có cơ chế quản lý bộ nhớ Memory? Vì LLM API vốn phi trạng thái (stateless), mỗi lượt gọi độc lập hoàn toàn; Memory lưu trữ và gửi kèm lịch sử chat để LLM hiểu ngữ cảnh hội thoại đa lượt.\n• Tránh tràn cửa sổ ngữ cảnh (Context Window) bằng cách nào? Dùng chiến lược tóm tắt lịch sử cũ (Summary Memory) hoặc trượt cắt bớt tin nhắn cũ (Buffer Window Memory)."
    },
    security: {
        id: "BÀI 31",
        color: "var(--c-prod)",
        title: "AI Security & Guardrails - Bảo mật",
        definition: "Phòng chống Prompt Injection và triển khai Guardrails kiểm tra đầu vào/đầu ra.",
        usecase: "Bảo vệ chatbot không bị hack khi phục vụ người dùng thật.",
        code: "if any(p in user_input.lower() for p in ['ignore previous', 'jailbreak']):\n    return 'Yêu cầu bị từ chối'",
        diagram: "User Input ➔ Guardrail Check ➔ Chặn injection ➔ An toàn",
        summary: "• Prompt Injection là gì? Kỹ thuật tấn công bằng cách nhập text độc hại lừa LLM bỏ qua chỉ thị hệ thống ban đầu để làm việc xấu hoặc lấy cắp dữ liệu nhạy cảm.\n• Cách phòng chống? Sử dụng Guardrail để quét dữ liệu nhập vào, thiết lập phân quyền chặt chẽ cho LLM API và không bao giờ cho LLM chạy lệnh shell trực tiếp."
    },
    cost: {
        id: "BÀI 32",
        color: "var(--c-prod)",
        title: "Cost & Caching - Tối ưu chi phí",
        definition: "Semantic Caching lưu câu trả lời vào Vector DB và tái sử dụng khi câu hỏi tương đồng (Cosine > 0.95).",
        usecase: "Giảm 70-80% chi phí API khi app có nhiều người dùng.",
        code: "if cosine_similarity(query_vec, cached_vec) > 0.95:\n    return cached_answer  # Tiết kiệm tiền API!",
        diagram: "Query ➔ Semantic Cache Check ➔ (HIT > 0.95) ➔ Tra về ngay không tốn API",
        summary: "• Cơ chế Semantic Caching giảm chi phí ra sao? Lưu trữ các câu hỏi và câu trả lời cũ. Khi có câu hỏi mới tương đồng ngữ nghĩa cao (>95%), trả về ngay kết quả từ Cache không cần gọi LLM API.\n• Khi nào không được dùng Cache? Khi thông tin cần cập nhật thời gian thực (giá vàng, thời tiết) hoặc chứa thông tin định danh cá nhân nhạy cảm."
    },
    testing: {
        id: "BÀI 33",
        color: "var(--c-prod)",
        title: "AI Testing & CI/CD - Kiểm thử tự động",
        definition: "Unit test prompt với LLM-as-a-Judge và tự động chạy test qua GitHub Actions.",
        usecase: "Đảm bảo chất lượng không giảm khi đổi model hoặc sửa prompt.",
        code: "def llm_judge(q, criteria, answer):\n    return json.loads(judge.invoke(prompt).content)",
        diagram: "Push Code ➔ GitHub Actions ➔ Pytest LLM-as-a-judge ➔ Pass/Fail",
        summary: "• LLM-as-a-Judge hoạt động thế nào? Sử dụng một mô hình ngôn ngữ lớn mạnh (như GPT-4o) để chấm điểm câu trả lời của mô hình cần kiểm thử dựa trên các tiêu chí rubrics định sẵn."
    },
    multimodal: {
        id: "BÀI 34",
        color: "var(--c-prod)",
        title: "Multi-modal AI - Ảnh, Âm thanh",
        definition: "Vision LLM đọc hiểu hình ảnh (hóa đơn, biểu đồ) và Whisper chuyển giọng nói thành text.",
        usecase: "Đọc hóa đơn/hợp đồng scan, ghi chú cuộc họp tự động.",
        code: "msg = HumanMessage(content=[{'type':'image_url',...}, {'type':'text',...}])",
        diagram: "Ảnh ➔ Base64 ➔ Vision LLM ➔ JSON\nAudio .mp3 ➔ Whisper ➔ Text ➔ LLM tóm tắt",
        summary: "• Vision LLM xử lý ảnh đầu vào ra sao? Ảnh được mã hóa bởi mô hình thị giác (Vision Encoder) để biến đổi các mảnh ảnh (patches) thành các tokens tương tự như token văn bản, sau đó ghép chung vào LLM.\n• Thách thức lớn nhất khi deploy model Multimodal? Dung lượng RAM GPU tiêu thụ lớn và độ trễ xử lý dữ liệu nhị phân đầu vào cao."
    }
};

let currentConceptKey = null;
let currentQuizPage = 1;
let quizUserAnswers = {}; // { [conceptKey]: { [qIndex]: selectedOptionIndex } }
let quizSubmittedState = {}; // { [conceptKey]: boolean }

function switchModalTab(tabName) {
    document.querySelectorAll(".modal-nav-tab").forEach(tab => tab.classList.remove("active"));
    
    const theoryBody = document.getElementById("modal-body-theory");
    const quizBody = document.getElementById("modal-body-quiz");
    
    if (tabName === "theory") {
        document.getElementById("mtab-theory").classList.add("active");
        if (theoryBody) theoryBody.style.display = "flex";
        if (quizBody) quizBody.style.display = "none";
    } else {
        document.getElementById("mtab-quiz").classList.add("active");
        if (theoryBody) theoryBody.style.display = "none";
        if (quizBody) quizBody.style.display = "flex";
    }
}

function updateMindmapCompletedStates() {
    const cards = document.querySelectorAll(".concept-card");
    cards.forEach(card => {
        const onclickAttr = card.getAttribute("onclick");
        if (!onclickAttr) return;
        const match = onclickAttr.match(/openModal\('([^']+)'\)/);
        if (match) {
            const conceptKey = match[1];
            const isCompleted = localStorage.getItem(`aiml_completed_${conceptKey}`) === "true";
            if (isCompleted) {
                card.classList.add("completed");
            } else {
                card.classList.remove("completed");
            }
        }
    });
}
window.updateMindmapCompletedStates = updateMindmapCompletedStates;

function openModal(conceptKey) {
    currentConceptKey = conceptKey;
    currentQuizPage = 1; // Reset về trang 1
    const data = lessonDetails[conceptKey];
    if (!data) return;

    const modal = document.getElementById("detail-modal");
    if (!modal) return;

    // Reset tab về Theory khi mở modal mới
    switchModalTab("theory");

    document.getElementById("modal-concept-id").innerText = data.id;
    document.getElementById("modal-concept-title").innerText = data.title;
    
    const titleEl = document.getElementById("modal-concept-title");
    const badgeEl = document.getElementById("modal-concept-id");
    
    if (titleEl && badgeEl) {
        titleEl.style.color = data.color;
        badgeEl.style.color = data.color;
        badgeEl.style.borderColor = data.color;
    }

    document.getElementById("modal-def").innerText = data.definition;
    document.getElementById("modal-usecase").innerText = data.usecase;
    document.getElementById("modal-code").innerText = data.code;
    document.getElementById("modal-diagram").innerText = data.diagram;
    
    const summaryEl = document.getElementById("modal-summary");
    if (summaryEl) {
        summaryEl.innerText = data.summary || "🔑 Đang cập nhật câu hỏi & kiến thức cốt lõi cho buổi phỏng vấn...";
    }

    // Khởi tạo bài Quiz tương ứng
    renderQuiz(conceptKey);

    modal.style.display = "flex";
}

function changeQuizPage(delta) {
    if (!currentConceptKey) return;
    const questions = (typeof lessonQuizzes !== "undefined") ? lessonQuizzes[currentConceptKey] : null;
    if (!questions) return;

    const pageSize = 10;
    const totalPages = Math.ceil(questions.length / pageSize);

    currentQuizPage = Math.max(1, Math.min(totalPages, currentQuizPage + delta));
    renderQuiz(currentConceptKey);
}

function renderQuiz(conceptKey) {
    const container = document.getElementById("quiz-questions-list");
    const bannerTitle = document.getElementById("quiz-banner-title");
    const scoreBadge = document.getElementById("quiz-score-badge");
    const submitBtn = document.getElementById("btn-submit-quiz");
    const retryBtn = document.getElementById("btn-retry-quiz");

    if (!container) return;

    const questions = (typeof lessonQuizzes !== "undefined") ? lessonQuizzes[conceptKey] : null;
    const lessonInfo = lessonDetails[conceptKey];

    if (bannerTitle) {
        bannerTitle.innerText = `📝 Bài Kiểm Tra Trắc Nghiệm (${questions ? questions.length : 20} Câu) - ${lessonInfo ? lessonInfo.title : conceptKey}`;
    }

    if (!questions || questions.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Bài học này đang được cập nhật câu hỏi kiểm tra...</div>`;
        if (submitBtn) submitBtn.style.display = "none";
        if (retryBtn) retryBtn.style.display = "none";
        if (scoreBadge) scoreBadge.style.display = "none";
        return;
    }

    if (!quizUserAnswers[conceptKey]) {
        quizUserAnswers[conceptKey] = {};
    }
    const userAns = quizUserAnswers[conceptKey];
    const isSubmitted = !!quizSubmittedState[conceptKey];

    const pageSize = 10;
    const totalPages = Math.ceil(questions.length / pageSize);
    if (currentQuizPage > totalPages) currentQuizPage = totalPages;
    if (currentQuizPage < 1) currentQuizPage = 1;

    const startIndex = (currentQuizPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, questions.length);
    const pageQuestions = questions.slice(startIndex, endIndex);

    // Xây dựng thanh phân trang (Pagination Bar)
    const paginationHtml = `
        <div class="quiz-pagination-bar" style="display: flex; justify-content: space-between; align-items: center; background: rgba(30, 41, 59, 0.6); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
            <button class="btn btn-sm" style="background: rgba(255,255,255,0.1); padding: 5px 12px; font-size: 11px; color: #f1f5f9; cursor: pointer; border: none; border-radius: 4px;" ${currentQuizPage === 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} onclick="changeQuizPage(-1)">⬅ Trang trước</button>
            <span style="font-size: 11.5px; font-weight: 600; color: #38bdf8;">Trang ${currentQuizPage} / ${totalPages} (Câu ${startIndex + 1} - ${endIndex})</span>
            <button class="btn btn-sm" style="background: rgba(255,255,255,0.1); padding: 5px 12px; font-size: 11px; color: #f1f5f9; cursor: pointer; border: none; border-radius: 4px;" ${currentQuizPage === totalPages ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} onclick="changeQuizPage(1)">Trang sau ➡</button>
        </div>
    `;

    let html = paginationHtml;

    pageQuestions.forEach((q, relativeIdx) => {
        const qIdx = startIndex + relativeIdx;
        const userChoice = userAns[qIdx];

        html += `
            <div class="quiz-question-card" id="quiz-qcard-${qIdx}">
                <div class="quiz-q-title">
                    <span class="quiz-q-num">Câu ${qIdx + 1}/${questions.length}</span>
                    ${q.q}
                </div>
                <div class="quiz-options-grid">
        `;

        q.options.forEach((optText, optIdx) => {
            let optClass = "quiz-opt-btn";
            let stateBadge = "";

            if (isSubmitted) {
                optClass += " disabled";
                if (optIdx === q.answer) {
                    optClass += " correct";
                    stateBadge = `<span style="color: #34d399; font-weight: bold;">✓ Đáp án đúng</span>`;
                } else if (userChoice === optIdx && userChoice !== q.answer) {
                    optClass += " wrong";
                    stateBadge = `<span style="color: #f87171; font-weight: bold;">✗ Bạn đã chọn</span>`;
                }
            } else {
                if (userChoice === optIdx) {
                    optClass += " selected";
                }
            }

            const clickAttr = isSubmitted ? "" : `onclick="selectQuizOption(${qIdx}, ${optIdx})"`;

            html += `
                <button class="${optClass}" ${clickAttr}>
                    <span>${optText}</span>
                    ${stateBadge}
                </button>
            `;
        });

        html += `</div>`;

        // Nếu đã nộp bài, hiển thị giải thích chi tiết
        if (isSubmitted) {
            html += `
                <div class="quiz-explain-box">
                    <strong>💡 Giải thích chi tiết:</strong> ${q.explain}
                </div>
            `;
        }

        html += `</div>`;
    });

    html += paginationHtml;

    container.innerHTML = html;

    // Cập nhật nút bấm và Score Badge
    if (isSubmitted) {
        if (submitBtn) submitBtn.style.display = "none";
        if (retryBtn) retryBtn.style.display = "inline-flex";

        let score = 0;
        questions.forEach((q, idx) => {
            if (userAns[idx] === q.answer) score++;
        });

        const pct = Math.round((score / questions.length) * 100);
        const isPass = pct >= 80;

        if (scoreBadge) {
            scoreBadge.style.display = "inline-flex";
            scoreBadge.className = `quiz-result-badge-card ${isPass ? "quiz-result-pass" : "quiz-result-fail"}`;
            scoreBadge.innerHTML = isPass
                ? `<span>🎉 ĐẠT: ${score}/${questions.length} (${pct}%)</span>`
                : `<span>❌ CHƯA ĐẠT: ${score}/${questions.length} (${pct}%) - Cần ≥80% (${Math.ceil(questions.length * 0.8)} câu)</span>`;
        }

        if (isPass) {
            localStorage.setItem(`aiml_completed_${conceptKey}`, "true");
            updateMindmapCompletedStates();
        }
    } else {
        if (submitBtn) submitBtn.style.display = "inline-flex";
        if (retryBtn) retryBtn.style.display = "none";
        if (scoreBadge) scoreBadge.style.display = "none";
    }
}

function selectQuizOption(qIdx, optIdx) {
    if (!currentConceptKey) return;
    if (quizSubmittedState[currentConceptKey]) return; // Đã nộp bài thì không đổi được nữa

    if (!quizUserAnswers[currentConceptKey]) {
        quizUserAnswers[currentConceptKey] = {};
    }
    quizUserAnswers[currentConceptKey][qIdx] = optIdx;
    renderQuiz(currentConceptKey);
}

function submitQuiz() {
    if (!currentConceptKey) return;
    const questions = (typeof lessonQuizzes !== "undefined") ? lessonQuizzes[currentConceptKey] : null;
    if (!questions) return;

    const userAns = quizUserAnswers[currentConceptKey] || {};
    const answeredCount = Object.keys(userAns).length;

    if (answeredCount < questions.length) {
        const confirmSubmit = confirm(`Bạn chưa trả lời hết ${questions.length} câu hỏi (Mới trả lời ${answeredCount}/${questions.length} câu).\n\nBạn có chắc chắn muốn nộp bài & chấm điểm ngay không?`);
        if (!confirmSubmit) return;
    }

    quizSubmittedState[currentConceptKey] = true;
    renderQuiz(currentConceptKey);
}

function retryQuiz() {
    if (!currentConceptKey) return;
    quizUserAnswers[currentConceptKey] = {};
    quizSubmittedState[currentConceptKey] = false;
    currentQuizPage = 1;
    renderQuiz(currentConceptKey);
}

function closeModal(event) {
    const modal = document.getElementById("detail-modal");
    if (modal) modal.style.display = "none";
}

// Lắng nghe phím ESC để đóng modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
