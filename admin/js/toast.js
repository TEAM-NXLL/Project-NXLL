import { store } from '../../util/store.js';

export function toast(message, state) {
  let main = '';
  if (state === "추가") {
    main = store.selector('.addProductPanel');
  } else if (state === "전체") {
    main = store.selector('.all-products');
  } else {
    main = store.selector('.all-transacs');
  }

  const toastBox = document.createElement('div');
  toastBox.classList.add('toast-box');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toastBox.appendChild(toast);

  if (message === "상품 수정이 완료되었습니다.") {
    confirmToastCreator(main, toastBox);
  } else {
    main.appendChild(toastBox);
    setTimeout(() => {
      toastBox.remove()
    }, 800);
  }
}

// 컨펌기능 있는 토스트 만들기
function confirmToastCreator(main, toastBox) {
  const confirmArea = document.createElement('div');
  confirmArea.classList.add('confirm-area')

  const confirmBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  confirmBtn.classList.add('confirm');
  cancelBtn.classList.add('cancel');
  confirmBtn.textContent = '돌아가기';
  cancelBtn.textContent = '머무르기';

  confirmArea.appendChild(confirmBtn);
  confirmArea.appendChild(cancelBtn);
  toastBox.appendChild(confirmArea);
  main.appendChild(toastBox);

  confirmArea.onclick = function confirmToastHandler(event) {
    const { target } = event;
    if (target.matches('.confirm')) {
      const editPopup = store.selector('.editPopup');
      editPopup.classList.remove('show');
      toastBox.remove()
    } else if (target.matches('.cancel')) {
      toastBox.remove()
    }
  }
}
