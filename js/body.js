// main
function mainForm() {
  const mainBody = [];
  const swiperArrowBtn = /* HTML 테스트 */ `
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  `

  mainBody.push( /* HTML */ `
    <!-- 메인 스와이퍼 -->
    <div class="swiper mainSwiper">
      <ul class="swiper-wrapper">
  `)

  for (let i = 1; i <= 7; i++) {
    mainBody.push( /* HTML */ `
      <li class="swiper-slide"><a href="#"><img src="../images/slide1-banner${i}.jpg" alt=""></a></li>
    `)
  }

  mainBody.push( /* HTML */ `
      </ul>

      <div class="swiper-pagination"></div>
      ${swiperArrowBtn}
    </div><!-- 메인 스와이퍼 -->

    <!-- 키보드 상품목록 -->
    <section class="keyboard mt70">
      <h1>KEYBOARD</h1>
      <ul class="inner block3">
  `)

  mainBody.push( /* HTML */ `
    </ul>
    </section><!-- 키보드 상품목록 -->

    <!-- 마우스 배너 -->
    <section class="keyboard-banner">
      <div class="swiper keyboardSwiper">
        <ul class="swiper-wrapper">
          <li class="swiper-slide"><a href="#"><img src="./images/slide2-banner1.jpg" alt=""></a></li>
          <li class="swiper-slide"><a href="#"><img src="./images/slide2-banner2.gif" alt=""></a></li>
        </ul>
        ${swiperArrowBtn}
      </div>

      <h3>디자인 키보드는 엑토</h3>
      <p>편의성, 디자인, 기능을 모두 갖춘 <br /> 레트로 감성의 기계식 키보드가 곧 출시됩니다.</p>
      <a href="#keyboard" class="blackBtn">제품 모두 보기</a>
    </section><!-- 마우스 배너 -->

    <!-- 마우스 상품목록 -->
    <section class="mouse mt70">
      <h1>MOUSE</h1>
      <ul class="inner block3">
      </ul>
    </section><!-- 마우스 상품목록 -->

    <!-- 마우스 배너 -->
    <section class="mouse-banner mt70">
      <img src="./images/mouseBanner.gif" alt="">
      <h3>편안한 그립감의 마우스</h3>
      <p>인체공학적 설계로 편안한 그립감과 엑토만의 <br /> 감각적인 디자인의 마우스를 만나보세요.</p>
      <a href="#mouse" class="blackBtn">제품 모두 보기</a>
    </section><!-- 마우스 배너 -->

    <!-- 데스크셋업 배너 -->
    <section class="deskSetup mt70">
      <img src="./images/deskSetup.jpg" alt="">
      <h3>데스크셋업의 완성</h3>
      <p>당신의 데스크를 더욱 업그레이드 시켜 줄 <br /> 다양한 기기들을 만나보세요.</p>
      <a href="#pc" class="blackBtn">제품 모두 보기</a>
    </section><!-- 데스크셋업 배너 -->

    <!-- 뉴아이템 상품목록 -->
    <section class="newItem mt70">
      <h1>NEW ITEM</h1>
      <ul class="inner block3">
      </ul>
    </section><!-- 뉴아이템 상품목록 -->

    <!-- 리뷰 영역 -->
    <section class="review">
      <h1>REVIEW</h1>
      <ul class="inner block5">
  `)

  for (let i = 1; i <= 10; i++) {

    mainBody.push( /* HTML */ `
      <li>
      <a href="#">
        <div class="imgBox">
          <span class="icon insta"></span>
          <img src="./images/review${i}.jpg" alt="이미지 타이틀">
        </div>
        <div class="txtBox">
          <div class="reviewBox">
            <p class="comment">이쁜 집에 다 있던 그 엑토키보드가 우리 집에도 짠! 우리 집도 그럼 이쁜 집? ㅋㅋㅋ</p>
            <p class="viewerId">Reviewer ID</p>
          </div>
          <div class="productBox">
            <img src="./images/retroMiniBeige.jpeg" alt="">
            <div class="productInfo">
              <p class="productName">엑토 레트로 미니 블루투스 키보드</p>
              <p class="productRating">리뷰 <span class="reviewRate">542</span> 평점 <span class="gradeRate">4.9</span>
              </p>
            </div>
          </div>
        </div>
      </a></li>
    `)
  }

  mainBody.push( /* HTML */ `
      </ul>
    </section><!-- 리뷰 영역 -->
  `
  )

  return mainBody.join('')
}

