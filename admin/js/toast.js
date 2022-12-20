export function toast(message, state) {
  // const main = state === "추가" 
  //   ? document.querySelector('.addProductPanel')
  //   : document.querySelector('.all-products');
  let main = '';
  if (state === "추가") {
    main = document.querySelector('.addProductPanel');
  } else if (state === "전체") {
    main = document.querySelector('.all-products');
  } else {
    main = document.querySelector('.all-transacs');
  }

  const toastBox = document.createElement('div');
  toastBox.classList.add('toast-box');

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toastBox.appendChild(toast);

  if (message === "상품 수정이 완료되었습니다.") {
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

    confirmArea.addEventListener("click", event => {
      const {target} = event;
      if (target.matches('.confirm')) {
        const editPopup = document.querySelector('.editPopup');
        editPopup.classList.remove('show');
        location.hash = '#all-products'
        location.reload();
      } else if (target.matches('.cancel')) {
        toastBox.remove()
      }
    })
  } else {
    main.appendChild(toastBox);
    setTimeout(() => {
      toastBox.remove()
    }, 8000000);
  }
}