import { delProduct } from "./requests.js";
import { toast } from "./toast.js";

const productContainer = document.querySelector('.products-container');
const CheckedBtnEl = document.querySelector('.delete-checked');

CheckedBtnEl.addEventListener('click', (event) => {
  const checkedItems = document.querySelectorAll('.delete-checkbox:checked');
  deleteCheckedItems(checkedItems)
})

// 선택항목 삭제 핸들러
export async function deleteCheckedItems(checkedItems) {
  const checkedArr = [];
  if (window.confirm(`${checkedItems.length}개의 상품을 삭제하시겠습니까?`)) {
    try {
      checkedItems.forEach(item => {
        checkedArr.push(deleteItem(item));
      })
      await Promise.all(checkedArr);
    } catch (err) {
      alert(err, "잠시 후 다시 시도해 주세요.");
    }
  } else {
    toast("아이템 삭제를 취소합니다.");
  }
}

// 개별 수정/삭제버튼 클릭 이벤트
productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    window.confirm("1개의 아이템을 삭제하시겠습니까?")
      ? deleteItem(event.target)
      : toast("아이템 삭제를 취소합니다.")
  } else if (event.target.classList.contains('edit-btn')) {
    // editItem(event);<-이거아님
    // 데이터 아이디값 가지고 수정페이지로 이동하게
  }
})



// 수정버튼 클릭 이벤트 핸들러 (추가랑 내용 겹침... 나중에합쳐보기)
export function editItem(event) {
  console.log(event.path)
  // infoBeforeEdit(target.dataset.id);
  // submit 시 api호출
  const productId = event.target.dataset.id;
  const isSoldOut = document.querySelector('.filter:checked').value;
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

  // 수정이 종료되면 이전페이지로?
}

// 수정페이지에서 submit 이벤트
const editFormEl = document.querySelector('.edit-form');

editFormEl.addEventListener('submit', async (event) => {
  console.log(event)
  event.preventDefault();
  // const productId = event.target.dataset.id;
  const isSoldOut = document.querySelector('.filter:checked').value;
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
  console.log(title, price, description, tags, thumbnail, photo, isSoldOut)
  //   // correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut);
});




// 수정페이지 input에 기존 데이터 채워넣기
async function infoBeforeEdit(id) {
  console.log(id);
}

// 제품 개별 삭제
export function deleteItem(target) {
  const itemId = target.dataset.id;
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    if (item.dataset.id === itemId) {
      item.classList.add('delete');
      item.addEventListener('transitionend', () => {
        item.remove();
      })
    }
  })
  delProduct(itemId);
  toast("상품이 삭제되었습니다.")
}

