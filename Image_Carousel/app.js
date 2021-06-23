const carouselImages = document.querySelectorAll(".carousel__image");
const carouselDots = document.querySelectorAll(".carousel__dot");
const leftBtn = document.querySelector(".carousel__leftBtn");
const rightBtn = document.querySelector(".carousel__rightBtn");

let imageIndex = 0;
let interval;

function moveLeft() {
  clearInterval(interval); // clear the previous INterval
  --imageIndex;
  if (imageIndex === -1) imageIndex = carouselImages.length - 1;
  carouselImages.forEach((image) =>
    image.classList.remove("carousel__image--active")
  );
  carouselImages[imageIndex].classList.add("carousel__image--active");
  carouselDots.forEach((dot) => dot.classList.remove("carousel__dot--active"));
  carouselDots[imageIndex].classList.add("carousel__dot--active");
  // Set a New Interval
  interval = setInterval(moveRight, 2000);
}

function moveRight() {
  clearInterval(interval); // clear the previous INterval
  ++imageIndex;
  if (imageIndex === carouselImages.length) imageIndex = 0;
  carouselImages.forEach((image) =>
    image.classList.remove("carousel__image--active")
  );
  carouselImages[imageIndex].classList.add("carousel__image--active");
  carouselDots.forEach((dot) => dot.classList.remove("carousel__dot--active"));
  carouselDots[imageIndex].classList.add("carousel__dot--active");
  // Set a New Interval
  interval = setInterval(moveRight, 2000);
}

carouselImages[imageIndex].classList.add("carousel__image--active");
carouselDots[0].classList.add("carousel__dot--active");

interval = setInterval(moveRight, 2000);

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
