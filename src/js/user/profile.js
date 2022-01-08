import Auth from '../modules/Auth.js';

class Profile {
  constructor({$target, user}) {
    this.$target = $target;
    this.$user = user;
    
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