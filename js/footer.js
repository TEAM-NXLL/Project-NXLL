import { $ } from '../util/store.js'

export const deliveryEl = $(".delivery")
export const returnEl = $(".return")
export const deliveryDes = $(".delivery-des")
export const returnDes = $(".return-des")

// 카테고리에 호버
export function mouseenter() {
  deliveryEl.onmouseenter = deliveryEnterHandler
  returnEl.onmouseenter = returnEnterHanlder
}

function deliveryEnterHandler() {
  deliveryEl.classList.add('active')
  deliveryDes.style.display = 'flex'
  returnDes.style.display = 'none'
}

function returnEnterHanlder() {
  returnEl.classList.add('active')
  returnDes.style.display = 'flex'
  deliveryDes.style.display = 'none'
}

// 카테고리에서 마우스 아웃
export function mouseleave() {
  deliveryEl.onmouseout = deliveryOutHandler
  returnEl.onmouseout = returnOutHandler
}

function deliveryOutHandler() {
  deliveryEl.classList.remove('active')
  deliveryDes.style.display = 'none'
  returnDes.style.display = 'flex'
}

function returnOutHandler() {
  returnEl.classList.remove('active')
  returnDes.style.display = 'none'
  deliveryDes.style.display = 'flex'
}