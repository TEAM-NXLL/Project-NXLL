const deliveryEl = document.querySelector('.delivery')
const returnEl = document.querySelector('.return')
const deliveryDes = document.querySelector('.delivery-des')
const returnDes = document.querySelector('.return-des')

// 카테고리에 호버
function mouseenter() {
  deliveryEl.addEventListener('mouseenter', () => {
    deliveryEl.classList.add('active')
    deliveryDes.style.display = 'flex'
    returnDes.style.display = 'none'
  })
  returnEl.addEventListener('mouseenter', () => {
    returnEl.classList.add('active')
    returnDes.style.display = 'flex'
    deliveryDes.style.display = 'none'
  })
}

// 카테고리에서 마우스 아웃
function mouseleave() {
  deliveryEl.addEventListener('mouseleave', () => {
    deliveryEl.classList.remove('active')
    deliveryDes.style.display = 'none'
    returnDes.style.display = 'flex'
  })
  returnEl.addEventListener('mouseleave', () => {
    returnEl.classList.remove('active')
    returnDes.style.display = 'none'
    deliveryDes.style.display = 'flex'
  })
}

export { deliveryEl, returnEl, deliveryDes, returnDes, mouseenter, mouseleave }