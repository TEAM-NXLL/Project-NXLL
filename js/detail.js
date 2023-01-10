import { cartCountCheck } from "./main.js"
import { viewShoppingBag } from "./shoppingBag.js"
import { token, $, root } from '../util/store.js'

// 바로 구매하기 버튼
export function buyProduct(product) {
  const buyBtn = $('.buy-btn')
  const selling = product.isSoldOut === true ? false : true
  buyBtn.onclick = () => {
    cart(product)
    if (token && selling) location.hash = '#payment'
    else if (token) popMessage()
    else location.hash = '#login'
  }
}

// 장바구니 버튼
export async function cart(product) {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const selling = product.isSoldOut === true ? false : true

  let newProduct = {
    ID: product.id,
    QUANTITY: 1,
    TITLE: product.title,
    THUMB: product.thumbnail,
    PRICE: product.price,
    ORIGIN_PRICE: product.price,
  }

  if (cartList.length > 0 && selling) {
    cartList.forEach(e => {
      if (e.ID === product.id) {
        e.QUANTITY += 1;
        e.PRICE = product.price * e.QUANTITY;
        localStorage.setItem('cart', JSON.stringify(cartList));
      } else {
        const cartCheck = cartList.filter(e => e.ID === product.id);
        if (cartCheck.length === 0) {
          cartList.push(newProduct);
          localStorage.setItem('cart', JSON.stringify(cartList));
        }
      }
    })
  } else if (selling) {
    cartList.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cartList));
  }
}


export function shoppingBasket(product) {
  const cartBtn = $('.cart-btn')
  const tabMenu = $('.tab-menu')
  const modalPayment = $('.modal-payment')
  const selling = product.isSoldOut === true ? false : true
  cartBtn.onclick = () => {
    if (modalPayment.classList.contains('active')) return
    cart(product)
    if (selling) showModal(product)
    else popMessage()
  }
  // 탭메뉴 클릭시 해당 위치로 스크롤 이동
  tabMenu.onclick = ({ target }) => {
    const topBanner = $('.top-banner')
    const el = target['name']
    const nameEl = $(`.${el}`)
    const scrollH = nameEl.getBoundingClientRect().top - topBanner.offsetHeight
    scrollTo({ left: 0, top: window.pageYOffset + scrollH, behavior: 'smooth' })
  }
  // 바로 구매하기 클릭시 연결 페이지
  const cartBtnBuy = $('.cart-buy-btn')
  cartBtnBuy.onclick = () => {
    if (token) location.hash = '#payment'
    else location.hash = '#login'
  }
}

// 품절 상품을 장바구니에 담으면 뜨는 팝업메세지
function popMessage() {
  const popUp = document.createElement('div')
  popUp.classList.add('pop-message', 'active')
  popUp.innerHTML = /* html */ `
    <p>품절된 상품입니다.</p>
  `
  root.append(popUp)
  setTimeout(() => {
    popUp.remove()
  }, 800)
}

// 상품 총 수량 구하기
export function totalQuantity() {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  let quant = 0;
  cartList.forEach((el) => {
    quant += Number(el.QUANTITY)
  })
  return quant
}

// 장바구니 모달창
export function showModal() {
  const shoppingBox = $('.shopping-box')
  shoppingBox.classList.remove('block')
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const MODAL = $('.modal-payment')
  const MODAL_BODY = $('.modal-payment__body', MODAL)
  MODAL.classList.add('active')
  MODAL_BODY.innerHTML = /* html */ `
      <div class="modal-payment__title">
        <em>CART - LIST</em>
        <span class="subtext">내 장바구니 목록입니다.</span>
        <span class="total">총 <strong>${totalQuantity()}</strong>개의 물품</span>
      </div>
      <div class="modal-payment__list">
        <!-- item -->
      </div>
  `

  const MODAL_LIST = $('.modal-payment__list')
  // 카트 비었을 때 대체 텍스트 보여주기
  if (cartList.length === 0) {
    MODAL_LIST.innerHTML = /* html */`
    <div class="text--empty">
      <p>장바구니가 비어있어요.
        <span>상품을 담아보세요.</span>
      </p>
    </div>
  `
  }
  // 상품 항목 만들어서 목록에 넣기
  cartList.forEach(item => {
    const MODAL_ITEM = document.createElement('div')
    MODAL_ITEM.setAttribute('data-id', item.ID)
    MODAL_ITEM.classList.add('modal-payment__item')

    MODAL_ITEM.innerHTML = /* html */`
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
    MODAL_LIST.append(MODAL_ITEM)
  })

  // const btnPlus = $('.btn-plus', document, true)
  const btnMinus = $('.btn-minus', document, true)
  const btnDelete = $('.btn-delete', document, true)

  // 장바구나 항목 삭제
  btnDelete.forEach(el => el.onclick = ({ target }) => {
    const deleteTarget = target.closest('.modal-payment__item')
    const productId = deleteTarget.dataset.id
    let cartList = JSON.parse(localStorage.getItem('cart')) || []
    let cartFilter = []
    cartList.filter(e => {
      if (e.ID !== productId) cartFilter.push(e)
    })
    deleteTarget.remove()
    localStorage.setItem('cart', JSON.stringify(cartFilter))
    showModal()
    viewShoppingBag()
  })

  // 수량 증가
  // btnPlus.forEach(el =>
  //   el.onclick = (e) => {
  //     const text = e.target.closest('div').children[1]
  //     text.innerHTML = Number(text.textContent) + 1

  //     const productId = e.target.closest('.modal-payment__item').dataset.id
  //     cartList.forEach((el) => {
  //       if (el.ID === productId) {
  //         el.QUANTITY += 1
  //         el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
  //       }
  //     })

  //     localStorage.setItem('cart', JSON.stringify(cartList))
  //     showModal()
  //     viewShoppingBag()
  //   }
  // )

  // 수량 감소
  btnMinus.forEach(el =>
    el.onclick = (e) => {
      const text = e.target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) - 1

      const productId = e.target.closest('.modal-payment__item').dataset.id
      cartList.forEach(el => {
        if (el.ID === productId) {
          el.QUANTITY = el.QUANTITY === 1 ? 1 : el.QUANTITY - 1
          el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
        }
      })
      localStorage.setItem('cart', JSON.stringify(cartList))
      showModal()
      viewShoppingBag()
    }
  )

  // 장바구니 모달창 닫기
  const btnClose = $('.btn-close')
  btnClose.onclick = () => {
    MODAL.classList.remove('active')
  }

  cartCountCheck()
}

