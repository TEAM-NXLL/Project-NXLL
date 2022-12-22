import { viewAllProduct } from './requests.js';
import { viewAllTransactions } from './requests.js';

export async function renderAdminSummary(allTransac, allProduct) {

  const adminSummary = document.querySelector('.admin-summary');

  // 삽입 생성자 함수
  function Status(selector, html) {
    adminSummary.querySelector(selector).innerHTML = html;
  }

  // 주문 현황
  const date = new Date();
  const today =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


  const newOrder = allTransac.filter((el) => {
    return el.timePaid.slice(0, 10) === today;
  });

  const purchaseConfirmed = allTransac.filter((el) => {
    return el.done === true;
  });

  const purchaseCancled = allTransac.filter((el) => {
    return el.isCanceled === true;
  });

  new Status(
    '.new-order',
    /*html*/ `
    <span class="new-order-text">신규 주문</span>
    <span class="new-order-num hilight">${newOrder.length}</span>
    <span class="num-text">건</span>
  `,
  );
  new Status(
    '.purchase-confirmed',
    /*html*/ `
    <span class="purchase-confirmed-text">구매 확정</span>
    <span class="purchase-confirmed-num hilight">${purchaseConfirmed.length}</span>
    <span class="num-text">건</span>
  `,
  );
  new Status(
    '.purchase-cancled',
    /*html*/ `
    <span class="purchase-cancled-text">거래 취소</span>
    <span class="purchase-cancled-num hilight">${purchaseCancled.length}</span>
    <span class="num-text">건</span>
  `,
  );

  // 거래 현황
  // 매출액 계산
  let allIncome = 0;
  allTransac.forEach((el) => {
    if (el && el.done) {
      allIncome += el.product.price;
    }
  });

  new Status(
    '.total-products-num',
    /*html*/ `
    <span class="total-products-num-text">전체 상품수</span>
    <span class="total-products-num hilight">${allProduct.length}</span>
    <span class="num-text">개</span>
  `,
  );
  new Status(
    '.total-income',
    /*html*/ `
    <span class="total-income-text">전체 판매액</span>
    <span class="total-income-num hilight">${allIncome.toLocaleString()}</span>
    <span class="num-text">원</span>
  `,
  );
  new Status(
    '.total-transac-num',
    /*html*/ `
    <span class="total-transac-num-text">전체 거래수</span>
    <span class="total-transac-num hilight">${allTransac.length}</span>
    <span class="num-text">건</span>
  `,
  );
}
