import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary';
import { addItem } from './addProduct.js';
import { viewAllProduct, viewAllTransactions } from './requests.js';
import { renderProductTransacs } from './renderProductTransacs.js';
import { transacSearch } from './transacSearch.js';

(async () => {
  const allTransac = await viewAllTransactions();
  const allProduct = await viewAllProduct();

  await renderAdminSummary(allTransac, allProduct);
  await renderAllProduct( allTransac, allProduct);
  await renderProductTransacs(allTransac)
  transacSearch(allTransac);
  await renderAlltransacs(allTransac, allTransac);
})();

// GNB 탭
const gnb = document.querySelector('.gnb')
const gnbTabs = gnb.querySelectorAll('li')
let activeTab = gnb.querySelector('.active')

gnbTabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    clickItem(tab)
    console.log(tab)
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