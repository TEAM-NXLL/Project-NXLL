import { doc } from 'prettier';
import {
  keepLogin,
  postSearch,
  getTransactions,
  getProductDetail,
  accountLookUp,
} from './requests.js';
import { router } from './route.js';
import {
  sendSignUp,
  sendLogin,
  adminLogin,
  completeLogin,
  adminPage,
} from './auth.js';
import {
  deliveryEl,
  returnEl,
  deliveryDes,
  returnDes,
  mouseenter,
  mouseleave,
} from './footer.js';
import {
  joinForm,
  logInForm,
  myOrderForm,
  myShoppingForm,
  mainForm,
  productList,
  userInfoForm,
  userAccountForm,
  detailForm,
  paymentForm,
  myCancelOrderForm,
  myConfirOrderForm,
  renderInnerCategory,
} from './body.js';
import {
  editUserInfo,
  userOwnBank,
  addNewAccount,
  bankChargeLookUp,
  ownAccountList,
  addAbleAccountList,
  cancelBank,
  selectedAccount,
} from './userInfo.js';
import { viewAllProduct } from '../admin/js/requests.js';
import {
  payAccountList,
  payBankLoopUp,
  buyProducts,
  lookProducts,
  cancelProduct,
  allCheckBox,
} from './payment.js';
import {
  cancelOrder,
  confirOrder,
  transLookUp,
  cancelOrderLookUp,
  confirOrderLookUp,
} from './myorder.js';
import { buyProduct, cart, shoppingBasket } from './detail.js';
import { token, $, root } from '../util/store.js';
import { showModal } from './detail.js';

// 변수
const shoppingBag = $('.shopping-btn');

// 페이지 새로 렌더하면 스크롤 맨 위로 이동하기
function startTop() {
  window.scrollTo(0, 0);
}

// 헤더 스크롤 고정
let prevScrollTop = 0;
document.onscroll = () => {
  const nav = $('.nav-area');
  const signUpsignIn = $('.signUpsignIn');
  const joinBtn = $('.join', signUpsignIn);
  let nextScrollTop = window.scrollY;

  if (nextScrollTop > prevScrollTop) {
    if (nextScrollTop > 120) {
      nav.classList.add('scroll');
      if (joinBtn) {
        joinBtn.children[0].classList.add('remove');
      }
    }
  } else if (nextScrollTop < prevScrollTop) {
    if (nextScrollTop < 100) {
      nav.classList.remove('scroll');
      if (joinBtn) {
        joinBtn.children[0].classList.remove('remove');
      }
    }
  }
  prevScrollTop = nextScrollTop;
};

// 장바구니에 담긴 상품 개수 확인
export function cartCountCheck() {
  const shoppingBtn = $('.shopping-btn');
  const cartCount = shoppingBtn.children[0];
  const cartList = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  if (cartList.length === 0) {
    cartCount.style.backgroundColor = '#ccc';
    cartCount.innerHTML = 0;
    return;
  }
  cartList.forEach((e) => {
    total += e.QUANTITY;
  });
  cartCount.innerHTML = total;
  cartCount.style.backgroundColor = 'red';
}

