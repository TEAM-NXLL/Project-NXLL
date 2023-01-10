import { store } from '../util/store.js'

export const deliveryEl = store.selector('.delivery')
export const returnEl = store.selector('.return')
export const deliveryDes = store.selector('.delivery-des')
export const returnDes = store.selector('.return-des')

// 카테고리에 호버
export function mouseenter() {
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
export function mouseleave() {
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