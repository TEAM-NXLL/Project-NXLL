import { store } from "../../js/store.js";
import { correctProduct, createRequest } from "./requests.js";
import { toast } from "./toast.js";

export const tagArr = ["mouse", "keyboard", "mousepad", "usbhub", "monitorstand", "cardreader", "notebookstand", "lock", "keypad", "ear-head", "speaker", "mic", "kids", "audiocable", "adapter", "charging", "smartholder", "smart-etc", "new-item", "discount", "pc", "notebook", "audio", "smart", 
"beige", "mint", "pink", "white", "blue", "black", "green", "gray"];

// 수정버튼 클릭 이벤트 핸들러 (추가랑 내용 겹침... 나중에합쳐보기)
export function editItem(event) {
  const productId = event.target.dataset.id;
  editInputPlaceholder(productId);
  editEvent(event);
  // 수정페이지 모달로 변경?
}

// 수정페이지 input에 기존 데이터 채워넣기
async function editInputPlaceholder(productId) {
  const res = await fetch(store.url + `/products/${productId}`, createRequest('GET'));
  const getResult = await res.json();

  getResult.isSoldOut
    ? document.querySelector('#soldout').checked = true
    : document.querySelector('#sell').checked = true;

  document.querySelector('.edit-product-name').value = getResult.title;
  document.querySelector('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags;

  for (let i=0; i < tagArr.length; i+=1) {
    selectedTags.includes(`${tagArr[i]}`)
      ? document.querySelector(`#${tagArr[i]}`).checked = true
      : document.querySelector(`#${tagArr[i]}`).checked = false;
  }

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
    let isSoldOut = false
    if (document.querySelector('input[name="filter"]:checked').value === "true") {
      isSoldOut = true;
    }
    const title = document.querySelector('.edit-product-name').value;
    const price = +(document.querySelector('#edit-product-price').value.replace(/[^0-9]/g, ''));
    const selectedCategory = document.querySelector('input[name="edit-category"]:checked').value;
    const selectedTags = document.querySelectorAll('input[name="edit-check"]:checked');
    const tags = [];
    tags.push(selectedCategory);
    selectedTags.forEach(tag => {
      tags.push(tag.value)
    });

    const description = document.querySelector('.edit-product-description').value;
    const thumbnail = document.querySelector('.edit-thumbnail').dataset.id;
    const photo = document.querySelector('.edit-thumbnail').dataset.id;

    if (title.length < 2 || price < 1 || description.length < 1) {
      return alert('내용이 모두 입력되었는지 확인해 주세요');
    }
    try {
      correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut);
      toast("상품 수정이 완료되었습니다.")
      // if (window.confirm("상품 수정이 완료되었습니다.")) {
      //   location.hash = '#all-products'
      //   location.reload();
      // }
    } catch (error) {
      toast(error, "잠시 후 다시 시도해주세요 ")
    }
  });
}