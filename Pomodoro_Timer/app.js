const startBtn = document.querySelector('.start-btn')
const minutesEl = document.querySelector('.minutes')
const secondsEl = document.querySelector('.seconds')
const infoEl = document.querySelector('.info')
const form = document.querySelector('form')

const SECOND = 1000             // in milliseconds
const MINUTE = SECOND * 60      // in milliseconds

let timer
let endTime
let isRunning = false
let totalMinutes = 25

function startSession() {
    if (isRunning)
        return

    // endTime = currentTime + 25 minutes
    endTime = new Date().getTime() + (totalMinutes * 60000)

    timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = endTime - now
        const isOver = ((distance <= 0))

        if (isOver) {
            clearInterval(timer)
            infoEl.textContent = 'Session Completed'
            isRunning = false
            sendNotification()
        } else {
            minutesEl.textContent = Math.floor((distance / MINUTE))
            secondsEl.textContent = Math.floor((distance % MINUTE) / SECOND)
        }

    }, 1000)

    isRunning = true
    minutesEl.textContent = `${totalMinutes - 1}`
    secondsEl.textContent = '59'
    infoEl.textContent = 'Session Going On'
}


function getNotificationPermission() {
    if (!("Notification" in window))
        return alert("This browser does not support desktop notification")

    if (Notification.permission != "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted")
                console.log('Notification Permission Granted!!')
            else
                alert(`You won't receive any notification because Notification permission is blocked`)
        })
    }
}

function sendNotification() {
    if (Notification.permission != "granted")
        return getNotificationPermission()

    const options = {
        body: `${totalMinutes} Mins Over !!`,
        icon: 'https://i.pinimg.com/originals/a5/95/e3/a595e3c1eff99723d4bb1c328c848c63.png',
    }

    const notification = new Notification('Time Up', options)
    notification.onclick = () => window.focus()
}

function handleFormSubmit(e) {
    e.preventDefault()
    if (isRunning) return

    totalMinutes = form.duration.value
    console.log(`Duration changed to ${totalMinutes}`)
    minutesEl.textContent = totalMinutes
}

// Initial Setup
minutesEl.textContent = totalMinutes
startBtn.addEventListener('click', startSession)
form.addEventListener('submit', handleFormSubmit)
getNotificationPermission()