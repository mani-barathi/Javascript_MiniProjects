const copyBtn = document.querySelector('.copy-btn')
const generateBtn = document.querySelector('.generate-btn')
const inputField = document.querySelector('.input')
const passwordForm = document.querySelector('form')
const snackbar = document.querySelector('.snackbar')

// Generate Characters Array based on ASCII values 
function generateCharacters(low, high) {
    let characters = []
    for (let i = low; i <= high; i++)
        characters.push(String.fromCharCode(i))
    return characters
}

// get a randomCharacter from passed charaters Array
function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
}

const UPPER_CASE = generateCharacters(65, 90)
const LOWER_CASE = generateCharacters(97, 122)
const NUMBERS = generateCharacters(48, 57)
const SYMBOLS = generateCharacters(33, 47)

function shuffleArray(arr) {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}

function generatePassword(event) {
    event.preventDefault()
    let password = []
    let allPossibleCharacters = []
    let length = passwordForm.length.value

    if (passwordForm.lowercase.checked) {
        password.push(getRandomCharacter(LOWER_CASE))
        allPossibleCharacters = [...allPossibleCharacters, ...LOWER_CASE]
        --length
    }
    if (passwordForm.uppercase.checked) {
        password.push(getRandomCharacter(UPPER_CASE))
        allPossibleCharacters = [...allPossibleCharacters, ...UPPER_CASE]
        --length
    }
    if (passwordForm.numbers.checked) {
        password.push(getRandomCharacter(NUMBERS))
        allPossibleCharacters = [...allPossibleCharacters, ...NUMBERS]
        --length
    }
    if (passwordForm.symbols.checked) {
        password.push(getRandomCharacter(SYMBOLS))
        allPossibleCharacters = [...allPossibleCharacters, ...SYMBOLS]
        --length
    }

    for (let i = 1; i <= length; i++)
        password.push(getRandomCharacter(allPossibleCharacters))

    password = shuffleArray(password)
    password = password.join('')
    inputField.value = password
}


function copyPasswordToClipBoard(event) {
    event.preventDefault()
    const password = inputField.value
    if (!password) return

    navigator.clipboard.writeText(password).then(() => {
        snackbar.classList.add('snackbar-active')
        setTimeout(() => {
            snackbar.classList.remove('snackbar-active')
        }, 2000)
    })
}


generateBtn.addEventListener('click', generatePassword)
copyBtn.addEventListener('click', copyPasswordToClipBoard)