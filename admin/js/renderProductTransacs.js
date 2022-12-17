import { viewAllTransactions, transactionStatus } from './requests.js';
import { renderAdminSummary } from './adminSummary.js';

// 전체 함수 생성자 함수로 만들어서 all 과 individual로 구분하기

export async function renderProductTransacs(DOM) {
  let transacs = await viewAllTransactions();

  const productTransacBtn = DOM.querySelector('.each-transac-btn-down');
  const hideBtn = DOM.querySelector('.each-transac-btn-up');
  const productTransacCont = DOM.querySelector('.transac-container');
  
  hideBtn.addEventListener('click', event => {
    hideBtn.style.display = "none"
    productTransacBtn.style.display = "block"
    productTransacCont.style.display = "none"  
  })
  productTransacBtn.addEventListener('click', (event) => {
    hideBtn.style.display = "block"
    productTransacBtn.style.display = "none"
    productTransacCont.style.display = "block"
    event.stopPropagation()
    productTransacCont.innerHTML = '';
    const productHead = document.createElement('div');
    productHead.classList.add('each-transac-item');
    productHead.classList.add('transac-head');
    productHead.innerHTML = /*html*/ `
    <div class="each-transacs-wrapper">
      <div class="each-transacId">거래번호</div>
      <div class="each-displayName">이름</div>
      <div class="each-email">이메일</div>
      <div class="each-bank-name">은행명</div>
      <div class="each-bank-code">은행코드</div>
      <div class="each-account-number">계좌번호</div>
      <div class="each-transac-time">거래시간</div>
      <div class="each-transac-status">거래상태</div>
    </div>
    `;
    productTransacCont.append(productHead)


    const transac = document.createElement('div');
    transac.classList.add('each-transac-item');

    const product_id = event.path[1].dataset.id;
    
    transacs.forEach((el) => {

      //transacId
      const transacId = el.detailId;
  
      //product
      const product = el.product;
      const id = product.productId;


      //확인
      if (product_id !== id) {
        return; // continue와 동일 기능
      }
  
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
      const timePaid = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();  // 제품을 거래한 시간
      const isCanceled = el.isCanceled; // 거래 취소 여부
      const done = el.done; // 거래 완료 여부
  
      
  
      const innerHTMLContents = /*html*/ `
          
          <div class="each-transacs-wrapper">
            <div class="each-transacId">${transacId}</div>
            <div class="each-displayName">${displayName}</div>
            <div class="each-email">${email}</div>
            <div class="each-bank-name">${bankName}</div>
            <div class="each-bank-code">${bankCode}</div>
            <div class="each-account-number">${accountNumber}</div>
            <div class="each-transac-time">${timePaid}</div>
            <div class="each-transac-status"> </div>
          </div>
      `;
  
      transac.innerHTML = innerHTMLContents;
    
      if (isCanceled) {
        transac.querySelector('.each-transac-status').innerHTML = /*html*/ `
          <div class = "isCanceled">거래 취소</div>
        `;
      } else if (done) {
        transac.querySelector('.each-transac-status').innerHTML = /*html*/ `
        <div class = "done">거래 완료</div>
      `;
      } else if (!done && !isCanceled) {
        transac.querySelector('.each-transac-status').innerHTML = /*html*/ `
        <div class = "transacting">거래중</div>
        <div class = "btn-wrapper">
          <button class = "isCanceled-btn">거래 취소</button>
          <button class = "done-btn">거래 완료</button>
        </div>`;
  
         // 버튼 이벤트 리스너 추가
        transac.querySelector('.isCanceled-btn').addEventListener('click', (event) => {
          transactionStatus(transacId, true, false);
          renderAdminSummary()
          setTimeout(() => {
            transac.querySelector('.each-transac-status').innerHTML = /*html*/ `
              <div class = "isCanceled">거래 취소</div>`
            }, 700)
          const TotalIncome = document.querySelector(".total-income-num")
          const newTotalIncome = parseInt(TotalIncome.innerText) + parseInt(event.path[6].querySelector('.price').innerText) 
          TotalIncome.innerText = newTotalIncome.toLocaleString()
        });
  
        transac.querySelector('.done-btn').addEventListener('click', (event) => {
          transactionStatus(transacId, false, true);
          renderAdminSummary()
          setTimeout(() => {
            transac.querySelector('.each-transac-status').innerHTML = /*html*/ `
              <div class = "done">거래 완료</div>`
            }, 700)
          const TotalIncome = document.querySelector(".total-income-num")
          console.log(TotalIncome)

          const newTotalIncome = parseInt(TotalIncome.innerText) + parseInt(event.path[6].querySelector('.price').innerText)
          TotalIncome.innerText = newTotalIncome.toLocaleString()
        });
      }
      productTransacCont.append(transac);
      console.log("완료")
    }); 
  })
}
