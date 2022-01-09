import Auth from './modules/Auth.js';
// fetch();
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';

//  1.  해당함수 변수 선언
console.log('follow.js입장');
let followers_btn = document.querySelector('div.followers-num');
let nav_top = document.querySelector('dl.followers-wrap');
let nav_new_top = document.querySelector('div.nav-top');


/* let nav_top = document.querySelector('button.nav-top');
let nav_new_top = document.querySelector('form.search-nav');
let home_zero_wrap = document.querySelector('div.cont-user-follow__wrapper');
 */

//  1. 해당함수 시작
function view() {
  alert('팔로우 리스트');
  nav_top.style.display = 'none';
  nav_new_top.classList.remove('hide');
}

// const btnBack = document.querySelector('.btn-back');

// btnBack.addEventListener('click', () => {
//     window.history.back();
// })



// 1.  해당함수 호출
search_btn.addEventListener('click', view);
nav_top.addEventListener('click', view);

//  2.  해당함수 변수 선언
const findUserForm = document.querySelector('#findUser-form');
const findUserInput = document.querySelector('#findUser-input');
// 2. search에 엔터 또는 키업 확인을 눌렀을때 , 작성한 검색 값을 통해 유저 조회하는 함수
function findUser(event) {
//   event.preventDefault();
  console.log(loginInput.value);
}
findUserForm.addEventListener('submit', onLoginSubmit);
https://www.lesstif.com/gitbook/git-delete-remote-branch-20776547.html
// 로그인 유지 확인 함수 + 데이터 불러오는 함수
async function init() {
  // getProfile 의 기능
  // 토큰과 accountname을 파악해서
  // 로그인 여부를 체크합니다
  // 만약 로그인이 되어 있다면
  // 유저의 프로필 정보를 반환합니다
  // 만약 로그아웃이 되어 있다면
  // isLogin: false
  const user = await Auth.getProfile();
  console.log(user);
  const find_search = document.querySelector('#inpSch');
  console.log('-----');
  console.log(find_search);
  if (!user.isLogin) {
    // 로그아웃
    window.location.href = './login.html';
  }
  console.log('로그인은 성공');
  console.log(`${BASE_URL}`);
  fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.json())
    .then((res) => alert(res))
    .catch((error) => {
      console.error(error);
    });
}

init();