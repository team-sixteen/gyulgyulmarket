import Auth from '../modules/Auth.js';
import { BASE_URL } from '../constant.js';

class Profile {
  profileImg = null;
  constructor({ $target, user }) {
    this.$target = $target;
    this.$username = this.$target.querySelector('.text-field.username');
    this.$accountname = this.$target.querySelector('.text-field.accountname');

    this.initEvent();
    this.validateInput();
  }

  initEvent() {
    this.$target
      .querySelector('#upload-img')
      .addEventListener('change', async (e) => {
        const image = e.target.files[0];
        const request = await this.uploadFile(image);
        const imageURL = window.URL.createObjectURL(image);
        document.querySelector('.profile-img').src = imageURL;
        this.profileImg = request[0].filename;
      });

    document
      .querySelector('.ms-btn')
      .addEventListener('click', async () => {
        const username = this.$username.value;
        const accountname = this.$accountname.value;
        const intro = this.$target.querySelector('.text-field.intro').value;
        const image = BASE_URL + '/' + this.profileImg;

        const user = { username, accountname, intro, image };
        const validate = this.validateSubmit(username, accountname);

        if (validate.result) {
          try {
            const result = await Auth.setProfile(user);
            if (result.message === '프로필 수정 성공') {
              alert('수정 완료되었습니다.');
              window.location.href = './home.html';
            } else {
              if (result.message === '이미 사용중인 계정 ID입니다.') {
                const error_accountname = this.$target.querySelector(
                  '.profile-error.accountname',
                );
                if (!error_accountname.classList.contains('on')) {
                  error_accountname.classList.add('on');
                }
                error_accountname.innerText = '이미 사용중인 계정 ID입니다.';
              } else {
                console.error('현재 처리할 수 없는 에러입니다.');
              }
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          if (!validate.username) {
            const error_username = this.$target.querySelector(
              '.profile-error.username',
            );
            if (!error_username.classList.contains('on')) {
              error_username.classList.add('on');
            }
            this.$username.focus();
          } else {
            const error_accountname = this.$target.querySelector(
              '.profile-error.accountname',
            );
            if (!error_accountname.classList.contains('on')) {
              error_accountname.classList.add('on');
            }
            error_accountname.innerText =
              '* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
            this.$accountname.focus();
          }
        }
      });
  }

  validateInput() {
    const error_username = this.$target.querySelector(
      '.profile-error.username',
    );
    const error_accountname = this.$target.querySelector(
      '.profile-error.accountname',
    );

    this.$username.addEventListener('keyup', () => {
      if (this.$username.value.length < 2 || this.$username.value.length > 10) {
        if (!error_username.classList.contains('on')) {
          error_username.classList.add('on');
        }
      } else {
        error_username.classList.remove('on');
      }
    });

    this.$accountname.addEventListener('keyup', () => {
      const regex = this.$accountname.value.match(/[^a-zA-Z\d\.\_]/g);
      if (regex) {
        if (!error_accountname.classList.contains('on')) {
          error_accountname.classList.add('on');
        }
        error_accountname.innerText =
          '* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
      } else {
        error_accountname.classList.remove('on');
      }
    });
  }

  uploadFile(file) {
    const data = new FormData();
    data.append('image', file);

    return fetch(`${BASE_URL}/image/uploadfiles`, {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => res)
      .catch((err) => {
        console.error(err);
      });
  }

  validateSubmit(username, accountname) {
    if (username.length < 2 || username.length > 10) {
      return { result: false, username: false };
    } else if (
      accountname.match(/[^a-zA-Z\d\.\_]/g) ||
      accountname.length < 1
    ) {
      return { result: false, username: true, accountname: false };
    }

    return { result: true };
  }
}

(async function(){
  const user = await Auth.getProfile();
  if (!user.isLogin) {
    window.location.href = './login.html';
  }

  new Profile({
    $target: document.querySelector('.profile-setting-wrap > fieldset'),
    user
  });
})();