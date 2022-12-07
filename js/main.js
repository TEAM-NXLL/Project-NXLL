import { doc } from "prettier";
import { getData, getLogin, getLogOut } from "./getdata.js";
import { completeLogin } from "./test.js";
import { router } from "./route.js";
import { joinForm, logInForm } from "./body.js";

// 변수 모음
const joinBtn = document.querySelector('#join-btn')
const root = document.querySelector('main')
const loginBtn = document.querySelector('#login-btn')
const topNav = document.querySelector('.top-nav')
const idName = document.querySelector('#login-btn')



// 이벤트 리스너
joinBtn.addEventListener('click', joinRender)
loginBtn.addEventListener('click', loginRender)

function loginRender() {
  location.hash = "#login"
  root.innerHTML = logInForm()
  sendLogin()
}

function joinRender() {
  location.hash = "#join"
  root.innerHTML = joinForm();
  sendSignUp();
}


const sendLogin = () => {
  const loginForm = document.querySelector('#login-form')

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const idValue = document.querySelector('.signin-id-input').value
    const pwValue = document.querySelector('.signin-pw-input').value

    const res = await getLogin(idValue, pwValue)
    if (res.user.email) {
      console.log(res)
      completeLogin(res.user.displayName)

      const accessToken = res.accessToken
      localStorage.setItem("accessToken", accessToken)
      return root.innerHTML = ''
    } else {
      alert('로그인 정보를 확인해 주세요.')
    }
    e.stopPropagation();
  })
}

const sendSignUp = () => {
  const formTag = document.querySelector('#form-tag')
  // const joinBtn = document.querySelector('#joinBtn')

  formTag.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(e)
    const idValue = document.querySelector('.id-input').value
    const pwValue = document.querySelector('.pw-input').value
    const nameValue = document.querySelector('.name-input').value

    const res = await getData(idValue, pwValue, nameValue, null)
    console.log(res, "res")
    console.log(res.accessToken, '엑세스토큰')
    document.cookie = `accessToken=${res.accessToken}; max-age=60`
    if (res.user.email) {
      return root.innerHTML = logInForm()
    } else {
      alert('정보를 다시 입력해 주세요')
    }
    e.stopPropagation();
  })
}

const logOut = () => {
  const logOutBtn = document.querySelector('.logOutBtn')
  logOutBtn.addEventListener('click', async () => {
    const accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)
    const res = await getLogOut(accessToken)
    res ? localStorage.removeItem('accessToken') : console.log('에러다')
    location.href = '/'
  })
}

window.addEventListener('hashchange', router)

export { loginRender, joinRender, logOut }
