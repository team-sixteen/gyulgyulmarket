import Auth from './modules/Auth.js';
// fetch();
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';
import Slider from './utils/slide.js';
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
  console.log('-----');
  if (!user.isLogin) {
    // 로그아웃
    window.location.href = './login.html';
  }
  console.log('로그인은 성공');
}
(async function init_homefeed() {
  const homefeed_res = await fetch(`${BASE_URL}/post/feed/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json',
    },
  });
  const frFeed = await homefeed_res.json();
  // 없을때 로고 wrap 선택자 noFeed
  const noFeed = document.querySelector('.cont-user-follow__wrapper');
  console.log('000');
  console.log(frFeed);
  if (frFeed.posts && frFeed.posts.length > 0) {
    console.log('존재');
    noFeed.style.display = 'none';
    const findUl = document.querySelector('.home-list');
    console.log('ababab');
    console.log(frFeed.posts);
    findUl.innerHTML = frFeed.posts
      .map((item) => {
        let date = item.createdAt.split('-');
        let d_year = date[0];
        let d_month = date[1];
        let d_day = date[2].slice(0, 2);
        const imgparse = item.image ? item.image.split(',') : [''];

        return `
        <li class="post-list-item homefeed">
          <img
            src="${item.author.image}"
            class="post-profile-img"
            onerror="this.src='http://146.56.183.55:5050/Ellipse.png';"
          />
          <div>
            <div class="post-profile-text">
              <strong class="post-writer">${item.author.username}</strong>
              <span class="post-writer-id">@ ${item.author.accountname}</span>
            </div>
          <p class="post-text">
            ${item.author.intro}
          </p>
            <div class="upload-slide-wrap">
              <ul class="upload-slide">
                ${imgparse
                  .map((i, idx) => {
                    return `
                    <li class="upload-slide-item">
                      <img
                        src=${i}
                        alt=""
                        class="upload-slide-img">
                        <button id=${idx} class="upload-slide-img-delete">X</button>
                    </li>
                  `;
                  })
                  .join('')}
              </ul>
              <div class="slide-arrow-left">
                <i class="fas fa-chevron-left"></i>
              </div>
              <div class="slide-arrow-right">
                <i class="fas fa-chevron-right"></i>
              </div>
              <ul class="slide-points"></ul>
            </div>
            <div class="post-utils">
              <button class="btn-like">
                <img src="src/images/icon/icon-heart.png" alt="좋아요 수" />
              </button>
              <span class="count-like">${item.heartCount}</span>
              <button class="btn-comment">
                <img
                  src="src/images/icon/icon-message-circle.png"
                  alt="댓글 수"
                />
              </button>
              <span class="count-comment">${item.comments.length}</span>
            </div>
            <span class="post-date">${d_year}년 ${d_month}월 ${d_day}일</span>
          </div>
          <button class="btn-post-menu">
            <img
              src="src/images/icon/s-icon-more-vertical.png"
              alt="게시글 메뉴 열기"
            />
          </button>
        </li>
        `;
      })
      .join('');

    const imgs = frFeed.posts.map((feed) =>
      feed.image ? feed.image.split(',') : [''],
    );

    document.querySelectorAll('.upload-slide-wrap').forEach((feed, idx) => {
      new Slider(feed, imgs[idx]);
    });
  } else {
    // noFeed.style.display = 'block';
    console.log('존재 x');
  }
})();
//  1. 해당함수 시작
function search() {
  nav_top.style.display = 'none';
  nav_new_top.classList.remove('hide');
  home_zero_wrap.classList.add('hide');
  homefeed_wrap.style.display = 'none';
  // noFeed.style.display = 'none';
  findUserInput.focus();
  findUser();
}
//  2.  해당함수 변수 선언
const findUserInput = document.querySelector('input.nav-top__inp-sch');
const resultUser = document.querySelector('div.cont-user-search');

// 3. search에  키업 확인을 눌렀을때 , 작성한 검색 값을 통해 유저 조회하는 함수
async function findUser() {
  console.log('aaa');
  console.log(findUserInput.value);
  if (findUserInput.value.length > 0) {
    const res = await fetch(
      `${BASE_URL}/user/searchuser/?keyword=${findUserInput.value}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const searchData = await res.json();
    console.log(searchData);
    const DData = searchData.filter((word) => {
      return word.username.includes(`${findUserInput.value}`)
        ? true
        : word.accountname.includes(`${findUserInput.value}`)
        ? true
        : false;
    });
    console.log('------');
    console.log(DData);

    const DOMStrings = DData.map((data) => {
      const search_id = data._id;
      const search_username = data.username;
      const search_accountname = data.accountname;
      const search_image = data.image;

      return `
          <li class="item-user-search">
          <a class="item-user-search__wrapper" data-id="${search_id}" data-useraccount="${search_accountname}">
          <img
            src="${search_image}"
            onerror="this.src='http://146.56.183.55:5050/Ellipse.png';" alt="프로필이미지"
            class="item-user-search__img-user"/>
        <span class="item-user-search-box">
        <span class="item-user-search__username">${search_username}</span>
        <span class="item-user-search__userid">${search_accountname}</span>
        </span>
      </a>
    </li>`;
    }).join('');
    const list = document.querySelector('.item-user-search__list');
    list.innerHTML = DOMStrings;
    [...list.children].forEach((child) => {
      child.children[0].addEventListener('click', ({ currentTarget }) => {
        console.log(currentTarget);
        const { useraccount } = currentTarget.dataset;

        location.href = `${window.location.origin}/profile.html?${useraccount}`;
      });
    });
  }
}
//../../profile.html
// const selectUser = document.querySelector('.item-user-search__list');
// selectUser.addEventListener('click', (e) => {
//   console.log(e.target.dataset.useraccount);
//   localStorage.setItem('YourProfile_accountname', e.target.dataset.useraccount);
// });
//  1.  해당함수 변수 선언
console.log('home.js입장');
let search_btn = document.querySelector('button.m-btn');
let nav_top = document.querySelector('.nav-top');
let nav_new_top = document.querySelector('form.search-nav');
let home_zero_wrap = document.querySelector('div.cont-user-follow__wrapper');
const homefeed_wrap = document.querySelector('.homefeed-list-wrap');
// 1.  해당함수 호출
search_btn.addEventListener('click', search);
nav_top.addEventListener('click', search);

//  키 누를때 2. 함수호출
findUserInput.addEventListener('keydown', findUser);

init();
