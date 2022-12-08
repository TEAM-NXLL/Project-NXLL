import {
  createProduct,
  viewAllProduct,
  viewAllTransactions,
  delProduct,
  correctProduct,
  transactionStatus,
} from './requests.js';

const addFormEl = document.querySelector('.add-form')

// 버튼클릭
addFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  addItem(event);
});

// 상품태그 선택
function addItem(event) {
  const title = event.target[0].value;
  const price = +event.target[1].value;
  const tags = document.querySelector('.tag:checked').value;
  const description = event.target[7].value;
  const thumbnail = event.target[8].value;
  const photo = event.target[9].value;
  if (title.length < 2 || price < 1 || description.length < 1) {
    alert('내용이 모두 입력되었는지 확인해 주세요');
    return;
  }
  createProduct(title, price, description, tags, thumbnail, photo);
}