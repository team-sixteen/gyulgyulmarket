export default class Slider {
  imgs;
  constructor(container, initImg = []) {
    this.$container = container;
    this.$ul = container.children[0];
    this.imgs = initImg;
    this.idx = 0;
    this.arrow_left = this.$container.querySelector('.slide-arrow-left');
    this.arrow_right = this.$container.querySelector('.slide-arrow-right');
    this.close = this.$container.querySelector('.upload-slide');
    this.points = this.$container.querySelector('.slide-points');
    this.initEvent();
    this.render();
  }

  getImgs() {
    return this.imgs;
  }

  addImg(img) {
    this.imgs = this.imgs.concat(img);
    this.render();
  }

  removeImg(id) {
    this.imgs = this.imgs.filter((img, idx) => idx != id ? img : null);
    this.render();
  }

  initEvent() {
    this.arrow_left.addEventListener('click', () => {
      this.idx--;
      this.arrow_right.style.display = 'block';
      if (this.idx == 0) {
        this.arrow_left.style.display = 'none';
      }

      this.$ul.style.marginLeft = `calc(${this.idx * 100}% * -1)`;
      Array.from(this.points.children).forEach((p, pid) => {
        if (pid === this.idx) p.style.backgroundColor = 'orange';
        else p.style.backgroundColor = 'white';
      });
    });
    this.arrow_right.addEventListener('click', () => {
      this.idx++;
      this.arrow_left.style.display = 'block';
      if (this.idx == this.imgs.length - 1) {
        this.arrow_right.style.display = 'none';
      }

      this.$ul.style.marginLeft = `calc(${this.idx * 100}% * -1)`;
      Array.from(this.points.children).forEach((p, pid) => {
        if (pid === this.idx) p.style.backgroundColor = 'orange';
        else p.style.backgroundColor = 'white';
      });
    });
    this.close.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.upload-slide-img-delete');
      if (closeBtn) {
        this.removeImg(closeBtn.id);
      }
    });
  }

  initialize() {
    if (this.imgs.length > 1) {
      this.arrow_right.style.display = 'block';
      this.points.innerHTML = this.imgs.map(() => `<li></li>`).join('');
      this.points.style.display = 'flex';
      this.$ul.style.width = `calc(${this.imgs.length * 100}%)`;
    } else {
      this.arrow_left.style.display = 'none';
      this.arrow_right.style.display = 'none';
      this.$ul.style.width = `100%`;
    }
  }

  render() {
    console.log(this.imgs);
    this.$ul.innerHTML = this.imgs.map((img, idx) => {
      return `
        <li class="upload-slide-item">
          <img
            src=${img}
            alt=""
            class="upload-slide-img">
          <button id=${idx} class="upload-slide-img-delete">X</button>
        </li>
      `;
    }).join('');

    this.initialize();
  }

}