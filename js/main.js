
function addEmptyRow() {
    let tableBody = document.getElementById("outputTable");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" /></td>
        <td><input type="text" /></td>
        <td><input type="text" /></td>
        <td><input type="text" class="tsQT" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
        <td><input type="text" class="qt" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
        <td><input type="text" class="ck" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
        <td><input type="text" class="grade10" readonly /></td>
        <td><input type="text" class="letterGrade" readonly /></td>
        <td><input type="text" class="grade4" readonly /></td>
        <td class="delete-row" onclick="deleteRow(this)">❌</td>
    `;
    tableBody.appendChild(row);
}

function deleteRow(element) {
    element.parentElement.remove();
    updateTotals();
}

function calculateGrade10(qt, ck, tsQT) {
    return (qt * tsQT + ck * (1 - tsQT)).toFixed(2);
}

function convertToLetterGrade(score) {
    if (score < 4) return "F";
    if (score < 5) return "D";
    if (score < 5.5) return "D+";
    if (score < 6.5) return "C";
    if (score < 7) return "C+";
    if (score < 8) return "B";
    if (score < 8.5) return "B+";
    if (score < 9.5) return "A";
    return "A+";
}

function convertTo4Scale(grade) {
    const mapping = { "F": 0, "D": 1, "D+": 1.5, "C": 2, "C+": 2.5, "B": 3, "B+": 3.5, "A": 4, "A+": 4 };
    return mapping[grade] || "";
}

function updateComputedFields(row) {
    let tsQT = parseFloat(row.querySelector(".tsQT").value) || 0;
    let qt = parseFloat(row.querySelector(".qt").value) || 0;
    let ck = parseFloat(row.querySelector(".ck").value) || 0;

    let grade10 = calculateGrade10(qt, ck, tsQT);
    let letterGrade = convertToLetterGrade(grade10);
    let grade4 = convertTo4Scale(letterGrade);

    row.querySelector(".grade10").value = grade10;
    row.querySelector(".letterGrade").value = letterGrade;
    row.querySelector(".grade4").value = grade4;

    updateTotals();
}

function updateTotals() {
    let totalCredits = 0;
    let totalWeighted = 0;
    let rows = document.querySelectorAll("#outputTable tr");

    rows.forEach(row => {
        let credits = parseFloat(row.children[2].children[0].value) || 0;
        let grade4 = parseFloat(row.children[8].children[0].value) || 0;

        totalCredits += credits;
        totalWeighted += credits * grade4;
    });

    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("gpa").textContent = (totalWeighted / totalCredits).toFixed(2);
}

function processData() {
    let input = document.getElementById("inputData").value;
    let lines = input.split("\n"); // Tách từng dòng
    let tableBody = document.getElementById("outputTable");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ

    lines.forEach(line => {
        let parts = line.split("\t"); // Tách theo tab
        if (parts.length >= 6) { // Đảm bảo có đủ dữ liệu
            let code = parts[0].trim();
            let name = parts[1].trim();
            let credits = parts[4].trim();

            if (credits !== "0") { // Bỏ qua các môn có số tín chỉ = 0
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td><input type="text" value="${code}" /></td>
                    <td><input type="text" value="${name}" /></td>
                    <td><input type="text" value="${credits}" /></td>
                    <td><input type="text" class="tsQT" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
                    <td><input type="text" class="qt" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
                    <td><input type="text" class="ck" oninput="updateComputedFields(this.parentElement.parentElement)" /></td>
                    <td><input type="text" class="grade10" readonly /></td>
                    <td><input type="text" class="letterGrade" readonly /></td>
                    <td><input type="text" class="grade4" readonly /></td>
                     <td class="delete-row" onclick="deleteRow(this)">❌</td>
                `;
                tableBody.appendChild(row);
            }
        }
    });
    updateTotals();
}
