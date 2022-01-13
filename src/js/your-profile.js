import Auth from './modules/Auth.js';
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';
/**
 * 공통적으로 사용해야 하는것
 * AUth 클래스
 */

console.log('나와');

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
  const useraccount = user.profile.accountname;
  console.log(useraccount);
  if (!user.isLogin) {
    // 로그아웃
    window.location.href = './login.html';
  }
  console.log('로그인은 성공');
  // 이제부터는 로그인 상태겠죠?
  // myprofile .
  //
  let localStorage_yourProfile = localStorage.getItem('yourProfile');

  // fetch(
  //   `${BASE_URL}/profile/${localStorage_yourProfile}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${Auth.getToken()}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))
  //     .catch((error) => {
  //       console.error(error);
  //     }),
  // );

  // 정민님 코드
  async function profile() {
    const res = await fetch(`${BASE_URL}/profile/${localStorage_yourProfile}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();
    console.log(json);
    document.querySelector('.user-profile-name').innerText =
      json.profile.accountname;
    document.querySelector('.followers-num').innerText =
      json.profile.followerCount;
    document.querySelector('.followings-num').innerText =
      json.profile.followingCount;
    document.querySelector('.profile-img').src = json.profile.image;
  }
  profile();
}

init();
//   const userData = {
//        "profile": {
//         "_id": String,
//         "username": String,
//         "accountname": String,
//         "intro": String,
//         "image": String,
//         "following": [],
//         "follower": [],
//         "followerCount": Number,
//         "followingCount": Number
//     }
//   }
//   render(user.profile)

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(res => {
//     // response 처리
//     console.log(res);
//     // 응답을 JSON 형태로 파싱
//     return res.json();
//   })
//   .then(data => {
//     // json 출력
//     console.log(data)
//   })
//   .catch(err => {
//     // error 처리
//     console.log('Fetch Error', err);
//   });
// }
