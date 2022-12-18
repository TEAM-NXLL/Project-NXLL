import { totalQuantity,showModal } from './detail.js';
import { cartCountCheck } from './main.js';

export function viewShoppingBag() {
  const shoppingBox = document.querySelector('.shopping-box')
  const CENTER_MODAL = document.querySelector('.modal-payment')
  if (location.hash.includes('#detail') && shoppingBox.classList.contains('block')) {
    CENTER_MODAL.classList.remove('active')
  }
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const MODAL = document.querySelector('.shopping-box')
  MODAL.innerHTML = /* html */ `
      <div class="bag-payment__header">
        <h3>장바구니</h3>
        <button class="bag-close">닫기 버튼</button>
      </div>
      <div class="bag-payment__body">
        <div class="bag-payment__title">
          <em>CART - LIST</em>
          <span class="subtext">내 장바구니 목록입니다.</span>
          <span class="total">총 <strong>${totalQuantity()}</strong>개의 물품</span>
        </div>
        <div class="bag-payment__list">
          <!-- item -->
        </div>
      </div>    
      <div class="bag-payment__footer">
        <a class="bag-btn-buy"><i class="fas fa-check"></i>바로 구매하기</a>
      </div>
    `

  const MODAL_LIST = document.querySelector('.bag-payment__list');

  if (cartList.length === 0) {
    MODAL_LIST.innerHTML = /* html */`
    <div class="text--empty">
      <p>장바구니가 비어있어요.
        <span>상품을 담아보세요.</span>
      </p>
    </div>
  `
  }
  
  cartList.forEach((item) => {
    const MODAL_ITEM = document.createElement('div');
    MODAL_ITEM.setAttribute('data-id', item.ID)
    MODAL_ITEM.classList.add('bag-payment__item');
    MODAL_ITEM.innerHTML = /* html */ `
        <div class="thumb">
          <img src="${item.THUMB ?? './images/preparingProduct.jpg'}" alt="상품 대표이미지">
        </div>
        <div class="description">
          <p class="name">${item.TITLE}</p>
          <p class="delivery-fee">배송비 무료</p>
        </div>
        <div class="quantity" data-id="${item.ID}">
          <button class="btn-minus"><i class="fa-solid fa-minus"></i></button>
          <span>${item.QUANTITY}</span>
          <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="price">
          <p>${item.PRICE} 원</p>
        </div>
        <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
      `
    MODAL_LIST.append(MODAL_ITEM);
  })

  const btnPlus = document.querySelectorAll('.btn-plus')
  const btnMinus = document.querySelectorAll('.btn-minus')
  const btnBuy = document.querySelector('.bag-btn-buy')
  const btnDelete = document.querySelectorAll('.btn-delete')


  btnDelete.forEach(el => el.addEventListener('click', ({ target }) => {
    const deleteTarget = target.closest('.bag-payment__item')
    const productId = deleteTarget.dataset.id
    let cartList = JSON.parse(localStorage.getItem('cart')) || []
    let cartFilter = []
    cartList.filter(e => {
      if (e.ID !== productId) {
        cartFilter.push(e)
      }
    })
    deleteTarget.remove()
    localStorage.setItem('cart', JSON.stringify(cartFilter))
    viewShoppingBag()
  }))

  // 수량 ++
  btnPlus.forEach((el) =>
    el.addEventListener('click', ({ target }) => {
      const text = target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) + 1
      
      const productId = target.closest('.quantity').dataset.id
      cartList.forEach((el) => {
        if (el.ID === productId) {
          el.QUANTITY += 1;
          el.PRICE = el.ORIGIN_PRICE * el.QUANTITY;
        }
      })

      localStorage.setItem('cart', JSON.stringify(cartList))
      viewShoppingBag()
    })
  )
  // 수량--
  btnMinus.forEach((el) =>
    el.addEventListener('click', ({ target }) => {
      const text = target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) - 1

      const productId = target.closest('.quantity').dataset.id
      cartList.forEach((el) => {
        if (el.ID === productId) {
          el.QUANTITY = el.QUANTITY === 1 ? 1 : el.QUANTITY - 1
          el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
        }
      })

      localStorage.setItem('cart', JSON.stringify(cartList))
      viewShoppingBag()
    })
  )

  const btnClose = document.querySelector('.bag-close')
  btnClose.addEventListener('click', () => {
    MODAL.classList.remove('block')
  })

  btnBuy.addEventListener('click', function () {
    MODAL.classList.remove('block');
    const accessToken = localStorage.accessToken
    if (accessToken) location.hash = '#payment'
    else location.hash = '#login'
  })
  cartCountCheck()
}
