import { createProduct } from './requests.js';
import { toast } from './toast.js';

const addFormEl = document.querySelector('.add-form')
const thumbnailEl = document.querySelector('.add-thumbnail')
const detailImgEl = document.querySelector('.add-detail')
const priceInputEl = document.querySelector('#add-product-price')
const detailResetEl = document.querySelector('.detail-reset')
const thumbnailResetEl = document.querySelector('.thumbnail-reset')
const editDetailImgEl = document.querySelector('.edit-detail')
const editThumbnailEl = document.querySelector('.edit-thumbnail')
const editThumbnailResetEl = document.querySelector('.edit-thumbnail-reset')
const editDetailResetEl = document.querySelector('.edit-detail-reset')
const editPriceInputEl = document.querySelector('#edit-product-price')
//상위요소로 이벤트 옮기기

// 가격 입력 input칸에 통화단위 적용
priceInputEl.addEventListener('input', event => {
  let price = event.target.value;
  price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR');
  priceInputEl.value = price;
});
editPriceInputEl.addEventListener('input', event => {
  let price = event.target.value;
  price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR');
  editPriceInputEl.value = price;
});

// 이미지파일 업로드 이벤트
thumbnailEl.addEventListener('change', event => {
  checkFileSize(event.target, thumbnailEl)
});
detailImgEl.addEventListener('change', event => {
  checkFileSize(event.target, detailImgEl)
});
editThumbnailEl.addEventListener('change', event => {
  checkFileSize(event.target, editThumbnailEl)
});
editDetailImgEl.addEventListener('change', event => {
  checkFileSize(event.target, editDetailImgEl)
});


// 이미지파일 업로드 초기화버튼 클릭이벤트
detailResetEl.addEventListener('click', () => {
  document.querySelector('#detail-preview').src = "";
  detailImgEl.value = "";
});
thumbnailResetEl.addEventListener('click', () => {
  document.querySelector('#thumbnail-preview').src = "";
  thumbnailEl.value = "";
});
editDetailResetEl.addEventListener('click', () => {
  document.querySelector('#edit-detail-preview').src = "";
  editDetailImgEl.value = "";
});
editThumbnailResetEl.addEventListener('click', () => {
  document.querySelector('#edit-thumbnail-preview').src = "";
  editThumbnailEl.value = "";
});


// 이미지파일 업로드 시 미리보기
function previewImg(input, selector) {
  const reader = new FileReader();
  if (input.files && selector === thumbnailEl) {
    reader.onload = event => {
      document.querySelector('#thumbnail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === detailImgEl) {
    reader.onload = event => {
      document.querySelector('#detail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === editDetailImgEl) {
    reader.onload = event => {
      document.querySelector('#edit-detail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === editThumbnailEl) {
    reader.onload = event => {
      document.querySelector('#edit-thumbnail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.querySelector('#thumbnail-preview').src = "";
    document.querySelector('#detail-preview').src = "";
    document.querySelector('#edit-thumbnail-preview').src = "";
    document.querySelector('#edit-detail-preview').src = "";
  };
}

// 업로드 이미지 파일 크기 체크 후 인코딩실행
function checkFileSize(target, selector) {
  const file = target.files[0].size;
  const thumbnailSize = 1024 ** 2;
  const detailImgSize = 1024 ** 2 * 4;
  if (selector === thumbnailEl && file > thumbnailSize
    || selector === detailImgEl && file > detailImgSize
    || selector === editThumbnailEl && file > thumbnailSize
    || selector === editDetailImgEl && file > detailImgSize) {
    toast("해당 파일은 제한된 용량을 초과하였습니다.")
    return
  } else {
    previewImg(target, selector);
    imgIncoding(target, selector);
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
      } else if (selector === detailImgEl) {
        detailImgEl.dataset.id = base64
      } else if (selector === editThumbnailEl) {
        editThumbnailEl.dataset.id = base64
      } else {
        editDetailImgEl.dataset.id = base64
      }
    })
  }
}

// 제품추가 - submit 버튼클릭이벤트
addFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  addItem(event);
});

// 제품추가 이벤트 핸들러
export function addItem(event) {
  const title = event.target[0].value;
  const price = +(event.target[1].value.replace(/[^0-9]/g, ''));
  const selectedTags = document.querySelectorAll('input[name="check"]:checked');
  const tags = [];
  selectedTags.forEach(tag => {
    tags.push(tag.value)
  });
  const description = document.querySelector('.add-product-description').value;
  const thumbnail = thumbnailEl.dataset.id;
  const photo = detailImgEl.dataset.id;
  if (title.length < 2 || price < 1 || description.length < 1) {
    return toast('내용이 모두 입력되었는지 확인해 주세요');
  }
  try {
    createProduct(title, price, description, tags, thumbnail, photo);
    toast("상품 추가가 완료되었습니다.")
    resetInput()
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`)
  }
}

// 제품추가 후 input창 초기화
function resetInput() {
  const reset = document.querySelectorAll('.reset');
  const resetCheckbox = document.querySelectorAll('.check');
  for (let i = 0; i < resetCheckbox.length; i += 1) {
    resetCheckbox[i].checked = false;
  }
  for (let i = 0; i < reset.length; i++) {
    reset[i].value = '';
  }
  document.querySelector('#detail-preview').src = "";
  document.querySelector('#thumbnail-preview').src = "";
}