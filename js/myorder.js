import { getTransactions, cancelTransactions, confirmation } from "./getdata.js"

// 구매 내역 렌더링
export async function transLookUp() {
  const products = await getTransactions(localStorage.accessToken)
  console.log(products)
  const transProductEl = document.querySelector('.trans-product')
  products.forEach(product => {
    const decisionBtn = /* html */ `
    <button data-id=${product.detailId} class="hover-navy cancel-btn">주문 취소</button>
    <button data-id=${product.detailId} class="hover-navy confir-btn">주문 확정</button>
  `
    const stateDisplay = () => {
      if (product.done) {
        return '주문 완료'
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