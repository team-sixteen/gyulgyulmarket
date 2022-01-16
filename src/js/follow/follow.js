import Auth from './modules/Auth.js';
// fetch();
import { BASE_URL, MAX_AGE, TOKEN_KEY, ACCOUNT_NAME } from '../js/constant.js';

const backButton = document.querySelector('.nav-top__btn--goback');
const followersButton = document.querySelector('.div.followers-num');
const followButton = document.querySelector('.s-btn');
const unfollowButton = document.querySelector('.s-btn--active');

function view() {
  alert('팔로우 리스트');
  nav_top.style.display = 'none';
  nav_new_top.classList.remove('hide');
}

const fetchFollow = () => {
  const selectedUser = localStorage.getItem('selectedUser');
  const token = localStorage.getItem('token');
  fetch(`${API}/profile/${selectedUser}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(() => fetchProfile());
};

const follow = () => {
  fetchFollow();
  followButton.classList.remove('is-active');
  unfollowButton.classList.add('is-active');
};

const fetchUnfollow = () => {
  const selectedUser = localStorage.getItem('selectedUser');
  const token = localStorage.getItem('token');
  fetch(`${API}/profile/${selectedUser}/unfollow`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(() => fetchProfile());
};

const unfollow = () => {
  fetchUnfollow();
  unfollowButton.classList.remove('is-active');
  followButton.classList.add('is-active');
};