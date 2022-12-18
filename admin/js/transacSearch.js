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

    
    

    if(searchTransac.length > 0){
      document.querySelector('.all-transac-container').innerHTML = /*html*/`
        <div class="properties properties-head">
          <div class="thumbnail">썸네일 이미지</div>
          <div class="text-wrapper">
            <div class="transacId">거래번호</div>
            <div class="displayName">이름</div>
            <div class="email">이메일</div>
            <div class="id">제품번호</div>
            <div class="title">제품명</div>
            <div class="price">가격</div>
            <div class="tags">태그</div>
            <div class="bank-name">은행명</div>
            <div class="bank-code">은행코드</div>
            <div class="account-number">계좌번호</div>
            <div class="transac-time">거래시간</div>
            <div class="transac-status">거래상태</div>
          </div>
        </div>
      `
      renderAlltransacs(searchTransac)
    } else {
      document.querySelector('.all-transac-container').innerHTML = /*html*/`
        <img src="../../static/images/nothing.jpg" alt="nothing" />
        <span class="nothing-text">결과가 존재하지 않습니다.</span>
      `
    }
  })
}