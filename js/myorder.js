import { getTransactions, cancelTransactions, confirmation } from "./getdata.js"

// 구매 내역 렌더링
export async function transLookUp() {
  const products = await getTransactions(localStorage.accessToken)
  products.sort((a, b) => {
    return a.timePaid < b.timePaid ? -1 : a.timePaid > b.timePaid ? 1 : 0
  })
  const transProductEl = document.querySelector('.trans-product')
  products.forEach(product => {
    const decisionBtn = /* html */ `
    <button data-id=${product.detailId} class="hover-navy cancel-btn">주문 취소</button>
    <button data-id=${product.detailId} class="hover-navy confir-btn">주문 확정</button>
  `
    const stateDisplay = () => {
      if (product.done) {
        return '거래 완료'
      } else if (product.isCanceled) {
        return '주문 취소'
      } else return '주문 진행 중'
    }
    transProductEl.innerHTML += /* html */ `
    <tr class="buy-product">
      <td class="date">
        <p>${product.timePaid.slice(0, 10)}</p>
        <p class="order-number">${product.detailId}</p>
      </td>
      <td class="thumb">
        <a href="#detail/${product.product.productId}">
          <img src=${product.product.thumbnail}
            alt="상품 사진">
        </a>
      </td>
      <td class="product">
        <strong class="name">
          ${product.product.title}
        </strong> <br />
        <span>${product.product.description}</span>
      </td>
      <td class="quantity">1</td>
      <td class="price">${product.product.price.toLocaleString()}원</td>
      <td class="state">
        <p>${stateDisplay()}</p>
      </td>
      <td class="decision">
        ${stateDisplay() === '주문 진행 중' ? decisionBtn : '-'}
      </td>
    </tr>
    `
  })
}

// 구매 취소
export function cancelOrder() {
  const cancelBtn = document.querySelectorAll('.cancel-btn')
  cancelBtn.forEach(cancel => {
    cancel.addEventListener('click', async (e) => {
      const id = e.target.dataset.id
      await cancelTransactions(localStorage.accessToken, id)
      alert('구매가 취소되었습니다.')
    })
  })
}

// 구매 확정
export function confirOrder() {
  const confirBtn = document.querySelectorAll('.confir-btn')
  confirBtn.forEach(confir => {
    confir.addEventListener('click', async (e) => {
      const id = e.target.dataset.id
      const res = await confirmation(localStorage.accessToken, id)
      alert('구매가 확정되었습니다.')
    })
  })
}

// 취소 내역
export async function cancelOrderLookUp() {
  const transProductEl = document.querySelector('.trans-product')
  const products = await getTransactions(localStorage.accessToken)
  const cancels = products.filter(product => product.isCanceled === true)
  cancels.sort((a, b) => {
    return a.timePaid < b.timePaid ? -1 : a.timePaid > b.timePaid ? 1 : 0
  })
  cancels.forEach(cancel => {
    transProductEl.innerHTML += /* html */ `
    <tr class="buy-product">
      <td class="date">
        <p>${cancel.timePaid.slice(0, 10)}</p>
        <p class="order-number">${cancel.detailId}</p>
      </td>
      <td class="thumb">
        <a href="#detail/${cancel.product.productId}">
          <img src=${cancel.product.thumbnail}
            alt="상품 사진">
        </a>
      </td>
      <td class="product">
        <strong class="name">
          ${cancel.product.title}
        </strong> <br />
        <span>${cancel.product.description}</span>
      </td>
      <td class="quantity">1</td>
      <td class="price">${cancel.product.price.toLocaleString()}원</td>
      <td class="state">
        <p>주문 취소</p>
      </td>
      <td class="decision">
        -
      </td>
    </tr>
    `
  })
}

// 확정 내역
export async function confirOrderLookUp() {
  const transProductEl = document.querySelector('.trans-product')
  const products = await getTransactions(localStorage.accessToken)
  const confirs = products.filter(product => product.done === true)
  confirs.sort((a, b) => {
    return a.timePaid < b.timePaid ? -1 : a.timePaid > b.timePaid ? 1 : 0
  })
  confirs.forEach(confir => {
    transProductEl.innerHTML += /* html */ `
    <tr class="buy-product">
      <td class="date">
        <p>${confir.timePaid.slice(0, 10)}</p>
        <p class="order-number">${confir.detailId}</p>
      </td>
      <td class="thumb">
        <a href="#detail/${confir.product.productId}">
          <img src=${confir.product.thumbnail}
            alt="상품 사진">
        </a>
      </td>
      <td class="product">
        <strong class="name">
          ${confir.product.title}
        </strong> <br />
        <span>${confir.product.description}</span>
      </td>
      <td class="quantity">1</td>
      <td class="price">${confir.product.price.toLocaleString()}원</td>
      <td class="state">
        <p>주문 확정</p>
      </td>
      <td class="decision">
        -
      </td>
    </tr>
    `
  })
}