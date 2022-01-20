import Slider from './utils/slide.js';

console.log(document.cookie)
let JWT_TOKEN =document.cookie.split(" ").filter((key)=> {
    if(key.match('gyulgyul-token') !==null) return key
}).join('').replace('gyulgyul-token=','');

console.log(JWT_TOKEN)

const myAccountName = localStorage.getItem('accountname')
async function initProfile() {
    const res = await fetch(`http://146.56.183.55:5050/profile/${myAccountName}`,{
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JWT_TOKEN}`                   
        }
    });
    const json = await res.json()
    const profileData = json.profile
    console.log(profileData)

    document.querySelector('.profile-img').src = profileData.image;
    document.querySelector('.followers p').textContent = profileData.followerCount;
    document.querySelector('.followings p').textContent = profileData.followingCount;
    document.querySelector('.profile-accountname').textContent = profileData.accountname;
    document.querySelector('.profile-username').textContent = profileData.username;
    document.querySelector('.profile-intro').textContent = profileData.intro;

    getProductData()
    feed()
}

//판매 중인 상품 
async function getProductData() {
    const data = await fetch(
    `http://146.56.183.55:5050/product/${myAccountName}`,
    {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JWT_TOKEN}`                   
        }
    },
    );
    let product = await data.json();
    let productData = product.product;
    console.log(productData);

    const productchild = document.querySelector('.sell-list');
    productchild.innerHTML = productData.map((item) => {
    return `
        <li data-id="${item.id}">
            <img src="${item.itemImage}" alt="" onerror="this.src='src/images/productNone.png';" />
            <p>${item.itemName}</p>
            <em>${item.price}</em>
        </li>
        `;
    }).join('');

    [...productchild.children].forEach((child) => {
    child.addEventListener('click', ({ currentTarget }) => {
        console.log(currentTarget.dataset);
    });
    });
}

//게시글
async function feed() {
    const res = await fetch(
    `http://146.56.183.55:5050/post/${myAccountName}/userpost`,
    {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JWT_TOKEN}`    
        },
    });
    const feedjson = await res.json();
    console.log(feedjson);
    console.log(feedjson.post);
    console.log('0000');
    const feedchild = document.querySelector('.post-box-ul');
    const albumchild = document.querySelector('.post-box-album')
    feedchild.innerHTML = feedjson.post.map((item) => {
        console.log(item)
        let date = item.createdAt.split('-');
        let d_year = date[0];
        let d_month = date[1];
        let d_day = date[2].slice(0, 2);
        const imgparse = item.image ? item.image.split(',') : [''];
        
        return `
            <li class="post-box-list" data-id="${item.id}">
                <img src="${item.author.image}" alt="">
                <section class="post-content">
                    <img src="./src/images/icon/s-icon-more-vertical.png" alt="" class="moreBtn" data-id="${item.id}">
                    <h4>${item.author.accountname}</h4>
                    <small>${item.author.username}</small>
                    <p>${item.content}</p>
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
                    <button><img src="src/images/icon/icon-heart.png" alt=""> 58</button>
                    <button><img src="src/images/icon/icon-message-circle.png" alt=""> 12</button>
                    <p class="post-date">2020년 10월 21일</p>
                </section>
            </li>
        `
    }).join('');
    
    const imgs = feedjson.post.map(feed => feed.image ? feed.image.split(',') : ['']);

    document.querySelectorAll('.upload-slide-wrap').forEach((feed, idx) => {
        new Slider(feed, imgs[idx]);
    })

    albumchild.innerHTML = feedjson.post.map((item)=> {
        const imgparse = item.image ? item.image.split(',') : [''];
        if(!!item.image) {
        return`
            <li>
                <img
                    src="${imgparse[0]}"
                    onerror="this.style.display='none';"
                />
                ${imgparse.length>1 ? `<div class="post-album-item more-photos addPhotos"></div>`:``}
            </li>
        `
        }
    }).join('')
    // const moreBtn = document.querySelector('.moreBtn')

  
    
    feedchild.addEventListener('click', (e)=>{
        let parent = e.target.parentNode;
        if(!e.target.classList.contains('moreBtn')) {
            while(!parent.classList.contains('post-box-list')) {
                parent = parent.parentNode
              }
              console.log(parent.dataset)
            location.href=`./post.html?${parent.dataset.id}`
        } else {
        const data = e.target.dataset.id
        console.log("ggg")
        modalDel.classList.add('on')       
        realDel.addEventListener('click',()=>{
            async function postDelete() {
                const res = await fetch(`http://146.56.183.55:5050/post/${data}`,{
                    method:'delete',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${JWT_TOKEN}` 
                    }
                })
                const json = await res.json()
                console.log(json)
                
                // initProfile()
                feed()    
            }
            postDelete()

            delCheck.classList.remove('on')
            modalDel.classList.remove('on')
        
        })
        }
    })   
}

initProfile()

const albumBox = document.querySelector('.post-box-album')
const listBox = document.querySelector('.post-box-ul')
const albumBtn = document.querySelector('.post-form-album')
const listBtn = document.querySelector('.post-form-list')
const albumImg = albumBtn.querySelector('img')
const listImg = listBtn.querySelector('img')
albumBtn.addEventListener('click', (e) => {
    albumBox.classList.remove('hide')
    listBox.classList.add('hide')
    albumImg.setAttribute('src', 'src/images/icon/icon-post-album-on.png');
    listImg.setAttribute('src', 'src/images/icon/icon-post-list-off.png');
})
listBtn.addEventListener('click', (e) => {
    albumBox.classList.add('hide')
    listBox.classList.remove('hide')
    albumImg.setAttribute('src', 'src/images/icon/icon-post-album-off.png');
    listImg.setAttribute('src', 'src/images/icon/icon-post-list-on.png');
})

//join으로  map은,를 제거   innerHTML = 으로 하는 것은 join을 써야한다.
// my-profile, mod_상품, follow , innerHTML += 은 진짜 안좋은거다

//모달js

const modalDel = document.querySelector('.modal-del')
const delCheck = document.querySelector('.del-check')
const delBtn = document.querySelector('.del-btn')
const realDel = document.querySelector('.real-del')
modalDel.addEventListener('click',(e) => {
  if(e.target==e.currentTarget){
    delCheck.classList.remove('on')
    modalDel.classList.remove('on')
  }
})


delBtn.addEventListener('click', () => {
  delCheck.classList.add('on')
})




//로그아웃 모달js
const modalLogout = document.querySelector('.modal-logout')
const logoutCheck = document.querySelector('.logout-check')
const logoutBtn = document.querySelector('.logout-btn')
const moreBtn = document.querySelector('.nav-top__btn--more')
const realLogout = document.querySelector('.real-logout')
modalLogout.addEventListener('click',(e) => {
  if(e.target==e.currentTarget){
    logoutCheck.classList.remove('on')
    modalLogout.classList.remove('on')
  }
})
moreBtn.addEventListener('click', ()=>{
  modalLogout.classList.add('on')
})

logoutBtn.addEventListener('click', () => {
  logoutCheck.classList.add('on')
})

realLogout.addEventListener('click',()=>{
  document.cookie = 'gyulgyul-token'+ '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
  console.log("gggg")
  location.href='./'
})