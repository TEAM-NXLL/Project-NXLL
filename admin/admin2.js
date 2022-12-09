import {
  createProduct,
  viewAllProduct,
  viewAllTransactions,
  delProduct,
  correctProduct,
  transactionStatus,
} from './requests.js';

const addFormEl = document.querySelector('.add-form')
const inputEl = document.querySelector('input[type="file"]')

// 이미지 업로드 미리보기
function previewImg(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.querySelector('.preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.querySelector('preview').src = "";
  }
}

// base64변환
inputEl.addEventListener('change', event => {
  const { files } = event.target
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', e => {
      const base64 = e.target.result
      console.log(base64)
    })
  }
})

// 제품추가 - submit 버튼클릭이벤트
addFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  addItem(event);
});

// 제품추가
export function addItem(event) {
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

// 제품 삭제
export function deleteItems(event) {
  // 조회메뉴 최상단 체크박스 + 선택 상품을 `삭제` + `상태변경`(sold out)  넣기
  // 조회 메뉴 옆에 개별 아이템 수정버튼...
  // 조회메뉴에서 각 아이템 옆 체크박스로 삭제할 아이템 선택
  //(최상단 체크박스를 클릭하면 해당 페이지의 모든 상품 선택)
  delProduct(id)
}
// 제품 삭제 버튼 클릭 이벤트
// deleteBtnEl.addEventListener('click', (event) => {
//   if (window.confirm(`${event}(event객체에서 갯수받기) 개의 상품을 삭제하시겠습니까?`)) {
//     deleteItems(event);
//   }
// });

export function editItem(event) {
  // 개별아이템에서 수정버튼 클릭 시 eventlistener 동작
  // 해시로 이동. . . ? 모달?

  // submit 하면 api보내고 모달창 닫기, 새로 렌더링?
  // 해시면 이전해시로 되돌아감
  correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut)
}

// 수정은 hash 사용하기...
// 추가/수정/삭제 완료 메시지 .5초 띄울 토스트 만들기
// confirm도 토스트로?