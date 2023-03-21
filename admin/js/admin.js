import { renderAllProduct } from './renderAllProducts.js';
import { renderAdminSummary } from './adminSummary.js';
import { viewAllProduct, viewAllTransactions, adminData } from './requests.js';
import { router } from './route.js';

(async () => {
  const allProduct = await viewAllProduct();
  try {
    renderAllProduct(allProduct);
  } catch {
    console.log('전체 목록 조회 실패');
  }

  const allTransac = await viewAllTransactions();
  try {
    renderAdminSummary(allTransac, allProduct);
  } catch {
    console.log('관리자 페이지 요약 실패');
  }

  // router
  window.onhashchange = router;
  router();
})();
