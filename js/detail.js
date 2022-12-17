export function buyProduct(product) {
  const buyBtn = document.querySelector('.buy-btn')
  const selling = product.isSoldOut === true ? false : true
  buyBtn.addEventListener('click', () => {
    let newProduct = {
      'ID': product.id,
      'QUANTITY': 1,
      'TITLE': product.title,
      'THUMB': product.thumbnail,
      'PRICE': product.price,
      'ORIGIN_PRICE': product.price
    }
    localStorage.setItem('cart', JSON.stringify([newProduct]))
    const accessToken = localStorage.accessToken
    if (accessToken && selling) location.hash = '#payment'
    else if (accessToken) popMessage()
    else location.hash = '#login'
  })
}

async function cart(product) {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const selling = product.isSoldOut === true ? false : true

  let newProduct = {
    'ID': product.id,
    'QUANTITY': 1,
    'TITLE': product.title,
    'THUMB': product.thumbnail,
    'PRICE': product.price,
    'ORIGIN_PRICE': product.price
  }

  if (cartList.length > 0 && selling) {
    cartList.forEach(e => {
      if (e.ID === product.id) {
        e.QUANTITY += 1
        e.PRICE = product.price * e.QUANTITY
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const cartCheck = cartList.filter(e => e.ID === product.id)
        if (cartCheck.length === 0) {
          cartList.push(newProduct)
          localStorage.setItem('cart', JSON.stringify(cartList))
        }
      }
    })
  } else if (selling) {
    cartList.push(newProduct)
    localStorage.setItem('cart', JSON.stringify(cartList))
  }
}

export function shoppingBasket(product) {
  const cartBtn = document.querySelector('.cart-btn')
  const tabMenu = document.querySelector('.tab-menu')
  const selling = product.isSoldOut === true ? false : true
  cartBtn.addEventListener('click', () => {
    cart(product)
    if (selling) showModal(product)
    else popMessage()
  })
  tabMenu.addEventListener('click', ({ target }) => {
    const topBanner = document.querySelector('.top-banner')
    const el = target['name']
    const nameEl = document.querySelector(`.${el}`)
    const scrollH = nameEl.getBoundingClientRect().top - topBanner.offsetHeight
    scrollTo({ left: 0, top: window.pageYOffset + scrollH, behavior: 'smooth' })
  })
}

function popMessage() {
  const main = document.querySelector('main')
  const popUp = document.createElement('div')
  popUp.classList.add('pop-message', 'active')
  popUp.innerHTML = /* html */`
    <p>품절된 상품입니다.</p>
  `
  main.append(popUp)
  setTimeout(() => {
    popUp.remove()
  }, 800)
}

// 상품 총 수량 구하기
function totalQuantity() {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  let quant = 0
  cartList.forEach(el => {
    quant += Number(el.QUANTITY)
  })
  return quant
}

// 모달창
function showModal() {
  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const MODAL = document.querySelector('.modal-payment')
  MODAL.classList.add('active')
  MODAL.innerHTML = /* html */`
      <div class="modal-payment__header">
        <h3>장바구니 담기</h3>
        <span>물품을 미리 확인하세요</span>
        <button class="btn-close">닫기 버튼</button>
      </div>
      <div class="modal-payment__body">
        <div class="modal-payment__title">
          <em>CART - LIST</em>
          <span class="subtext">내 장바구니 목록입니다.</span>
          <span class="total">총 <strong>${totalQuantity()}</strong>개의 물품</span>
        </div>
        <div class="modal-payment__list">
          <!-- item -->
        </div>
      </div>    
      <div class="modal-payment__footer">
        <span>* 쇼핑을 계속하시려면 이 창을 닫아주시길 바랍니다.</span>
        <a class="cart-btn-buy"><i class="fas fa-check"></i>바로 구매하기</a>
      </div>
    `

  const MODAL_LIST = document.querySelector('.modal-payment__list')
  cartList.forEach(item => {
    const MODAL_ITEM = document.createElement('div')
    MODAL_ITEM.classList.add('modal-payment__item')
    MODAL_ITEM.innerHTML = /* html */`
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
    MODAL_LIST.append(MODAL_ITEM)
  })

  const btnClose = document.querySelector('.btn-close')
  const btnPlus = document.querySelectorAll('.btn-plus')
  const btnMinus = document.querySelectorAll('.btn-minus')
  const btnBuy = document.querySelector('.cart-btn-buy')

  btnClose.addEventListener('click', () => {
    MODAL.classList.remove('active')
  })
  // 수량 ++
  btnPlus.forEach(el => el.addEventListener('click', ({ target }) => {
    const text = target.closest('div').children[1]
    text.innerHTML = Number(text.textContent) + 1

    const productId = target.closest('.quantity').dataset.id
    cartList.forEach(el => {
      if (el.ID === productId) {
        el.QUANTITY += 1
        el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
      }
    })

    localStorage.setItem('cart', JSON.stringify(cartList))
    showModal()
  }))
  // 수량--
  btnMinus.forEach(el => el.addEventListener('click', ({ target }) => {
    const text = target.closest('div').children[1]
    text.innerHTML = Number(text.textContent) - 1

    const productId = target.closest('.quantity').dataset.id
    cartList.forEach(el => {
      if (el.ID === productId) {
        el.QUANTITY = el.QUANTITY === 0 ? 0 : el.QUANTITY - 1
        el.PRICE = el.ORIGIN_PRICE * el.QUANTITY
      }
    })

    localStorage.setItem('cart', JSON.stringify(cartList))
    showModal()
  }))

  btnBuy.addEventListener('click', function () {
    const accessToken = localStorage.accessToken
    if (accessToken) location.hash = '#payment'
    else location.hash = '#login'
  })
}