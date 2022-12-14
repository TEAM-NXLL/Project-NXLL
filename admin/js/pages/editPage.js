import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("제품 수정");
  }
  async getHtml() {
    return /*HTML*/`
 <main id="edit-products">
    <section class="admin-add-title">
      <h2>제품 수정</h2>
    </section>
    <section class="edit">
      <form class="edit-form">
        <!-- 매진 여부 -->
        <div class="soldout-area">
          <input type="radio" id="sell" class="filter" name="filter" value=false checked />
          <label for="sell" class="taglabel">판매중</label>
          <input type="radio" id="soldout" class="filter" name="filter" value=true />
          <label for="soldout" class="taglabel">매진</label>
        </div>
        <!-- 수정 상품명 -->
        <div class="name-area">
          <label for="edit-product-name">상품명</label>
          <input type="text" class="edit-product-name reset" name="edit-product-name" required />
        </div>
        <div class="price-area">
          <label for="edit-product-price">가격</label>
          <input type="text" name="edit-product-price" class="reset" id="edit-product-price" min="0" required />
          <span>원</span>
        </div>

        <!-- 수정 태그 선택 -->
        <div class="tag-area">
          <label>상품 태그</label>
          <input type="checkbox" id="edit-check1" class="check" name="edit-check" value="마우스" />
          <label for="edit-check1" class="taglabel">마우스</label>
          <input type="checkbox" id="edit-check2" class="check" name="edit-check" value="키보드" />
          <label for="edit-check2" class="taglabel">키보드</label>
          <input type="checkbox" id="edit-check3" class="check" name="edit-check" value="음향기기" />
          <label for="edit-check3" class="taglabel">음향기기</label>
          <input type="checkbox" id="edit-check4" class="check" name="edit-check" value="거치대" />
          <label for="edit-check4" class="taglabel">거치대</label>
          <input type="checkbox" id="edit-check5" class="check" name="edit-check" value="스피커/마이크" />
          <label for="edit-check5" class="taglabel">스피커/마이크</label>
          <input type="checkbox" id="edit-check6" class="check" name="edit-check" value="NEW ITEM" />
          <label for="edit-check6" class="taglabel">NEW ITEM</label>
          <input type="checkbox" id="edit-check7" class="check" name="edit-check" value="노트북" />
          <label for="edit-check7" class="taglabel">노트북</label>
          <input type="checkbox" id="edit-check8" class="check" name="edit-check" value="문구/소형가전" />
          <label for="edit-check8" class="taglabel">문구/소형가전</label>
          <input type="checkbox" id="edit-check9" class="check" name="edit-check" value="충전기" />
          <label for="edit-check9" class="taglabel">충전기</label>
          <input type="checkbox" id="edit-check10" class="check" name="edit-check" value="홀리데이 특가" />
          <label for="edit-check10" class="taglabel">홀리데이 특가</label>
        </div>

        <!-- 수정 상품 상세설명 -->
        <div class="description-area">
          <label for="edit-description">상품 상세 설명</label>
          <textarea class="edit-product-description reset" maxlength=100 placeholder="상세 설명은 100자 이내로 작성해 주세요."
            required></textarea>
        </div>
        <!-- 수정 파일 업로드 -->
        <div class="file-upload-area">
          <!-- 수정 썸네일 업로드 -->
          <div class="thumbnail-area">
            <label for="edit-thumbnail"> 상품 썸네일 수정 </label>
            <img id="thumbnail-preview" class="reset" />
            <span>jpg, jpeg, webp, png, gif, svg 확장자만 등록 가능합니다.</span>
            <span>파일 크기는 1MB 이하여야 합니다.</span>
            <input type="file" accept="image/jpg, .jpeg, .webp, .png, .gif, .svg" class="edit-thumbnail reset"
              name="edit-thumbnail" id="edit-thumbnail" />
            <div class="reset-btn thumbnail-reset">선택 초기화</div>
          </div>
          <!-- 수정 상세사진 업로드 -->
          <div class="detail-area">
            <label for="edit-detail"> 상품 상세사진 수정 </label>
            <img id="detail-preview" />
            <span>jpg, jpeg, webp, png, gif, svg 확장자만 등록 가능합니다.</span>
            <span>파일 크기는 4MB 이하여야 합니다.</span>
            <input type="file" accept="image/jpg, .jpeg, .webp, .png, .gif, .svg" class="edit-detail reset"
              name="edit-detail" id="edit-detail" class="reset" />
            <div class="reset-btn detail-reset">선택 초기화</div>
          </div>
        </div>
        <!-- 수정 form submit 버튼 -->
        <div class="edit-button-area">
          <button class="edit-btn" type="submit">상품 수정</button>
        </div>
      </form>
    </section>
  </main>
    `
  }
}