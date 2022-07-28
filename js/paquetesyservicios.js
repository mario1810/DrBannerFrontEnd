/*const loadImage = (src, id) => {
  const image = new Image();
  image.classList.add('img-service');
  image.onload = function () {
    document.getElementById(id).appendChild(image);
  }
  image.src = src;
};*/

const hideElement = (element) => {
  element.classList.add('d-none');
  element.classList.remove('d-block');
}
const showElement = (element) => {
  element.classList.remove('d-none');
  element.classList.add('d-block');
}
const carouselElement = document.getElementById('carousel');
const imageCarousel = new bootstrap.Carousel(carouselElement, {
  interval: false, 
  ride: true
});
// const infoCarousel = new bootstrap.Carousel(document.getElementById('extra-info'), {
//   interval: false,
//   ride: true
// });
// carouselElement.addEventListener('slide.bs.carousel', function (event) {
//   // showElement(document.getElementById('extra-info-' +  event.to));
//   // hideElement(document.getElementById('extra-info-' +  event.from));
//   infoCarousel.to(event.to);
//   console.log('slid.bs.carousel', event.to);
// });