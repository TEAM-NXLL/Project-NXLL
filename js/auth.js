import { login, logout, signUp, keepLogin } from "./requests.js";
import { logInForm } from './body.js'
import { token, $, root } from '../util/store.js'

// 회원가입 처리 핸들러
export function sendSignUp() {
  const formTag = $("#form-tag")
  formTag.onsubmit = (event) => sendSignUpHandler(event)
}

async function sendSignUpHandler(event) {
  event.preventDefault()
  const idValue = $(".id-input").value
  const pwValue = $(".pw-input").value
  const nameValue = $(".name-input").value
  const res = await signUp(idValue, pwValue, nameValue, null)
  if (res.user.displayName) {
    return root.innerHTML = logInForm()
  } else {
    console.log("회원가입 실패")
  }
}

// 로그인 요청 핸들러
export function sendLogin() {
  const loginForm = $("#login-form")
  loginForm.onsubmit = (event) => sendLoginHandler(event)
}

async function sendLoginHandler(event) {
  event.preventDefault()
  const idValue = $(".signin-id-input").value
  const pwValue = $(".signin-pw-input").value
  const res = await login(idValue, pwValue)
  console.log(res)
  if (res.user.displayName) {
    const userName = res.user.displayName
    const accessToken = res.accessToken
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("userName", userName)
    completeLogin()
    location.href = "/"
  } else {
    return
  }
}

// 로그아웃 핸들러
export function logOut() {
  const logOutBtn = $('.logOutBtn');
  // logOutBtn.addEventListener('click', handleSendLogOut)
  logOutBtn.onclick = sendLogOutHandler
}

async function sendLogOutHandler() {
  const accessToken = localStorage.getItem('accessToken');
  await logout(accessToken)
  try {
    localStorage.removeItem('accessToken'),
      localStorage.removeItem('userName');
    location.href = '/';
  } catch (err) {
    console.log('로그아웃 실패')
  }
}

// 로그인 유지 핸들러
export function completeLogin() {
  const li = $('.signUpsignIn');
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
    const authLogin = await keepLogin()
    const toAdminPageEl = $('.adminPage')
    if (authLogin.email ? authLogin.email.includes('admin') : false) {
      toAdminPageEl.href = './admin/admin.html'
    } else {
      toAdminPageEl.closest('li').remove()
      toAdminPageEl.href = '#'
    }
  } else return
}

// // 관리자 페이지 접근
// export function adminPage() {
//   const toAdminPageEl = $('.adminPage')
//   toAdminPageEl.addEventListener('click', () => {
//     if (toAdminPageEl.href.includes('#')) {
//       alert('잘못된 접근입니다.')
//     }
//   })
// }