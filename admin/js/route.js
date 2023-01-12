import { $ } from '../../util/store.js';
import { viewAllProduct, viewAllTransactions } from './requests.js';
import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { transacSearch } from './transacSearch.js';
import { submitUtil } from './submitUtil.js';
const addFormEl = $('.add-form')

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

    // 거짓말
    // 탭에 따라 해당 내용을 보여주는 로직 -> 이거 필요 없지 않나요 이제
    // 걍 활성 탭 CSS 바꿔주는 거 말하는 거죠?ㅇㅇ ㅇㅋ 아 그러면 이건 없에도 되겠네요
    // gnb는 클릭하면 focus되는 효과 라우터로하면 없어도 되겠죵? ㅇㅋ gg
    // for (const panel of panels) {
    //   const panelId = `#${panel.id}`;
    //   if (panelId === '') {
    //     panel.classList.add('here');
    //   } else if (panelId === routePath) { 
    //     panel.classList.add('here');
    //   } else {
    //     panel.classList.remove('here');
    //   }
    // }
  });

  // 관리자페이지 라우터
  if (routePath === '' || routePath === '#all-products') {
    renderAllProduct(allProduct);
  } else if (routePath === '#add-products') {
    submitUtil(addFormEl);
  } else if (routePath === '#all-transacs') {
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