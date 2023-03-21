import { root } from './route';

export function renderAddProductFrame() {
  root.innerHTML = innerFrame;
}

const innerFrame = /*html*/ `
      <p class="tabStyle"><span></span></p>
      <p class="tabStyle"><span></span></p>
      <p class="tabStyle"><span></span></p>
      <div id="add-products" class="addProductPanel panels">
        <ul class="table-area">
          <li>
            <h2>제품 추가<span>엑토의 새로운 제품을 추가해 보세요!</span></h2>
            <form class="add-form">
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="30%" />
                  <col width="20%" />
                  <col width="30%" />
                </colgroup>
                <!-- 상품명 -->
                <tr class="name-area">
                  <th><label for="add-product-name">상품명</label></th>
                  <td colspan="3"><input type="text" class="add-product-name reset" name="add-product-name" required />
                  </td>
                </tr>
                <tr class="price-area">
                  <th><label for="add-product-price">가격</label></th>
                  <td colspan="3"><input type="text" name="add-product-price" class="reset" id="add-product-price"
                      min="0" required />
                    <span>원</span>
                  </td>
                </tr>

                <!-- 태그 선택 -->
                <tr>
                  <th><label>상품 색상</label></th>
                  <td colspan="3">
                    <input type="checkbox" id="check25" class="check" name="check" value="beige" />
                    <label for="check25" class="taglabel">베이지</label>
                    <input type="checkbox" id="check26" class="check" name="check" value="mint" />
                    <label for="check26" class="taglabel">민트</label>
                    <input type="checkbox" id="check27" class="check" name="check" value="pink" />
                    <label for="check27" class="taglabel">핑크</label>
                    <input type="checkbox" id="check28" class="check" name="check" value="white" />
                    <label for="check28" class="taglabel">화이트</label>
                    <input type="checkbox" id="check29" class="check" name="check" value="blue" />
                    <label for="check29" class="taglabel">블루</label>
                    <input type="checkbox" id="check30" class="check" name="check" value="black" />
                    <label for="check30" class="taglabel">블랙</label>
                    <input type="checkbox" id="check31" class="check" name="check" value="green" />
                    <label for="check31" class="taglabel">그린</label>
                    <input type="checkbox" id="check32" class="check" name="check" value="gray" />
                    <label for="check32" class="taglabel">그레이</label>
                  </td>
                </tr>

                <tr>
                  <th><label>상품 태그</label></th>
                  <td colspan="3">
                    <input type="checkbox" id="check19" class="check" name="check" value="new-item" />
                    <label for="check19" class="taglabel">NEW ITEM</label>
                    <input type="checkbox" id="check20" class="check" name="check" value="discount" />
                    <label for="check20" class="taglabel">할인</label>
                  </td>
                </tr>

                <tr>
                  <th>
                    <input type="radio" id="check21" class="category" name="category" value="pc" required checked />
                    <label for="check21" class="category-label">PC</label>
                  </th>
                  <td colspan="3" class="pc-tags add-pc-tags">
                    <input type="checkbox" id="check1" class="check" name="check" value="mouse" />
                    <label for="check1" class="taglabel">마우스</label>
                    <input type="checkbox" id="check2" class="check" name="check" value="keyboard" />
                    <label for="check2" class="taglabel">키보드</label>
                    <input type="checkbox" id="check3" class="check" name="check" value="mousepad" />
                    <label for="check3" class="taglabel">마우스패드</label>
                    <input type="checkbox" id="check4" class="check" name="check" value="usbhub" />
                    <label for="check4" class="taglabel">USB허브</label>
                    <input type="checkbox" id="check5" class="check" name="check" value="monitorstand" />
                    <label for="check5" class="taglabel">모니터스탠드</label>
                    <input type="checkbox" id="check6" class="check" name="check" value="cardreader" />
                    <label for="check6" class="taglabel">카드리더기</label>
                  </td>
                </tr>

                <tr>
                  <th>
                    <input type="radio" id="check22" class="category check" name="category" value="notebook" />
                    <label for="check22" class="category-label">노트북</label>
                  </th>
                  <td colspan="3" class="notebook-tags add-notebook-tags">
                    <input type="checkbox" id="check7" class="check" name="check" value="notebookstand" />
                    <label for="check7" class="taglabel">노트북스탠드</label>
                    <input type="checkbox" id="check8" class="check" name="check" value="lock" />
                    <label for="check8" class="taglabel">노트북잠금장치</label>
                    <input type="checkbox" id="check9" class="check" name="check" value="keypad" />
                    <label for="check9" class="taglabel">노트북키패드</label>
                  </td>
                </tr>

                <tr>
                  <th>
                    <input type="radio" id="check23" class="category check" name="category" value="audio" />
                    <label for="check23" class="category-label">음향</label>
                  </th>
                  <td colspan="3" class="audio-tags add-audio-tags">
                    <input type="checkbox" id="check10" class="check" name="check" value="ear-head" />
                    <label for="check10" class="taglabel">이어폰&헤드폰</label>
                    <input type="checkbox" id="check11" class="check" name="check" value="speaker" />
                    <label for="check11" class="taglabel">스피커</label>
                    <input type="checkbox" id="check12" class="check" name="check" value="mic" />
                    <label for="check12" class="taglabel">마이크</label>
                    <input type="checkbox" id="check13" class="check" name="check" value="kids" />
                    <label for="check13" class="taglabel">키즈헤드폰</label>
                    <input type="checkbox" id="check14" class="check" name="check" value="audiocable" />
                    <label for="check14" class="taglabel">음향케이블&기타</label>
                  </td>
                </tr>

                <tr>
                  <th>
                    <input type="radio" id="check24" class="category check" name="category" value="smart" />
                    <label for="check24" class="category-label">스마트</label>
                  </th>
                  <td colspan="3" class="smart-tags add-smart-tags">
                    <input type="checkbox" id="check15" class="check" name="check" value="adapter" />
                    <label for="check15" class="taglabel">어댑터</label>
                    <input type="checkbox" id="check16" class="check" name="check" value="charging" />
                    <label for="check16" class="taglabel">충전기</label>
                    <input type="checkbox" id="check17" class="check" name="check" value="smartholder" />
                    <label for="check17" class="taglabel">스마트거치대</label>
                    <input type="checkbox" id="check18" class="check" name="check" value="smart-etc" />
                    <label for="check18" class="taglabel">기타스마트기기</label>
                  </td>
                </tr>

                <!-- 상품 상세설명 -->
                <tr class="description-area">
                  <th><label for="description">상품 상세 설명</label></th>
                  <td colspan="3"><textarea class="add-product-description reset" maxlength=100
                      placeholder="상세 설명은 100자 이내로 작성해 주세요." required></textarea></td>
                </tr>

                <!-- 파일 업로드 -->
                <tr class="file-upload-area add-file-upload-area">
                  <!-- 썸네일 업로드 -->
                  <th><label for="add-thumbnail"> 상품 썸네일 등록 </label></th>
                  <td>
                    <div class="imgBox">
                      <img id="thumbnail-preview" class="reset" />
                    </div>
                    <span>
                      <strong>jpg, jpeg, webp, png, gif, svg 확장자만</strong> 등록 가능합니다. 파일 크기는 <strong>1MB 이하</strong>여야
                      합니다.</strong>
                    </span>
                    <input type="file" accept=".jpg, .jpeg, .webp, .png, .gif, .svg"
                      class="add-thumbnail reset thumbnailUploadFile" name="add-thumbnail" id="add-thumbnail" />
                    <label class="thumbnailUploadBtn" for="add-thumbnail"><i class="fa-solid fa-upload"></i> 업로드</label>
                    <div class="reset-btn thumbnail-reset">선택 초기화</div>
                  </td>

                  <!-- 상세사진 업로드 -->
                  <th><label for="add-detail"> 상품 상세사진 등록 </label></th>
                  <td>
                    <div class="imgBox">
                      <img id="detail-preview" />
                    </div>
                    <span><strong>jpg, jpeg, webp, png, gif, svg 확장자만</strong> 등록 가능합니다. 파일 크기는 <strong>4MB
                        이하</strong>여야 합니다.</span>
                    <input type="file" accept=".jpg, .jpeg, .webp, .png, .gif, .svg"
                      class="add-detail reset thumbnailUploadFile" name="add-detail" id="add-detail" />
                    <label class="thumbnailUploadBtn" for="add-detail"><i class="fa-solid fa-upload"></i> 업로드</label>
                    <div class="reset-btn detail-reset">선택 초기화</div>
                  </td>
                </tr>
              </table>
              <!-- form submit 버튼 -->
              <div class="add-button-area">
                <button class="add-btn hover-navy" type="submit"><i class="fa-solid fa-check"></i>상품 등록</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
`;
