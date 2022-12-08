import { doc } from "prettier";
import { getData, getLogin, getLogOut } from "./getdata.js";
import { completeLogin } from "./test.js";
import { deliveryEl, returnEl, deliveryDes, returnDes, mouseenter, mouseleave } from './footer.js'

// 변수 모음
const joinBtn = document.querySelector('#join-btn')
const root = document.querySelector('main')
const loginBtn = document.querySelector('#login-btn')
const topNav = document.querySelector('.top-nav')

// 이벤트 리스너
joinBtn.addEventListener('click', joinRender)
loginBtn.addEventListener('click', () => {
  root.innerHTML = logInForm()
  sendLogin()
})

function joinRender() {
    root.innerHTML = joinForm();
    sendSignUp();
}

function joinForm() {
    return `
    <form id="form-tag">
      <ul class="table-area">
          <h1>JOIN - US</h1>
          <p>아래 정보를 꼼꼼히 입력하세요.</p>
          <li class="base">
          <h2>BASE <span>기본 정보를 입력하세요.</span> <span><img class="require" src="../images/icons/required.png" alt=""> 필수입력사항</span></h2>
          <table>
              <colgroup>
              <col style="width:150px" />
              <col style="width:auto"/>
          </colgroup>
          <tbody>
              <tr>
              <th scope="row">아이디<img class="require" src="../images/icons/required.png" alt=""></th>
              <td>
                  <input type="text" class="id-input">
                  (영문소문자/숫자, 4~16자)
              </td>
              </tr>
              <tr>
              <th>비밀번호<img class="require" src="../images/icons/required.png" alt=""></th>
              <td>
                  <input type="password" class="pw-input">
                  (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                </td>
              </tr>
              <tr>
                <th>비밀번호 확인<img class="require" src="../images/icons/required.png" alt=""></th>
                <td>
                  <input type="password" class="pw-input-2">
                </td>
              </tr>
              <tr>
                <th>이름<img class="require" src="../images/icons/required.png" alt=""></th>
                <td>
                  <input type="text" class="name-input">
                </td>
              </tr>
            </tbody>
          </table>
        </li>

        <button id="joinBtn" class="joinBtn hover-navy" type="submit"><i class="fa-solid fa-check"></i>회원가입</button>
      </ul>
    </form>
    `
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
        console.log(res.accessToken,'엑세스토큰')
        document.cookie = `accessToken=${res.accessToken}; max-age=60`
        if (res.user.email) {
            return root.innerHTML = logInForm()
        } else {
            alert('정보를 다시 입력해 주세요')
        }
        e.stopPropagation();
    })
}

function logInForm() {
    return `
    <form id="login-form">
      <ul class="logIn-area">
        <h1>LOGIN</h1>
        <li class="logIn-area__input">
          <input type="text" class="signin-id-input" placeholder="아이디">
          <input type="password" class="signin-pw-input" placeholder="비밀번호">
        </li>
        <li class="logIn-area__saveId">
          <input type="checkbox" id="saveId">
          <label for="saveId">아이디저장</label>
        </li>
        <button class="logInBtn" type="submit">로그인</button>
        <li class="logIn-area__find">
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
          <a href="./join.html">가입하기</a>
        </li>
      </ul>
    </form>
    `
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

// 메인 스와이퍼
const swiper1 = new Swiper('main > .swiper', {
  effect: 'fade',
  loop: true,
  autoplay: true,
  speed: 1000,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

// 키보드 스와이퍼
const swiper2 = new Swiper('.keyboard-banner > .swiper', {
  effect: 'fade',
  loop: true,
  autoplay: true,
  speed: 1000,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

// footer 함수
mouseenter()
mouseleave()