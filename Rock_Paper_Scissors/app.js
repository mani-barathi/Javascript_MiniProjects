const startBtnElm = document.querySelector('#play-btn')
const intoDivElm = document.querySelector('.intro')
const matchDivElm = document.querySelector('.match')
const userControlBtns = document.querySelectorAll('#user-control-btn')
const playerScoreCount = document.querySelector('.count-player')
const computerScoreCount = document.querySelector('.count-computer')
const handElm = document.querySelector('.hands')
const playerHandImgElm = document.querySelector('.player-hand')
const computerHandImgElm = document.querySelector('.computer-hand')
let userScore = 0, computerScore = 0, result
const reportElm = document.querySelector('.report')


const displayResult = () => {
    playerScoreCount.textContent = userScore;
    computerScoreCount.textContent = computerScore;
    reportElm.textContent = result;
}

const toggleFadeOut = (fadeOutElm, fadeInElm) => {
    fadeOutElm.classList.add('fade-out')
    setTimeout(() => {
        fadeOutElm.style.display = 'none'
        fadeInElm.classList.remove('fade-out')
    }, 500)
}


const checkwin = (playerInput, systemInput) => {
    // console.log(playerInput, systemInput)
    switch (playerInput + systemInput) {
        case 'rs':
        case 'sp':
        case 'pr':
            userScore++
            result = `User Win's`
            // console.log('user Wins')
            break
        case 'sr':
        case 'ps':
        case 'rp':
            computerScore++
            result = `Computer Win's`
            // console.log('user lost')
            break
        case 'rr':
        case 'pp':
        case 'ss':
            result = `It's a Tie.`
            // console.log('draw.')
            break
    }
}

const getComputerInput = () => {
    let arr = ['rock', 'paper', 'scissors']
    return arr[Math.floor(Math.random() * 3)]
}

let isHandShake = false
const startGame = (event) => {
    if (isHandShake) return

    const target = event.target
    // console.log(target.dataset.src)
    let userInput = target.dataset.src.slice(0, 1)
    let systemInput = getComputerInput()
    checkwin(userInput, systemInput.slice(0, 1))
    isHandShake = true

    handElm.classList.add('shake')
    setTimeout(() => {
        isHandShake = false
        handElm.classList.remove('shake')
        playerHandImgElm.src = `./assets/${target.dataset.src}`
        computerHandImgElm.src = `./assets/${systemInput}.png`
        displayResult()
    }, 1300)



}


startBtnElm.addEventListener('click', () =>
    toggleFadeOut(intoDivElm, matchDivElm), { once: true })

userControlBtns.forEach(userControlBtn => {
    userControlBtn.addEventListener('click', startGame)
})
