export function buyProduct() {
  const productId = location.hash.split('/')[1]
  const buyBtn = document.querySelector('.buy-btn')
  buyBtn.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify([productId]))
    location.hash = '#payment'
  })
}

export function shoppingBasket() {
  const productId = location.hash.split('/')[1]
  const cartList = []
  const cartBtn = document.querySelector('.cart-btn')
  cartBtn.addEventListener('click', () => {
    if (JSON.parse(localStorage.cart).length > 0) {
      cartList.push(JSON.parse(localStorage.getItem('cart')))
      cartList.push(productId)
      localStorage.setItem('cart', JSON.stringify(cartList))
    } else if (!localStorage.cart) {
      console.log('장바구니 없음')
      cartList.push(productId)
      localStorage.setItem('cart', JSON.stringify(cartList))
    }
  })
}