import { totalQuantity,showModal } from './detail.js';
import { cartCountCheck } from './main.js';

export function viewShoppingBag() {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const MODAL = document.querySelector('.shopping-box')
  // MODAL.classList.add('active');
  MODAL.innerHTML = /* html */ `
      <div class="bag-payment__header">
        <h3>장바구니</h3>
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
        <a class="cart-btn-buy"><i class="fas fa-check"></i>장바구니 이동</a>
      </div>
    `

  const MODAL_LIST = document.querySelector('.bag-payment__list');
  cartList.forEach((item) => {
    const MODAL_ITEM = document.createElement('div');
    MODAL_ITEM.classList.add('bag-payment__item');
    MODAL_ITEM.innerHTML = /* html */ `
        <div class="thumb">
          <img src="${item.THUMB}" alt="상품 대표이미지">
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
      `
    MODAL_LIST.append(MODAL_ITEM);
  })

  const btnClose = document.querySelector('.btn-close')
  const btnPlus = document.querySelectorAll('.btn-plus')
  const btnMinus = document.querySelectorAll('.btn-minus')
  const btnBuy = document.querySelector('.cart-btn-buy')
  const test = document.querySelector('.item-count')

  // 수량 ++
  btnPlus.forEach((el) =>
    el.addEventListener('click', ({ target }) => {
      const text = target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) + 1
      test.textContent = totalQuantity()
      
      const productId = target.closest('.quantity').dataset.id
      cartList.forEach((el) => {
        if (el.ID === productId) {
          el.QUANTITY += 1;
          el.PRICE = el.ORIGIN_PRICE * el.QUANTITY;
        }
      })

      localStorage.setItem('cart', JSON.stringify(cartList))
      viewShoppingBag()
      showModal()
    })
  )
  // 수량--
  btnMinus.forEach((el) =>
    el.addEventListener('click', ({ target }) => {
      const text = target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) - 1
      test.textContent = totalQuantity()

      const productId = target.closest('.quantity').dataset.id
      cartList.forEach((el) => {
        if (el.ID === productId) {
          el.QUANTITY = el.QUANTITY === 1 ? 1 : el.QUANTITY - 1
          el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
        }
      })

      localStorage.setItem('cart', JSON.stringify(cartList))
      viewShoppingBag()
      showModal()
    })
  )

  btnBuy.addEventListener('click', function () {
    MODAL.classList.remove('block');
    const accessToken = localStorage.accessToken
    if (accessToken) location.hash = '#payment'
    else location.hash = '#login'
  })
}
