import { $ } from '../../util/store.js';
import { viewAllProduct, viewAllTransactions } from './requests.js';
import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { transacSearch } from './transacSearch.js';
import { submitUtil } from './submitUtil.js';
import { renderAllProductFrame } from './renderAllProductFrame.js';
import { renderAlltransacsFrame } from './renderAlltransacsFrame.js';
import { inputUtils } from './inputUtils.js';
import { renderAddProductFrame } from './renderAddProductFrame.js';

export const root = $('.contents');

export async function router() {
  const gnb = $('.gnb');
  const gnbTabs = $('li', gnb, true);
  let activeTab = $('.active', gnb);
  const panels = $('.panels', document, true);
  const routePath = location.hash;

  // 탭 focus
  gnbTabs.forEach((tab) => {
    tab.onclick = () => {
      if (activeTab === tab) return;
      if (activeTab) {
        activeTab.classList.remove('active');
      }
      tab.classList.add('active');
      activeTab = tab;
    };
  });

  // 관리자페이지 라우터
  if (routePath === '' || routePath === '#all-products') {
    const allProduct = await viewAllProduct();
    renderAllProductFrame();
    renderAllProduct(allProduct);
  } else if (routePath === '#add-products') {
    renderAddProductFrame();
    const addFormEl = $('.add-form');
    submitUtil(addFormEl);
  } else if (routePath === '#all-transacs') {
    const allTransac = await viewAllTransactions();
    renderAlltransacsFrame();
    try {
      await renderAlltransacs(allTransac);
    } catch {
      console.log('전체 거래 내역 실패');
    }
    try {
      await transacSearch(allTransac);
    } catch {
      console.log('전체 거래 내역 검색 실패');
    }
  }
}