// 상품 목록
function productList(data) {
  const colorChart = ["beige", "mint", "pink", "white", "blue", "black", "green", "gray"]
  const mainBody = []

  for (let i = 0; i < data.length; i++) {

    mainBody.push(/* HTML */`
      <li>
        <a href="#details/${data[i].id}">
    `)

    if (data[i].thumbnail === null || data[i].thumbnail === undefined) {

      mainBody.push(/* HTML */`
            <div class="imgBox">
              <img style="z-index:1; width:60%; height:auto; top:-10px; left:-8px; transform: translate(0, 0);" src="./images/icons/commingSoonIcon.png" alt=""/>
              <img src="./images/preparingProduct.jpg" alt="">
            </div>
            <div class="colorBox">
            <!-- <div>최상의 상품을 제공 드리기 위해 준비중입니다. <br />조금만 기다려 주세요.</div> -->
            `)

      for (let j = 0; j < colorChart.length; j += 1) {
        if (data[i].tags.includes(colorChart[j])) {
          mainBody.push(/* HTML */`
            <span class='${colorChart[j]}'></span>
          `);
        }
      }

      mainBody.push( /* HTML */`
            </div >
            <div class="textBox" style="border-bottom:0">
            ${data[i].title} <span>B300${i}</span>
            </div>
          </a>
        </li>
      `)
    } else {
      mainBody.push(/* HTML */`
        <div class="imgBox">
          <img src="${data[i].thumbnail}" alt="">
        </div>
        <div class="colorBox">
      `)
      for (let j = 0; j < colorChart.length; j += 1) {
        if (data[i].tags.includes(colorChart[j])) {
          mainBody.push(/* HTML */`
            <span class='${colorChart[j]}'></span>
          `);
        }
      }

      const discountValue = Math.floor(Math.random() * 9 + 1) * 8;
      mainBody.push(/* HTML */`
          </div >
          <div class="textBox">
          ${data[i].title} <span>B300${i}</span>
          </div>
          <div class="priceBox">
      `)
      if (data[i].isSoldOut) {
        mainBody.push(/* HTML */`
          <span><img style="width:150px;" src="./images/icons/sold-out-icon.png"/></span>
        `)
      } else {
        mainBody.push(/* HTML */`
                <span class="discount">${data[i].price.toLocaleString()}원</span> 
                ${Math.floor((Number(data[i].price) * (100 - discountValue)) / 100).toLocaleString()}원<br />
                <span class="salePercent">${discountValue}% SALE</span>
              </div>
            </a>
          </li>
        `)
      }
    }

  }

  return mainBody.join('');
}

