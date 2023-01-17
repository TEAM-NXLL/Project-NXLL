const transac = /*html*/ `
  <div id="all-transacs" class="all-transacs panels">
        <ul class="table-area">
          <li>
            <h2>
              <p>전체 거래 내역
                <span>엑토의 모든 상품 거래 내역을 확인할 수 있습니다.</span>
              </p>
              <div class="transac-search-wrapper">
                <input type="text" class="transac-search-bar" placeholder="제품을 검색하세요">
                <button class="transac-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </h2>
            <table class="all-transac-container">
              <colgroup>
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="5%">
                <col width="">
                <col width="">
                <col width="8%">
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
              <tbody class="allTransacs"></tbody>
            </table>
          </li>
        </ul>
      </div>

`