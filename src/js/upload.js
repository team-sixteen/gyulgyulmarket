import { BASE_URL } from './constant.js';
import Auth from './modules/Auth.js';
import Slider from './utils/slide.js';

class Upload {
  imgs = [];
  constructor($target, user) {
    this.$target = $target;
    this.$sliderContainer = new Slider(
      $target.querySelector('.upload-slide-wrap'),
    );
    this.close = document.querySelector('.upload-slide');
    this.setUserProfile(user);
    this.initEvent();
  }

  setUserProfile(user) {
    document.querySelector('.upload-userimg').src = user.profile.image;
  }

  initEvent() {
    const back = document.querySelector('.nav-top__btn--goback');
    back.addEventListener('click', () => history.back());

    const uploadFile = this.$target.querySelector('#upload-file');
    uploadFile.addEventListener('change', async (e) => {
      const result = await this.uploadFile(e.target.files[0]);
      const image = e.target.files[0];
      const imageURL = window.URL.createObjectURL(image);
      this.$sliderContainer.addImg(imageURL);
      this.imgs.push(result[0].filename);
    });

    this.close.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.upload-slide-img-delete');
      if (closeBtn) {
        this.$sliderContainer.removeImg(closeBtn.id);
        this.imgs = this.imgs.filter((img, idx) => idx != closeBtn.id ? img : null);
      }
    });

    const uploadButton = document.querySelector('.ms-btn');
    const content = this.$target.querySelector('#upload-content-input');
    uploadButton.addEventListener('click', async () => {
      if (!content.value || !this.imgs.length) {
        alert(!content.value ? '내용을 입력하세요.' : '이미지를 선택해주세요.');
        if (!content.value) content.focus();
        return;
      }

      const request = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: content.value,
            image: this.imgs.map((img) => BASE_URL + '/' + img).join(','),
          },
        }),
      });

      if (request.status === 200) {
        alert('게시글을 등록했습니다.');
        window.location.href = './home.html';
      } else {
        throw new Error('업로드 중 에러가 발생했습니다.');
      }
    });
  }

  uploadFile(file) {
    const data = new FormData();
    data.append('image', file);

    return fetch(`${BASE_URL}/image/uploadfiles`, {
      method: 'POST',
      body: data
    })
    .then(res => {
      return res.json();
    })
    .then(res => res)
    .catch(err => {
      console.error(err);
    })
  }
}

(async function () {
  const user = await Auth.getProfile();
  if (!user.isLogin) {
    window.location.href = './login.html';
  }
  
  new Upload(document.querySelector('.upload-container'), user);
})();