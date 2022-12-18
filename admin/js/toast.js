export function toast(message) {
  const main = document.querySelector('.all-products');
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
    confirmBtn.classList.add('confirm');
    confirmBtn.textContent = '돌아가기';
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel');
    cancelBtn.textContent = '머무르기';

    confirmArea.appendChild(confirmBtn);
    confirmArea.appendChild(cancelBtn);
    toastBox.appendChild(confirmArea);
    main.appendChild(toastBox);

    confirmArea.addEventListener("click", event => {
      const {target} = event;
      if (target.matches('.confirm')) {
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
    }, 800);
  }
}