const titleEl = document.querySelector('.header__title')
const editorEl = document.querySelector('.editor')
const clearBtn = document.querySelector('.header__btnClear')
const saveBtn = document.querySelector('.header__btnSave')
const downloadBtn = document.querySelector('.header__btnDownload')
const popupEl = document.querySelector('.popup')

const TEXT_KEY = 'text'


function clearText() {
    const content = editorEl.value
    if (content) {
        let choice = confirm(`Do you want to clear everything?`)
        if (choice) {
            editorEl.value = ''
            titleEl.innerText = 'newFile'
            saveText()
        }
    }
}

function saveText() {
    let title = titleEl.innerText || 'newFile'
    let content = editorEl.value
    if (!content)
        title = ''
    localStorage.setItem(TEXT_KEY, JSON.stringify({ title: title, content: content }))
    console.log('saved in localStorage!!!')
    showSavedPopup()
}

function downloadFile() {
    const title = titleEl.innerText || 'newFile'
    const content = editorEl.value
    const filename = `${title}.txt`
    if (content) {
        const blob = new Blob([content], {
            type: "text/plain;charset=uft-8"
        })
        saveAs(blob, filename)              //saveAs() is comming from FileSaver.min.js
    }
    else {
        alert('Unable to Download...Content of file is Empty!')
    }
}

function loadPreviousText() {
    const data = JSON.parse(localStorage.getItem(TEXT_KEY))
    if (data) {
        titleEl.innerText = data.title || 'newFile'
        editorEl.value = data.content || ''
    }
}

function showSavedPopup() {
    popupEl.classList.add('show-popup')
    setTimeout(() => {
        popupEl.classList.remove('show-popup')
    }, 2000)
}

//  ON start UP
loadPreviousText()
editorEl.focus()
downloadBtn.addEventListener('click', downloadFile)
saveBtn.addEventListener('click', saveText)
clearBtn.addEventListener('click', clearText)


editorEl.addEventListener('keydown', (e) => {
    //check if the key presed is 'tab' key
    if (e.keyCode == 9) {
        // insert a Tab Space at the current Cursor position
        document.execCommand('insertHTML', false, '&#009');
        e.preventDefault()
    }
});