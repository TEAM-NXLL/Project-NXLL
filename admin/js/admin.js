import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './admin-summary';
import { addItem } from './addProduct.js';


(async () => {
  await renderAllProduct();
  await renderAlltransacs();
  await renderAdminSummary();
})();
