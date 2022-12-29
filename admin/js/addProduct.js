import { createProduct } from './requests.js';
import { toast } from './toast.js';
import { store } from '../../js/store.js'

const addFormEl = store.selector('.add-form')
const thumbnailEl = store.selector('.add-thumbnail')
const detailImgEl = store.selector('.add-detail')
const priceInputEl = store.selector('#add-product-price')
const addFileArea = store.selector(".add-file-upload-area")
const editFileArea = store.selector(".edit-file-upload-area")
const editDetailImgEl = store.selector('.edit-detail')
const editThumbnailEl = store.selector('.edit-thumbnail')
const editPriceInputEl = store.selector('#edit-product-price')
const altImg = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

// 가격 입력 input칸에 통화단위 적용
priceInputEl.addEventListener('input', event => {
  priceInputHandler(event, priceInputEl)
});
editPriceInputEl.addEventListener('input', event => {
  priceInputHandler(event, editPriceInputEl)
});
function priceInputHandler(event, selector){
  let price = event.target.value;
  price = Number(price.replace(/[^0-9]/g, '')).toLocaleString('ko-KR');
  selector.value = price;
}

// 이미지파일 업로드 이벤트
editFileArea.addEventListener('change', event => {
  const { target } = event;
  checkFileSize(event.target, target)
  checkFileExtension(event.target, "전체", target)
})
addFileArea.addEventListener('change', event => {
  const { target } = event;
  checkFileSize(event.target, target)
  checkFileExtension(event.target, "추가", target)
})

// 파일 확장자 유효성검사
function checkFileExtension(target, location, selector) {
  let fileEl = '';
  if (selector.matches('.edit-thumbnail')) {
    fileEl = editThumbnailEl
  } else if (selector.matches('.edit-detail')) {
    fileEl = editDetailImgEl
  } else if (selector.matches('.add-thumbnail')) {
    fileEl = thumbnailEl
  } else if (selector.matches('.add-detail')) {
    fileEl = detailImgEl
  }
  const file = target.files[0].name.split('.').pop()
  const extensions = ['jpg', 'jpeg', 'webp', 'png', 'gif', 'svg'];
  if (!extensions.includes(file)) {
    fileEl.closest('td').childNodes[1].children[0].src = altImg
    fileEl.closest('td').childNodes[5].value = '';
    toast("지원하는 파일 형식이 아닙니다.", location)
    return
  }
}

// 이미지파일 업로드 초기화버튼 클릭이벤트
addFileArea.addEventListener('click', event => {
  fileResetHandler(event)
})
editFileArea.addEventListener('click', event => {
  fileResetHandler(event)
})

function fileResetHandler(event){
  const { target } = event;
  if (target.matches('.detail-reset')) {
    event.path[1].children[0].children[0].src = altImg;
    detailImgEl.value = "";
  } else if (target.matches('.thumbnail-reset')) {
    event.path[1].children[0].children[0].src = altImg;
    thumbnailEl.value = "";
  } else if (target.matches('.edit-detail-reset')) {
    event.path[1].children[0].children[0].src = altImg;
    editDetailImgEl.value = "";
  } else if (target.matches('.edit-thumbnail-reset')) {
    event.path[1].children[0].children[0].src = altImg;
    editThumbnailEl.value = "";
  }
}


// 이미지파일 업로드 시 미리보기
// .src를 변수에 담으면 변경사항 적용이 안됨
function previewImg(input, selector) {
  const reader = new FileReader();
  if (input.files && selector === thumbnailEl) {
    reader.onload = event => {
      store.selector('#thumbnail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === detailImgEl) {
    reader.onload = event => {
      store.selector('#detail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === editDetailImgEl) {
    reader.onload = event => {
      store.selector('#edit-detail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else if (input.files && selector === editThumbnailEl) {
    reader.onload = event => {
      store.selector('#edit-thumbnail-preview').src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    store.selector('#thumbnail-preview').src = "";
    store.selector('#detail-preview').src = "";
    store.selector('#edit-thumbnail-preview').src = "";
    store.selector('#edit-detail-preview').src = "";
  };
}

// 업로드 이미지 파일 크기 체크 후 인코딩실행
function checkFileSize(target, selector) {
  let fileEl = '';
  if (selector.matches('.edit-thumbnail')) {
    fileEl = editThumbnailEl
  } else if (selector.matches('.edit-detail')) {
    fileEl = editDetailImgEl
  } else if (selector.matches('.add-thumbnail')) {
    fileEl = thumbnailEl
  } else if (selector.matches('.add-detail')) {
    fileEl = detailImgEl
  }
  const file = target.files[0].size;
  const thumbnailSize = 1024 ** 2;
  const detailImgSize = 1024 ** 2 * 4;
  if (fileEl === thumbnailEl && file > thumbnailSize) {
    store.selector('#thumbnail-preview').src = altImg;
    thumbnailEl.value = "";
    return toast("해당 파일은 제한된 용량을 초과하였습니다.", "추가")
  } else if (fileEl === detailImgEl && file > detailImgSize) {
    store.selector('#detail-preview').src = altImg;
    detailImgEl.value = "";
    return toast("해당 파일은 제한된 용량을 초과하였습니다.", "추가")
  } else if (fileEl === editThumbnailEl && file > thumbnailSize) {
    store.selector('#edit-thumbnail-preview').src = altImg;
    editThumbnailEl.value = "";
    return toast("해당 파일은 제한된 용량을 초과하였습니다.", "전체")
  } else if (fileEl === editDetailImgEl && file > detailImgSize) {
    store.selector('#edit-detail-preview').src = altImg;
    editDetailImgEl.value = "";
    return toast("해당 파일은 제한된 용량을 초과하였습니다.", "전체")
  } else {
    previewImg(target, fileEl);
    imgIncoding(target, fileEl);
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
  const selectedCategory = store.selector('input[name="category"]:checked').value;
  const selectedTags = document.querySelectorAll('input[name="check"]:checked');
  const tags = [];
  tags.push(selectedCategory);
  selectedTags.forEach(tag => {
    tags.push(tag.value)
  });
  const description = store.selector('.add-product-description').value;
  const thumbnail = thumbnailEl.dataset.id;
  const photo = detailImgEl.dataset.id;
  if (title.length < 2 || price < 1 || description.length < 1) {
    return toast('내용이 모두 입력되었는지 확인해 주세요', "추가");
  }
  try {
    toast("상품 추가가 완료되었습니다.", "추가")
    createProduct(title, price, description, tags, thumbnail, photo);
    resetInput(event)
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "추가")
  }
}

// 제품추가 후 input창 초기화
function resetInput(event) {
  const target = event.target
  for (let i = 0; i < target.length; i += 1) {
    (i < 2 || i === target.length - 4) 
      ? target[i].value = ''   
      : target[i].checked = false;

    if ( i === 35 || i === 36) {
      target[i].closest('td').childNodes[1].children[0].src='';
    }
  }
}
