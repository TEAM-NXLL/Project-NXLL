import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary';
import { addItem } from './addProduct.js';
import { viewAllProduct, viewAllTransactions } from './requests.js';
import { renderProductTransacs } from './renderProductTransacs.js';
// import { router } from './adminRouter.js';

(async () => {
  const allTransac = await viewAllTransactions();
  const allProduct = await viewAllProduct();

  await renderAdminSummary(allTransac, allProduct);
  await renderAllProduct( allTransac, allProduct);
  await renderProductTransacs(allTransac)
  await renderAlltransacs(allTransac, allTransac);
})();
