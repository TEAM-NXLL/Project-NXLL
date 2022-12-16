import { getProductDetail } from "./getdata"
export function buyProduct() {
  const productId = location.hash.split('/')[1]
  const buyBtn = document.querySelector('.buy-btn')
  buyBtn.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify([productId]))
    location.hash = '#payment'
  })
}

export function shoppingBasket(res) {
  const productId = location.hash.split('/')[1]
  const cartBtn = document.querySelector('.cart-btn')

  async function getPrice() {
    const res = await getProductDetail(productId)
    // console.log(res.price)
    return res.price
  }
  cartBtn.addEventListener('click', () => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [] // [{}, {} ...]
    let newProduct = {
      'ID': productId,
      'QUANTITY': 1,
      'TITLE': res.title,
      'THUMB': res.thumbnail,
      'PRICE': res.price
    }
    // 카트가 안비어 있을 때
    if (cartList.length !== 0) {
      // 새롭에 추가한 상품의 id가 카트에 있을 때,
      cartList.forEach(async (el) => {
        const price = await getPrice()
        if (el.ID === productId) {
          el.QUANTITY += 1
          el.PRICE = price * el.QUANTITY
          console.log(price * el.QUANTITY)
        }
        localStorage.setItem('cart', JSON.stringify(cartList))
      })
      //

      // 새롭게 추가한 상품의 id가 카트에 없을 때
      const cartCheck = cartList.filter(el => el.ID === productId)
      if (cartCheck.length === 0) {
        cartList.push(newProduct)
      }
      // 로컬 스토리지에 해당 데이터 삽입
      // localStorage.setItem('cart', JSON.stringify(cartList))
      // 카트가 비어있을 때, 
    } else {
      console.log("빈배열로 이동")
      cartList.push(newProduct)
      localStorage.cart = (JSON.stringify(cartList))
    }
    showModal()
  })

  // 상품 총 수량 구하기
  function totalQuantity() {
    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    let quant = 0
    cartList.forEach(el => {
      quant += Number(el.QUANTITY)
    })
    return quant
  }

  //상품 총 금액 구하기
  function totalPrice() {

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
        <a href="#" class="btn-buy"><i class="fas fa-check"></i>바로 구매하기</a>
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
    btnClose.addEventListener('click', () => {
      MODAL.classList.remove('active')
    })
    // 수량 ++
    btnPlus.forEach(el => el.addEventListener('click', ({ target }) => {
      const text = target.closest('div').children[1]
      text.innerHTML = Number(text.textContent) + 1

      const productId = target.closest('.quantity').dataset.id
      cartList.forEach(async (el) => {
        const price = await getPrice()
        if (el.ID === productId) {
          el.QUANTITY += 1
          el.PRICE = price * el.QUANTITY
          console.log(price * el.QUANTITY)
        }
        // console.log(await getPrice())
      })
      // async function getPrice() {
      //   const res = await getProductDetail(productId)
      //   return res.price
      // }
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
          el.QUANTITY -= 1
        }
      })
      localStorage.setItem('cart', JSON.stringify(cartList))
      showModal()
    }))
  }
}