import { renderAllProduct } from './renderAllProducts';
import { renderAlltransacs } from './renderAlltransacs';
import { renderAdminSummary } from './admin-summary';

(async () => {
  await renderAllProduct();
  await renderAlltransacs();
  await renderAdminSummary();
})();
