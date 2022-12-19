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
const editPopup = document.querySelector('.editPopup')

gnbTabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    clickItem(tab)

    const panels = document.querySelectorAll('.panels')

    for(let i = 0; i < panels.length; i++) {
      const tabTarget = e.target.hash.substr(1)

      if(tabTarget === panels[i].id) {
        panels[i].classList.add('here')
        
        if(editPopup.classList.contains('show')) {
          editPopup.classList.remove('show')
        }
      } else {
        panels[i].classList.remove('here')
      }
    }
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