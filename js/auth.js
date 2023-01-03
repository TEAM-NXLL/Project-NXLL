import { login, logout, signUp, keepLogin } from "./requests.js";
import { logInForm } from './body.js'
import { store } from './store.js'

const root = store.selector('main')

// 회원가입 처리 핸들러
export function sendSignUp() {
  const formTag = store.selector('#form-tag');

  formTag.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idValue = store.selector('.id-input').value;
    const pwValue = store.selector('.pw-input').value;
    const nameValue = store.selector('.name-input').value;

    try {
      const res = await signUp(idValue, pwValue, nameValue, null);
      return (root.innerHTML = logInForm());
    } catch (err) {
      console.log('회원가입 실패')
    }
    // e.stopPropagation();
  });
}

// 로그인 요청 핸들러
export function sendLogin() {
  const loginForm = store.selector('#login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idValue = store.selector('.signin-id-input').value;
    const pwValue = store.selector('.signin-pw-input').value;
    const res = await login(idValue, pwValue);
    try {
      const userName = res.user.displayName;
      const accessToken = res.accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userName', userName);
      completeLogin();
      location.href = '/';
    } catch (err) {
      console.log('로그인 실패')
    }
    e.stopPropagation();
  });
}

// 로그아웃 핸들러
export function logOut() {
  const logOutBtn = store.selector('.logOutBtn');
  logOutBtn.addEventListener('click', async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const res = await logout(accessToken);
    try {
      localStorage.removeItem('accessToken'),
        localStorage.removeItem('userName');
      location.href = '/';
    } catch (err) {
      console.log('로그아웃 실패')
    }
  });
}

// 로그인 유지 핸들러
export function completeLogin() {
  const li = store.selector('.signUpsignIn');
  const userName = localStorage.getItem('userName');
  li.innerHTML = /*HTML*/ `
    <p><strong>${userName}</strong>님, 환영합니다.</p>
    <a class="logOutBtn">로그아웃</a>
    `;
  logOut();
}

// 관리자 확인
export async function adminLogin(accessToken) {
  if (accessToken) {
    const authLogin = await keepLogin(accessToken)
    const toAdminPageEl = store.selector('.adminPage')
    if (authLogin.email ? authLogin.email.includes('admin') : false) {
      toAdminPageEl.href = './admin/admin.html'
    } else {
      toAdminPageEl.closest('li').remove()
      toAdminPageEl.href = '#'
    }
  } else return
}

// 관리자 페이지 접근
export function adminPage() {
  const toAdminPageEl = store.selector('.adminPage')
  toAdminPageEl.addEventListener('click', () => {
    if (toAdminPageEl.href.includes('#')) {
      alert('잘못된 접근입니다.')
    }
  })
}