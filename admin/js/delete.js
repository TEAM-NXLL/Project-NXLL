import { delProduct } from "./requests.js";
import { toast } from "./toast.js";
import { editItem, editPopup } from './editProduct.js';
import { store } from '../../js/store.js'

const productContainer = store.selector('.products-container');
const CheckedBtnEl = store.selector('.delete-checked');

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
      toast("잠시 후 다시 시도해 주세요.", "전체");
    }
  } else {
    toast("아이템 삭제를 취소합니다.", "전체");
  }
}

// 개별 삭제 / 수정버튼 클릭 이벤트
productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    window.confirm("1개의 아이템을 삭제하시겠습니까?")
      ? deleteItem(event.target)
      : toast("아이템 삭제를 취소합니다.", "전체")
  }
  else if (event.target.classList.contains('edit-btn')) {
    editPopup.classList.add('show')
    editItem(event)
  }
})

// 제품 개별 삭제
export function deleteItem(target) {
  const itemId = target.dataset.id;
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    if (item.dataset.id === itemId) {
      item.classList.add('delete');
      item.remove();
    }
  })
  delProduct(itemId);
  // toast("상품이 삭제되었습니다.", "전체")
}