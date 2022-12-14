import { doc } from "prettier";
import { getData, getLogin, getLogOut, stateLogin } from "./getdata.js";
import { router } from "./route.js";
import { deliveryEl, returnEl, deliveryDes, returnDes, mouseenter, mouseleave } from './footer.js'
import { joinForm, logInForm, myOrderForm, myShoppingForm, mainForm, userInfoForm, userAccountForm, detailForm, paymentForm } from "./body.js";
import { editUserInfo, userOwnBank, addNewAccount, choiceBank, bankChargeLookUp, ownAccountList, addAbleAccountList, cancelBank } from "./userInfo.js";
import { viewAllProduct } from '../admin/js/requests.js'
import { payAccountList, payBankLoopUp, buyProducts, lookProducts, cancelProduct } from './payment.js';

// 변수
const root = document.querySelector('main');

// function loginNjoin() {
//   loginRender()
//   joinRender()
// }

// 메인 페이지
async function renderMain() {
  const data = await viewAllProduct();
  root.innerHTML = mainForm();

  const keyboardList = document.querySelector('.keyboard > .inner')
  const mouseList = document.querySelector('.mouse > .inner')
  const newItemList = document.querySelector('.newItem > .inner')
  
  const keyboard = []
  const mouse = []
  const newItem = []
  
  data.forEach(e => {
    if (e['tags'] === '키보드') {
      keyboard.push(e)
      keyboardList.innerHTML = productList(keyboard)
    } else if (e['tags'] === '마우스') {
      mouse.push(e)
      mouseList.innerHTML = productList(mouse)
    } else {
      newItem.push(e)
      newItemList.innerHTML = productList(newItem);
    }
  })
  
  function productList(tags) {    
    const colorChart = ["beige", "pastelBeige", "mint", "pink", "white", "navy", "blueNavy", "black", "green", "gray"]
    const mainBody = []
    
    for (let i = 0; i < tags.length; i++) {
      const priceBox = document.querySelector('.priceBox')
      if(tags[i].thumbnail === null || tags[i].thumbnail === undefined) {
        tags[i].thumbnail = './images/preparingProduct.jpg'
      }
      mainBody.push(`
        <li>
          <a href="#details/${tags[i].id}"> 
            <div class="imgBox">
              <img src="${tags[i].thumbnail}" alt="">
            </div>
            <div class="colorBox">
      `)

        const randomNum = Math.ceil(Math.random() * 5)
        let randomIndexArray = []
      for (let j = 0; j < randomNum; j++) {
        const colorNum = Math.floor(Math.random() * 10);

        if (randomIndexArray.indexOf(colorNum) === -1) {
          randomIndexArray.push(colorNum);
          mainBody.push(`
                  <span class='${colorChart[colorNum]}'></span>
              `);
        }
      }

      const discountValue = Math.floor(Math.random() * 9 + 1) * 8;

      mainBody.push(`
              </div >
              <div class="textBox">
                    ${tags[i].title} <span>B300${i}</span>
              </div>
              <div class="priceBox">
                <span class="discount">${tags[
                  i
                ].price.toLocaleString()}원</span> 
                ${Math.floor(
                  (Number(tags[i].price) * (100 - discountValue)) / 100,
                ).toLocaleString()}원<br />
                <span class="salePercent">${discountValue}% SALE</span>
              </div>
            </a>
        </li>
      `)
    }
    return mainBody.join('');
  }

  // 메인 스와이퍼
  new Swiper('.mainSwiper', {
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
  });

  // 키보드 배너 스와이퍼
  new Swiper('.keyboardSwiper', {
    effect: 'fade',
    loop: true,
    autoplay: true,
    speed: 1000,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// 로그인 페이지 해시 값 + 화면 변경
function loginRender() {
  root.innerHTML = logInForm();
  sendLogin();
}

// 회원가입 페이지 해시 값 + 화면 변경
function joinRender() {
  root.innerHTML = joinForm();
  sendSignUp();
}

// 회원가입 처리 핸들러
function sendSignUp() {
  const formTag = document.querySelector('#form-tag');

  formTag.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idValue = document.querySelector('.id-input').value;
    const pwValue = document.querySelector('.pw-input').value;
    const nameValue = document.querySelector('.name-input').value;

    const res = await getData(idValue, pwValue, nameValue, null);
    document.cookie = `accessToken=${res.accessToken}; max-age=60`;
    if (res.user.email) {
      return (root.innerHTML = logInForm());
    } else {
      alert('정보를 다시 입력해 주세요');
    }
    e.stopPropagation();
  });
}

// 로그인 요청 핸들러 (localStorage 이름, 토큰값 추가)
function sendLogin() {
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idValue = document.querySelector('.signin-id-input').value;
    const pwValue = document.querySelector('.signin-pw-input').value;
    const res = await getLogin(idValue, pwValue);
    if (res.user.email) {
      const userName = res.user.displayName;
      const accessToken = res.accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userName', userName);
      completeLogin();
      location.href = '/';
    } else {
      alert('로그인 정보를 확인해 주세요.');
    }
    e.stopPropagation();
  });
}

// 로그아웃 핸들러
function logOut() {
  const logOutBtn = document.querySelector('.logOutBtn');
  logOutBtn.addEventListener('click', async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const res = await getLogOut(accessToken);
    if (res) {
      localStorage.removeItem('accessToken'),
        localStorage.removeItem('userName');
    }
    location.href = '/';
  });
}

// userName 있을 때 로그인 상태 유지 핸들러
function completeLogin() {
  const li = document.querySelector('.signUpsignIn');
  const userName = localStorage.getItem('userName');
  li.innerHTML = /*HTML*/ `
    <p><strong>${userName}</strong>님, 환영합니다.</p>
    <a class="logOutBtn">로그아웃</a>
    `;
  logOut();
}

// myshop 렌더링
async function renderMyShop() {
  const { totalBalance, accounts } = await userOwnBank();
  // const total = totalBalance.toLocaleString()
  const total = totalBalance ? totalBalance.toLocaleString() : '';
  root.innerHTML = myShoppingForm(total);
}

// myorder 렌더링
function renderMyOrder() {
  root.innerHTML = myOrderForm();
}

// userInfo 렌더링
async function renderUserInfo() {
  const res = await stateLogin(localStorage.accessToken);
  root.innerHTML = userInfoForm(res.email, res.displayName);
  const { totalBalance, accounts } = await userOwnBank();
  const total = totalBalance.toLocaleString();
  root.innerHTML += userAccountForm(total);
  bankChargeLookUp();
  ownAccountList(accounts);
  editUserInfo();
  addAbleAccountList();
  addNewAccount();
  choiceBank();
  cancelBank();
}

// detail 렌더링
async function renderDetail(productInfo) {
  root.innerHTML = detailForm(productInfo);
  // detailScrollEvent();
}

// payment 렌더링
async function renderPayment() {
  localStorage.setItem('cart', JSON.stringify(['bDsZ5y7DG9p39AlS05aj']))
  root.innerHTML = paymentForm()
  lookProducts()
  const { accounts } = await userOwnBank()
  payAccountList(accounts)
  payBankLoopUp()
  buyProducts()
  cancelProduct()
}

// footer 함수
mouseenter()
mouseleave()

// router
window.addEventListener('hashchange', router)
router();

// 로그인 로그아웃 확인
(async () => {
  // localStorage.length === 0 ? loginNjoin() : completeLogin();
  if (localStorage.accessToken) {
    const res = await stateLogin(localStorage.accessToken)
    res.displayName ? completeLogin() : window.localStorage.clear()
  } else return
})();

export { loginRender, joinRender, logOut, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment }

