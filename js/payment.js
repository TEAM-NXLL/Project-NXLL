import { getBuy, getProductDetail } from './requests.js';
import { userOwnBank } from './userInfo.js';
import { renderPayment } from './main.js';
import { $ } from '../util/store.js';

// 주문 상품 정보 조회
export function lookProducts() {
  const tbodyEl = $('.products');
  const cart = JSON.parse(localStorage.cart);
  if (cart.length > 0) {
    cart.forEach(async (e) => {
      const res = await getProductDetail(e.ID);
      const product = document.createElement('tr');
      product.innerHTML = /* html */ `
        <td>
          <input type="checkbox" data-id="${res.id}" class="product-checkbox" />
        </td>
        <td>
          <a href="#detail/${res.id}">
            <img src="${res.thumbnail}" alt="" />
          </a>
        </td>
        <td>
          <span>${res.title}</span> <br />
        </td>
        <td>${res.price.toLocaleString()}원</td>
        <td class="product-quantity">${e.QUANTITY}</td>
        <td>[무료 배송]</td>
        <td class="product-price">${(
          res.price * e.QUANTITY
        ).toLocaleString()}원</td>`;
      priceCheck(product);
      tbodyEl.append(product);
    });
  } else return;
}

// 가격 렌더링
function renderTotalPrice() {
  const totalPriceEl = document.querySelectorAll('.total-price');
  const products = document.querySelectorAll('.products tr');
  let totalPrice = 0;
  products.forEach((el) => {
    if (el.querySelector('.product-checkbox').checked) {
      totalPrice += parseInt(
        el
          .querySelector('td:last-child')
          .textContent.slice(0, -1)
          .replace(',', ''),
      ); // 로케일 문자를 숫자로 변환
    }
  });
  totalPriceEl.forEach((el) => {
    el.textContent = totalPrice.toLocaleString() + `원`;
  });
}

// 선택 박스 상태 변화에 따라 가격 렌더링 변화
export function priceCheck(product) {
  const checkBox = $('.product-checkbox', product);
  checkBox.onchange = renderTotalPrice;
}

// 제품 전체 선택 및 해제
export function allCheckBox() {
  // const allCheckBox = $('th input[type=checkbox]');
  const allCheckBox = document.querySelector('tr input[type=checkbox]');
  const allCheckBoxHandler = () => {
    const eachCheckBoxs = $('.product-checkbox', document, true);
    if (allCheckBox.checked) {
      eachCheckBoxs.forEach((el) => (el.checked = true));
    } else {
      eachCheckBoxs.forEach((el) => (el.checked = false));
    }
    renderTotalPrice();
  };
  allCheckBox.onclick = allCheckBoxHandler;
}

// 삭제하기 버튼 클릭
export function cancelProduct() {
  const productDeleteBtn = $('.product-delete-btn');
  const productCheckBox = $('.product-checkbox', document, true);
  const cancelProductHandler = () => {
    productCheckBox.forEach((el) => {
      const isChecked = el.checked;
      try {
        if (isChecked) {
          const id = el.dataset.id;
          const cart = JSON.parse(localStorage.cart);
          const AfterCart = cart.filter((el) => el.ID !== id);
          localStorage.cart = JSON.stringify(AfterCart);
        }
      } catch {
        console.log('삭제 오류');
      }
    });
    renderPayment();
  };

  productDeleteBtn.onclick = cancelProductHandler;
}

// 보유 계좌 불러오기
export function payAccountList(accounts) {
  if (accounts.length > 0) {
    const payAccountEl = $('#pay-account');
    const noBankEl = $('.no-bank');
    noBankEl.remove();
    accounts.forEach((account) => {
      const createBankList = document.createElement('option');
      createBankList.value = account.bankCode;
      createBankList.setAttribute('data-id', account.id);
      createBankList.textContent = account.bankName;
      payAccountEl.appendChild(createBankList);
    });
  } else return;
}

// 보유 계좌 잔액 확인
export async function payBankLoopUp() {
  const { accounts } = await userOwnBank();
  const payAccountEl = $('#pay-account');
  const charge = $('.charge');
  payAccountEl.onchange = (event) => payBankLookUpHandler(event);
}

function payBankLookUpHandler(event) {
  accounts.forEach((account) => {
    if (account.bankCode === event.target.value) {
      charge.innerHTML = /* html */ `
      잔액: ${account.balance.toLocaleString()} 원
      `;
    } else if (
      event.target.value === 'default' ||
      event.target.value === null
    ) {
      charge.innerHTML = '';
    }
  });
}

// 구매 물품 확인하기
function checkProducts(productQuantity, productIds) {
  const checkBoxs = $('.product-checkbox', document, true);
  checkBoxs.forEach((el) => {
    if (el.checked) {
      productQuantity.forEach((product) => {
        if (el.dataset.id === product.ID) {
          for (let i = 1; i <= product.QUANTITY; i += 1) {
            productIds.push(el.dataset.id);
          }
        }
      });
    }
  });
}

// 결제하기
export async function buyProducts() {
  const paymentBtn = $('.payment-btn');
  paymentBtn.onclick = async function buyProductsHandler() {
    const payAccount = $('#pay-account');
    const dataResult = payAccount.options[payAccount.selectedIndex];
    const accountId = dataResult.dataset.id;
    const productQuantity = JSON.parse(localStorage.cart);
    let productIds = [];
    checkProducts(productQuantity, productIds);
    if (!productIds.length) {
      return alert('제품을 선택해 주세요.');
    }
    if (!accountId) {
      return alert('계좌를 선택해 주세요.');
    }
    const pay = async () => {
      for (const productId of productIds) {
        await getBuy(productId, accountId);
      }
      localStorage.cart = JSON.stringify([]);
      alert('거래 완료!');
      location.hash = '#myorder';
    };
    pay();
  };
}
