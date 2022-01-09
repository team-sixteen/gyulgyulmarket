import Auth from '../modules/Auth.js';

class Follow {
    constructor($target) {
    this.$target = $target;
        this.$target = $target;
        this.$inputFollowers = this.$target.querySelector('.followers-num.accountname');
        this.initEvent();
    }

  initEvent() {
    this.$target.querySelector('#upload-img')
    .addEventListener('view', (e) => {
      const followers = e.target.files[0];
      if (this.validateImageType(image)) {
        const txtURL = window.URL.createObjectURL(Text);
        document.querySelector('.followers-num').src = txtURL;
      }
    }
  }
}