import { renderAllProduct } from './renderAllProducts';
import { renderAlltransacs } from './renderAlltransacs';

(async () => {
  await renderAllProduct();
  await renderAlltransacs();
})();
