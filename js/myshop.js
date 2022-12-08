const myShoppingEl = document.querySelector('.myShopping')
const root = document.querySelector('main')

myShoppingEl.addEventListener('click', () => {
  location.hash = '#myshopping'
  root.innerHTML = myShoppingForm()
})

function myShoppingForm() {
  return /* html */ `
  <div class="title-box" scope="sub">
      <p class="title-box__text">MY-SHOP</p>
      <p class="title-box__subtext">나의 쇼핑내역을 한눈에 확인하세요.</p>
    </div>

    <!-- INFOMATION -->
    <div class="information">
      <div class="inner">
        <div class="information-item">
          <div class="thumbnail">
            <img src="https://acttomall.com/_sp/_image/user.png" alt="">
            <div class="description">
              <p>저희 쇼핑몰을 이용해주셔서 대단히 감사합니다.<br />
                <strong class="txtEm">회원 가입</strong>을 하시면 각종 다양한 혜택을 받으실 수 있습니다.
              </p>
            </div>
          </div>
          <div class="btn-group">
            <p class="message">로그인이 필요해요</p>
            <a href="./login.html" class="btn__login">
              <i class="fas fa-sm ver-0 fa-power-off"></i>
              &nbsp;로그인
            </a>
            <a href="./join.html" class="btn__join">
              <i class="fas fa-sm ver-0 fa-plus"></i>
              &nbsp;회원가입
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ORDER-LIST -->
    <div class="order-list">
      <div class="inner">
        <a href="#" class="order-list__item">
          <p class="icon order"></p>
          <p>주문 내역</p>
          <p class="price">0건</p>
          <i class="line--hover"></i>
        </a>
        <a href="#" class="order-list__item">
          <p class="icon mileage"></p>
          <p>적립금</p>
          <p class="price">0원</p>
          <i class="line--hover"></i>
        </a>
      </div>
    </div>

    <!-- QUICK-MENU -->
    <div class="quick-menu">
      <div class="inner">
        <div class="title-box" scope="totals">
          <span class="title-box__text">MY QUICK MENU</span>
          <span class="title-box__subtext">나의 주문처리 현황</span>
        </div>
      </div>
      <div class="inner">
        <div class="quick-menu__box">
          <div class="quick-menu__item">
            <span class="icon order"><i></i></span>
            <span class="quick-menu__subject">ORDER</span>
            <span class="quick-menu__title"><strong>주문내역 조회</strong>
              고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.
            </span>
            <span class="quick-menu__linked"><a href="#">조회</a></span>
          </div>
          <div class="quick-menu__item">
            <span class="icon mileage"><i></i></span>
            <span class="quick-menu__subject">PROFILE</span>
            <span class="quick-menu__title"><strong>회원 정보</strong>
              회원이신 고객님의 개인정보를 관리하는 공간입니다.
            </span>
            <span class="quick-menu__linked"><a href="#">조회</a></span>
          </div>
        </div>
        <div class="order-state">
          <div class="order-state__box">
            <a class="order-state__item">
              <p class="count">0</p>
              <p class="state">취소</p>
              <i class="line--hover"></i>
            </a>
            <a class="order-state__item">
              <p class="count">0</p>
              <p class="state">완료</p>
              <i class="line--hover"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}