// 카테고리 내부 메뉴
export function renderInnerCategory(tag, count = 0) {
  const pcTags = ["pc", "keyboard", "mouse", "mousepad",  "usbhub",  "monitorstand", "cardreader"];
  const notebookTags = ["notebook", "notebookstand", "lock", "keypad"];
  const smartTags = ["smart", "adapter", "charging", "smartholder", "smart-etc"];
  const audioTags = ["audio", "ear-head", "speaker", "mic", "kids", "audiocable"];

  if (tag === "new-item") {
    return  /* HTML */  `  
    <div class="category-area">
      <div class="category-title-area">
        <span class="category-title">NEW</span> 
        <span class="category-count1">${count}</span>
        <span class="category-count2">개의 상품이 있습니다.</span>
      </div>
    </div>
   `
  } else if (tag === "discount") {
    return  /* HTML */  `  
      <div class="category-area">
        <div class="event-img-area">
          <img src="https://acttomall.com/web/upload/category/shop1_141_top_476608.gif" alt="홀리데이 특가 이벤트"/>
        </div>
        <div class="category-title-area">
          <span class="category-title">홀리데이 특가</span> 
          <span class="category-count1">${count}</span>
          <span class="category-count2">개의 상품이 있습니다.</span>
        </div>
      </div>
    `
  } else if (pcTags.includes(tag)) {
    return  /* HTML */  `  
      <div class="category-area">
        <div class="category-title-area">
          <span class="category-title">PC</span> 
          <span class="category-count1">${count}</span>
          <span class="category-count2">개의 상품이 있습니다.</span>
        </div>
        <div class="category-menu-area">
          <ul>
            <li class="tab-keyboard">키보드</li>
            <li class="tab-mouse">마우스</li>
            <li class="tab-mousepad">마우스패드</li>
            <li class="tab-usbhub">USB허브</li>
            <li class="tab-monitorstand">모니터 스탠드</li>
            <li class="tab-cardreader">카드 리더기</li>
          </ul>
        </div>
      </div>
    `
  } else if (notebookTags.includes(tag)) {
    return /* HTML */  `  
      <div class="category-area">
        <div class="category-title-area">
          <span class="category-title">노트북</span> 
          <span class="category-count1">${count}</span>
          <span class="category-count2">개의 상품이 있습니다.</span>
        </div>
        <div class="category-menu-area">
          <ul>
            <li class="tab-notebookstand">노트북 스탠드</li>
            <li class="tab-lock">노트북 잠금장치</li>
            <li class="tab-keypad">노트북 키패드</li>
        </div>     
      </div>
      `
  } else if (smartTags.includes(tag)) {
    return /* HTML */  `  
      <div class="category-area">
        <div class="category-title-area">
          <span class="category-title">스마트</span> 
          <span class="category-count1">${count}</span>
          <span class="category-count2">개의 상품이 있습니다.</span>
        </div>
        <div class="category-menu-area">
          <ul>
            <li class="tab-adapter">어댑터</li>
            <li class="tab-charging">충전기</li>
            <li class="tab-holder">스마트 거치대</li>
            <li class="tab-smart-etc">기타 스마트기기</li>
          </ul>
        </div>   
      </div>
      `
  } else if (audioTags.includes(tag)) {
    return /* HTML */  `  
      <div class="category-area">
        <div class="category-title-area">
          <span class="category-title">음향</span> 
          <span class="category-count1">${count}</span>
          <span class="category-count2">개의 상품이 있습니다.</span>
        </div>
        <div class="category-menu-area">
          <ul>
            <li class="tab-ear-head">이어폰&헤드폰</li>
            <li class="tab-speaker">스피커</li>
            <li class="tab-mic">마이크</li>
            <li class="tab-kids">키즈헤드폰</li>
            <li class="tab-audiocable">음향케이블 & 기타</li>
          </ul>
        </div>
      </div>
      `
  } else if (tag === "search") {
    return /* HTML */  `  
    <div class="category-area">
      <div class="category-title-area">
        <span class="category-title">SEARCH</span> 
        <span class="category-count1">${count}</span>
        <span class="category-count2">개의 상품이 있습니다.</span>
      </div>
    </div>
    `
  }
}



