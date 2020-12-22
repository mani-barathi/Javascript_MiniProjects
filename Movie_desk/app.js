// HTML elemnets
const searchBtn = document.getElementById('search-btn');
const searchBox = document.getElementById('search-box');
const notFound = document.getElementById('not-found');
const resultContainer = document.getElementById('result-container');
const loading = document.getElementById('loading');

// Global variables
let movieID='';
let movieTitle = '';
let data;
let API_URL='';
let entireContainer;

// API info
const API_KEY = '59d94fec';
const proxyUrl='https://cors-anywhere.herokuapp.com/';

function createBoldTag(text){
    let boldTag = document.createElement('b')
    boldTag.classList.add('key');
    let boldTagText = document.createTextNode(`${text} : `);
    boldTag.appendChild(boldTagText);
    return boldTag;
}

function createPTag(text,boldTag){
    let pTag = document.createElement('p');
    let pTagText = document.createTextNode(text);
    pTag.appendChild(boldTag);
    pTag.appendChild(pTagText);
    return pTag;
}

function createDiv(classNames){
    let divName = document.createElement('div');
    divName.classList.add(classNames);
    return divName;
}

function createDisplayResult(){
    entireContainer = document.createElement('div');
    // Title bar 
    titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');
    
    h1 = document.createElement('h1');
    h1.textContent = data.Title;
    titleBar.appendChild(h1);

    ratingCard = createDiv('rating-card');
    
    starIcon = document.createElement('i')
    starIcon.classList.add('fas');
    starIcon.classList.add('fa-star');
    ratingCard.appendChild(starIcon);

    right = createDiv('rigth');
    imdbRating = document.createElement('span');
    imdbRating.classList.add('imdb-rating');
    imdbRating.textContent = data.imdbRating;
    imdbVotes = document.createElement('p');
    imdbVotes.classList.add('imdb-votes');
    let node = document.createTextNode(data.imdbVotes);
    imdbVotes.appendChild(node);
    right.appendChild(imdbRating);
    right.appendChild(imdbVotes);
    ratingCard.appendChild(right);
    titleBar.appendChild(ratingCard);

    // infoContainer
    let infoContainer = createDiv('info-container');
    // imageContainer
    let imageContainer = createDiv('image-container');
    let image = document.createElement('img')
    image.src = data.Poster;
    imageContainer.appendChild(image);
    infoContainer.appendChild(imageContainer);

    // textContainer
    let textContainer = createDiv('text-container');
    let myList = ['Actors','Awards','Director','Genre','Production','Writer','Released','Runtime'];
    // adding seasons and year if it is a series
    if(data.Type=='series'){
        myList.push('totalSeasons');
        myList.push('Year');
    }

    for (let key in myList){    
        let boldTag = createBoldTag(myList[key]);
        let pTag = createPTag(data[myList[key]],boldTag);
        textContainer.appendChild(pTag);
    }
    
    infoContainer.appendChild(textContainer);    

    // plotContainer
    let plotContainer = createDiv('plot-container');
    let boldTag = createBoldTag('Plot');
    let plot = createPTag(data.Plot,boldTag);
    plotContainer.appendChild(plot);

    //  adding all containers to entireContainer
    entireContainer.appendChild(titleBar);
    entireContainer.appendChild(infoContainer);
    entireContainer.appendChild(plotContainer);
    // adding entireContainer to resultContainer
    resultContainer.appendChild(entireContainer);    
}

async function getData(){
    try{
        const response = await fetch(API_URL);
        data = await response.json();
        if (data.Response==="True"){
            console.log(data);
            createDisplayResult();
            loading.style.display = 'none';
            notFound.style.display = 'none';
        }
        else{
            console.log("notfound",notFound);
            notFound.style.display = 'initial';
            loading.style.display = 'none';
        }   
    }
    catch(error){
        console.log(error);
    }
}

function searchBtnHandler(event){
    event.preventDefault();
    movieTitle = searchBox.value.replace(/ /g,'+');     // / /g represents all of the whitespaces
    if (movieTitle){
        API_URL = `https://www.omdbapi.com/?t=${movieTitle}&plot=full&apikey=${API_KEY}`;
        // resultContainer.children returns all of the children list of the element
        if(resultContainer.children.length === 1){
            entireContainer.remove();       // removes the entire container from DOM 
        }
        notFound.style.display = 'none';
        loading.style.display = 'initial';
        getData();
    }
}

// Event listners
searchBtn.addEventListener('click',searchBtnHandler);