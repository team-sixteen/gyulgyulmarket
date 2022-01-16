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
  console.log('-----');
  if (!user.isLogin) {
    // 로그아웃
    window.location.href = './login.html';
  }
  console.log('로그인은 성공');
}

//  1. 해당함수 시작
function search() {
  nav_top.style.display = 'none';
  nav_new_top.classList.remove('hide');
  home_zero_wrap.classList.add('hide');
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

//   document.querySelector('.item-user-search__list').innerHTML = DData.map(
//     (data) => {
//       const search_id = data._id;
//       const search_username = data.username;
//       const search_accountname = data.accountname;
//       const search_image = data.image;

//       return `
//           <li class="item-user-search">
//               <a href="../../profile.html" class="item-user-search__wrapper" data-id="${search_id}" data-useraccount="${search_accountname}">
//                   <img
//                     src="${search_image}"
//                     onerror="this.src='http://146.56.183.55:5050/Ellipse.png';" alt="프로필이미지"
//                     class="item-user-search__img-user"/>
//                 <span class="item-user-search-box">
//                 <span class="item-user-search__username">${search_username}</span>
//                 <span class="item-user-search__userid">${search_accountname}</span>
//                 </span>
//              </a>
//         </li>`;
//     },
//   ).join('');
  
  const DOMStrings = DData.map(
    (data) => {
      const search_id = data._id;
      const search_username = data.username;
      const search_accountname = data.accountname;
      const search_image = data.image;

      return `
        <li class="item-user-search">
            <a href="#" class="item-user-search__wrapper" data-id="${search_id}" data-useraccount="${search_accountname}">
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
    },
  ).join('') ;
  const list = document.querySelector('.item-user-search__list');
  list.innerHTML = DOMStrings;
  [...list.children].forEach(child => {
      child.children[0].addEventListener('click', ({ currentTarget }) => {
          const { useraccount } = currentTarget.dataset;
          localStorage.setItem('user', useraccount);
        //   location.href = '';
      });
  });
  }


// const list = document.querySelector('.item-user-search__list');
// list.innerHTML = DOMStrings;
// console.log(list.children);
// [...list.children].forEach(child => {
//     [...child.children]
//         .forEach(child => console.log(`태그네임${child.tagName}`))
//         // .addEventListener('click', ({ currentTarget }) => {
//         //     const { useraccount } = currentTarget.dataset;
//         //     localStorage.setItem('user', useraccount);
//         //     // location.href = '';
//         // });
// });
// }

// const hi = document.querySelector('.item-user-search__list')
// hi.addEventListener('click', ({ target }) => {
//     if ([ '__img-user', '__username', '__userid']
//         .some(key => target.classList.contains(`item-user-search${key}`))) {
//         let parent = target.parentNode;
//         while (!parent.classList.contains('item-user-search__wrapper')) {
//             parent = parent.parentNode;
//         }
//         const { useraccount } = parent.dataset;
//         localStorage.setItem('user', useraccount);
//         //location.href = '';
//     } else if (target.classList.contains('item-user-search__wrapper')) {
//         const { useraccount } = target.dataset;
//         localStorage.setItem('user', useraccount);
//         //location.href = '';
//     }
// });

// hi.addEventListener('click', ({ target }) => {
//     if (!target.classList.contains('item-user-search__wrapper')) return;
//     const { useraccount } = target.dataset;
//     localStorage.setItem('user', useraccount);
//     // location.href = '';
// });

// hi.addEventListener('click', ({ target }) => {
//     if ([ '-box', '__username', '__userid']
//         .some(key => target.classList.contains(`item-user-search${key}`))) {
//         let parent = target.parentNode;
//         while (!parent.contains('item-user-search__wrapper')) {
//             parent = parent.parentNode;
//         }
//         const { useraccount } = target.parentNode.dataset;
//         localStorage.setItem('user', useraccount);
//         location.href = '';
//     } 
// });
// else if 로 다시 dataset을 불러준다 

// const hi = document.querySelector('.item-user-search__list')
// hi.addEventListener('click',({target})=> {
//     console.log(target)
//     console.log(target.parentNode)
//     console.log(target.parentNode.dataset)
//     if(target.classList.contains('.item-user-search__wrapper')
//         || target.parentNode.classList.contains('.item-user-search__wrapper')) {
//             const {id, useraccount} = target.parentNode.dataset;
//             localStorage.setItem('accountname123',useraccount);
//             console.log('안녕안녕')
//             // location.href='';
//         }
// })



//  1.  해당함수 변수 선언
console.log('home.js입장');
let search_btn = document.querySelector('button.m-btn');
let nav_top = document.querySelector('button.nav-top');
let nav_new_top = document.querySelector('form.search-nav');
let home_zero_wrap = document.querySelector('div.cont-user-follow__wrapper');

// 1.  해당함수 호출
search_btn.addEventListener('click', search);
nav_top.addEventListener('click', search);

//  키 누를때 2. 함수호출
findUserInput.addEventListener('keydown', findUser);

init();