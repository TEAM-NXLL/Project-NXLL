import { doc } from "prettier";
import { getData, getLogin, getLogOut } from "./getdata.js";
import { completeLogin } from "./test.js";
import { router } from "./route.js";
import { joinForm, logInForm } from "./body.js";

const root = document.querySelector('main')


// 이벤트 리스너

// 로그인이랑 로그아웃 감시하는 녀석
function loginNjoin() {
  const joinBtn = document.querySelector('#join-btn')
  const loginBtn = document.querySelector('#login-btn')
  joinBtn.addEventListener('click', joinRender)
  loginBtn.addEventListener('click', loginRender)
}

// 로그인 페이지 해시값 회원가입 페이지 해시값 추가 + 화면 변경

function loginRender() {
  location.hash = '#login'
  root.innerHTML = logInForm()
  sendLogin()
}

function joinRender() {
  location.hash = '#join'
  root.innerHTML = joinForm();
  sendSignUp();
}


// 로그인 요청 보냈을 때 localstorage에 이름이랑 토큰값 추가 하고 메인 페이지로

const sendLogin = () => {
  const loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const idValue = document.querySelector('.signin-id-input').value
    const pwValue = document.querySelector('.signin-pw-input').value
    const res = await getLogin(idValue, pwValue)
    if (res.user.email) {
      console.log(res)
      const userName = res.user.displayName
      const accessToken = res.accessToken
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("userName", userName)
      completeLogin()
      location.href = '/'
    } else {
      alert('로그인 정보를 확인해 주세요.')
    }
    e.stopPropagation();
  })
}

// 회원가입 눌렀을 때 처리되는 요청들 

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
    if (res.user.email) {
      return root.innerHTML = logInForm()
    } else {
      alert('정보를 다시 입력해 주세요')
    }
    e.stopPropagation();
  })
}

// 로그아웃 버튼이 생겼을 때 로그아웃 시키는 버튼 

function logOut() {
  const logOutBtn = document.querySelector('.logOutBtn')
  console.log('야호')
  logOutBtn.addEventListener('click', async () => {
    const accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)
    const res = await getLogOut(accessToken)
    if (res) {
      localStorage.removeItem('accessToken'),
        localStorage.removeItem('userName')
    }
    location.href = '/'
  })
}




(() => {
  localStorage.length === 0 ? loginNjoin() : completeLogin();

})();



window.addEventListener('hashchange', router)
router();
export { loginRender, joinRender, logOut }
