// import {
//   createProduct,
//   viewAllProduct,
//   viewAllTransactions,
//   delProduct,
//   correctProduct,
//   transactionStatus,
// } from './requests';

const thumbnailInputEl = document.querySelector('#thumbnail-upload');
const nameInputEl = document.querySelector('.add-product-name');
const priceInputEl = document.querySelector('.add-product-price');
const tagInputEl = document.querySelector('.add')

// 상품태그 선택
function selectTag() {
  const checkedTag = document.querySelector('.tag:checked').value;
  console.log(checkedTag)
}