// 메인 페이지
export async function renderMain() {
  const data = await viewAllProduct('');
  root.innerHTML = mainForm();
  root.append();

  const keyboardList = $('.keyboard-inner');
  const mouseList = $('.mouse-inner');
  const newItemList = $('.newItem-inner');

  const keyboard = [];
  const mouse = [];
  const newItem = [];

  if (keyboard) {
    keyboardList.innerHTML = `<img src="./images/commingSoon.png"/>`;
    keyboardList.style.cssText = 'padding-bottom: 140px;';
  }
  if (mouse) {
    mouseList.innerHTML = `<img src="./images/commingSoon.png"/>`;
    mouseList.style.cssText = 'padding-bottom: 70px;';
  }
  if (newItem) {
    newItemList.innerHTML = `<img src="./images/commingSoon.png"/>`;
    newItemList.style.cssText = 'padding-bottom: 70px;';
  }

  data.forEach((e) => {
    if (e['tags'].includes('keyboard')) {
      keyboard.push(e);
      keyboardList.innerHTML = productList(keyboard);
    }
    if (e['tags'].includes('mouse')) {
      mouse.push(e);
      mouseList.innerHTML = productList(mouse);
    }
    if (e['tags'].includes('new-item')) {
      newItem.push(e);
      newItemList.innerHTML = productList(newItem);
    }
  });

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

// 카테고리별 제품조회
export async function renderCategory(tag) {
  const datas = await viewAllProduct('');
  const dataArr = [];

  for (let data of datas) {
    if (data.tags.includes(tag)) {
      dataArr.push(data);
    }
  }

  startTop();
  root.innerHTML = renderInnerCategory(tag, dataArr.length);

  let rootInner = document.createElement('ul');
  rootInner.classList.add('inner');
  rootInner.classList.add('block4');
  rootInner.style.margin = '140px auto 100px';

  rootInner.innerHTML += productList(dataArr);
  root.append(rootInner);
}

// 제품 검색
export async function productSearch(e) {
  const keyword = $('#keyword');

  if (e.key === 'Enter') {
    startTop();
    let rootInner = document.createElement('ul');
    rootInner.classList.add('inner');

    if (keyword.value === '') {
      alert('검색어를 입력해 주세요.');
    } else {
      let searchText = keyword.value.trim();
      let searchTags = [];
      let searchTitle = [];

      const data = await postSearch(searchText, searchTags);

      console.log(data);
      root.innerHTML = renderInnerCategory('search', data.length);
      root.append(rootInner);

      if (data.length === 0) {
        rootInner.innerHTML = /* HTML */ `
          <div class="imgBox" style="height: 300px; margin-top: 140px;">
            <img src="./images/emptySearch.gif" />
          </div>
          <p
            style="text-align:center; margin-bottom:170px; color: #333; font-size:15px;"
          >
            <i class="fa-solid fa-quote-left" style="vertical-align:top;"></i>
            <strong style="font-weight:bold; font-size:34px;"
              >${searchText}</strong
            >
            <i
              class="fa-sharp fa-solid fa-quote-right"
              style="vertical-align:bottom; margin-right:10px;"
            ></i
            >의 검색 결과가 없습니다.
          </p>
        `;
      } else {
        rootInner.classList.add('block4');
        rootInner.style.margin = '140px auto 100px';
        data.forEach((e) => {
          // 상품명으로 검색
          if (e.title.includes(searchText)) {
            searchTitle.push(e);
            rootInner.innerHTML = productList(data);
          }
        });
      }
      keyword.value = '';
    }
  }
}

keyword.onKeyup = (event) => {
  productSearch(event);
};

// detail 렌더링
export async function renderDetail() {
  const productId = location.hash.split('/')[1];
  const res = await getProductDetail(productId);
  history.scrollRestoration = 'manual';
  root.innerHTML = detailForm(res);
  shoppingBasket(res);
  buyProduct(res);
}

shoppingBag.onclick = () => {
  showModal();
};

// 로그인 페이지 해시 값 + 화면 변경
export function loginRender() {
  startTop();
  root.innerHTML = logInForm();
  sendLogin();
}

// 회원가입 페이지 해시 값 + 화면 변경
export function joinRender() {
  startTop();
  root.innerHTML = joinForm();
  sendSignUp();
}

// 관리자 로그인인지 확인
adminLogin(token);
// adminPage()

// myorder 렌더링 공통 사항
export async function listLookUp() {
  try {
    const products = await getTransactions();
    if (products !== '구매 내역이 존재하지 않습니다.') {
      products.sort((a, b) => {
        return a.timePaid < b.timePaid ? -1 : a.timePaid > b.timePaid ? 1 : 0;
      });
      const cancels = products.filter((product) => product.isCanceled === true);
      const confirs = products.filter((product) => product.done === true);
      return { products, cancels, confirs };
    }
  } catch (err) {
    console.log('로그인 안 함');
  }
}

// myshop 렌더링
export async function renderMyShop() {
  try {
    const { totalBalance } = await userOwnBank();
    const { products, cancels, confirs } = await listLookUp();
    const total = totalBalance ? totalBalance.toLocaleString() : 0;
    startTop();
    root.innerHTML = myShoppingForm(
      products.length,
      total,
      cancels.length,
      confirs.length,
    );
  } catch {
    startTop();
    root.innerHTML = myShoppingForm(0);
  }
}

// myorder 렌더링
export async function renderMyOrder() {
  try {
    const { products, cancels, confirs } = await listLookUp();
    startTop();
    root.innerHTML = myOrderForm(
      products.length,
      cancels.length,
      confirs.length,
    );
    transLookUp(products).then((res) => {
      cancelOrder();
      confirOrder();
    });
  } catch {
    startTop();
    root.innerHTML = myOrderForm();
    transLookUp().then((res) => {
      cancelOrder();
      confirOrder();
    });
  }
}

// myorder cancel 렌더링
export async function renderMyCancelOrder() {
  try {
    const { products, cancels, confirs } = await listLookUp();
    startTop();
    root.innerHTML = myCancelOrderForm(
      products.length,
      cancels.length,
      confirs.length,
    );
    cancelOrderLookUp(cancels);
  } catch {
    startTop();
    root.innerHTML = myCancelOrderForm();
    cancelOrderLookUp();
  }
}

// myorder confir 렌더링
export async function renderMyConfirOrder() {
  try {
    const { products, cancels, confirs } = await listLookUp();
    startTop();
    root.innerHTML = myConfirOrderForm(
      products.length,
      cancels.length,
      confirs.length,
    );
    confirOrderLookUp(confirs);
  } catch {
    startTop();
    root.innerHTML = myConfirOrderForm();
    confirOrderLookUp();
  }
}

// userInfo 렌더링
export async function renderUserInfo() {
  const res = await keepLogin();
  startTop();
  root.innerHTML = userInfoForm(res.email, res.displayName);
  const { totalBalance, accounts } = await userOwnBank();
  const total = totalBalance.toLocaleString();
  root.innerHTML += userAccountForm(total);
  selectedAccount(accounts);
  bankChargeLookUp();
  ownAccountList(accounts);
  editUserInfo();
  addAbleAccountList();
  addNewAccount();
  cancelBank();
}

// // detail 렌더링
// export async function renderDetail() {
//   const productId = location.hash.split('/')[1]
//   const res = await getProductDetail(productId)
//   startTop()
//   root.innerHTML = detailForm(res)
//   shoppingBasket(res)
//   buyProduct(res)
// }

// payment 렌더링
export async function renderPayment() {
  // startTop()
  history.scrollRestoration = 'manual';
  root.innerHTML = paymentForm();
  lookProducts();
  allCheckBox();
  const { accounts } = await userOwnBank();
  payAccountList(accounts);
  payBankLoopUp();
  buyProducts();
  cancelProduct();
}

// footer 함수
mouseenter();
mouseleave();

// router
window.onhashchange = router;
router();

// 로그인 로그아웃 확인
(async () => {
  const toAdminPageEl = $('.adminPage');
  if (token) {
    const res = await keepLogin();
    res.displayName ? completeLogin() : window.localStorage.clear();
  } else {
    toAdminPageEl.closest('li').remove();
    toAdminPageEl.href = '#';
  }
})();
