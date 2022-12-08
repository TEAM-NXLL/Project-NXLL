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
  // post요청 함수에 넣을 tags의 값을 반환하게
}



// 제품 추가
// export async function createProduct(
//   title,
//   price,
//   description,
//   tags = '',
//   thumbnail = '', // 기본 썸네일
//   photo = '', // 기본 사진
// ) {
//   const res = await fetch(
//     store.url + '/products',
//     createRequest('POST', {title, price, description, tags, thumbnail, photo}));
//   console.log(res);
//   return res;
// }
// 제품 추가 결과
// {"id": "nbqtQvEivYwEXTDet7YM",
// "title": "MacBook Pro 16",
// "price": 3360000,
// "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
// "tags": [
//   "가전",
//   "노트북",
//   "컴퓨터"
// ],
// "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
// "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
// "isSoldOut": false
// }