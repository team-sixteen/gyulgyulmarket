import { BASE_URL } from './constant.js';
import Auth from './modules/Auth.js';
import Slider from './utils/slide.js';

class Upload {
  imgs = [];
  constructor($target) {
    this.$target = $target;
    this.$sliderContainer = new Slider(this.$target.querySelector('.upload-slide-wrap'));
    this.initEvent();
  }

  initEvent() {
    const imgUpload = this.$target.querySelector('#upload-file');
    imgUpload.addEventListener('change', (e) => {
      const image = e.target.files[0];
      const imageURL = window.URL.createObjectURL(image);
      this.$sliderContainer.addImg(imageURL);
    })

    const uploadButton = document.querySelector('.ms-btn');
    const content = this.$target.querySelector('#upload-content-input');
    uploadButton.addEventListener('click', async() => {
      this.imgs = this.$sliderContainer.getImgs();

      if (!content.value || !this.imgs.length) {
        alert(!content.value ? '내용을 입력하세요.' : '이미지를 선택해주세요.');
        if(!content.value) content.focus();
        return;
      }

      // TODO: 일단 이미지는 저장만 해두고
      // 어떻게 스트링으로 바꿔주는지 해결해야함
      const request = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post: {
            content: content.value,
            image: 'imgURL..'
          }
        })
      })
      
      if(request.status === 200) {
        alert('게시글을 등록했습니다.');
        window.location.href = './home.html';
      } else {
        throw new Error('업로드 중 에러가 발생했습니다.');
      }
    })
  }
}

(async function () {
  const user = await Auth.getProfile();
  console.log(user);
  if (!user.isLogin) {
    window.location.href = './login.html';
  }

  new Upload(document.querySelector('.upload-container'))
})();