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
    // Xóa class active ở tất cả các nút
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    // Kích hoạt class active cho nút tab được chọn
    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }

    const nav = document.querySelector(".tab-nav");
    if (nav && tabId === "home") nav.scrollLeft = 0;

    const badge = document.getElementById("brand-badge-text");
    if (tabId === "home") badge.innerText = "Full Roadmap (Bài 1-34)";
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
    switchTab("numpy");
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
        diagram: "Python List (Tuần tự): Loop qua con trỏ ➔ Chạy chậm.\nNumPy Array (SIMD C-level): [a] + [b] ──(Song song)──> [c]"
    },
    pandas: {
        id: "BÀI 2",
        color: "var(--c-foundations)",
        title: "Pandas - Quản lý dữ liệu bảng",
        definition: "Thư viện quản lý cấu trúc dữ liệu dạng bảng 2D (DataFrame) và 1D (Series), tích hợp các phép toán thống kê, liên kết bảng, lọc điều kiện và gộp nhóm.",
        usecase: "Khi cần đọc ghi file CSV/Excel, làm sạch, lọc, gộp nhóm và chuyển đổi cấu trúc thông tin.",
        code: "import pandas as pd\ndf = pd.read_csv('titanic.csv')\nresult = df[df['Age'] > 30].groupby('Pclass')['Fare'].mean()",
        diagram: "CSV/SQL ➔ pd.read_csv() ➔ DataFrame ➔ Lọc & Groupby"
    },
    cleaning: {
        id: "BÀI 3",
        color: "var(--c-foundations)",
        title: "Data Cleaning - Làm sạch dữ liệu",
        definition: "Quy trình xử lý ô trống (NaN) bằng fillna/dropna và loại bỏ dòng trùng lặp bằng drop_duplicates.",
        usecase: "Trước khi đưa dữ liệu vào huấn luyện để tránh lỗi crash hoặc mô hình bị học sai lệch.",
        code: "df['Age'] = df['Age'].fillna(df['Age'].median())\ndf = df.drop_duplicates()",
        diagram: "Dữ liệu thô ➔ Xóa dòng trùng ➔ Điền khuyết (median) ➔ Dữ liệu sạch"
    },
    eda: {
        id: "BÀI 4",
        color: "var(--c-foundations)",
        title: "EDA & Plotting - Trực quan hóa dữ liệu",
        definition: "Khám phá phân phối biến số bằng biểu đồ (Histogram, Scatter) và hệ số tương quan Pearson.",
        usecase: "Khi bắt đầu tiếp cận dự án để tìm quy luật ẩn và chọn lọc đặc trưng.",
        code: "import seaborn as sns\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')",
        diagram: "Histogram (Tần suất) | Scatter Plot (Tương quan 2 cột)"
    },
    gradient: {
        id: "BÀI 5",
        color: "var(--c-foundations)",
        title: "Gradient Descent - Tối ưu hóa dốc",
        definition: "Thuật toán tìm cực tiểu của hàm sai số (Loss) bằng cách đi ngược hướng đạo hàm với tốc độ học lr.",
        usecase: "Huấn luyện điều chỉnh trọng số của mọi mô hình ML/DL.",
        code: "for epoch in range(100):\n    grad = 2 * w\n    w = w - lr * grad",
        diagram: "Hàm Loss ➔ Tính đạo hàm grad ➔ Cập nhật w = w - lr * grad ➔ Cực tiểu"
    },
    feature: {
        id: "BÀI 9",
        color: "var(--c-foundations)",
        title: "Feature Engineering - Tiền xử lý đặc trưng",
        definition: "Chuẩn hóa thang đo (Standard Scaling) và mã hóa biến chữ thành số (One-Hot Encoding).",
        usecase: "Khi các biến lệch thang đo hoặc dữ liệu chứa thuộc tính dạng phân loại.",
        code: "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X)",
        diagram: "[Tuổi 80, Lương 10M] ➔ Scaling ➔ [1.2, 0.95]\n[Nam, Nữ] ➔ One-Hot ➔ [1,0], [0,1]"
    },
    linear: {
        id: "BÀI 6",
        color: "var(--c-ml)",
        title: "Linear Regression - Hồi quy tuyến tính",
        definition: "Mô hình tìm phương trình đường thẳng y = w*x + b sao cho tổng sai số bình phương MSE nhỏ nhất.",
        usecase: "Dự đoán giá trị số thực liên tục như giá nhà, doanh số.",
        code: "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)",
        diagram: "y = w*x + b (Đường thẳng tối ưu qua các điểm dữ liệu thực tế)"
    },
    logistic: {
        id: "BÀI 6",
        color: "var(--c-ml)",
        title: "Logistic Regression - Phân loại nhị phân",
        definition: "Tính z = W*X + b rồi đưa qua hàm Sigmoid để nén về xác suất từ 0 đến 1.",
        usecase: "Phân loại nhị phân như Spam/Bình thường, Đậu/Rớt.",
        code: "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression().fit(X_train, y_train)",
        diagram: "z = WX + b ➔ Sigmoid(z) ➔ Xác suất [0.0 - 1.0] (Ngưỡng 0.5)"
    },
    tree: {
        id: "BÀI 7",
        color: "var(--c-ml)",
        title: "Decision Tree - Cây quyết định",
        definition: "Phân nhánh dữ liệu bằng các câu hỏi điều kiện If-Else dựa trên Gini hoặc Entropy.",
        usecase: "Khi cần mô hình dễ giải thích trực quan cho con người.",
        code: "from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(max_depth=3).fit(X, y)",
        diagram: "[Giá vé > 50?] ➔ (Có) ➔ [Tuổi > 15?] ➔ Sống/Chết"
    },
    forest: {
        id: "BÀI 7",
        color: "var(--c-ml)",
        title: "Random Forest - Rừng ngẫu nhiên",
        definition: "Kết hợp hàng trăm cây quyết định độc lập (Bagging) và biểu quyết kết quả đa số.",
        usecase: "Tăng độ chính xác và chống overfitting trên dữ liệu bảng.",
        code: "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100).fit(X, y)",
        diagram: "Bootstrap Data ➔ Cây 1, Cây 2... Cây 100 ➔ Biểu quyết đa số"
    },
    evaluation: {
        id: "BÀI 8",
        color: "var(--c-ml)",
        title: "Model Evaluation - Đánh giá mô hình",
        definition: "Đo lường hiệu năng bằng Accuracy, Precision, Recall và F1-Score.",
        usecase: "Đánh giá chất lượng mô hình trên tập kiểm thử Test set.",
        code: "from sklearn.metrics import classification_report\nprint(classification_report(y_true, y_pred))",
        diagram: "Confusion Matrix: TP, FP, FN, TN ➔ F1-Score = 2*(P*R)/(P+R)"
    },
    kmeans_pca: {
        id: "BÀI 10",
        color: "var(--c-ml)",
        title: "K-Means & PCA - Phân cụm & Giảm chiều",
        definition: "K-Means phân cụm tự động bằng khoảng cách Euclid. PCA rút gọn số chiều dữ liệu.",
        usecase: "Phân khúc khách hàng không nhãn hoặc chiếu dữ liệu về 2D để vẽ đồ thị.",
        code: "from sklearn.decomposition import PCA\nX_2d = PCA(n_components=2).fit_transform(X)",
        diagram: "K-Means: Cập nhật tâm cụm Centroids.\nPCA: Trục phương sai lớn nhất PC1 & PC2."
    },
    mlp: {
        id: "BÀI 11",
        color: "var(--c-deep)",
        title: "Perceptron & MLP - Mạng nơ-ron cơ bản",
        definition: "Lớp nơ-ron liên kết đầy đủ xếp chồng kết hợp hàm kích hoạt phi tuyến (ReLU).",
        usecase: "Học các mối quan hệ phi tuyến phức tạp mà ML cổ điển không giải được.",
        code: "import torch.nn as nn\nmodel = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))",
        diagram: "Inputs ──(x Trọng số W)──➔ Tổng z + b ➔ [ReLU] ➔ Output"
    },
    pytorch: {
        id: "BÀI 12",
        color: "var(--c-deep)",
        title: "PyTorch Basics - Lập trình Deep Learning",
        definition: "Cấu trúc Tensor hỗ trợ GPU và Autograd tự động tính đạo hàm lan truyền ngược.",
        usecase: "Xây dựng mọi mô hình AI học sâu hiện đại.",
        code: "import torch\nx = torch.tensor([3.0], requires_grad=True)\ny = x**2; y.backward(); print(x.grad)",
        diagram: "Inputs ➔ Forward Pass ➔ Compute Loss ➔ loss.backward() ➔ optimizer.step()"
    },
    cnn: {
        id: "BÀI 13",
        color: "var(--c-deep)",
        title: "CNN - Mạng nơ-ron tích chập",
        definition: "Trích xuất đặc trưng hình ảnh bằng cách trượt quét bộ lọc tích chập Kernels.",
        usecase: "Phân loại ảnh, nhận diện vật thể trong máy tính tự lái.",
        code: "conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3)",
        diagram: "[Ảnh 28x28] ➔ [Bộ lọc 3x3 trượt] ➔ [Feature Map 26x26] ➔ [MaxPool]"
    },
    rnn: {
        id: "BÀI 14",
        color: "var(--c-deep)",
        title: "RNN & LSTM - Xử lý chuỗi tuần tự",
        definition: "Truyền trạng thái ẩn Hidden State để làm bộ nhớ quá khứ. LSTM bổ sung cổng nhớ.",
        usecase: "Xử lý văn bản, chuỗi thời gian, giá cổ phiếu.",
        code: "lstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=2)",
        diagram: "Từ (t-1) ➔ Hidden State (t-1) ──┐\n                               ├──➔ Hidden State (t)"
    },
    attention: {
        id: "BÀI 14",
        color: "var(--c-deep)",
        title: "Attention - Cơ chế tập trung",
        definition: "Tính toán ma trận tương tác chéo Q, K, V để gán trọng số tập trung vào thông tin quan trọng.",
        usecase: "Xử lý câu văn dài mà LSTM bị trôi ngữ cảnh.",
        code: "# Attention = Softmax(Q * K.T / sqrt(d_k)) * V",
        diagram: "Query x Key ➔ Softmax ➔ Trọng số chú ý ➔ Nhân với Value"
    },
    transformer: {
        id: "BÀI 15",
        color: "var(--c-deep)",
        title: "Transformer - Tự chú ý song song",
        definition: "Kiến trúc song song hóa 100% dựa trên Multi-Head Self-Attention và Positional Encoding.",
        usecase: "Nền tảng cốt lõi của mọi LLM (GPT, Claude, Gemini).",
        code: "encoder = nn.TransformerEncoderLayer(d_model=512, nhead=8)",
        diagram: "Tokens ➔ Positional Encoding ➔ Multi-Head Self-Attention ➔ FeedForward"
    },
    prompt: {
        id: "BÀI 16",
        color: "var(--c-llm)",
        title: "Prompt Engineering - Thiết kế câu lệnh",
        definition: "Dẫn dắt LLM bằng Zero-shot, Few-shot (ví dụ) và Chain-of-Thought (tư duy từng bước).",
        usecase: "Khai thác sức mạnh lập luận của LLM mà không cần train lại.",
        code: "prompt = 'Ví dụ: Táo->Trái cây. Hỏi: Sắt->? Hướng dẫn: Suy nghĩ từng bước.'",
        diagram: "System Prompt + Few-shot Samples + CoT ➔ LLM API ➔ Phản hồi chuẩn"
    },
    structured: {
        id: "BÀI 17",
        color: "var(--c-llm)",
        title: "Structured Output - Ép định dạng JSON",
        definition: "Ép LLM trả về đúng JSON Schema khai báo sẵn thông qua thư viện Pydantic.",
        usecase: "Kết nối dữ liệu phản hồi từ LLM trực tiếp vào backend.",
        code: "from pydantic import BaseModel, Field\nclass Output(BaseModel):\n    intent: str\n    urgency: int",
        diagram: "Text tự do ➔ LLM + Pydantic Schema ➔ JSON: { 'intent': 'Support', 'urgency': 5 }"
    },
    lora: {
        id: "BÀI 25",
        color: "var(--c-llm)",
        title: "PEFT LoRA - Tinh chỉnh mô hình nhẹ",
        definition: "Đóng băng trọng số gốc LLM, chỉ huấn luyện ma trận tích rank thấp bổ trợ.",
        usecase: "Fine-tune LLM trên GPU cá nhân/giới hạn.",
        code: "from peft import LoraConfig, get_peft_model\npeft_config = LoraConfig(r=8, lora_alpha=16)\nmodel = get_peft_model(base_model, peft_config)",
        diagram: "Input X ──┬──> Base Model W (Đóng băng 7B) ──┬──> Output\n          └──> LoRA Matrix A x B (Train 8MB) ┘"
    },
    embedding: {
        id: "BÀI 18",
        color: "var(--c-rag)",
        title: "Embeddings - Vector hóa ngữ nghĩa",
        definition: "Chuyển đổi văn bản thành vector số thực biểu diễn tọa độ ngữ nghĩa.",
        usecase: "So khớp khoảng cách Cosine giữa câu hỏi và tài liệu.",
        code: "vec = openai.Embedding.create(input='Học máy', model='text-embedding-3-small')",
        diagram: "'Vua' - 'Nam' + 'Nữ' ➔ Vector góc hẹp sát vector 'Hoàng Hậu'"
    },
    vectordb: {
        id: "BÀI 19",
        color: "var(--c-rag)",
        title: "Vector Database - Cơ sở dữ liệu Vector",
        definition: "CSDL chuyên dụng lập chỉ mục (HNSW) giúp truy vấn lân cận nhanh nhất.",
        usecase: "Lưu trữ và tìm kiếm tương đồng trên hàng triệu tài liệu RAG.",
        code: "import chromadb\nclient = chromadb.PersistentClient('./chroma')\ncollection = client.get_or_create_collection('docs')",
        diagram: "Vector câu hỏi ➔ Query HNSW Index ➔ Top K Chunks tương đồng"
    },
    chunking: {
        id: "BÀI 20",
        color: "var(--c-rag)",
        title: "Ingestion & Chunking - Tiền xử lý RAG",
        definition: "Cắt nhỏ văn bản dài thành các mảnh Chunks có khoảng đè chồng Overlap.",
        usecase: "Chuẩn bị dữ liệu PDF/Word tránh tràn context LLM.",
        code: "splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)",
        diagram: "Doc dài ➔ Chunk 1 [0-120] ➔ Overlap [100-120] ➔ Chunk 2 [100-220]"
    },
    advrag: {
        id: "BÀI 21",
        color: "var(--c-rag)",
        title: "Advanced RAG - Truy xuất nâng cao",
        definition: "Lọc nhanh Top 50 vector thô rồi dùng Cross-Encoder Re-ranker chọn Top 3.",
        usecase: "Khi kết quả tìm kiếm vector bị nhiễu thông tin.",
        code: "results = cohere_client.rerank(query=query, documents=chunks, top_n=3)",
        diagram: "Query ➔ Vector Search (50 chunks) ➔ Re-ranker ➔ 3 Chunks chuẩn ➔ LLM"
    },
    rageval: {
        id: "BÀI 22",
        color: "var(--c-rag)",
        title: "RAG Evaluation - Đánh giá RAG",
        definition: "Chấm điểm Ragas Triad: Faithfulness, Answer Relevance, Context Precision.",
        usecase: "Tự động hóa đo lường độ trung thực và ảo giác chatbot.",
        code: "from ragas import evaluate\nresults = evaluate(dataset, metrics=[faithfulness, answer_relevance])",
        diagram: "Faithfulness: Trả lời có dựa trên Context?\nRelevance: Trả lời có đúng trọng tâm Query?"
    },
    funcall: {
        id: "BÀI 23",
        color: "var(--c-ops)",
        title: "Function Calling - Gọi hàm ngoại vi",
        definition: "LLM trích xuất ý định và sinh tham số JSON để backend gọi API/DB.",
        usecase: "Kết nối LLM với thế giới bên ngoài (DB, API thời tiết, Email).",
        code: "tool_spec = {'name': 'check_order', 'parameters': {'order_id': 'string'}}\n# LLM output: tool_call('check_order', order_id='DH10')",
        diagram: "User: 'Đơn DH10 sao rồi?' ➔ LLM: call(check_order) ➔ API ➔ Result ➔ LLM trả lời"
    },
    agent: {
        id: "BÀI 24",
        color: "var(--c-ops)",
        title: "AI Agents - Tác nhân lập kế hoạch",
        definition: "Vòng lặp ReAct: Thought (suy nghĩ) ➔ Action (gọi tool) ➔ Observation (kết quả).",
        usecase: "Giải quyết bài toán phức tạp đòi hỏi nhiều bước xử lý.",
        code: "while not done:\n    thought = llm.think()\n    action = llm.act()\n    obs = execute(action)",
        diagram: "Thought ➔ Action ➔ Observation ──(Lặp phản hồi)──> Final Answer"
    },
    serve: {
        id: "BÀI 26",
        color: "var(--c-ops)",
        title: "Serve API & SSE - Streaming chữ",
        definition: "Tạo API bất đồng bộ với FastAPI và truyền phát token real-time qua SSE.",
        usecase: "Build app chat mượt mà như ChatGPT không bắt chờ lâu.",
        code: "async def sse_gen():\n    for token in ['Tôi ', 'là ', 'AI']:\n        yield f'data: {token}\\n\\n'\n# StreamingResponse(sse_gen(), media_type='text/event-stream')",
        diagram: "Server ➔ Stream Token 1 ➔ Stream Token 2 ➔ Client hiển thị chữ chạy"
    },
    docker: {
        id: "BÀI 27",
        color: "var(--c-ops)",
        title: "Docker & Cloud - Đóng gói container",
        definition: "Đóng gói mã nguồn, thư viện và OS base thành Docker Image chạy nhất quán.",
        usecase: "Triển khai ứng dụng AI lên môi trường cloud sản xuất.",
        code: "FROM python:3.10-slim\nWORKDIR /app\nCOPY . .\nCMD ['uvicorn', 'Project.app:app', '--host', '0.0.0.0', '--port', '8080']",
        diagram: "Code + Libs + OS ➔ Docker Build ➔ Run Container trên Cloud"
    },
    tracing: {
        id: "BÀI 28",
        color: "var(--c-ops)",
        title: "Tracing & Observability - Giám sát",
        definition: "Theo dõi chi tiết vết thời gian thực thi, prompt và token tiêu hao trên LangSmith.",
        usecase: "Debug chuỗi gọi LLM chạy chậm hoặc tính chi phí.",
        code: "os.environ['LANGCHAIN_TRACING_V2'] = 'true'\nos.environ['LANGCHAIN_API_KEY'] = 'lsv2_pt_xxx'",
        diagram: "User Call ➔ [RAG Pipeline] ➔ Trace Logs ➔ LangSmith Web UI"
    },
    langchain: {
        id: "BÀI 29",
        color: "var(--c-prod)",
        title: "LangChain & LangGraph - Framework AI",
        definition: "LangChain cung cấp cú pháp LCEL (|) để ghép chuỗi AI. LangGraph xây Agent dạng Đồ thị có hướng.",
        usecase: "Xây RAG chain phức tạp hoặc Agent có trạng thái lặp nhiều bước.",
        code: "chain = prompt | llm | StrOutputParser()\nresult = chain.invoke({'topic': 'Gradient Descent'})",
        diagram: "LCEL: Prompt | LLM | Parser\nLangGraph: [Node LLM] ─(Condition)─> [Node Tool] ➔ [END]"
    },
    memory: {
        id: "BÀI 30",
        color: "var(--c-prod)",
        title: "Multi-turn Memory - Bộ nhớ hội thoại",
        definition: "Quản lý lịch sử chat cho LLM phi trạng thái. Bộ nhớ ngắn hạn dùng RAM Buffer, dài hạn dùng Vector DB.",
        usecase: "Mọi ứng dụng chatbot cần nhớ lịch sử trò chuyện.",
        code: "chat_history.append(HumanMessage(content=user_input))\nresponse = llm.invoke(chat_history)",
        diagram: "Short-term: [System] + [History] + [User query] ➔ LLM\nLong-term: Query ➔ Vector Search hội thoại cũ ➔ Context"
    },
    security: {
        id: "BÀI 31",
        color: "var(--c-prod)",
        title: "AI Security & Guardrails - Bảo mật",
        definition: "Phòng chống Prompt Injection và triển khai Guardrails kiểm tra đầu vào/đầu ra.",
        usecase: "Bảo vệ chatbot không bị hack khi phục vụ người dùng thật.",
        code: "if any(p in user_input.lower() for p in ['ignore previous', 'jailbreak']):\n    return 'Yêu cầu bị từ chối'",
        diagram: "User Input ➔ Guardrail Check ➔ Chặn injection ➔ An toàn"
    },
    cost: {
        id: "BÀI 32",
        color: "var(--c-prod)",
        title: "Cost & Caching - Tối ưu chi phí",
        definition: "Semantic Caching lưu câu trả lời vào Vector DB và tái sử dụng khi câu hỏi tương đồng (Cosine > 0.95).",
        usecase: "Giảm 70-80% chi phí API khi app có nhiều người dùng.",
        code: "if cosine_similarity(query_vec, cached_vec) > 0.95:\n    return cached_answer  # Tiết kiệm tiền API!",
        diagram: "Query ➔ Semantic Cache Check ➔ (HIT > 0.95) ➔ Tra về ngay không tốn API"
    },
    testing: {
        id: "BÀI 33",
        color: "var(--c-prod)",
        title: "AI Testing & CI/CD - Kiểm thử tự động",
        definition: "Unit test prompt với LLM-as-a-Judge và tự động chạy test qua GitHub Actions.",
        usecase: "Đảm bảo chất lượng không giảm khi đổi model hoặc sửa prompt.",
        code: "def llm_judge(q, criteria, answer):\n    return json.loads(judge.invoke(prompt).content)",
        diagram: "Push Code ➔ GitHub Actions ➔ Pytest LLM-as-a-judge ➔ Pass/Fail"
    },
    multimodal: {
        id: "BÀI 34",
        color: "var(--c-prod)",
        title: "Multi-modal AI - Ảnh, Âm thanh",
        definition: "Vision LLM đọc hiểu hình ảnh (hóa đơn, biểu đồ) và Whisper chuyển giọng nói thành text.",
        usecase: "Đọc hóa đơn/hợp đồng scan, ghi chú cuộc họp tự động.",
        code: "msg = HumanMessage(content=[{'type':'image_url',...}, {'type':'text',...}])",
        diagram: "Ảnh ➔ Base64 ➔ Vision LLM ➔ JSON\nAudio .mp3 ➔ Whisper ➔ Text ➔ LLM tóm tắt"
    }
};

function openModal(conceptKey) {
    const data = lessonDetails[conceptKey];
    if (!data) return;

    const modal = document.getElementById("detail-modal");
    if (!modal) return;

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

    modal.style.display = "flex";
}

function closeModal(event) {
    const modal = document.getElementById("detail-modal");
    if (modal) modal.style.display = "none";
}

// Lắng nghe phím ESC để đóng modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
