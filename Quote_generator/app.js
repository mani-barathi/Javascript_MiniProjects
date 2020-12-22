const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authuorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuoteBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader')
const count=10;
// get quote from API
async function getQuote(count){
    // console.log(count)
    showLoadingSpinner()
    // we need a proxy 
    const proxyUrl='https://cors-anywhere.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        // await make sure's to wait until we get a response
        const response=await fetch(proxyUrl+apiUrl);
        const data=await response.json();
        if (data.quoteAuthor===''){ // if author is empty
            data.quoteAuthor='Unknown';
        }
        if (data.quoteText.length > 50){
            quoteText.classList.add('long-quote')
        }
        authuorText.innerText=data.quoteAuthor
        quoteText.innerText=data.quoteText
        // Stop loader ,show quote
        removeLoadingSpinner()
    } catch (error) {
        if (count>0){
            count--;
            // console.log(count)
            getQuote(count);
        }
        else{
            alert('Something went Wrong try reloading the page!')
        }
        
    }
}

// tweet a quote
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=authuorText.innerText;
    const twitter_url=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitter_url,'_blank')
}

function showLoadingSpinner(){
    // hidden is attribute to all HTml elements
    loader.hidden=false
    quoteContainer.hidden=true
}

function removeLoadingSpinner(){
    if (!loader.hidden) {
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// adding eventListener for buttons
newQuoteBtn.addEventListener('click',function(){
    getQuote(count)
})
twitterBtn.addEventListener('click',tweetQuote)

getQuote(count);
