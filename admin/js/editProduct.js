import { $ } from '../../util/store.js';
import { createRequest } from './requests.js';
import { submitUtil } from './submitUtil.js';
import { getProductDetail } from '../../js/requests.js';

export const tagArr = ['mouse', 'keyboard', 'mousepad', 'usbhub', 'monitorstand', 'cardreader', 'notebookstand', 'lock', 'keypad', 'ear-head', 'speaker', 'mic', 'kids', 'audiocable', 'adapter', 'charging', 'smartholder', 'smart-etc', 'new-item', 'discount', 'pc', 'notebook', 'audio', 'smart', 'beige', 'mint', 'pink', 'white', 'blue', 'black', 'green', 'gray'];
export const editFormEl = $('.edit-form');
export const editPopup = $('.editPopup');
export const modalCloseBtn = $('.close-btn'); //수정모달 close버튼

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
    ? ($('#soldout').checked = true)
    : ($('#sell').checked = true);

  $('.edit-product-id').textContent = getResult.id;
  $('.edit-product-name').value = getResult.title;
  $('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags;
  console.log(selectedTags)

  for (let i = 0; i < tagArr.length; i += 1) {
    selectedTags.includes(`${tagArr[i]}`)
      ? ($(`#${tagArr[i]}`).checked = true)
      : ($(`#${tagArr[i]}`).checked = false);
  }

  $('.edit-product-description').value = getResult.description
  $('.edit-tumbnail-img').src = getResult.thumbnail;
  $('.edit-detail-img').src = getResult.photo;
}

// 수정 모달 닫기
modalCloseBtn.onclick = function handleCloseModal() {
  editPopup.classList.remove('show');
  location.hash = "#all-products"
}


// 모든제품조회에 변경사항 넣기
export function setChangedData(productId, title, price, description, tags, isSoldOut) {
  const lists = $('tr.product-item', document, true)
  let imgNode = '';
  let titleNode = '';
  let priceNode = '';
  let tagsNode = '';
  let soldoutNode = '';
  let descriptNode = '';

  lists.forEach(list => {
    if (productId === list.dataset.id) {
      imgNode = $('img', list)
      titleNode = $('.title', list)
      priceNode = $('.price', list)
      tagsNode = $('.tags', list)
      soldoutNode = $('.is-sold-out', list)
      descriptNode = $('.descript', list)
    }
  })
  imgNode.src = $('#edit-thumbnail-preview').src
  titleNode.textContent = title;
  priceNode.textContent = price;
  tagsNode.textContent = tags;
  soldoutNode.textContent = isSoldOut ? "X" : "O";
  descriptNode.textContent = description;
}