// 회원가입 페이지
function joinForm() {
  return /* html */`
    <form id="form-tag">
      <ul class="table-area">
          <h2>JOIN - US</h2>
          <p>아래 정보를 꼼꼼히 입력하세요.</p>
          <li class="base">
          <h2>BASE <span>기본 정보를 입력하세요.</span> <span class="compulsory"><img class="require" src="../images/icons/required.png" alt=""> 필수입력사항</span></h2>
          <table>
              <colgroup>
              <col style="width:150px" />
              <col style="width:auto"/>
          </colgroup>
          <tbody>
              <tr>
              <th scope="row">아이디<img class="require" src="../images/icons/required.png" alt=""></th>
              <td>
                  <input type="text" class="id-input">
                  (영문소문자/숫자, 4~16자)
              </td>
              </tr>
              <tr>
              <th>비밀번호<img class="require" src="../images/icons/required.png" alt=""></th>
              <td>
                  <input type="password" class="pw-input">
                  (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                </td>
              </tr>
              <tr>
                <th>비밀번호 확인<img class="require" src="../images/icons/required.png" alt=""></th>
                <td>
                  <input type="password" class="pw-input-2">
                </td>
              </tr>
              <tr>
                <th>이름<img class="require" src="../images/icons/required.png" alt=""></th>
                <td>
                  <input type="text" class="name-input">
                </td>
              </tr>
            </tbody>
          </table>
        </li>
        <button id="joinBtn" class="joinBtn hover-navy" type="submit"><i class="fa-solid fa-check"></i>회원가입</button>
      </ul>
    </form>
  `
}

// 로그인 페이지
function logInForm() {
  return /* html */`
    <form id="login-form">
      <ul class="logIn-area">
        <h2>LOGIN</h2>
        <li class="logIn-area__input">
          <input type="text" class="signin-id-input" placeholder="아이디">
          <input type="password" class="signin-pw-input" placeholder="비밀번호">
        </li>
        <li class="logIn-area__saveId">
          <input type="checkbox" id="saveId">
          <label for="saveId">아이디저장</label>
        </li>
        <button class="logInBtn" type="submit">로그인</button>
        <li class="logIn-area__find">
          <a href="#">아이디 찾기</a>
          <a href="#">비밀번호 찾기</a>
          <a href="#join">가입하기</a>
        </li>
      </ul>
    </form>
  `
}

