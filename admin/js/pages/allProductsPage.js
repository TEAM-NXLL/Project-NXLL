import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Add Product Page");
  }
  async getHtml() {
    return /*HTML*/`
      <main id="all-products" class="all-products">
    <div class="inner">
      <div class="products-container">
        <div class="product-item item-head">
          <div class="thumbnail">썸네일 이미지</div>
          <div class="text-wrapper">
            <div class="id">제품번호</div>
            <div class="title">제품명</div>
            <div class="price">가격</div>
            <div class="tags">태그</div>
            <div class="is-sold-out">매진 여부</div>
            <div class="descript">기본 정보</div>
            <button class="edit-delete delete-checked">선택항목 삭제</button>
          </div>
          <!-- observer 생성해서 무한 스크롤하기-->
        </div>
      </div>
    </div>
  </main>
    `
  }
}