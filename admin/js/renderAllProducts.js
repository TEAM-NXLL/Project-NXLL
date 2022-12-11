import { viewAllProduct } from './requests';

export async function renderAllProduct() {
  const products = await viewAllProduct();
  console.log(products);
  products.forEach((el) => {
    const id = el.id;
    const title = el.title;
    const price = el.price;
    const description = el.description;
    const tag = el.tag;
    const isSold = el.isSoldOut;
    const thumbnail = el.thumbnail;

    const product = document.createElement('div');
    product.classList.add('product-item');

    const innerHTMLContents = /*html*/ `
        <div class="thumbnail">${thumbnail}</div>
        <div class="text-wrapper">
          <div class="id">${id}</div>
          <div class="title">${title}</div>
          <div class="price">${price}</div>
          <div class="tags">${tag}</div>
          <div class="is-sold-out">${isSold}</div>
          <div class="descript">${description}</div>
          <div class="edit-delete-btn">
            <button class="edit-btn">제품 수정</button>
            <button class="del-btn">제품 삭제</button>
          </div>
        </div>
    `;

    product.innerHTML = innerHTMLContents;
    const productCont = document.querySelector('.products-container');
    productCont.append(product);
  });
}
