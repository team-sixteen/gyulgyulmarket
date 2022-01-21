import Auth from './modules/Auth.js';
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';
import Slider from './utils/slide.js';

/**
 * 공통적으로 사용해야 하는것
 * AUth 클래스
 */
const urlQuery = window.location.search.split('?')[1];

console.log(urlQuery);
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
    const res = await fetch(`${BASE_URL}/profile/${urlQuery}`, {
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
    await getProductData();
  })();

  // // 판매 중인 상품 출력
  const productLimit = 5;
  let productSkip = 0;
  async function getProductData() {
    const data = await fetch(
      `${BASE_URL}/product/${urlQuery}/?limit=${productLimit}&skip=${productSkip}`,
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
    console.log(productData);
    productSkip += productLimit;

    const productchild = document.querySelector('.product-list');
    console.log('0000');
    console.log(!productData.length === 0);
    if (!(productData.length == 0)) {
      productchild.classList.add('add');
      // productchild.innerHTML = productData
      //   .map((item) => {
      //     console.log(item);
      //     return `
      //   <li class="product-item" data-id="${item.id}">
      //     <a href="#" >
      //       <img
      //         src='${item.itemImage}'
      //         alt="상품: 감귤 파치"
      //       />
      //       <p class="product-txt sl-elipsis">${item.itemName}</p>
      //       <p class="product-price">${item.price}</p>
      //     </a>
      //   </li>
      //   `;
      //   })
      //   .join('');

      // [...productchild.children].forEach((child) => {
      //   child.addEventListener('click', ({ currentTarget }) => {
      //     console.log(currentTarget.dataset);
      //   });
      // });
    } else {
    }
    productchild.innerHTML = productData
      .map((item) => {
        console.log(item);
        return `
        <li class="product-item" data-id="${item.id}">
          <a href="#" >
            <img
              src='${item.itemImage}'
              alt="상품: 감귤 파치"
            />
            <p class="product-txt sl-elipsis">${item.itemName}</p>
            <p class="product-price">${item.price}</p>
          </a>
        </li>
        `;
      })
      .join('');

    [...productchild.children].forEach((child) => {
      child.addEventListener('click', ({ currentTarget }) => {
        console.log(currentTarget.dataset);
      });
    });
  }

  //게시글

  async function feed() {
    const res = await fetch(`${BASE_URL}/post/${urlQuery}/userpost`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const feedjson = await res.json();
    console.log(feedjson);
    console.log(feedjson.post);
    console.log('0000');
    const feedchild = document.querySelector('.post-list');
    const albumchild = document.querySelector('.post-album');
    feedchild.innerHTML = feedjson.post
      .map((item) => {
        console.log(item);
        let date = item.createdAt.split('-');
        let d_year = date[0];
        let d_month = date[1];
        let d_day = date[2].slice(0, 2);
        const imgparse = item.image ? item.image.split(',') : [''];

        return `
        <li class="post-list-item" data-id="${item.id}">
          <img
            src="${item.author.image}"
            class="post-profile-img user-page"
            data-name="${item.author.accountname}"
          />
          <div>
            <div class="post-profile-text">
              <strong class="post-writer user-page" data-name="${
                item.author.accountname
              }">${item.author.username}</strong>
              <span class="post-writer-id user-page" data-name="${
                item.author.accountname
              }">@ ${item.author.accountname}</span>
            </div>
            <p class="post-text">
            ${item.content}
            </p>
            <!-- <img src="${
              imgparse[0]
            }" onerror="this.style.visibility='hidden';" class="post-img" />-->
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
                <img src="src/images/icon/icon-heart.png" alt="좋아요 수" class="likelike" />
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
    // create li를 해서 innerHTML 을 한다음에 그 li태그에서 query로 button

    const imgs = feedjson.post.map((feed) =>
      feed.image ? feed.image.split(',') : [''],
    );

    document.querySelectorAll('.upload-slide-wrap').forEach((feed, idx) => {
      new Slider(feed, imgs[idx]);
    });

    albumchild.innerHTML = feedjson.post
      .map((item) => {
        const imgparse = item.image ? item.image.split(',') : [''];
        if (!!item.image) {
          return `
            <li class="post-album-item more-photos">
              <img
                src="${imgparse[0]}"
                class="post-album-img"
                onerror="this.src='src/images/error.png';"
              />
              ${
                imgparse.length > 1
                  ? `<div class="post-album-item more-photos addPhotos"></div>`
                  : ``
              }
            </li>
          `;
        }
      })
      .join('');
    console.log(feedchild);
    const feed_img = document.querySelectorAll('.upload-slide-wrap');
    console.log(feed_img);
    feedchild.addEventListener('click', (e) => {
      if (e.target.closest('.upload-slide-wrap')) {
        return;
      }
      let parent = e.target.parentNode;
      console.log('피드 클리이익');
      console.log(feedchild);
      if (e.target.classList.contains('user-page')) {
        console.log(e.target.dataset.name);
        location.href = `./profile.html?${e.target.dataset.name}`;
      } else if (e.target.classList.contains('likelike')) {
        // location.href='좋아요'
        console.log('좋아요');
      } else {
        while (!parent.classList.contains('post-list-item')) {
          parent = parent.parentNode;
          const data = parent.dataset;
          location.href = `./post.html?${data.id}`;
        }
      }
    });

    // if(!!item.image){
    //   albumchild.innerHTML += `
    //     <li class="post-album-item">
    //       <img
    //         src="http://146.56.183.55:5050/${item.image}"
    //         class=""
    //       />
    //     </li>
    //   `
    // }
  }
  feed();
  // getProductData();
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
  location.href = `${window.location.origin}/followers.html?${urlQuery}`;
});
// followings 리스트 이동
const followingsBtn = document.querySelector('.followings-wrap');
followingsBtn.addEventListener('click', function () {
  location.href = `${window.location.origin}/followings.html?${urlQuery}`;
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

//모달js

const modalLogout = document.querySelector('.modal-logout');
const logoutCheck = document.querySelector('.logout-check');
const logoutBtn = document.querySelector('.logout-btn');
const moreBtn = document.querySelector('.nav-top__btn--more');
const realLogout = document.querySelector('.real-logout');
modalLogout.addEventListener('click', (e) => {
  if (e.target == e.currentTarget) {
    logoutCheck.classList.remove('on');
    modalLogout.classList.remove('on');
  }
});
moreBtn.addEventListener('click', () => {
  modalLogout.classList.add('on');
});

logoutBtn.addEventListener('click', () => {
  logoutCheck.classList.add('on');
});

realLogout.addEventListener('click', () => {
  document.cookie =
    'gyulgyul-token' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  console.log('gggg');
  location.href = './';
});
