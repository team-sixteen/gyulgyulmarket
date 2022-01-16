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
  // 프로필 설정
  (async function profile() {
    const res = await fetch(`${BASE_URL}/profile/${localStorage_yourProfile}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();
    console.log(json);
    document.querySelector('.user-profile-id').innerText =
      '@' + json.profile.accountname;
    document.querySelector('.user-profile-name').innerText =
      json.profile.username;
    document.querySelector('.followers-num').innerText =
      json.profile.followerCount;
    document.querySelector('.followings-num').innerText =
      json.profile.followingCount;
    document.querySelector('.user-profile-info').innerText = json.profile.intro;
    document.querySelector('.profile-img').src = json.profile.image;
    //에러 시 추가로 어떻게 할지 정하기 .
    // document.querySelector('.profile-img').innerHTML = (
    //   <img
    //     src="${json.profile.image}"
    //     onerror="this.src='http://146.56.183.55:5050/Ellipse.png';"
    //     alt="프로필이미지"
    //     class="item-user-search__img-user"
    //   />
    // );
  })();

  // 판매 중인 상품 출력
  const productList = document.querySelector('.product-item');
  const productLimit = 5;
  let productSkip = 0;
  async function getProductData() {
    const data = await fetch(
      `${BASE_URL}/product/${localStorage_yourProfile}/?limit=${productLimit}&skip=${productSkip}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );
    let product = await data.json();
    let productData = product.product;
    productSkip += productLimit;
    return productData;
  }
  function makeProductItem(product) {
    const { id, itemImage, itemName, link, price } = product;
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const span = document.createElement('span');
    return li;
  }
  function printProductList(productData) {
    for (const product of productData) {
      const productItem = makeProductItem(product);
      product.appendChild(productItem);
    }
  }
}
init();
// 팔로우 버튼구현
const toggleFollow = document.querySelector('.m-btn');
console.log(toggleFollow);
toggleFollow.addEventListener('click', function () {
  toggleFollow.classList.toggle('unfollow-btn');
  if (toggleFollow.classList.contains('unfollow-btn')) {
    toggleFollow.innerText = '언팔로우';
  } else {
    toggleFollow.innerText = '팔로우';
  }
});
// followers 리스트 이동
const followersBtn = document.querySelector('.followers-wrap');
followersBtn.addEventListener('click', function () {
  location.href = '../followers.html';
});
// followings 리스트 이동
const followingsBtn = document.querySelector('.followings-wrap');
followingsBtn.addEventListener('click', function () {
  location.href = '../followings.html';
});

// 앨범무늬
const albumBtn = document.querySelector('.product-album');
const postBtn = document.querySelector('.product-view');
const postImg = postBtn.querySelector('img');
const albumImg = albumBtn.querySelector('img');
const album = document.querySelector('.album-wrap');
const post = document.querySelector('.post-list');
albumBtn.addEventListener('click', function () {
  post.classList.add('hide');
  album.classList.remove('hide');
  albumImg.setAttribute('src', 'src/images/icon/icon-post-album-on.png');
  postImg.setAttribute('src', 'src/images/icon/icon-post-list-off.png');
});
postBtn.addEventListener('click', function () {
  post.classList.remove('hide');
  album.classList.add('hide');
  albumImg.setAttribute('src', 'src/images/icon/icon-post-album-off.png');
  postImg.setAttribute('src', 'src/images/icon/icon-post-list-on.png');
});