// 마이쇼핑 페이지
function myShoppingForm(trans, price, cancelList, confirList) {
  const information = /* html */`
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
            <a href="#login" class="btn__login">
              <i class="fas fa-sm ver-0 fa-power-off"></i>
              &nbsp;로그인
            </a>
            <a href="#join" class="btn__join">
              <i class="fas fa-sm ver-0 fa-plus"></i>
              &nbsp;회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  `
  const goToLogin = (link) => {
    return localStorage.accessToken ? link : '#login'
  }

  return /* html */ `
  <div class="title-box" scope="sub">
      <h2 class="title-box__text">MY-SHOP</h2>
      <p class="title-box__subtext">나의 쇼핑내역을 한눈에 확인하세요.</p>
  </div>
  ${localStorage.accessToken ? '' : information}
    <!-- ORDER-LIST -->
    <div class="order-list">
      <div class="inner">
        <a href="#myorder" class="order-list__item">
          <p class="icon order"></p>
          <p>주문 내역</p>
          <p class="price">${trans ?? 0}건</p>
          <i class="line--hover"></i>
        </a>
        <a href="#" class="order-list__item">
          <p class="icon mileage"></p>
          <p>계좌 잔액</p>
          <p class="price">${price ?? 0}원</p>
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
            <span class="quick-menu__linked"><a href=${goToLogin('#myorder')} class="myOrder" targer="_blank">조회</a></span>
          </div>
          <div class="quick-menu__item">
            <span class="icon mileage"><i></i></span>
            <span class="quick-menu__subject">PROFILE</span>
            <span class="quick-menu__title"><strong>회원 정보</strong>
              회원이신 고객님의 개인정보를 관리하는 공간입니다.
            </span>
            <span class="quick-menu__linked"><a href=${goToLogin('#userinfo')}>조회</a></span>
          </div>
        </div>
        <div class="order-state">
          <div class="order-state__box">
            <a class="order-state__item">
              <p class="count">${cancelList ?? 0}</p>
              <p class="state">취소</p>
              <i class="line--hover"></i>
            </a>
            <a class="order-state__item">
              <p class="count">${confirList ?? 0}</p>
              <p class="state">완료</p>
              <i class="line--hover"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

// 구매 내역 페이지
function myOrderForm(orderList, cancelList, confirList) {
  return /* html */ `
    <div class="title-box" scope="sub">
      <p class="title-box__text">MY-ORDER</p>
      <p class="title-box__subtext">고객님의 주문내역 입니다.</p>
    </div>
    <div class="tab-menu myorder">
      <div class="inner">
        <ul>
          <li class="selected"><a href="#myorder">주문 내역 조회 <span>(${orderList})</span></a></li>
          <li><a href="#myorder/cancel">취소신청 내역 <span>(${cancelList})</span></a></li>
          <li><a href="#myorder/confir">과거주문(확정) 내역 <span>(${confirList})</span></a></li>
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
            <col style="width: 150px;">
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
          <tbody class="trans-product">
          </tbody>
        </table>
      </div>
    </div><!-- MYORDER-LIST -->
  `
}

// 구매 취소 내역 페이지
function myCancelOrderForm(orderList, cancelList, confirList) {
  return /* html */ `
    <div class="title-box" scope="sub">
      <p class="title-box__text">MY-ORDER</p>
      <p class="title-box__subtext">고객님의 주문내역 입니다.</p>
    </div>
    <div class="tab-menu myorder">
      <div class="inner">
        <ul>
          <li><a href="#myorder">주문 내역 조회 <span>(${orderList})</span></a></li>
          <li class="selected"><a href="#myorder/cancel">취소신청 내역 <span>(${cancelList})</span></a></li>
          <li><a href="#myorder/confir">과거주문(확정) 내역 <span>(${confirList})</span></a></li>
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
            <col style="width: 150px;">
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
          <tbody class="trans-product">
          </tbody>
        </table>
      </div>
    </div><!-- MYORDER-LIST -->
  `
}

// 구매 확정 내역 페이지
function myConfirOrderForm(orderList, cancelList, confirList) {
  return /* html */ `
    <div class="title-box" scope="sub">
      <p class="title-box__text">MY-ORDER</p>
      <p class="title-box__subtext">고객님의 주문내역 입니다.</p>
    </div>
    <div class="tab-menu myorder">
      <div class="inner">
        <ul>
          <li><a href="#myorder">주문 내역 조회 <span>(${orderList})</span></a></li>
          <li><a href="#myorder/cancel">취소신청 내역 <span>(${cancelList})</span></a></li>
          <li class="selected"><a href="#myorder/confir">과거주문(확정) 내역 <span>(${confirList})</span></a></li>
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
            <col style="width: 150px;">
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
          <tbody class="trans-product">
          </tbody>
        </table>
      </div>
    </div><!-- MYORDER-LIST -->
  `
}

// 회원 정보 관리 페이지
function userInfoForm(userId, userName) {
  return /* html */`
  <form>
    <ul class="table-area">
      <h2>MODIFY</h2>
      <p>아래 정보를 꼼꼼히 입력하세요.</p>
      <li class="base">
        <h2>BASE <span>수정 정보를 입력하세요.</span></h2>
        <table>
          <colgroup>
            <col style="width:150px" />
            <col style="width:auto"/>
          </colgroup>
          <tbody>
            <tr>
            <th scope="row">아이디</th>
            <td>${userId}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <input type="text" class="user-name" value=${userName} />
              </td>
            </tr>
            <tr>
              <th>기존 비밀번호</th>
              <td>
                <input type="password" class="old-pw-input" minlength="8" maxlength="16" />
                (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
              </td>
            </tr>
            <tr>
              <th>새로운 비밀번호</th>
              <td>
                <input type="password" class="new-pw-input" minlength="8" maxlength="16" />
                (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
              </td>
            </tr>
          </tbody>
        </table>
      </li>
      <button id="editBtn" class="editBtn hover-navy" type="submit"><i class="fa-solid fa-check"></i>회원 정보 수정</button>
    </ul>
  </form>
  `
}

// 회원 정보 관리 계좌
function userAccountForm(totalBalance) {
  return /* html */ `
  <form>
    <ul class="table-area">
      <li class="account">
      <h2>BANK INFO <span>계좌 정보를 확인하세요.</span></h2>
      <table>
        <colgroup>
        <col style="width:150px" />
        <col style="width:auto"/>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">보유 계좌</th>
            <td class="bank-charge">
              <select id="bank-name">
                <option value="default">은행 이름</option>
                <option value="null" class="no-bank">없음</option>
              </select>
              <span class="charge"></span>
              <button type="button" class="cancel-account hover-navy hidden">계좌 해지</button>
            </td>
          </tr>
          <tr>
            <th class="account-charge">전체 계좌 잔액</th>
            <td>
              <span class="charge-num">${totalBalance}</span>
              <span class="won">원</span>
            </td>
          </tr>
          <tr>
            <th>계좌 추가</th>
            <td>
              <select id="add-account">
                <option value="default">은행 이름</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>전화 번호</th>
            <td>
              <input type="number" class="phone-number-input"> - <input type="number" class="phone-number-input"> - <input type="number" class="phone-number-input">
            </td>
          </tr>
          <tr>
            <th>계좌 번호</th>
            <td class='account-number-box'>
              <input type="number" class="account-number-input"> - <input type="number" class="account-number-input"> - <input type="number" class="account-number-input"> - <input type="number" class="account-number-input">
            </td>
          </tr>
          </tbody>
        </table>
      </li>
      <button id="accountBtn" class="accountBtn hover-navy" type="submit"><i class="fa-solid fa-check"></i>계좌 정보 수정</button>
    </ul>
  </form>
  `
}

// 상품 상세페이지
function detailForm(product) {
  return /* html */`
  <div class="page-nav">
    <div class="inner">
      <a href="/">HOME</a>
      <a href="#">${product.tags}</a>
    </div>
  </div>
  <!-- PRODUCT-DETAIL -->
  <div class="product-detail">
    <div class="product-detail__header">
      <div class="inner">
        <div class="product-thumbnail">
          <img src="${product.thumbnail ?? './images/preparingProduct.jpg'}" alt="대표이미지">
        </div>
        <div class="product-order">
          <div class="product-summary">
            <div class="product-summary__title">
              <span>${product.description}</span>
              <p>${product.title}</p>
              <div class="priceBox">
                <span class="price">${product.price.toLocaleString()}원</span>
              </div>
            </div>
            <div class="product-summary__info">
              <p class="info-title">상품 정보</p>
              <p><em>상품 설명</em> <span>${product.description}</span></p>
              <p><em>상품 포함 태그</em> <span style="color:#555;">${product.tags}</span></p>
              <p><em>배송비</em> <span style="color:red;">무료</span></p>
              <p><em>판매 상태</em> <span>${product.isSoldOut === true ? '품절' : '판매 중'}</span></p>
            </div>
            <div class="btn-group">
              <a class="buy-btn">바로 구매하기</a>
              <a class="cart-btn"><i class="fas fa-sm ver-0 fa-plus"></i>장바구니</a>
            </div>
            <div class="delivery-info">
              <p>제주도 및 도서산간 지역은 배송료 3,000원이 추가됩니다</p>
              <p>위 옵션선택 박스를 선택하시면 아래에 상품이 추가됩니다.</p>
              <p>주문수량 안내: 최소주문수량 1개 이상</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-detail__body">
      <ul class="tab-menu detail">
        <li><a name="product-detail__header">상품구매</a></li>
        <li><a name="product-detail__body">상세정보</a></li>
      </ul>
      <div class="inner">
        <div class="product-detail__img">
          <img src="${product.photo}" alt="">
        </div>
      </div>
    </div>
  </div><!-- PRODUCT-DETAIL -->  
  <!-- MODAL-PAYMENT -->
  <div class="modal-payment">
    <div class="modal-payment__header">
      <h3>장바구니 담기</h3>
      <span>물품을 미리 확인하세요</span>
      <button class="btn-close">닫기 버튼</button>
    </div>
    <div class="modal-payment__body"></div>
    
    <div class="modal-payment__footer">
      <span>* 쇼핑을 계속하시려면 이 창을 닫아주시길 바랍니다.</span>
      <a class="cart-buy-btn"><i class="fas fa-check"></i>바로 구매하기</a>
    </div>
  </div><!-- MODAL-PAYMENT -->
  `
}

// 결제 페이지
function paymentForm() {
  return /* html */ `
   <div class="title-box" scope="sub">
      <p class="title-box__text">ORDER - FORM</p>
      <p class="title-box__subtext">나의 장바구니 내역</p>
    </div>
    <div class="order-form">
      <div class="inner">
        <ul>
          <li><i class="fa-solid fa-shirt"></i>CART LIST</li>
          <li class="selected"><i class="fa-regular fa-file-lines"></i>ORDER FORM</li>
          <li><i class="fa-brands fa-cc-visa"></i>PAYMENT</li>
          <li><i class="fa-regular fa-face-smile"></i>COMPLETE</li>
        </ul>
      </div>
    </div>
    <ul class="table-area">
      <li class="product-info">
        <h2>PRODUCT <span>주문 상품 정보</span></h2>
        <table>
          <colgroup>
            <col style="width: 40px"/>
            <col style="width: 80px"/>
            <col style="width: auto"/>
            <col style="width: 98px"/>
            <col style="width: 75px"/>
            <col style="width: 85px"/>
            <col style="width: 98px"/>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">이미지</th>
              <th scope="col">상품 정보</th>
              <th scope="col">판매가</th>
              <th scope="col">수량</th>
              <th scope="col">배송비</th>
              <th scope="col">합계</th>
            </tr>
          </thead>
          <tbody class="products">
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colspan="6">
                상품 구매 금액 = 합계 :
                <span class="total-price"></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </li>
      <button class="product-delete-btn hover-navy">선택 상품 삭제하기</button>
    </ul>
    <ul class="table-area">
      <li class="shipping-info">
      <h2>SHIPPING <span>배송 정보</span></h2>
      <table>
        <colgroup>
        <col style="width:150px" />
        <col style="width:auto"/>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">받으시는 분</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>휴대전화</th>
            <td>
              <input type="number" class="phone-number-input" value="010"> - <input type="number" class="phone-number-input"> - <input type="number" class="phone-number-input">
            </td>
          </tr>
          <tr>
            <th>주소</th>
            <td>
              <input type="text" class="address1"/> 기본 주소<br />
              <input type="text" class="address2" /> 나머지 주소(선택 입력 가능)
            </td>
          </tr>
          <tr>
            <th>배송 메시지</th>
            <td>
              <input type="text" class="shipping-message"/>
            </td>
          </tr>
          </tbody>
        </table>
      </li>
    </ul>
    <ul class="table-area">
      <li class="payment-info">
      <h2>PAYMENT <span>결제</span></h2>
      <table>
        <colgroup>
        <col style="width:150px" />
        <col style="width:auto"/>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" class="total-price-text">총 결제 금액</th>
            <td>
              <span class="total-price"></span>
            </td>
          </tr>
          <tr>
            <th>결제 계좌</th>
            <td>
              <select id="pay-account">
                <option value="default">은행 이름</option>
                <option value="null" class="no-bank">계좌 없음</option>
              </select>
              <span class="charge"></span>
            </td>
          </tr>
          </tbody>
        </table>
      </li>
      <button class="payment-btn hover-navy">결제하기</button>
    </ul>
  `
}

export { joinForm, logInForm, myShoppingForm, myOrderForm, mainForm, productList, userInfoForm, userAccountForm, detailForm, paymentForm, myCancelOrderForm, myConfirOrderForm }