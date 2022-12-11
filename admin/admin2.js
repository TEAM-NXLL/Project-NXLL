import { check } from 'prettier';
import {
  createProduct,
  viewAllProduct,
  viewAllTransactions,
  delProduct,
  correctProduct,
  transactionStatus,
} from './requests.js';

const addFormEl = document.querySelector('.add-form')
const thumbnailEl = document.querySelector('.add-thumbnail')
const detailImgEl = document.querySelector('.add-detail')
const priceInputEl = document.querySelector('#add-product-price')
const detailResetEl = document.querySelector('.detail-reset')
const thumbnailResetEl = document.querySelector('.thumbnail-reset')

// 가격 입력 input칸에 통화단위 적용
priceInputEl.addEventListener('input', event => {
  let price = event.target.value
  price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR');
  priceInputEl.value = price
})

// 이미지파일 업로드 이벤트
thumbnailEl.addEventListener('change', event => {
  checkFileSize(event.target, thumbnailEl)
})
detailImgEl.addEventListener('change', event => {
  checkFileSize(event.target, detailImgEl)
})

// 이미지파일 업로드 초기화버튼 클릭이벤트
detailResetEl.addEventListener('click', () => {
  document.querySelector('#detail-preview').src = "";
  detailImgEl.value = "";

})
thumbnailResetEl.addEventListener('click', () => {
  document.querySelector('#thumbnail-preview').src = "";
  thumbnailEl.value = "";
})

// 이미지파일 업로드 시 미리보기
function previewImg(input, selector) {
  const reader = new FileReader();
  if (input.files && selector === thumbnailEl) {
    reader.onload = event => {
      document.querySelector('#thumbnail-preview').src = event.target.result;
    }; // src를 변수에 담으면 readonly로 error...이게 최선
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === detailImgEl) {
    reader.onload = event => {
      document.querySelector('#detail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.querySelector('#thumbnail-preview').src = "";
    document.querySelector('#detail-preview').src = "";
  }
}

// 업로드 이미지 파일 크기 체크
function checkFileSize(target, selector) {
  const file = target.files[0].size;
  const thumbnailSize = 1024 ** 2;
  const detailImgSize = 1024 ** 2 * 4;
  if (selector === thumbnailEl && file > thumbnailSize
    || selector === detailImgEl && file > detailImgSize) {
    alert("해당 파일은 제한된 용량을 초과하였습니다.")
    return
  } else {
    previewImg(target, selector)
    imgIncoding(target, selector)
  }
}

// 업로드한 이미지 base64로 변환
function imgIncoding(target, selector) {
  const { files } = target
  let base64 = ''
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', e => {
      base64 = e.target.result
      if (selector === thumbnailEl) {
        thumbnailEl.dataset.id = base64
      } else {
        detailImgEl.dataset.id = base64
      }
    })
  }
}

// 제품추가 - submit 버튼클릭이벤트
addFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  addItem(event);
});

// 제품추가
export function addItem(event) {
  const title = event.target[0].value;
  const price = +(event.target[1].value.replace(/[^0-9]/g, ''));
  const tags = document.querySelector('.tag:checked').value;
  const description = document.querySelector('.add-product-description').value;
  const thumbnail = thumbnailEl.dataset.id;
  const photo = detailImgEl.dataset.id;
  if (title.length < 2 || price < 1 || description.length < 1) {
    return alert('내용이 모두 입력되었는지 확인해 주세요');
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
  // 해시로 이동 또는 모달?
  // submit 하면 api보내고 모달창 닫기, 새로 렌더링?
  // 해시면 이전으로 되돌아감
  correctProduct(productId, title, price, description, tags, thumbnail, photo, isSoldOut)
}

// 수정은 hash 사용하기...
// 추가/수정/삭제 완료 메시지 0.5초 띄울 토스트 만들기
// confirm도 토스트로?