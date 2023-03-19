document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.about__form')

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
  const validation2 = new JustValidate('.contacts__form')

  validation2
    .addField('.email2', [{
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('.name2', [{
      rule: 'minLength',
      value: 1,
      errorMessage: "Недопустимый формат"
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: "Недопустимый формат"
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
  iconClose.classList.remove('close--active')
})

const closeContacts = document.querySelector('.icon-close')
const contactsAdress = document.querySelector('.contacts__address')
const adressButton = document.querySelector('.contacts__btn-adress')

closeContacts.addEventListener('click', function() {
  contactsAdress.classList.toggle('contacts--none')
  adressButton.classList.toggle('btn--active')
})

adressButton.addEventListener('click', function() {
  adressButton.classList.remove('btn--active')
  contactsAdress.classList.remove('contacts--none')
})


