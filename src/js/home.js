const btnSearch = document.querySelector('.m-btn');
const mainNav = document.querySelector('.main-nav');
const searchNav = document.querySelector('.search-nav');
const navBtnSearch = document.querySelector('.nav-top__btn--search');
// const btnBack = document.querySelector('');

function showSearchBar(){
    mainNav.classList.toggle('hide');
    searchNav.classList.toggle('hide');
}

btnSearch.addEventListener('click', showSearchBar);
navBtnSearch.addEventListener('click',showSearchBar);
