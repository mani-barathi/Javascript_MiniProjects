const MOVES = ["R", "R'", "L", "L'", "U", "U'",
    "D", "D'", "F", "F'", "B", "B'",
    "R2", "L2", "D2", "U2", "F2", "B2"]

const LENGTH = 20

const LETTER_PAIRS = {
    'R': ["R", "R'", "R2"],
    'L': ["L", "L'", "L2"],
    'U': ["U", "U'", "U2"],
    'D': ["D", "D'", "D2"],
    'F': ["F", "F'", "F2"],
    'B': ["B", "B'", "B2"],
    '#': []
}
// ----------------------------------------------------------------------------------
// Global Variables
// SELECTING ELEMENT
let minutes = document.querySelector(".min")
let second = document.querySelector(".sec")
let colon = document.querySelector(".colon")
let scrambleText = document.querySelector(".scramble-text") 
let averages = document.querySelector(".average") 
let best = document.querySelector(".best") 

let isRunning = false
const solves = []

let average 
let count = 0
let timer,startTime,endTime
let bestSolve = 100000000000000

// -----------------------------------------------------------------
function clearReset(){
  minutes.innerText = ''
  second.innerText = '0'
} 

function getRandomLetter() {
  return MOVES[Math.floor(Math.random() * MOVES.length)]
}

// FUNCTION TO GENERATE SCRAMBLE
function getScramble(){
  let scramble = ''
    let previousLetter = '#'

    for (let i = 0; i <= LENGTH; i++) {
        let currentLetter = getRandomLetter()
        let isSameLetter = LETTER_PAIRS[previousLetter[0]].includes(currentLetter)

        while (isSameLetter) {
            currentLetter = getRandomLetter()
            isSameLetter = LETTER_PAIRS[previousLetter[0]].includes(currentLetter)
        }

        previousLetter = currentLetter
        scramble += currentLetter
    }
    return scramble
}


document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    isRunning = !isRunning
  
    if(isRunning){
      clearReset()
      startTime = new Date().getTime()
      timer = setInterval(startTimer,1000)
    }
    else{
      clearInterval(timer)
      endTime = new Date().getTime()
      const difference = endTime - startTime
      const duration = difference/1000
  
      const minutes = Math.floor(duration / 60)
      const seconds = duration % 60
      minutes.innerHTML = minutes
      second.innerHTML = seconds
  
      if(minutes > 1)
        colon.style.display = "inline"
        
      solves.push(seconds + (minutes * 60))
      scrambleText.textContent = getScramble()
      count++
      calculateAverage()
    }  

  }
  })
  
function startTimer(){
    let sec = parseInt(  second.innerHTML)
    if(sec === 59){
        sec = 0
        colon.style.display = "inline"
        let min = parseInt( minutes.innerHTML)
        if(isNaN(min)){
          min = 0;
        } 
        min = min + 1
        minutes.innerHTML = min
        second.innerHTML = sec
      }
  else{
        sec = sec + 1
        second.innerHTML = sec
    }
}

function getAverage(arr){
  let sum = 0,average 
  for(let num of arr)
    sum = sum + num

  average = sum/arr.length    
  return average
}

// TO Calclulate average
function calculateAverage(){
  if(count < 5) return

  const recentFiveSolves = solves.slice(count-5,count)
  recentFiveSolves.sort(function(a, b){return a-b})

  const min = recentFiveSolves.shift()
  const max = recentFiveSolves.pop()

  if(min < bestSolve)
    bestSolve = min.toFixed(2)

  let average = getAverage(recentFiveSolves)
  average = average.toFixed(2)

  averages.textContent = `AVEREAGE : ${average}`
  best.textContent = `BEST : ${bestSolve}`
}

//  StartUp
scrambleText.textContent = getScramble()
