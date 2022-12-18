import { viewAllProduct } from './requests.js';
import { renderProductTransacs } from './renderProductTransacs.js';

export async function renderAllProduct(allTransac, products) {
  // console.log(products);

  products.forEach(async (el) =>  {
    const id = el.id;
    const title = el.title;
    const price = el.price;
    const description = el.description;
    const tag = el.tags;
    const isSold = el.isSoldOut ? 'X' : 'O';
    const thumbnail = el.thumbnail;
    
    const products = document.querySelector('.products')
    const product = document.createElement('tr');
    product.classList.add('product-item');
    product.dataset.id = id

    const innerHTMLContents = /*html*/ `
      <td class="edit-delete-btn">
        <input type="checkbox" name="checkbox" class="delete-checkbox" data-id="${id}">
        <!-- <a href="#edit-products/${id}" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a>
        <a href="#edit-products" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a>
        <button class="del-btn" data-id="${id}">제품 삭제</button> -->
      </td>
      <td class="thumbnail"><img src="${thumbnail}" alt="thumbnail"></td>
      <td class="id">${id}</td>
      <td class="title">${title}</td>
      <td class="price">${price.toLocaleString()+'원'}</td>
      <td class="tags">${tag}</td>
      <td class="is-sold-out">${(isSold)}</td>
      <td class="descript">${description}</td>
      <td class="">
        <a href="#edit-products/${id}" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a>
        <!-- <a href="#edit-products" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a> -->
        <button class="del-btn" data-id="${id}">제품 삭제</button>
      </td>
    `; //edit은 수정예정

    product.innerHTML = innerHTMLContents;
    
    const productCont = document.querySelector('.products-container');
    productCont.append(product);    
    products.append(product)
  });
  
  // products.forEach(async (el) =>  {
  //   const id = el.id;
  //   const title = el.title;
  //   const price = el.price;
  //   const description = el.description;
  //   const tag = el.tags;
  //   const isSold = el.isSoldOut ? '매진' : '재고있음';
  //   const thumbnail = el.thumbnail;
    
  //   const product = document.createElement('div');
  //   product.classList.add('product-item');
  //   product.dataset.id = id

  //   const innerHTMLContents = /*html*/ `
  //       <div class= "product-wrapper">
  //         <div class="thumbnail"><img src="${thumbnail}" alt="thumbnail"></div>
  //         <div class="text-wrapper">
  //           <div class="id">${id}</div>
  //           <div class="title">${title}</div>
  //           <div class="price">${price.toLocaleString()+'원'}</div>
  //           <div class="tags">${tag}</div>
  //           <div class="is-sold-out">${(isSold)}</div>
  //           <div class="descript">${description}</div>
  //           <div class="edit-delete-btn">
  //             <input type="checkbox" name="checkbox" class="delete-checkbox" data-id="${id}">
  //             <!-- <a href="#edit-products/${id}" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a> -->
  //             <a href="#edit-products" data-link><button class="edit-btn" data-id="${id}">제품 수정</button></a>
  //             <button class="del-btn" data-id="${id}">제품 삭제</button>
  //           </div>
  //           <!-- <button class="check-transac">내역 확인</button> -->
  //         </div>
  //       </div>
  //       <button class="each-transac-btn-down">
  //         <span class="material-symbols-outlined">
  //             arrow_drop_down
  //         </span>
  //       </button>
  //       <button class="each-transac-btn-up">
  //         <span class="material-symbols-outlined">
  //             arrow_drop_up
  //         </span>
  //       </button>
  //       <div class="transac-container">    
  //       </div>
  //   `; //edit은 수정예정

  //   product.innerHTML = innerHTMLContents;
    
  //   const productCont = document.querySelector('.products-container');
  //   productCont.append(product);    
  // });
}
