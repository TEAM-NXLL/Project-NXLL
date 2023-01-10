import { store } from '../../js/store.js';
import { toast } from './toast.js';
import { requestAPI } from '../../util/requestAPI.js';

// 제품 추가
export async function createProduct({ title, price, description, tags = '', thumbnailBase64 = '', photoBase64 = '', }) {
  let data = { title, price, description, tags, thumbnailBase64, photoBase64 }
  return await requestAPI({ type: 'POST', endpoint: '/products', page: 'admin', data })
}

// 모든 제품 조회
export async function viewAllProduct() {
  return await requestAPI({ type: 'GET', endpoint: '/products', page: 'admin' })
}

// 전체 거래 내역
export async function viewAllTransactions() {
  return await requestAPI({ type: 'GET', endpoint: '/products/transactions/all', page: 'admin' })
}

// 거래 내역 완료/취소 및 해제
export async function transactionStatus(detailId, isCanceled, done) {
  let data = { detailId, isCanceled, done }
  return await requestAPI({ type: 'PUT', endpoint: `/products/transactions/${detailId}`, data, page: 'admin' })
}

// 제품 수정
export async function correctProduct({ productId, title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut }) {
  let data = {
    title,
    price,
    description,
    tags,
    thumbnailBase64,
    photoBase64,
    isSoldOut
  }
  return await requestAPI({ type: 'PUT', endpoint: `/products/transactions/${productId}`, data, page: 'admin' })
}

//제품 삭제
export async function delProduct(productId) {
  let data = { productId }
  return await requestAPI({ type: 'DELETE', endpoint: `/products/${productId}`, data, page: 'admin' })
}