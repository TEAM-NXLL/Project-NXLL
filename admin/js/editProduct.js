import { store } from '../../js/store.js';
import { correctProduct, createRequest } from './requests.js';
import { toast } from './toast.js';

export const tagArr = ['mouse', 'keyboard', 'mousepad', 'usbhub', 'monitorstand', 'cardreader', 'notebookstand', 'lock', 'keypad', 'ear-head', 'speaker', 'mic', 'kids', 'audiocable', 'adapter', 'charging', 'smartholder', 'smart-etc', 'new-item', 'discount', 'pc', 'notebook', 'audio', 'smart', 'beige', 'mint', 'pink', 'white', 'blue', 'black', 'green', 'gray'];
export const editPopup = store.selector('.editPopup');
export const modalCloseBtn = store.selector('.close-btn'); //수정모달 close버튼
const editFormEl = store.selector('.edit-form');

// 모든제품조회에서 수정버튼 클릭 이벤트 핸들러
export function editItem(event) {
  const productId = event.target.dataset.id;
  editInputPlaceholder(productId);
}

// 수정페이지 input에 기존 데이터 채워넣기
async function editInputPlaceholder(productId) {
  const res = await fetch(
    store.url + `/products/${productId}`,
    createRequest('GET')
  );
  const getResult = await res.json();

  getResult.isSoldOut
    ? (store.selector('#soldout').checked = true)
    : (store.selector('#sell').checked = true);

  store.selector('.edit-product-id').textContent = getResult.id;
  store.selector('.edit-product-name').value = getResult.title;
  store.selector('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags;

  for (let i = 0; i < tagArr.length; i += 1) {
    selectedTags.includes(`${tagArr[i]}`)
      ? (store.selector(`#${tagArr[i]}`).checked = true)
      : (store.selector(`#${tagArr[i]}`).checked = false);
  }

  store.selector('.edit-product-description').value = getResult.description
  store.selector('.edit-tumbnail-img').src = getResult.thumbnail;
  store.selector('.edit-detail-img').src = getResult.photo;
}

// form제출 이벤트
editFormEl.addEventListener('submit', (event) => {
  event.preventDefault();

  let isSoldOut = false;
  if (store.selector('input[name="filter"]:checked').value === 'true') {
    isSoldOut = true;
  }
  const productId = editFormEl.querySelector('.edit-product-id').textContent
  const title = store.selector('.edit-product-name').value;
  const price = +document
    .querySelector('#edit-product-price')
    .value.replace(/[^0-9]/g, '');
  const selectedCategory = store.selector(
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

  const description = store.selector('.edit-product-description').value;
  const thumbnail = store.selector('.edit-thumbnail').dataset.id;
  const photo = store.selector('.edit-thumbnail').dataset.id;

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
      tagsNode =  list.querySelector('.tags')
      soldoutNode = list.querySelector('.is-sold-out')
      descriptNode = list.querySelector('.descript')
    }
  })
  imgNode.src = store.selector('#edit-thumbnail-preview').src
  titleNode.textContent = title;
  priceNode.textContent = price;
  tagsNode.textContent =  tags;
  soldoutNode.textContent = isSoldOut ? "X" : "O";
  descriptNode.textContent = description;
}

