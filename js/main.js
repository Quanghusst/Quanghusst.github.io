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

function copyToClipboard() {
    const outputText = document.getElementById('output').textContent;
    const copyBtn = document.getElementById('copyBtn');
    const textarea = document.createElement('textarea');
    textarea.value = outputText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Thay đổi trạng thái của nút sau khi sao chép
    copyBtn.textContent = "Copied";
    copyBtn.classList.add("copied");

    // Đặt lại nút về trạng thái ban đầu sau 2 giây
    setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
    }, 2000);
}
