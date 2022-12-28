import { renderAlltransacs } from './renderAlltransacs.js';
import { store } from '../../js/store.js'

export async function transacSearch(allTransac) {
  const searchBar = store.selector('.transac-search-bar');
  const searchBtn = store.selector('.transac-search-btn');

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchBtn.click()
    }
  })

  searchBtn.addEventListener('click', (event) => {
    const title = searchBar.value;

    const searchTransac = allTransac.filter((el) => {
      return el.product.title.includes(title) === true;
    })

    searchBar.value = ''
    const productCont = store.selector('.all-transac-container')
    const allTransacs = productCont.querySelector('.allTransacs')

    if (searchTransac.length > 0 && allTransacs) {
      allTransacs.innerHTML = ''
      renderAlltransacs(searchTransac)
    } else {
      allTransacs.innerHTML = /*html*/`
        <div class="emptyTable">
          <img src="../images/nothing.jpg" alt="nothing" />
          <span class="nothing-text">결과가 존재하지 않습니다.</span>
        </div>
      `
    }
  })
}