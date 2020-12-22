let count = 5;  // initial count is set low to reduce time and data which is about to be downloaded.
const apiKey='CW6mm5Yjr1W25Ks5asIvTY02kAYHWv2iiTonfKkTBYc'
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imgContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
              
let ready=false;    // to check whether the entire list photos are being loaded
let imagesLoaded=0; 
let totalImages=0;
let photoArr=[];

// just to check if all the images are downloaded 
function image_Loaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
        apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}
// to set all the attributes // just to keep the code DRY
function set_attributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// create html elemnts and attach them to our Page
function displayImages(photoArr){
    imagesLoaded=0;
    totalImages=photoArr.length;
    photoArr.forEach((photo) =>{
        // create a tag
        const _a=document.createElement('a');
        set_attributes(_a,{
            href:photo.links.html , 
            target:'_blank',
        });
        // create img tag
        const _img=document.createElement('img');
        set_attributes(_img,{
             src:photo.urls.regular ,
             alt:photo.alt_description, 
             title:photo.alt_description,
            });
        // Eventlistener ,call image_Loaded everytime when image gets loaded to check if all the images are got loaded
        _img.addEventListener('load',image_Loaded);
        // put img inside a 
        _a.appendChild(_img);
        // attach the a to the image container
        imgContainer.appendChild(_a)
    });
}

async function getImages(){
    try{
        const responce=await fetch(apiUrl);
        photoArr=await responce.json();
        displayImages(photoArr);
    }
    catch(error){
        console.log("Something just went wrong !")
    }
}

//event listener
// window > document > body
// window.innerHeight - returns the inner height of browser in pixels
// window.scrollY - returns the number of pixels that the document is currently scrolled vertically.
// documnet.body.offsetHeight - returns the how long the entite page is loaded 

window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false
        getImages();
    }
});



// invoking functions for the first time
getImages();