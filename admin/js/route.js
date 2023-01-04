import { store } from '../../js/store.js';
import { viewAllProduct, viewAllTransactions } from './requests.js';
import { renderAdminSummary } from './adminSummary.js';
import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { transacSearch } from './transacSearch.js';

export async function router() {
  const gnb = store.selector('.gnb');
  const gnbTabs = gnb.querySelectorAll('li');
  let activeTab = gnb.querySelector('.active');
  const routePath = location.hash;
  const panels = document.querySelectorAll('.panels');
  const allProduct = await viewAllProduct();
  const allTransac = await viewAllTransactions();

  try {
    renderAdminSummary(allTransac, allProduct);
  } catch {
    console.log('관리자 페이지 요약 실패');
  }

  gnbTabs.forEach((tab) => {
    tab.onclick = () => {
      if (activeTab === tab) return;
      if (activeTab) {
        activeTab.classList.remove('active');
      }
      tab.classList.add('active');
      activeTab = tab;
    };

    for (const panel of panels) {
      const panelId = `#${panel.id}`;
      console.log(panelId);
      if (panelId === '') {
        panel.classList.add('here');
      } else if (panelId === routePath) {
        panel.classList.add('here');
      } else {
        panel.classList.remove('here');
      }
    }
  });

  if (routePath === '' || routePath === '#all-products') {
    renderAllProduct(allProduct);
  } else if (routePath === '#add-products') {
    //
  } else if (routePath === '#all-transacs') {
    try {
      renderAlltransacs(allTransac);
    } catch {
      console.log('전체 거래 내역 실패');
    }
    try {
      transacSearch(allTransac);
    } catch {
      console.log('전체 거래 내역 검색 실패');
    }
  }
}
