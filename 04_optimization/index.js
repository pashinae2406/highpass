document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('header-icon').addEventListener('click', (e) => {
    document.getElementById('header-form').classList.add('header__form--active')
  })

  document.getElementById('icon-close-id').addEventListener('click', (e) => {
    document.getElementById('header-form').classList.remove('header__form--active')
  })

  document.getElementById('header-form').addEventListener('submit', (e) => {
    e.preventDefault()
  })
})

const container = document.querySelector(".hero__container")
const swiper = new Swiper('.hero__swiper', {
  slidesPerView: 1,
  loop: true,


  pagination: {
    el: '.hero__pagination',
    type: 'bullets',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  ally: {
    paginationBulletMessage: 'Кнопка {{index}}',
  }

});

document.querySelectorAll('.tabs__nav-button').forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.tabs__nav-button').forEach(function(btn) {
btn.classList.remove('tabs-nav__btn--active')});
    e.currentTarget.classList.add('tabs-nav__btn--active');
    document.querySelectorAll('.work__article-steps').forEach(function(tabsBtn) {
tabsBtn.classList.remove('work__article--active')});
document.querySelector(`[data-target="${path}"]`).classList.add('work__article--active');
  });
});

$(".accordion").accordion( {
  heightStyle: "content",
});

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',
function() {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');
    document.body.classList.toggle('stop-scroll');
});

menuLinks.forEach(function(el) {
    el.addEventListener('click', function() {
        burger.classList.remove('burger--active');
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll')
    })
});
