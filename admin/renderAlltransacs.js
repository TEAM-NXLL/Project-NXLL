// import { viewAllTransactions } from './requests';

// export async function renderAlltransacs() {
//   const products = await viewAllTransactions();
//   console.log(products);
//   products.forEach((el) => {
//     //transacId
//     const transacId = el.detailId;

//     //product
//     const product = el.product;
//     const id = product.id;
//     const title = product.title;
//     const price = product.price;
//     const description = product.description;
//     const tag = product.tag;
//     const isSold = product.isSoldOut;
//     const thumbnail = product.thumbnail;

//     //account
//     const account = el.account;
//     const bankName = account.bankName;
//     const bankCode = account.bankCode;
//     const accountNumber = account.accountNumber;

//     //user
//     const user = el.user;
//     const email = user.email;
//     const displayName = user.displayName;

//     const product = document.createElement('div');
//     product.classList.add('product-item');

//     const innerHTMLContents = /*html*/ `
//         <div class="thumbnail">${thumbnail}</div>
//         <div class="text-wrapper">
//           <div class="id">${id}</div>
//           <div class="title">${title}</div>
//           <div class="price">${price}</div>
//           <div class="tags">${tag}</div>
//           <div class="is-sold-out">${isSold}</div>
//           <div class="descript">${description}</div>
//         </div>
//     `;

//     product.innerHTML = innerHTMLContents;
//     const productCont = document.querySelector('.products-container');
//     productCont.append(product);
//   });
// }
