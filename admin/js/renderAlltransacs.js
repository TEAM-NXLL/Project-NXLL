import { renderAdminSummary } from './adminSummary.js';
import { viewAllTransactions, transactionStatus } from './requests.js';

export async function renderAlltransacs() {
  const transacs = await viewAllTransactions();

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
    const date = new Date(el.timePaid)
    const timePaid = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); // 제품을 거래한 시간
    const isCanceled = el.isCanceled; // 거래 취소 여부
    const done = el.done; // 거래 완료 여부

    const transac = document.createElement('div');
    transac.classList.add('properties');

    const innerHTMLContents = /*html*/ `
        <div class="thumbnail"><img src="${thumbnail}" alt="thumbnail"></div>
        <div class="text-wrapper">
          <div class="transacId">${transacId}</div>
          <div class="displayName">${displayName}</div>
          <div class="email">${email}</div>
          <div class="id">${id}</div>
          <div class="title">${title}</div>
          <div class="price">${price.toLocaleString()+'원'}</div>
          <div class="tags">${tags}</div>
          <div class="bank-name">${bankName}</div>
          <div class="bank-code">${bankCode}</div>
          <div class="account-number">${accountNumber}</div>
          <div class="transac-time">${timePaid}</div>
          <div class="transac-status"> </div>
        </div>
    `;

    transac.innerHTML = innerHTMLContents;

    if (isCanceled) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
        <div class = "isCanceled">거래 취소</div>
      `;
    } else if (done) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
      <div class = "done">거래 완료</div>
    `;
    } else if (!done && !isCanceled) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
      <div class = "transacting">거래중</div>
      <div class = "btn-wrapper">
        <button class = "isCanceled-btn">거래 취소</button>
        <button class = "done-btn">거래 완료</button>
      </div>`;

       // 버튼 이벤트 리스너 추가
      transac.querySelector('.isCanceled-btn').addEventListener('click', (event) => {
        console.log(event.path);
        const product_id = event.path[3].querySelector('.transacId').innerText;
        transactionStatus(product_id, true, false);
        renderAdminSummary()
        setTimeout(() => {
          transac.querySelector('.transac-status').innerHTML = /*html*/ `
            <div class = "isCanceled">거래 취소</div>`
          }, 700)
        const TotalIncome = document.querySelector(".total-income-num")
        const newTotalIncome = parseInt(TotalIncome.innerText) + parseInt(event.path[3].querySelector('.price').innerText) 
        TotalIncome.innerText = newTotalIncome.toLocaleString()
      });

      transac.querySelector('.done-btn').addEventListener('click', (event) => {
        const product_id = event.path[3].querySelector('.transacId').innerText;
        transactionStatus(product_id, false, true);
        renderAdminSummary()
        setTimeout(() => {
          transac.querySelector('.transac-status').innerHTML = /*html*/ `
            <div class = "done">거래 완료</div>`
          }, 700)
        const TotalIncome = document.querySelector(".total-income-num")
        const newTotalIncome = parseInt(TotalIncome.innerText) + parseInt(event.path[3].querySelector('.price').innerText) 
        TotalIncome.innerText = newTotalIncome.toLocaleString()
      });
    }

    const productCont = document.querySelector('.all-transac-container');
    productCont.append(transac);
  });
}
