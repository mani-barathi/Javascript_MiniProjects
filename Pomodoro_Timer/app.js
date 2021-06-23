const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const infoEl = document.querySelector(".info");
const form = document.querySelector("form");
const audioEl = document.querySelector("audio");

const SECOND = 1000; // in milliseconds
const MINUTE = SECOND * 60; // in milliseconds

let timer;
let endTime;
let isRunning = false;
let totalMinutes = 25;

function toggleElements(show) {
  form.style.display = show ? "block" : "none";
  startBtn.style.display = show ? "initial" : "none";
  stopBtn.style.display = !show ? "initial" : "none";
}

function startSession() {
  if (isRunning) return;

  // endTime = currentTime + 25 minutes
  endTime = new Date().getTime() + totalMinutes * 60000;

  timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    const isOver = distance <= 0;

    if (isOver) {
      clearInterval(timer);
      audioEl.play();
      infoEl.textContent = "Session Completed";
      isRunning = false;
      sendNotification();
      toggleElements(true);
    } else {
      minutesEl.textContent = Math.floor(distance / MINUTE);
      secondsEl.textContent = Math.floor((distance % MINUTE) / SECOND);
    }
  }, 1000);

  isRunning = true;
  minutesEl.textContent = `${totalMinutes - 1}`;
  secondsEl.textContent = "59";
  infoEl.textContent = "Session Going On";
  toggleElements(false);
}

function stopSession() {
  clearInterval(timer);
  infoEl.textContent = "Session Stopped";
  isRunning = false;
  minutesEl.textContent = totalMinutes;
  secondsEl.textContent = "00";
  toggleElements(true);
}

function getNotificationPermission() {
  if (!("Notification" in window))
    return alert("This browser does not support desktop notification");

  if (Notification.permission != "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted")
        console.log("Notification Permission Granted!!");
      else
        alert(
          `You won't receive any notification because Notification permission is blocked`
        );
    });
  }
}

function sendNotification() {
  if (Notification.permission != "granted") return getNotificationPermission();

  const options = {
    body: `${totalMinutes} Mins Over !!`,
    icon: "https://i.pinimg.com/originals/a5/95/e3/a595e3c1eff99723d4bb1c328c848c63.png",
  };

  const notification = new Notification("Time Up", options);
  notification.onclick = () => window.focus();
}

function handleFormSubmit(e) {
  e.preventDefault();
  totalMinutes = form.duration.value;
  console.log(`Duration changed to ${totalMinutes}`);
  minutesEl.textContent = totalMinutes;
}

// Initial Setup
startBtn.addEventListener("click", startSession);
stopBtn.addEventListener("click", stopSession);
form.addEventListener("submit", handleFormSubmit);
getNotificationPermission();

// To prevent user closing the tab when the timer is running
window.addEventListener("beforeunload", (event) => {
  if (isRunning) {
    event.preventDefault();
    event.returnValue = "You have unfinished changes!";
  }
});
