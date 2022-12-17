import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary';
import { addItem } from './addProduct.js';
// import { router } from './adminRouter.js';

(async () => {
  await renderAdminSummary();
  await renderAllProduct();
  await renderAlltransacs();
})();

// GNB 탭
const gnb = document.querySelector('.gnb')
const gnbTabs = gnb.querySelectorAll('li')
let activeTab = gnb.querySelector('.active')

gnbTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    clickItem(tab)
  })
})

function clickItem(tab) {
  if(activeTab == tab) return
  if(activeTab) {
    activeTab.classList.remove('active')
  }

  tab.classList.add("active");
  activeTab = tab;
}
