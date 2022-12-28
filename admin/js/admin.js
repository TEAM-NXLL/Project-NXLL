import { renderAllProduct } from './renderAllProducts.js';
import { renderAlltransacs } from './renderAlltransacs.js';
import { deleteItem } from './delete.js';
import { renderAdminSummary } from './adminSummary.js';
import { addItem } from './addProduct.js';
import { viewAllProduct, viewAllTransactions, adminData } from './requests.js';
import { transacSearch } from './transacSearch.js';
import { stateLogin } from '../../js/getdata.js'
import { store } from '../../js/store.js'

(async () => {
  const allProduct = await viewAllProduct();
  renderAllProduct(allProduct);
  const allTransac = await viewAllTransactions();
  renderAdminSummary(allTransac, allProduct);
  renderAlltransacs(allTransac);
  transacSearch(allTransac);
})();

// header
async function welcomeAdmin() {
  const authLogin = await stateLogin(localStorage.accessToken)
  console.log(authLogin)
  const welcomeAdmin = store.selector('.adminHeader')
  const abc = /* HTML */`
    <li>
      <p>Welcome, Admin <strong>${authLogin.displayName}</strong></p>
    </li>
    <li class="logOutBtn">
      <a href="#">로그아웃<i class="fa-solid fa-right-from-bracket"></i></a>
    </li>
  `

  welcomeAdmin.innerHTML = abc
}

welcomeAdmin()


// GNB 탭
const gnb = store.selector('.gnb')
const gnbTabs = gnb.querySelectorAll('li')
let activeTab = gnb.querySelector('.active')
const editPopup = store.selector('.editPopup')

gnbTabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    clickItem(tab)

    const panels = document.querySelectorAll('.panels')

    for (let i = 0; i < panels.length; i++) {
      const tabTarget = e.target.hash.substr(1)

      if (tabTarget === panels[i].id) {
        panels[i].classList.add('here')

        if (editPopup.classList.contains('show')) {
          editPopup.classList.remove('show')
        }
      } else {
        panels[i].classList.remove('here')
      }
    }
  })
})

function clickItem(tab) {
  if (activeTab == tab) return
  if (activeTab) {
    activeTab.classList.remove('active')
  }

  tab.classList.add("active");
  activeTab = tab;
}