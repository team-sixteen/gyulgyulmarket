// import Slider from './utils/slide.js';

const postImg = document.querySelector('.post-img img')
const postContent =document.querySelector('.post-content')
const postDate = document.querySelector('.post-date')
const commentBtn = document.querySelector('.module-inp-cmmt__btn-upload')
const commentInp = document.querySelector('.module-inp-cmmt__inp')
const sildeCont = document.querySelector('.upload-slide-wrap')

const userImg = document.querySelector('.post-user-img')
const userName = document.querySelector('.post-username')
const userAccount = document.querySelector('.post-userid')
const likeImg = document.querySelector('.post-active-like-off')
const likeCount = document.querySelector('.post-active-like-cnt')
const commentImg = document.querySelector('.post-active-comment-off')
const commentCount = document.querySelector('.post-active-comment-cnt')


// let silderBox = new Slider(sildeCont)
// console.log(silderBox)

const urlQuery = window.location.search.split('?')[1];

console.log(urlQuery);

    console.log(document.cookie)
    let JWT_TOKEN =document.cookie.split(" ").filter((key)=> {
        if(key.match('gyulgyul-token') !==null) return key
    }).join('').replace('gyulgyul-token=','');

    console.log(JWT_TOKEN)
    async function profile() {
        const res = await fetch(`http://146.56.183.55:5050/post/${urlQuery}`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JWT_TOKEN}`
            },
        });

        const json = await res.json();
        const postData = json.post
    
        console.log(postData)
        console.log(postData.author.image)
        console.log(postData.author.username)

        userImg.src = postData.author.image
        userName.textContent = postData.author.username
        userAccount.textContent = `@${postData.author.accountname}`
        postContent.textContent = json.post.content
        const img = json.post.image.split(',')
        console.log(img)
        // postImg.src=`${json.post.image}`
        postImg.src = `${img[0]}`
        if(postData.hearted==true){
            likeImg.src = "src/images/icon/icon-heart-active.png"
        }
        likeCount.textContent = postData.heartCount
        commentCount.textContent = postData.commentCount
        let date = postData.createdAt.split('-');
        let d_year = date[0];
        let d_month = date[1];
        let d_day = date[2].slice(0, 2);
        postDate.textContent = `${d_year}년 ${d_month}월 ${d_day}일`

       initComment()
    }
    profile ()
    // 리팩토링은 필수로 해야하고, 이제 댓글다는 기능, API에 이미지는 배열로 저장되어있네 



    console.log(JWT_TOKEN)

    //댓글 init
    async function initComment() {
        const res = await fetch(`http://146.56.183.55:5050/post/${urlQuery}/comments`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JWT_TOKEN}`
            },
        });
        const json = await res.json();
        const commentData = json.comments

        const commentBox = document.querySelector('.post-comments')
        const commentImg = document.querySelector('.post-comment-userimg')
        const commentName = document.querySelector('.post-comment-username')
        const commentTitle = document.querySelector('.post-comment-content')
        commentBox.innerHTML = commentData.map((item)=> {
            // commentImg.src = item.author.image
            // commentName.textContent = item.author.username
            // commentTitle.textContent = item.content
            return `
                <li class="post-comment">
                    <div class="post-comment-header">
                    <div class="post-comment-user">
                        <img
                        src="${item.author.image}"
                        alt="유저 프로필 이미지"
                        class="post-comment-userimg"
                        />
                        <div class="post-comment-username">${item.author.username}</div>
                    </div>
                    <button class="post-comment-details">
                        <img
                        src="src/images/icon/icon-more-vertical.png"
                        alt="댓글 옵션 더보기"
                        />
                    </button>
                    </div>
                    <div class="post-comment-content">
                    ${item.content}
                    </div>
                </li>
            `
        }).join('')
       
    }


    async function comment() {
        const res = await fetch(`http://146.56.183.55:5050/post/${urlQuery}/comments`,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JWT_TOKEN}`
            },
            body:JSON.stringify({
                "comment": {
                    "content": commentInp.value,
                }
            })
        });
        const json = await res.json();
        console.log(json)
        commentInp.value = ''
    }

    commentBtn.addEventListener('click',comment);
    commentInp.addEventListener('input',(e)=> {
      commentInp.value = e.target.value
    });

