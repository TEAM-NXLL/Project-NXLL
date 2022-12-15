import { store } from "../../js/store.js";
import { correctProduct, createRequest } from "./requests.js";
import { toast } from "./toast.js";

// 수정버튼 클릭 이벤트 핸들러 (추가랑 내용 겹침... 나중에합쳐보기)
export function editItem(event) {
  const productId = event.target.dataset.id;
  infoBeforeEdit(productId)
  editEvent(event)
  // 수정이 종료되면 이전페이지로?
}

// 수정페이지 input에 기존 데이터 채워넣기
async function infoBeforeEdit(productId) {
  const res = await fetch(store.url + `/products/${productId}`, createRequest('GET'));
  const getResult = await res.json();
  console.log(getResult);

  // let isSoldOut = document.querySelector('.filter:checked').value;
  document.querySelector('.edit-product-name').value = getResult.title;
  document.querySelector('#edit-product-price').value = getResult.price;
  // let selectedTags = document.querySelectorAll('input[name="edit-check"]:checked');
  // let tags = [];
  // selectedTags.forEach(tag => {
  //   tags.push(tag.value)
  // });
  //switch문으로 체크넣어주기?
  document.querySelector('.edit-product-description').value = getResult.description;
  document.querySelector('.edit-tumbnail-img').src = getResult.thumbnail;
  document.querySelector('.edit-detail-img').src = getResult.photo;
}

// 수정페이지에서 submit 이벤트
function editEvent(e) {
  const productId = e.target.dataset.id;
  const editFormEl = document.querySelector('.edit-form');
  editFormEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isSoldOut = document.querySelector('input[name="filter"]:checked').value; //여기가문제
    const title = document.querySelector('.edit-product-name').value;
    const price = +(document.querySelector('#edit-product-price').value.replace(/[^0-9]/g, ''));
    const selectedTags = document.querySelectorAll('input[name="edit-check"]:checked');
    const tags = [];
    selectedTags.forEach(tag => {
      tags.push(tag.value)
    });
    const description = document.querySelector('.edit-product-description').value;
    const thumbnail = document.querySelector('.edit-thumbnail').dataset.id;
    const photo = document.querySelector('.edit-thumbnail').dataset.id;
    correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut);
    toast("상품 수정이 완료되었습니다.")
  });
}


