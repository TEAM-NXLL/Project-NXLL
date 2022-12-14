export function toast(message) {
  const main = document.querySelector('.all-products')
  const toastBox = document.createElement('div');
  toastBox.classList.add('toast-box');

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toastBox.appendChild(toast);
  main.appendChild(toastBox);

  setTimeout(() => {
    toastBox.remove()
  }, 600);
}