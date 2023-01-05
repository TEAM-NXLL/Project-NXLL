import { toast } from './toast.js';
import { createProduct, correctProduct } from './requests.js';
import { setChangedData, editFormEl } from './editProduct.js';
import { resetInput, thumbnailEl, detailImgEl, priceInputEl, editDetailImgEl, editThumbnailEl, editPriceInputEl } from './inputUtils.js';
import { store } from '../../js/store.js';
const addFormEl = store.selector('.add-form')


// 추가, 수정 submit 유틸
export function submitUtil(selector) {
  selector.addEventListener('submit', (event) => {
    event.preventDefault();

    let isSoldOut = false;
    const tags = [];
    let titleSelector, categorySelector, tagSelector, descriptionSelector, price, thumbnail, photo = ''

    if (selector === editFormEl) {
      titleSelector = '.edit-product-name';
      categorySelector = 'input[name="edit-category"]:checked';
      tagSelector = 'input[name="edit-check"]:checked';
      descriptionSelector = '.edit-product-description';
      price = Number(editPriceInputEl.value.replace(/[^0-9]/g, ''));
      thumbnail = editThumbnailEl.dataset.id;
      photo = editDetailImgEl.dataset.id;
    }
    else if (selector === addFormEl) {
      titleSelector = '.add-product-name';
      categorySelector = 'input[name="category"]:checked';
      tagSelector = 'input[name="check"]:checked';
      descriptionSelector = '.add-product-description';
      price = Number(priceInputEl.value.replace(/[^0-9]/g, ''));
      thumbnail = thumbnailEl.dataset.id;
      photo = detailImgEl.dataset.id;
    }

    if (store.selector('input[name="filter"]:checked').value === 'true') {
      isSoldOut = true;
    }
    const productId = editFormEl.querySelector('.edit-product-id').textContent
    const title = store.selector(titleSelector).value;
    const selectedCategory = store.selector(categorySelector).value;
    const selectedTags = document.querySelectorAll(tagSelector);
    tags.push(selectedCategory);
    selectedTags.forEach((tag) => {
      tags.push(tag.value);
    });
    const description = store.selector(descriptionSelector).value;

    if (title.length < 2 || price < 1 || description.length < 1) {
      selector === editFormEl
        ? toast('내용이 모두 입력되었는지 확인해 주세요', "전체")
        : toast('내용이 모두 입력되었는지 확인해 주세요', "추가");
    }

    if (selector === editFormEl) {
      try {
        correctProduct({ productId, title, price, description, tags, thumbnail, photo, isSoldOut });
        setChangedData(productId, title, price, description, tags, isSoldOut)
        toast('상품 수정이 완료되었습니다.', "전체");
      } catch (error) {
        toast(error, '잠시 후 다시 시도해주세요', "전체");
      }
    } else if (selector === addFormEl) {
      try {
        createProduct({ title, price, description, tags, thumbnail, photo });
        toast("상품 추가가 완료되었습니다.", "추가")
        resetInput(event)
      } catch (error) {
        toast(`${error}, 잠시 후 다시 시도해주세요.`, "추가")
      }
    }
  }
  );
}

submitUtil(addFormEl);