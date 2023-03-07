import { renderAlltransacs } from './renderAlltransacs.js';
import { $ } from '../../util/store.js';

export async function transacSearch(allTransac) {
  const searchBar = $('.transac-search-bar');
  const searchBtn = $('.transac-search-btn');

  searchBar.onkeydown = function enterKeyHandler(event) {
    if (event.key === 'Enter') {
      searchBtn.click();
    }
  }
  searchBtn.onclick = function searchBtnHandler() {
    const title = searchBar.value;
    const searchTransac = allTransac.filter((el) => {
      return el.product.title.includes(title) === true;
    });

    searchBar.value = '';
    const productCont = $('.all-transac-container');
    const allTransacs = productCont.querySelector('.allTransacs');

    if (searchTransac.length > 0 && allTransacs) {
      allTransacs.innerHTML = '';
      renderAlltransacs(searchTransac);
    } else {
      allTransacs.innerHTML = /*html*/ `
        <div class="emptyTable">
          <img src="../images/nothing.jpg" alt="nothing" />
          <span class="nothing-text">결과가 존재하지 않습니다.</span>
        </div>
      `;
    }
  }
}


