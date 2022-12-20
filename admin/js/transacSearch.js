import { renderAlltransacs } from "./renderAlltransacs.js"

export async function transacSearch(allTransac){
  const searchBar = document.querySelector('.transac-search-bar')
  const searchBtn = document.querySelector('.transac-search-btn')
  
  
  searchBar.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchBtn.click()
    }
  })  

  searchBtn.addEventListener('click', event => {
    const title = searchBar.value

    const searchTransac = allTransac.filter( el => {
      return el.product.title.includes(title) === true
    })

    console.log(searchTransac)
    searchBar.value = ''
    const productCont = document.querySelector('.all-transac-container')
    const allTransacs = productCont.querySelector('.allTransacs')

    if(searchTransac.length > 0 && allTransacs){
      allTransacs.innerHTML = ''
      renderAlltransacs(searchTransac)
    } else if(!allTransacs){
      productCont.innerHTML = /*html*/`
        <colgroup>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
        </colgroup>
        <thead class="properties properties-head">
          <tr class="text-wrapper">
            <th class="thumbnail">썸네일</th>
            <th class="transacId">거래번호</th>
            <th class="displayName">이름</th>
            <th class="email">이메일</th>
            <th class="id">제품번호</th>
            <th class="title">제품명</th>
            <th class="price">가격</th>
            <th class="tags">태그</th>
            <th class="bank-name">은행명</th>
            <th class="bank-code">은행코드</th>
            <th class="account-number">계좌번호</th>
            <th class="transac-time">거래시간</th>
            <th class="transac-status">거래상태</th>
          </tr>
        </thead>
        <tbody className="allTransacs"></tbody>
      `
      renderAlltransacs(searchTransac)
    } else {
      productCont.innerHTML = /*html*/`
        <div class="emptyTable">
          <img src="../images/nothing.jpg" alt="nothing" />
          <span class="nothing-text">결과가 존재하지 않습니다.</span>
        </div>
      `
    }
  })
}