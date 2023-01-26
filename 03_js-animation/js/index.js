gsap.from('.hero__title', {opacity: 0, duration: 1, y: 50});
gsap.from('.hero__btn', {opacity: 0, duration: 1, y: 20, delay: 0.2});
gsap.from('.hero__descr', {opacity: 0, duration: 1, delay: 1.3});
gsap.from('.img-first', {opacity: 0, duration: 1, delay: 1.5});
gsap.from('.img-second', {opacity: 0, duration: 1, delay: 2.2});
gsap.from('.img-three', {opacity: 0, duration: 1, delay: 3});
gsap.from('.photos__author', {opacity: 0, duration: 1, delay: 3.8});

let menu = document.querySelector('.menu');
let burger = document.querySelector('.burger');
var reverse = document.querySelector('.close');

const tl = new TimelineMax();

burger.addEventListener('click', function () {
  menu.classList.toggle('menu--open');
  tl.from('.menu', {opacity: 0, duration: 0.3})
    .from('.nav__list', {opacity: 0, duration: 0.5, y: 20})
    .from('.sub-menu', {opacity: 0, duration: 0.5, y: 20})
    .from('.social', {opacity: 0, duration: 0.5, y: 20});
});

reverse.onclick = function() {
  tl.reverse();
}






