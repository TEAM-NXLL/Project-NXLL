import { store } from '../../js/store.js';
import { createRequest } from './requests.js';
import { submitUtil } from './submitUtil.js';
import { getProductDetail } from '../../js/requests.js';

export const tagArr = ['mouse', 'keyboard', 'mousepad', 'usbhub', 'monitorstand', 'cardreader', 'notebookstand', 'lock', 'keypad', 'ear-head', 'speaker', 'mic', 'kids', 'audiocable', 'adapter', 'charging', 'smartholder', 'smart-etc', 'new-item', 'discount', 'pc', 'notebook', 'audio', 'smart', 'beige', 'mint', 'pink', 'white', 'blue', 'black', 'green', 'gray'];
export const editFormEl = store.selector('.edit-form');
export const editPopup = store.selector('.editPopup');
export const modalCloseBtn = store.selector('.close-btn'); //수정모달 close버튼

// 모든제품조회에서 수정버튼 클릭 이벤트 핸들러
export function editItem(event) {
  const productId = event.target.dataset.id;
  editInputPlaceholder(productId);
  submitUtil(editFormEl);
}

// 수정페이지 input에 기존 데이터 채워넣기
async function editInputPlaceholder(productId) {
  const getResult = await getProductDetail(productId)
  getResult.isSoldOut
    ? (store.selector('#soldout').checked = true)
    : (store.selector('#sell').checked = true);

  store.selector('.edit-product-id').textContent = getResult.id;
  store.selector('.edit-product-name').value = getResult.title;
  store.selector('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags;
  console.log(selectedTags)

  for (let i = 0; i < tagArr.length; i += 1) {
    selectedTags.includes(`${tagArr[i]}`)
      ? (store.selector(`#${tagArr[i]}`).checked = true)
      : (store.selector(`#${tagArr[i]}`).checked = false);
  }

  store.selector('.edit-product-description').value = getResult.description
  store.selector('.edit-tumbnail-img').src = getResult.thumbnail;
  store.selector('.edit-detail-img').src = getResult.photo;
}

// 수정 모달 닫기
modalCloseBtn.onclick = function handleCloseModal() {
  editPopup.classList.remove('show');
  location.hash = "#all-products"
}


// 모든제품조회에 변경사항 넣기
export function setChangedData(productId, title, price, description, tags, isSoldOut) {
  const lists = document.querySelectorAll('tr.product-item')
  let imgNode = '';
  let titleNode = '';
  let priceNode = '';
  let tagsNode = '';
  let soldoutNode = '';
  let descriptNode = '';

  lists.forEach(list => {
    if (productId === list.dataset.id) {
      imgNode = list.querySelector('img')
      titleNode = list.querySelector('.title')
      priceNode = list.querySelector('.price')
      tagsNode = list.querySelector('.tags')
      soldoutNode = list.querySelector('.is-sold-out')
      descriptNode = list.querySelector('.descript')
    }
  })
  imgNode.src = store.selector('#edit-thumbnail-preview').src
  titleNode.textContent = title;
  priceNode.textContent = price;
  tagsNode.textContent = tags;
  soldoutNode.textContent = isSoldOut ? "X" : "O";
  descriptNode.textContent = description;
}
