import { $ } from '../../util/store.js';

export function renderAllProduct(products) {

  products.forEach((el) => {
    const id = el.id;
    const title = el.title;
    const price = el.price;
    const description = el.description;
    const tag = el.tags;
    const isSold = el.isSoldOut ? 'X' : 'O';
    const thumbnail = el.thumbnail;

    const allProducts = $('.allProducts')
    const product = document.createElement('tr');
    product.classList.add('product-item');
    product.dataset.id = id

    const innerHTMLContents = /*html*/ `
      <td class="thumbnail"><img src="${thumbnail}" alt="thumbnail"></td>
      <td class="id">${id}</td>
      <td class="title">${title}</td>
      <td class="price">${price.toLocaleString() + '원'}</td>
      <td class="tags">${tag}</td>
      <td class="is-sold-out">${(isSold)}</td>
      <td class="descript">${description}</td>
      <td class="">
        <a href="#edit-products/${id}" data-link><button class="edit-btn" data-id="${id}">수정</button></a>
        <button class="del-btn" data-id="${id}">삭제</button>
      </td>
    `;

    product.innerHTML = innerHTMLContents;

    const productCont = $('.products-container');
    productCont.append(product);
    allProducts.append(product)
  })
}