import { renderAdminSummary } from './adminSummary.js';
import { viewAllTransactions, transactionStatus } from './requests.js';
import { $ } from '../../util/store.js';

export async function renderAlltransacs(transacs) {
  transacs.forEach((el) => {
    //transacId
    const transacId = el.detailId;

    //product
    const product = el.product;
    const id = product.productId;
    const title = product.title;
    const price = product.price;
    const tags = product.tags;
    const thumbnail = product.thumbnail;

    //account
    const account = el.account;
    const bankName = account.bankName;
    const bankCode = account.bankCode;
    const accountNumber = account.accountNumber;

    //user
    const user = el.user;
    const email = user.email;
    const displayName = user.displayName;

    //transaction info
    const date = new Date(el.timePaid);
    const timePaid =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); // 제품을 거래한 시간
    const isCanceled = el.isCanceled; // 거래 취소 여부
    const done = el.done; // 거래 완료 여부

    const transac = document.createElement('tr');
    transac.classList.add('properties');

    const innerHTMLContents = /*html*/ `
        <td class="thumbnail"><img src="${thumbnail}" alt="thumbnail"></td>
        <td class="transacId">${transacId}</td>
        <td class="displayName">${displayName}</td>
        <td class="email">${email}</td>
        <td class="id">${id}</td>
        <td class="title">${title}</td>
        <td class="price">${price.toLocaleString() + '원'}</td>
        <td class="tags">${tags}</td>
        <td class="bank-name">${bankName}</td>
        <td class="bank-code">${bankCode}</td>
        <td class="account-number">${accountNumber}</td>
        <td class="transac-time">${timePaid}</td>
        <td class="transac-status"> </td>
    `;

    transac.innerHTML = innerHTMLContents;

    if (isCanceled) {
      $('.transac-status', transac).innerHTML = /*html*/ `
        <div class = "isCanceled">거래 취소</div>
      `;
    } else if (done) {
      $('.transac-status', transac).innerHTML = /*html*/ `
      <div class = "done">거래 완료</div>
    `;
    } else if (!done && !isCanceled) {
      $('.transac-status', transac).innerHTML = /*html*/ `
      <div class = "transacting">거래중</div>
      <div class = "btn-wrapper">
        <button class = "isCanceled-btn">거래 취소</button>
        <button class = "done-btn">거래 완료</button>
      </div>`;

      // 버튼 이벤트 리스너 추가
      transacCancleBtn(transac, '.isCanceled-btn', true, false);
      transacCompleteBtn(transac, '.done-btn', false, true);
    }

    const allTransacs = $('.allTransacs');
    allTransacs.append(transac);
  });
}

function transacCancleBtn(transac, btn, isCancled, isDone) {
  $(btn, transac).onclick = function transacCancleHandler(event) {
    const product_id = $('.transacId', event.path[3]).innerText;
    transactionStatus(product_id, isCancled, isDone);
    setTimeout(() => {
      $('.transac-status', transac).innerHTML = /*html*/ `
        <div class = "isCanceled">거래 취소</div>`;
    }, 700);
    const cancledOrder = $('.purchase-cancled-num');
    cancledOrder.innerText = (
      parseInt(cancledOrder.textContent) + 1
    ).toLocaleString();
  };
}

function transacCompleteBtn(transac, btn, isCancled, isDone) {
  $(btn, transac).onclick = function transacCompleteHandler(event) {
    const product_id = $('.transacId', event.path[3]).innerText;
    transactionStatus(product_id, isCancled, isDone);
    setTimeout(() => {
      $('.transac-status', transac).innerHTML = /*html*/ `
        <div class = "done">거래 완료</div>`;
    }, 700);
    const totalIncome = $('.total-income-num');
    const confirmedPrice = parseInt(
      $('.price', event.path[3]).innerText.slice(0, 6).replaceAll(',', ''),
    );
    const newTotalIncome =
      parseInt(totalIncome.innerText.replaceAll(',', '')) + confirmedPrice;
    totalIncome.innerText = newTotalIncome.toLocaleString();
    const confirmedOrder = $('.purchase-confirmed-num');
    confirmedOrder.innerText = (
      parseInt(confirmedOrder.textContent) + 1
    ).toLocaleString();
  };
}
