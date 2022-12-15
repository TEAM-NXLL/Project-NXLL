import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './admin-summary.js';
import { addItem } from './addProduct.js';
// import { router } from './adminRouter.js';

(async () => {
  await renderAllProduct();
  await renderAlltransacs();
  await renderAdminSummary();
})();
