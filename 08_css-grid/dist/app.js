document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.about__form');

  validation
    .addField('.email', [{
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      }
    ])
})

document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.contacts__form');

  validation
    .addField('.email', [{
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      }
    ])
})

const iconSearch = document.querySelector('.header__search')
const closeSvg = document.querySelector('.search-close')
const openSvg = document.querySelector('.search-open')
const inputSearch = document.querySelector('.header__form')

iconSearch.addEventListener('click', function() {
  inputSearch.classList.toggle('form--active')
  closeSvg.classList.toggle('search--open')
  openSvg.classList.toggle('search--close')
})

const burger = document.querySelector('.header__burger')
const close = document.querySelector('.header__close')
const burgerMenu = document.querySelector('.header__list')
const iconClose = document.querySelector('.first-item')

burger.addEventListener('click', function() {
  burgerMenu.classList.toggle('burger--active')
  iconClose.classList.toggle('close--active')
})
close.addEventListener('click', function() {
  burgerMenu.classList.remove('burger--active')
})

const closeContacts = document.querySelector('.icon-close')
const contactsAdress = document.querySelector('.contacts__address')

closeContacts.addEventListener('click', function() {
  contactsAdress.classList.toggle('contacts--none')
})


