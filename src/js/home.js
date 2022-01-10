import Auth from './modules/Auth.js';
// fetch();
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';

// 0. 로그인 유지 확인 함수 + 데이터 불러오는 함수
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
  if (!user.isLogin) {
    // 로그아웃
    window.location.href = './login.html';
  }
  // console.log('222 ----------222 ');
  // console.log(`${BASE_URL}`);
  // fetch(`${BASE_URL}/user`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ user }),
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res))
  //   .catch((error) => {
  //     console.error(error);
  //   });
  console.log('로그인은 성공');
}

//  1. 해당함수 시작
function search() {
  alert('안녕?');
  nav_top.style.display = 'none';
  nav_new_top.classList.remove('hide');
  home_zero_wrap.classList.add('hide');
  findUserInput.focus();
  findUser();
}
// 2. search에 엔터 또는 키업 확인을 눌렀을때 , 작성한 검색 값을 통해 유저 조회하는 함수
function findUser() {
  console.log('aaa');
  console.log(findUserInput.value);
  // console.log(`${BASE_URL}`);
  fetch(`${BASE_URL}/user/searchuser/?keyword=${findUserInput.value}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0Njk5MzQwNywiaWF0IjoxNjQxODA5NDA3fQ.dGIX-ETnyex9NbxDRVTC_7owkVgghpoL4d74AEekr2Q`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => {
      console.error(error);
    });
}

//  1.  해당함수 변수 선언
console.log('home.js입장');
let search_btn = document.querySelector('button.m-btn');
let nav_top = document.querySelector('button.nav-top');
let nav_new_top = document.querySelector('form.search-nav');
let home_zero_wrap = document.querySelector('div.cont-user-follow__wrapper');

// 1.  해당함수 호출
search_btn.addEventListener('click', search);
nav_top.addEventListener('click', search);

//  2.  해당함수 변수 선언
const findUserInput = document.querySelector('input.nav-top__inp-sch');
const resultUser = document.querySelector('div.cont-user-search');
//  키 누를때 2. 함수호출
findUserInput.addEventListener('keydown', findUser);

init();
