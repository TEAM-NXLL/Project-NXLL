import { delProduct } from "./requests.js";
import { toast } from "./toast.js";
import { editItem, editPopup } from './editProduct.js';
import { $ } from '../../util/store.js';

const productContainer = $('.products-container');

// // 개별 삭제 / 수정버튼 클릭 이벤트
// productContainer.addEventListener('click', (event) => {
//   if (event.target.classList.contains('del-btn')) {
//     window.confirm("1개의 아이템을 삭제하시겠습니까?")
//       ? deleteItem(event.target)
//       : toast("아이템 삭제를 취소합니다.", "전체")
//   }
//   else if (event.target.classList.contains('edit-btn')) {
//     editPopup.classList.add('show')
//     editItem(event)
//   }
// })

productContainer.onclick = function productStateChangeHandler(event) {
  if (event.target.classList.contains('del-btn')) {
    window.confirm("1개의 아이템을 삭제하시겠습니까?")
      ? deleteItem(event.target)
      : toast("아이템 삭제를 취소합니다.", "전체")
  }
  else if (event.target.classList.contains('edit-btn')) {
    editPopup.classList.add('show')
    editItem(event)
  }
}


// 제품 개별 삭제
export function deleteItem(target) {
  const itemId = target.dataset.id;
  const items = $('.product-item', document, true);
  items.forEach(item => {
    if (item.dataset.id === itemId) {
      item.classList.add('delete');
      item.remove();
    }
  })

  delProduct(itemId);
}