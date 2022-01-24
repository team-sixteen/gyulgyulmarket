import Auth from '../modules/Auth.js';

class SignUpEmail {
  constructor({ $target }) {
    this.$target = $target;
    this.$inputEmail = this.$target.querySelector('.text-field.email');
    this.$inputPassword = this.$target.querySelector('.text-field.pw');
    this.$submitBtn = this.$target.querySelector('.btn-for-join button');
    this.initEvent();
  }

  initEvent() {
    const errorID = this.$target.querySelector('.error-id');
    const errorPW = this.$target.querySelector('.error-password');
    
    this.$inputEmail.addEventListener('keyup', () => {
      errorID.classList.remove('on');
    })

    this.$inputPassword.addEventListener('keyup', () => {
      if (this.$inputPassword.value.length < 6) {
        if (!errorPW.classList.contains('on')) {
          errorPW.classList.add('on');
        }
      } else {
        errorPW.classList.remove('on');
      }
    })

    this.$submitBtn.addEventListener('click', async () => {
      const email = this.$inputEmail.value;
      const password = this.$inputPassword.value;
      const validate = this.validation(email, password);
      console.log(validate);
      console.log(email, password);
      if (validate.result) {

        try {
          const result = await Auth.SignUp(email, password);
          const message = result.message;
          console.log(message);
          if (message === '회원가입 성공') {
            
            alert('회원가입을 성공했습니다.');

            // 회원가입시 자동으로 로그인을 한번 시켜줘야 피그마 로직을 만족할 수 있습니다.
            Auth.Login(email, password).then(res => {
              if(res.message === '로그인 성공') {
                window.location.href = './setting_profile.html';
              } else {
                console.error('회원가입 후 로그인 에러');
              }
            });

          } else {
            switch (message) {
              case '잘못된 이메일 형식입니다.': {
                if (!errorID.classList.contains('on')) {
                  errorID.classList.add('on');
                }
                errorID.innerText = '* 잘못된 이메일 형식입니다.';
                break;
              }
              case '이미 가입된 이메일 주소 입니다.': {
                if (!errorID.classList.contains('on')) {
                  errorID.classList.add('on');
                }
                errorID.innerText = '* 이미 가입된 이메일 주소입니다.';
                break;
              }
              default: {
                console.log(message);
                return;
              }
            }

          }
        } catch (error) {
          console.error('error');
        }
      } else {
        if(!validate.email) {
          if (!errorID.classList.contains('on')) {
            errorID.classList.add('on');
          }
          errorID.innerText = '* 이메일을 입력해주세요.';
          this.$inputEmail.focus();
        } else {
          if (!errorPW.classList.contains('on')) {
            errorPW.classList.add('on');
          }
          errorPW.innerText = '* 비밀번호를 입력해주세요. (최소 6자 이상)';
          this.$inputPassword.focus();
        }
      }
    })
  }

  validation(email, password) {
    if (!email.length) return {result: false, email: false, password: false};
    if (password.length < 6) return {result: false, email: true, password: false};
    return {result: true}
  }
}

(async function () {
  const user = await Auth.getProfile();
  if (user.isLogin) {
    window.location.href = './home.html';
  }

  new SignUpEmail({
    $target: document.querySelector('.login-wrap')
  })
})();
