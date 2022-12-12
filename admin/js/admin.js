import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';

(async () => {
  await renderAllProduct();
  await renderAlltransacs();
})();
