import { delProduct } from "./requests.js";
import { toast } from "./toast.js";

const productContainer = document.querySelector('.products-container');

// 개별 수정/삭제버튼 클릭 이벤트
productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    window.confirm("1개의 아이템을 삭제하시겠습니까?")
      ? deleteItem(event.target)
      : toast("아이템 삭제를 취소합니다.")
  } else if (event.target.classList.contains('edit-btn')) {
    editItem(event.target);
  }
})

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

//제품 전체삭제 기능 추가하기
// 조회메뉴 최상단 체크박스 + 선택 상품을 `삭제` + `상태변경`(sold out)  넣기
// 조회 메뉴 옆에 개별 아이템 수정버튼...
// 조회메뉴에서 각 아이템 옆 체크박스로 삭제할 아이템 선택
//(최상단 체크박스를 클릭하면 해당 페이지의 모든 상품 선택)
// 제품 여러 개 삭제 버튼 클릭 이벤트
// deleteBtnEl.addEventListener('click', (event) => {
//   if (window.confirm(`${event}(event객체에서 갯수받기) 개의 상품을 삭제하시겠습니까?`)) {
//     deleteItems(event);
//   }
// });

// 수정버튼 클릭 이벤트 핸들러
export function editItem(event) {
  console.log(event)
  // 개별아이템에서 수정버튼 클릭 시 eventlistener 동작
  // 해시로 이동 또는 모달?
  // submit 하면 api보내고 모달창 닫기, 새로 렌더링?
  // 해시면 이전으로 되돌아감
  // correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut)
}

// 수정은 hash 사용하기...
// 추가/수정/삭제 완료 메시지 0.5초 띄울 토스트 만들기
// confirm도 토스트로?