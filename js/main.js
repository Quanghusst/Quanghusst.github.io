function processInput() {
    const userInput = document.getElementById('userInput').value;
    const dataArray = userInput.split(',').map(item => item.trim());
    const jsCode = `const dataArray = ${JSON.stringify(dataArray)}; 
const inputBox = document.querySelector('#ctl00_ctl00_ASPxSplitter1_Content_ContentSplitter_MainContent_ASPxCallbackPanel1_tbDirectClassRegister_I'); 
const submitButton = document.querySelector('#ctl00_ctl00_ASPxSplitter1_Content_ContentSplitter_MainContent_ASPxCallbackPanel1_btDirectClassRegister'); 
// const statusString = document.querySelector('#ctl00_ctl00_ASPxSplitter1_Content_ContentSplitter_MainContent_ASPxCallbackPanel1_lbKQ'); 
let currentIndex = 0;
function autoFillAndClick() {
    if (currentIndex < dataArray.length) {            
        inputBox.value = dataArray[currentIndex];
        submitButton.click();            
        console.log(\`Submitted: \${dataArray[currentIndex]}\`);
        currentIndex++;
        // console.log(statusString.innerText);
        setTimeout(autoFillAndClick, 2000);
    } else {
        console.log("All strings have been submitted.");
    }
}
autoFillAndClick();`;
    document.getElementById('output').textContent = jsCode;
    document.getElementById('codeContainer').style.display = 'block';
    Prism.highlightAll()
}
// Lắng nghe sự kiện click cho tất cả các nút có lớp "copy-btn"
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Lấy ID của phần tử cần sao chép từ thuộc tính data-copy-target
        const targetId = this.getAttribute('data-copy-target');
        const textToCopy = document.getElementById(targetId).textContent; // Lấy nội dung phần tử cần sao chép

        // Sử dụng Clipboard API để sao chép
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Thay đổi trạng thái của nút sau khi sao chép
            this.textContent = "Copied"; // Thay đổi văn bản của nút thành "Copied"
            this.classList.add("copied"); // Thêm class "copied" để thay đổi giao diện của nút

            // Đặt lại nút về trạng thái ban đầu sau 2 giây
            setTimeout(() => {
                this.textContent = "Copy"; // Đặt lại văn bản của nút thành "Copy"
                this.classList.remove("copied"); // Xóa class "copied"
            }, 2000);
        }).catch(err => {
            console.error("Unable to copy text: ", err); // Nếu có lỗi xảy ra, in lỗi ra console
        });
    });
});
