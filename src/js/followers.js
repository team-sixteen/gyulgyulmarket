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
init();
const urlQuery = window.location.search.split('?')[1];

console.log(urlQuery);

console.log(document.cookie);
let JWT_TOKEN = document.cookie
  .split(' ')
  .filter((key) => {
    if (key.match('gyulgyul-token') !== null) return key;
  })
  .join('')
  .replace('gyulgyul-token=', '');

console.log(JWT_TOKEN);

async function followersData() {
  const res = await fetch(
    `http://146.56.183.55:5050/profile/${urlQuery}/follower`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    },
  );
  const json = await res.json();
  console.log(json);

  const followerList = document.querySelector('.profile-list-container');
  followerList.innerHTML = json
    .map((item) => {
      return `
                <li class="item-user-follow" data-accountname="${item.accountname}">
                    <div class="item-user-follow__wrapper">
                        <img src="${item.image}" onerror="this.src='http://146.56.183.55:5050/Ellipse.png';" alt="프로필이미지" class="item-user-follow__img-user">
                        <ul class="item-user-follow__list">
                            <li class="item-user-follow__username">${item.accountname}</li>
                            <li class="item-user-follow__userid">${item.intro}</li>
                        </ul>
                    </div>
                    <button type="button" class="s-btn">팔로우</button>
                </li>               
            `;
    })
    .join('');

  console.log(followerList.children);
  [...followerList.children].forEach((item) => {
    item.addEventListener('click', ({ currentTarget }) => {
      // console.log(currentTarget.dataset.accountname)
      location.href = `${window.location.origin}/profile.html?${currentTarget.dataset.accountname}`;
      // location.href = `http://127.0.0.1:5500/followers.html?${currentTarget.dataset.accountname}`;
    });
  });
}
followersData();
