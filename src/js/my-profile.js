console.log(document.cookie)
let JWT_TOKEN =document.cookie.split(" ").filter((key)=> {
    if(key.match('gyulgyul-token') !==null) return key
}).join('').replace('gyulgyul-token=','');
console.log(JWT_TOKEN)

console.log(localStorage.getItem('accountname'))
const myName = localStorage.getItem('accountname')

async function profile() {
    const res = await fetch(`http://146.56.183.55:5050/profile/${myName}`,{
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JWT_TOKEN}`
        },
    });

    const json = await res.json();
    
}

profile()

//join으로  map은,를 제거   innerHTML = 으로 하는 것은 join을 써야한다.
// my-profile, mod_상품, follow , innerHTML += 은 진짜 안좋은거다 