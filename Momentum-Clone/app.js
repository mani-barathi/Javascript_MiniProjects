const appContainer = document.querySelector('.app-container');
const backGroundCover = document.querySelector('.background-cover');

const textContainer = document.querySelector('.text-container');
const clockText = document.querySelector('.clock');
const nameText = document.querySelector('.name');
const greetingText = document.querySelector('.greeting');

const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author-name');
const bgImageLink = document.querySelector('.bg-info-link');

const inputModal = document.querySelector('.input-model');
const nameForm = document.querySelector('.name-form');
const nameInputField = document.querySelector('.name-input');

const unsplashImgURL = `https://unsplash.com/photos/`;

let name = '';

function runClock() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours >= 5 && hours < 12)
        greetingText.textContent = 'Good morning, ';
    else if (hours >= 12 && hours < 17)
        greetingText.textContent = 'Good afternoon, ';
    else if (hours >= 17 && hours < 22)
        greetingText.textContent = 'Good evening, ';
    else
        greetingText.textContent = 'Good night, ';

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    clockText.textContent = `${hours}:${minutes} `;
}

function getTimeDifference(currentTime, retrivedTime) {
    let diffMilliseconds = currentTime.getTime() - retrivedTime.getTime();
    let diffSeconds = Math.abs(diffMilliseconds / 1000);
    let diffMinutes = Math.ceil(diffSeconds / 60);
    return (diffMinutes > 10) ? true : false;
}

async function getWallpaper() {
    const API_KEY = 'UoPu98cybYaHnihiXHK5HuOocdgjLVgyqkJdgBhvd1E';
    const count = 1;
    const query = 'wallpapers';
    const URL2 = `https://api.unsplash.com/photos/random/?orientation=landscape&count=${count}&client_id=${API_KEY}&query=${query}`;
    let response = await fetch(URL2);
    response = await response.json();

    let imageUrl = response[0].urls.regular;
    let city = (response[0].location.city) ? response[0].location.city : '';
    let country = (response[0].location.country) ? response[0].location.country : '';

    localStorage.setItem('image-url', imageUrl);
    localStorage.setItem('image-id', response[0].id);
    localStorage.setItem('place', `${city} ${country}`);

    appContainer.style.backgroundImage = `url(${imageUrl}) `;
    bgImageLink.href = `${unsplashImgURL}${response[0].id}`;
    bgImageLink.textContent = `${city} ${country}`;

    let tempImg = document.createElement('img');
    tempImg.src = imageUrl;
    tempImg.addEventListener('load', () => {
        backGroundCover.classList.add('fade-in');
        console.log('imageloaded');
    });
}

async function getQuote() {
    const URL = `https://type.fit/api/quotes`
    let response = await fetch(URL);
    let data = await response.json()
    let index = Math.floor(Math.random() * data.length);
    let author = `${(data[index].author) ? data[index].author : "unknown"}`

    localStorage.setItem('quote', data[index].text);
    localStorage.setItem('author', author);

    quoteText.textContent = `"${data[index].text}"`;
    authorText.textContent = author;
}

function startingPoint() {
    name = localStorage.getItem('name');

    // If User already Exists
    if (name) {
        let currentTime = new Date();
        let retrivedTime = new Date(localStorage.getItem('date'));

        // checking whether current date is different from the date fetched from local storage
        if (getTimeDifference(currentTime, retrivedTime)) {
            console.log("not the same day");
            getWallpaper();
            getQuote();
            localStorage.setItem('date', currentTime);
        }
        else {
            let imageUrl = localStorage.getItem('image-url');
            appContainer.style.backgroundImage = `url(${imageUrl})`;
            console.log('image url given');

            quoteText.textContent = `"${localStorage.getItem('quote')}"`;
            authorText.textContent = `${localStorage.getItem('author')}`;

            bgImageLink.href = `${unsplashImgURL}${localStorage.getItem('image-id')}`
            let place = (localStorage.getItem('place')) ? localStorage.getItem('place') : "";
            bgImageLink.textContent = `${place}`;

            let tempImg = document.createElement('img');
            tempImg.src = imageUrl;
            tempImg.addEventListener('load', () => {
                backGroundCover.classList.add('fade-in');
                console.log('imageloaded');
            });
        }
        nameText.textContent = name + '.';
        textContainer.style.display = 'block';

    } else {   // If User Does'nt Exists
        inputModal.style.display = 'flex';
        document.body.classList.add('bg-gradient');
        backGroundCover.classList.add('fade-in');

        nameForm.addEventListener('submit', (event) => {
            event.preventDefault();

            name = nameInputField.value;
            localStorage.setItem('name', name);
            localStorage.setItem('date', new Date());

            getWallpaper();
            getQuote();

            backGroundCover.classList.remove('fade-in');
            nameText.textContent = name + '.';
            textContainer.style.display = 'block';
            inputModal.style.display = 'none';
        });
    }


    runClock();                     // starting the clock
    setInterval(runClock, 1000);
}


document.addEventListener('DOMContentLoaded', startingPoint());