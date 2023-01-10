import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary.js';
import { addItem } from './inputUtils.js';
import { submitForm } from './submitUtil.js';
import { viewAllProduct, viewAllTransactions, adminData } from './requests.js';
import { transacSearch } from './transacSearch.js';
import { keepLogin } from '../../js/requests.js';
import { store } from '../../util/store.js';
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
})();

// header
// async function welcomeAdmin() {
//   // const authLogin = await keepLogin();
//   const welcomeAdmin = store.selector('.adminHeader');
//   const abc = /* HTML */ `
//     <li>
//       <p>Welcome, Admin <strong>${authLogin.displayName}</strong></p>
//     </li>
//     <li class="logOutBtn">
//       <a href="#">로그아웃<i class="fa-solid fa-right-from-bracket"></i></a>
//     </li>
//   `;

//   welcomeAdmin.innerHTML = abc;
// }

// welcomeAdmin();

// GNB 탭
// window.addEventListener('hashchange', router);
// router();
const gnb = store.selector('.gnb');
const gnbTabs = gnb.querySelectorAll('li');
let activeTab = gnb.querySelector('.active');
const editPopup = store.selector('.editPopup');

gnbTabs.forEach((tab) => {
  tab.onclick = (event) => {
    clickItem(tab);

    const panels = document.querySelectorAll('.panels');

    for (let i = 0; i < panels.length; i++) {
      const tabTarget = event.target.hash.substr(1);

      if (tabTarget === panels[i].id) {
        panels[i].classList.add('here');

        if (editPopup.classList.contains('show')) {
          editPopup.classList.remove('show');
        }
      } else {
        panels[i].classList.remove('here');
      }
    }
  }
});

function clickItem(tab) {
  if (activeTab == tab) return;
  if (activeTab) {
    activeTab.classList.remove('active');
  }

  tab.classList.add('active');
  activeTab = tab;
}

// router 이벤트
// window.addEventListener('hashchange', router())
// function router() {
//   const routePath = location.hash
//   const allProducts = store.selector('.all-products')
//   const addProducts = store.selector('.add-products')
//   const allTransacs = store.selector('.all-transace')
//   if (routePath === '#all-products') {
//     allProducts.classList.add('active')
//     addProducts.classList.remove('active')
//     allTransacs.classList.remove('active')
//   } else if (routePath === '#add-products') {
//     addProducts.classList.add('active')
//     allProducts.classList.remove('active')
//     allTransacs.classList.remove('active')
//   } else if (routePath === '#all-transacs') {
//     allTransacs.classList.add('active')
//     addProducts.classList.remove('active')
//     allProducts.classList.remove('active')
//   }
// }