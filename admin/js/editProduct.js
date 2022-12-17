import { store } from "../../js/store.js";
import { correctProduct, createRequest } from "./requests.js";
import { toast } from "./toast.js";



// 수정버튼 클릭 이벤트 핸들러 (추가랑 내용 겹침... 나중에합쳐보기)
export function editItem(event) {
  const productId = event.target.dataset.id;
  editInputPlaceholder(productId)
  editEvent(event)
  // 수정이 종료되면 이전페이지로?
}

// 수정페이지 input에 기존 데이터 채워넣기
async function editInputPlaceholder(productId) {
  const res = await fetch(store.url + `/products/${productId}`, createRequest('GET'));
  const getResult = await res.json();
  // console.log(getResult);

  getResult.isSoldOut
    ? document.querySelector('#soldout').checked = true
    : document.querySelector('#sell').checked = true

  document.querySelector('.edit-product-name').value = getResult.title;
  document.querySelector('#edit-product-price').value = getResult.price;

  const selectedTags = getResult.tags; //배열
  const tagArr = ["mouse", "keyboard", "mousepad", "usbhub", "monitorstand", "cardreader", "notebokstand", "lock", "keypad", "ear-head", "speaker", "mic", "kids", "audiocable", "adapter", "charging", "smartholder", "smart-etc"]

  for (let i=0; i < tagArr.length; i+=1) {
    if (selectedTags.includes(`${tagArr[i]}`)) {
      document.querySelector(`#${tagArr[i]}`).checked = true
      console.log(document.querySelector(`#${tagArr[i]}`))
    } else {
      // document.querySelector(`#${tagArr[i]}`).checked = false
      console.log("안됨")
    }
  }

  // selectedTags.includes("마우스")
  //   ? document.querySelector('#mouse').checked = true
  //   : document.querySelector('#mouse').checked = false;
  // selectedTags.includes("키보드")
  //   ? document.querySelector('#keyboard').checked = true
  //   : document.querySelector('#keyboard').checked = false;
  // selectedTags.includes("음향기기")
  //   ? document.querySelector('#audio').checked = true
  //   : document.querySelector('#audio').checked = false;
  // selectedTags.includes("거치대")
  //   ? document.querySelector('#holder').checked = true
  //   : document.querySelector('#holder').checked = false;
  // selectedTags.includes("스피커/마이크")
  //   ? document.querySelector('#speaker-mic').checked = true
  //   : document.querySelector('#speaker-mic').checked = false;
  // selectedTags.includes("NEW ITEM")
  //   ? document.querySelector('#new-item').checked = true
  //   : document.querySelector('#new-item').checked = false;
  // selectedTags.includes("노트북")
  //   ? document.querySelector('#notebook').checked = true
  //   : document.querySelector('#notebook').checked = false;
  // selectedTags.includes("문구/소형가전")
  //   ? document.querySelector('#stationery').checked = true
  //   : document.querySelector('#stationery').checked = false;
  // selectedTags.includes("충전기")
  //   ? document.querySelector('#charging').checked = true
  //   : document.querySelector('#charging').checked = false;
  // selectedTags.includes("holiday")
  //   ? document.querySelector('#holiday').checked = true
  //   : document.querySelector('#holiday').checked = false;

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
    const selectedTags = document.querySelectorAll('input[name="edit-check"]:checked');
    const tags = [];
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
    } catch (error) {
      toast(error, "잠시 후 다시 시도해주세요 ")
    }
  });
}

