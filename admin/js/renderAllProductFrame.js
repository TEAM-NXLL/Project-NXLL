import { root } from "./route"

export function renderAllProductFrame() {
  root.innerHTML = innerFrame
}

const innerFrame = /*html*/`
      <p class="tabStyle"><span></span></p>
      <p class="tabStyle"><span></span></p>
      <p class="tabStyle"><span></span></p>
      <!-- Lookup All Products -->
      <ul id="all-products" class="table-area here panels">
        <li class="all-products">
          <h2>모든 제품 조회<span>엑토의 모든 제품을 조회할 수 있습니다.</span></h2>
          <table class="products-container">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="20%" />
              <col width="10%" />
              <col width="10%" />
              <col width="7%" />
              <col width="28%" />
              <col width="5%" />
            </colgroup>
            <thead class="product-item item-head">
              <tr class="product-wrapper">
                <th class="thumbnail">썸네일</th>
                <th class="id">제품번호</th>
                <th class="title">제품명</th>
                <th class="price">가격</th>
                <th class="tags">태그</th>
                <th class="is-sold-out">재고</th>
                <th class="descript">기본 정보</th>
                <th class="productBtn"></th>
              </tr>
            </thead>
            <tbody class="allProducts"></tbody>
          </table>
        </li>
      </ul>
`