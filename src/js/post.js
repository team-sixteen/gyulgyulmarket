// import Slider from './utils/slide.js';

const postImg = document.querySelector('.post-img img')
const postContent =document.querySelector('.post-content')
const postDate = document.querySelector('.post-date')
const commentBtn = document.querySelector('.module-inp-cmmt__btn-upload')
const commentInp = document.querySelector('.module-inp-cmmt__inp')

const sildeCont = document.querySelector('.upload-slide-wrap')

// let silderBox = new Slider(sildeCont)
// console.log(silderBox)


    console.log(document.cookie)
    let JWT_TOKEN =document.cookie.split(" ").filter((key)=> {
        if(key.match('gyulgyul-token') !==null) return key
    }).join('').replace('gyulgyul-token=','');

    console.log(JWT_TOKEN)
    async function profile() {
        const res = await fetch("http://146.56.183.55:5050/post/61dc56c5bcdc7a1e5a659ba0",{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JWT_TOKEN}`
            },
        });

        const json = await res.json();
        console.log(json)
        console.log(json.post.image)

        postContent.textContent = json.post.content
        postDate.textContent = json.post.createdAt

        const img = json.post.image.split(',')
        console.log(img)
        // postImg.src=`${json.post.image}`
        postImg.src = `http://146.56.183.55:5050/${img[0]}`
    }
    profile ()
    // 리팩토링은 필수로 해야하고, 이제 댓글다는 기능, API에 이미지는 배열로 저장되어있네 



    console.log(JWT_TOKEN)
    async function comment() {
        const res = await fetch("http://146.56.183.55:5050/post/61dc56c5bcdc7a1e5a659ba0/comments",{
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
        profile ()
    }

    commentBtn.addEventListener('click',comment);
    commentInp.addEventListener('input',(e)=> {
      commentInp.value = e.target.value
    });

