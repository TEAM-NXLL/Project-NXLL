import { store } from '../../js/store.js';
import { correctProduct, createRequest } from './requests.js';
import { toast } from './toast.js';

export const tagArr = ['mouse', 'keyboard', 'mousepad', 'usbhub', 'monitorstand', 'cardreader', 'notebookstand', 'lock', 'keypad', 'ear-head', 'speaker', 'mic', 'kids', 'audiocable', 'adapter', 'charging', 'smartholder', 'smart-etc', 'new-item', 'discount', 'pc', 'notebook', 'audio', 'smart', 'beige', 'mint', 'pink', 'white', 'blue', 'black', 'green', 'gray'];
export const editPopup = document.querySelector('.editPopup');
export const modalCloseBtn = document.querySelector('.close-btn'); //수정모달 close버튼
const editFormEl = document.querySelector('.edit-form');

// 모든제품조회에서 수정버튼 클릭 이벤트 핸들러
export function editItem(event) {
  const productId = event.target.dataset.id;
  editInputPlaceholder(productId);
}

// 수정페이지 input에 기존 데이터 채워넣기
async function editInputPlaceholder (productId) {
  const res = await fetch(
    store.url + `/products/${productId}`,
    createRequest('GET')
  );
  const getResult = await res.json();

  getResult.isSoldOut
    ? (document.querySelector('#soldout').checked = true)
    : (document.querySelector('#sell').checked = true);

  document.querySelector('.edit-product-id').textContent = getResult.id;
  document.querySelector('.edit-product-name').value = getResult.title;
  document.querySelector('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags;

  for (let i = 0; i < tagArr.length; i += 1) {
    selectedTags.includes(`${tagArr[i]}`)
      ? (document.querySelector(`#${tagArr[i]}`).checked = true)
      : (document.querySelector(`#${tagArr[i]}`).checked = false);
  }

  document.querySelector('.edit-product-description').value = getResult.description
  document.querySelector('.edit-tumbnail-img').src = getResult.thumbnail;
  document.querySelector('.edit-detail-img').src = getResult.photo;
}

// form제출 이벤트
editFormEl.addEventListener('submit', (event) => {
  event.preventDefault();

  let isSoldOut = false;
  if (document.querySelector('input[name="filter"]:checked').value === 'true') {
    isSoldOut = true;
  }
  const productId = editFormEl.querySelector('.edit-product-id').textContent
  const title = document.querySelector('.edit-product-name').value;
  const price = +document
    .querySelector('#edit-product-price')
    .value.replace(/[^0-9]/g, '');
  const selectedCategory = document.querySelector(
    'input[name="edit-category"]:checked',
  ).value;
  const selectedTags = document.querySelectorAll(
    'input[name="edit-check"]:checked',
  );
  const tags = [];
  tags.push(selectedCategory);
  selectedTags.forEach((tag) => {
    tags.push(tag.value);
  });

  const description = document.querySelector('.edit-product-description').value;
  const thumbnail = document.querySelector('.edit-thumbnail').dataset.id;
  const photo = document.querySelector('.edit-thumbnail').dataset.id;

  if (title.length < 2 || price < 1 || description.length < 1) {
    return toast('내용이 모두 입력되었는지 확인해 주세요', "전체");
  }
  try {
    correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut);
    setChangedData(productId, title, price, description, tags, isSoldOut)
    toast('상품 수정이 완료되었습니다.', "전체");
  } catch (error) {
    toast(error, '잠시 후 다시 시도해주세요', "전체");
  }
});


// 수정 모달 닫기
modalCloseBtn.addEventListener('click', () => {
  editPopup.classList.remove('show');
});


// 모든제품조회에 변경사항 넣기
function setChangedData(productId, title, price, description, tags, isSoldOut) {
  const lists = document.querySelectorAll('tr.product-item')
  lists.forEach(list => {
    if (productId === list.dataset.id) {
      list.querySelector('img').src = document.querySelector('#edit-thumbnail-preview').src
      list.querySelector('.title').textContent = title;
      list.querySelector('.price').textContent = price;
      list.querySelector('.tags').textContent = tags;
      list.querySelector('.is-sold-out').textContent = isSoldOut? "X" : "O";
      list.querySelector('.descript').textContent = description;
    }
  })
}