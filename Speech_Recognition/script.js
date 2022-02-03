const textContainer = document.querySelector(".texts");
const btn = document.querySelector(".btn");
const processingText = document.querySelector(".processing");
let listenting = false;
let recognition;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (typeof SpeechRecognition == undefined) {
  textContainer.innerText = "Your Browser Doesn't Speech Recognition!";
} else {
  btn.disabled = false;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const last = e.results.length - 1;
    // console.log(e.results);
    const res = e.results[last];
    const transcript = e.results[last][0].transcript;
    processingText.textContent = `You said: ${transcript}`;
    if (res.isFinal) {
      const p = document.createElement("p");
      p.textContent = `You said: ${transcript}`;
      textContainer.appendChild(p);
      speechSynthesis.speak(new SpeechSynthesisUtterance(transcript));
      processingText.textContent = "";
    }
  });
}

btn.addEventListener("click", () => {
  if (!listenting) {
    recognition.start();
    btn.textContent = "Stop";
    textContainer.innerHTML += "<p>Started Listening...</p>";
  } else {
    recognition.stop();
    btn.textContent = "Start";
    textContainer.innerHTML += "<p>Stoped Listening.</p>";
  }
  listenting = !listenting;
});
