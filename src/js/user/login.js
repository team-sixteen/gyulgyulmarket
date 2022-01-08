import Auth from '../modules/Auth.js'

class Login {
  constructor($target) {
    this.$target = $target;
    this.$inputEmail = this.$target.querySelector('.text-field.email');
    this.$inputPassword = this.$target.querySelector('.text-field.password');
    this.$submitBtn = document.querySelector('.btn-for-login > button');
    this.initEvent();
  }

  initEvent() {
    const errorID = this.$target.querySelector('.login-error.email');
    const errorPW = this.$target.querySelector('.login-error.password');

    this.$inputEmail.addEventListener('keyup', () => {
      if (errorID.classList.contains('on')) {
        errorID.classList.remove('on');
      }
    });

    this.$inputPassword.addEventListener('keyup', () => {
      if (this.$inputPassword.value.length < 6) {
        if (!errorPW.classList.contains('on')) {
          errorPW.classList.add('on');
        }
        errorPW.innerText = '비밀번호는 최소 6자 이상입니다.'
      } else {
        errorPW.classList.remove('on');
      }
    });

    this.$submitBtn.addEventListener('click', async () => {
      const email = this.$inputEmail.value;
      const password = this.$inputPassword.value;
      const validate = this.validation(email, password);

      if(validate.result) {
        try {
          const result = await Auth.Login(email, password);
          if(result.message === '로그인 성공') {
            window.location.href = './home.html';
          } else {
            if(result.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
              errorID.classList.remove('on');
              if(!errorPW.classList.contains('on')) {
                errorPW.classList.add('on');
              }
              errorPW.innerText = '이메일 또는 비밀번호가 일치하지 않습니다.';
              this.$inputEmail.focus();
            } else {
              console.error(result.message);
            }
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        if(!validate.email) {
          if(!errorID.classList.contains('on')) {
            errorID.classList.add('on');
          }
          this.$inputEmail.focus();
        } else {
          if (!errorPW.classList.contains('on')) {
            errorPW.classList.add('on');
          }
          errorPW.innerText = '* 비밀번호를 입력해주세요. (최소 6자 이상)';
          this.$inputPassword.focus();
        }
      }
    });
  }

  validation(email, password) {
    if (!email.length) return { result: false, email: false, password: false };
    if (password.length < 6) return { result: false, email: true, password: false };
    return { result: true };
  }
}

(async function () {
  const user = await Auth.getProfile();
  if (user.isLogin) {
    window.location.href = './home.html';
  }

  new Login(document.querySelector('.login-wrap > fieldset'));
})();