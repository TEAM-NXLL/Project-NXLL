import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("상품 추가");
  }
  async getHtml() {
    return /*HTML*/`
    <main id="add-products">
      <section class="admin-add-title">
        <h2>제품 추가</h2>
      </section>
      <section class="add">
        <form class="add-form">
          <!-- 상품명 -->
          <div class="name-area">
            <label for="add-product-name">상품명</label>
            <input type="text" class="add-product-name reset" name="add-product-name" required />
          </div>
          <div class="price-area">
            <label for="add-product-price">가격</label>
            <input type="text" name="add-product-price" class="reset" id="add-product-price" min="0" required />
            <span>원</span>
          </div>

          <!-- 태그 선택 -->
          <div class="tag-area">
            <label>상품 태그</label>
            <input type="checkbox" id="check1" class="check" name="check" value="마우스" />
            <label for="check1" class="taglabel">마우스</label>
            <input type="checkbox" id="check2" class="check" name="check" value="키보드" />
            <label for="check2" class="taglabel">키보드</label>
            <input type="checkbox" id="check3" class="check" name="check" value="음향기기" />
            <label for="check3" class="taglabel">음향기기</label>
            <input type="checkbox" id="check4" class="check" name="check" value="거치대" />
            <label for="check4" class="taglabel">거치대</label>
            <input type="checkbox" id="check5" class="check" name="check" value="스피커/마이크" />
            <label for="check5" class="taglabel">스피커/마이크</label>
            <input type="checkbox" id="check6" class="check" name="check" value="NEW ITEM" />
            <label for="check6" class="taglabel">NEW ITEM</label>
            <input type="checkbox" id="check7" class="check" name="check" value="노트북" />
            <label for="check7" class="taglabel">노트북</label>
            <input type="checkbox" id="check8" class="check" name="check" value="문구/소형가전" />
            <label for="check8" class="taglabel">문구/소형가전</label>
            <input type="checkbox" id="check9" class="check" name="check" value="충전기" />
            <label for="check9" class="taglabel">충전기</label>
            <input type="checkbox" id="check10" class="check" name="check" value="홀리데이 특가" />
            <label for="check10" class="taglabel">홀리데이 특가</label>
          </div>

          <!-- 상품 상세설명 -->
          <div class="description-area">
            <label for="description">상품 상세 설명</label>
            <textarea class="add-product-description reset" maxlength=100 placeholder="상세 설명은 100자 이내로 작성해 주세요."
              required></textarea>
          </div>
          <!-- 파일 업로드 -->
          <div class="file-upload-area">
            <!-- 썸네일 업로드 -->
            <div class="thumbnail-area">
              <label for="add-thumbnail"> 상품 썸네일 등록 </label>
              <img id="thumbnail-preview" class="reset" />
              <span>jpg, jpeg, webp, png, gif, svg 확장자만 등록 가능합니다.</span>
              <span>파일 크기는 1MB 이하여야 합니다.</span>
              <input type="file" accept="image/jpg, .jpeg, .webp, .png, .gif, .svg" class="add-thumbnail reset"
                name="add-thumbnail" id="add-thumbnail" />
              <div class="reset-btn thumbnail-reset">선택 초기화</div>
            </div>
            <!-- 상세사진 업로드 -->
            <div class="detail-area">
              <label for="add-detail"> 상품 상세사진 등록 </label>
              <img id="detail-preview" />
              <span>jpg, jpeg, webp, png, gif, svg 확장자만 등록 가능합니다.</span>
              <span>파일 크기는 4MB 이하여야 합니다.</span>
              <input type="file" accept="image/jpg, .jpeg, .webp, .png, .gif, .svg" class="add-detail reset"
                name="add-detail" id="add-detail" class="reset" />
              <div class="reset-btn detail-reset">선택 초기화</div>
            </div>
          </div>
          <!-- form submit 버튼 -->
          <div class="add-button-area">
            <button class="add-btn" type="submit">상품 등록</button>
          </div>
        </form>
      </section>
    </main>
    `
  }
}