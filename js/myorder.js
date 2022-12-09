const myOrderEl = document.querySelector('.myOrder')
console.log(myOrderEl)
const root = document.querySelector('main')

myOrderEl.addEventListener('click', () => {
  location.hash = '#myorder'
  root.innerHTML = myOrderForm()
})

function myOrderForm() {
  return /* html */ `
  <div class="title-box" scope="sub">
      <p class="title-box__text">MY-ORDER</p>
      <p class="title-box__subtext">고객님의 주문내역 입니다.</p>
    </div>

    <div class="tab-menu myorder">
      <div class="inner">
        <ul>
          <li class="selected"><a href="#">주문 내역 조회 <span>(2)</span></a></li>
          <li><a href="#">취소신청 내역 <span>(1)</span></a></li>
          <li><a href="#">과거주문(확정) 내역 <span>(2)</span></a></li>
        </ul>
      </div>
    </div>

    <!-- INFOMATION MYORDER -->
    <div class="information myorder">
      <div class="inner">
        <div class="information-item">
          <div class="thumbnail">
            <img src="https://acttomall.com/_sp/_image/svg/order.svg" alt="">
            <div class="description">
              <div class="title-box" scope="totals">
                <span class="title-box__text">주문조회 안내</span>
              </div>
              <div class="description__help">
                <p>주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</p>
                <p>취소 신청은 주문신청 확정 전까지 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div><!-- INFORMATION MYORDER -->

    <!-- MYORDER-LIST -->
    <div class="myorder-list">
      <div class="inner">
        <div class="title-box myorder" scope="order">
          <span class="title-box__text">MY ORDER</span>
          <span class="title-box__subtext">주문 상품 정보</span>
        </div>
      </div>

      <div class="inner">
        <table>
          <caption>주문 상품 정보</caption>
          <colgroup>
            <col style="width: 135px;">
            <col style="width: 80px;">
            <col style="width: auto;">
            <col style="width: 61px;">
            <col style="width: 111px;">
            <col style="width: 111px;">
            <col style="width: 111px;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">주문일자 <br /> [주문번호]</th>
              <th scope="col">이미지</th>
              <th scope="col">상품정보</th>
              <th scope="col">수량</th>
              <th scope="col">상품구매금액</th>
              <th scope="col">주문처리상태</th>
              <th scope="col">취소/확정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="date">
                <p>2022-12-08</p>
                <a href="#" class="order-number">
                  20221208-0000123
                </a>
                <a href="#" class="">주문취소</a>
              </td>
              <td class="thumb">
                <a href="#">
                  <img src="https://acttomall.com/web/product/medium/202211/ce2cf7367043104db47c1d1355065bcb.jpg"
                    alt="상품 사진">
                </a>
              </td>
              <td class="product">
                <strong class="name">
                  <a href="#">상품명 자리 스피드 타입 C to LAN 어댑터</a>
                </strong>
                <p class="option">[옵션: LAN-04그레이]</p>
              </td>
              <td class="quantity">1</td>
              <td class="price">21,900원</td>
              <td class="state">
                <p>주문 신청중</p>
              </td>
              <td class="decision">
                <p>-</p>
              </td>
            </tr>
            <tr>
              <td class="date">
                <p>2022-12-08</p>
                <a href="#" class="order-number">
                  20221208-0000123
                </a>
                <a href="#" class="">주문취소</a>
              </td>
              <td class="thumb">
                <a href="#">
                  <img src="https://acttomall.com/web/product/medium/202211/ce2cf7367043104db47c1d1355065bcb.jpg"
                    alt="상품 사진">
                </a>
              </td>
              <td class="product">
                <strong class="name">
                  <a href="#">상품명 자리 스피드 타입 C to LAN 어댑터</a>
                </strong>
                <p class="option">[옵션: LAN-04그레이]</p>
              </td>
              <td class="quantity">1</td>
              <td class="price">21,900원</td>
              <td class="state">
                <p>주문 신청중</p>
              </td>
              <td class="decision">
                <p>-</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div><!-- MYORDER-LIST -->
  `
}