import { viewAllTransactions } from './requests';

export async function renderAlltransacs() {
  const transacs = await viewAllTransactions();
  console.log(transacs);
  transacs.forEach((el) => {
    //transacId
    const transacId = el.detailId;

    //product
    const product = el.product;
    const id = product.id;
    const title = product.title;
    const price = product.price;
    const tag = product.tag;
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
    const timePaid = el.timePaid; // 제품을 거래한 시간
    const isCanceled = el.isCanceled; // 거래 취소 여부
    const done = el.done; // 거래 완료 여부

    const transac = document.createElement('div');
    transac.classList.add('transac-item');

    const innerHTMLContents = /*html*/ `
        <div class="thumbnail">${thumbnail}</div>
        <div class="text-wrapper">
          <div class="transacId">${transacId}</div>
          <div class="displayName">${displayName}</div>
          <div class="email">${email}</div>
          <div class="id">${id}</div>
          <div class="title">${title}</div>
          <div class="price">${price}</div>
          <div class="tags">${tag}</div>
          <div class="bank-name">${bankName}</div>
          <div class="bank-code">${bankCode}</div>
          <div class="account-number">${accountNumber}</div>
          <div class="deal-status">${deal}</div>
          <div class="transac-time">${timePaid}</div>
          <div class="transac-status"> </div>
        </div>
    `;

    transac.innerHTML = innerHTMLContents;

    if (isCanceled === true) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
        <div class = "isCancled">거래 취소</div>
      `;
    } else if (done === true) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
      <div class = "done">거래 완료</div>
    `;
    } else if (done === false && isCanceled === false) {
      transac.querySelector('.transac-status').innerHTML = /*html*/ `
      <div class = "transacting">거래중</div>
      <button class = "isCancled-btn">거래 취소</button>
      <button class = "done-btn">거래 완료</button>
      `;
    }

    //여기 중복 되는 것 생성자 함수로 만들기
    // 버튼 이벤트 리스너 추가
    transac
      .querySelector('.isCancled-btn')
      .addEventListener('click', (event) => {
        //모달 띄우기
        //정말 거래를 취소하시겠습니까?
        //거래가 취소되었습니다. <-> 사용자 API와 공유하깈
        const product_id = event.path[3].querySelector('.transacId').innerTex;
        transactionStatus(product_id, true, false);
      });
    transac.querySelector('.done-btn').addEventListener('click', (event) => {
      //모달 띄우기
      //정말 거래를 완료하시겠습니까?
      //거래가 완료되었습니다.
      const product_id = event.path[3].querySelector('.transacId').innerTex;
      transactionStatus(product_id, false, true);
    });

    const productCont = document.querySelector('all-transac-container');
    productCont.append(transac);
  });
}
