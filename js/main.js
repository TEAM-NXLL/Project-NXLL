import { doc } from "prettier";
import { getData, getLogin, getLogOut, stateLogin, postSearch, getTransactions, getProductDetail } from "./getdata.js";
import { router } from "./route.js";
import { deliveryEl, returnEl, deliveryDes, returnDes, mouseenter, mouseleave } from './footer.js'
import { joinForm, logInForm, myOrderForm, myShoppingForm, mainForm, productList, userInfoForm, userAccountForm, detailForm, paymentForm, myCancelOrderForm, myConfirOrderForm } from "./body.js";
import { editUserInfo, userOwnBank, addNewAccount, choiceBank, bankChargeLookUp, ownAccountList, addAbleAccountList, cancelBank } from "./userInfo.js";
import { viewAllProduct } from '../admin/js/requests.js'
import { payAccountList, payBankLoopUp, buyProducts, lookProducts, cancelProduct, allCheckBox } from "./payment.js";
import { cancelOrder, confirOrder, transLookUp, cancelOrderLookUp, confirOrderLookUp } from "./myorder.js";
import { buyProduct, cart, shoppingBasket } from "./detail.js";

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

  if (keyboard) {
    keyboardList.innerHTML = `<img src="./images/commingSoon.png"/>`
    keyboardList.style.cssText = 'padding-bottom: 140px;';
  }
  if (mouse) {
    mouseList.innerHTML = `<img src="./images/commingSoon.png"/>`
    mouseList.style.cssText = 'padding-bottom: 70px;';
  }
  if (newItem) {
    newItemList.innerHTML = `<img src="./images/commingSoon.png"/>`
    newItemList.style.cssText = 'padding-bottom: 70px;';
  }

  data.forEach(e => {    
    // if(e.isSoldOut) {
    //   const priceBox = document.querySelector('.priceBox')
    //   priceBox.innerHTML = /*HTML*/ `
    //     <span>매진</span>
    //   `
    // }
    if (e['tags'].includes('키보드')) {
      keyboard.push(e)
      keyboardList.innerHTML = productList(keyboard)
    }
    if (e['tags'].includes('마우스')) {
      mouse.push(e)
      mouseList.innerHTML = productList(mouse)
    }
    if (e['tags'].includes('NEW ITEM')) {
      newItem.push(e)
      newItemList.innerHTML = productList(newItem);
    }
  })  

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

// 제품 검색
async function productSearch(e) {
  const keyword = document.querySelector('#keyword');

  if (e.key === 'Enter') {
    let rootInner = document.createElement('ul')
    rootInner.classList.add('inner')

    if (keyword.value === '') {
      alert('검색어를 입력해 주세요.')
    } else {
      let searchText = keyword.value.trim()
      let searchTags = []
      let searchTitle = []

      const data = await postSearch(searchText, searchTags);

      console.log(data)
      root.innerHTML = ''
      root.append(rootInner)

      if (data.length === 0) {
        rootInner.innerHTML = /* HTML */ `
          <div class="imgBox" style="height: 300px; margin-top: 140px;">
            <img src="./images/emptySearch.gif"/>
          </div>
          <p style="text-align:center; margin-bottom:170px; color: #333; font-size:15px;">
            <i class="fa-solid fa-quote-left" style="vertical-align:top;"></i> <strong style="font-weight:bold; font-size:34px;">${searchText}</strong> <i class="fa-sharp fa-solid fa-quote-right" style="vertical-align:bottom; margin-right:10px;"></i>의 검색 결과가 없습니다.
          </p>
        `
      } else {
        rootInner.classList.add('block4')
        rootInner.style.margin = '140px auto 100px'

        data.forEach(e => { 
          // 상품종류로 검색
          // if (e['tags'].includes(searchText)) {
          //   searchTags.push(e)
          //   rootInner.innerHTML = productList(searchTags)
          // }

          // 상품명으로 검색
          if (e.title.includes(searchText)) {
            searchTitle.push(e)
            rootInner.innerHTML = productList(data)
          }
        })  
      }
      keyword.value = ''
    }
  }
}

keyword.addEventListener('keyup', productSearch)

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
  const transactions = await getTransactions(localStorage.accessToken)
  root.innerHTML = myShoppingForm(transactions.length, total);
}

// myorder 렌더링 공통 사항
async function listLookUp() {
  const products = await getTransactions(localStorage.accessToken)
  const cancels = products.filter(product => product.isCanceled === true)
  const confirs = products.filter(product => product.done === true)
  return { products, cancels, confirs }
}

// myorder 렌더링
async function renderMyOrder() {
  const { products, cancels, confirs } = await listLookUp()
  root.innerHTML = myOrderForm(products.length, cancels.length, confirs.length);
  transLookUp().then(res => {
    cancelOrder()
    confirOrder()
  })
}

// myorder cancel 렌더링
async function renderMyCancelOrder() {
  const { products, cancels, confirs } = await listLookUp()
  root.innerHTML = myCancelOrderForm(products.length, cancels.length, confirs.length)
  cancelOrderLookUp()
}

// myorder confir 렌더링
async function renderMyConfirOrder() {
  const { products, cancels, confirs } = await listLookUp()
  root.innerHTML = myConfirOrderForm(products.length, cancels.length, confirs.length)
  confirOrderLookUp()
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
async function renderDetail() {
  const productId = location.hash.split('/')[1]
  const res = await getProductDetail(productId)
  root.innerHTML = detailForm(res)
  buyProduct(res)
  shoppingBasket(res)
}

// payment 렌더링
async function renderPayment() {
  // localStorage.setItem('cart', JSON.stringify(['fa5dOlMcvB8uoFDgvZWB', 'Ccm6lX9ORcpSAS8vXDBs'])) // 추후 삭제
  root.innerHTML = paymentForm()
  lookProducts()
  allCheckBox()
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

export { loginRender, joinRender, logOut, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment, renderMyCancelOrder, renderMyConfirOrder }