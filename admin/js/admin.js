import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary';
import { addItem } from './addProduct.js';
// import { router } from './adminRouter.js';

(async () => {
  await renderAdminSummary();
  await renderAllProduct();
  await renderAlltransacs();
})();
