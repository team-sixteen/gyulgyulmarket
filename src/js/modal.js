const open = document.querySelector(".btn-post-menu")
const modal = document.querySelector(".post-modal-hidden")
const close = document.querySelector(".post-modal-close")

open.onclick = () => {
    modal.style.display = "flex";
};

close.onclick = () => {
    modal.style.display = "none";
};

// // 특정 버튼 누르면 모달창 켜기
// const modal = document.getElementById(".post-modal__wrapper")
// const btnModal = document.getElementById(".btn-post-menu")
// btnModal.addEventListener("click", e => {
//     modal.style.display = "flex"
// })

// // 모달창 클로즈 버튼 누르면 모달창 닫기
// const closeBtn = modal.querySelector(".close-area")
// closeBtn.addEventListener("click", e => {
//     modal.style.display = "none"
// })

// // 모달창 바깥 영역 클릭 시 모달창 닫기
// modal.addEventListener("click", e => {
//     const evTarget = e.target
//     if(evTarget.classList.contains("modal-overlay")) {
//         modal.style.display = "none"
//     }
// })

// // 모달창 켜진 상태에서 Esc 클릭 시 모달창 닫기
// window.addEventListener("keyup", e => {
//     if(modal.style.display === "flex" && e.key === "Escape") {
//         modal.style.display = "none"
//     }
// })
