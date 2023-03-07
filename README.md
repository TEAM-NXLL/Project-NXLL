## 👻 팀 소개

안녕하세요, TEAM NXLL입니다. <br />

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/113992260?v=4"  alt=""/><br />
        팀장 FE.<br/>
        <a href="https://github.com/quokka-eating-carrots">
          <img src="https://img.shields.io/badge/조민정-B5D9AD?style=flat-round&logo=GitHub&logoColor=black"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106734517?v=4"  alt=""/><br />
        팀원 FE.<br/>
        <a href="https://github.com/iziz9">
          <img src="https://img.shields.io/badge/강현주-6B8E23?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/82831436?v=4"  alt=""/>
        팀원 FE.<br/>
        <a href="https://github.com/thinkisall">
          <img src="https://img.shields.io/badge/김상현-B0C4DE?style=flat-round&logo=GitHub&logoColor=black"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/114797992?v=4"  alt=""/>
        팀원 FE.<br/>
        <a href="https://github.com/HyunSooBae">
          <img src="https://img.shields.io/badge/배현수-006400?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/48847034?v=4"  alt=""/>
        팀원 FE.<br/>
        <a href="https://github.com/DavidOH77">
          <img src="https://img.shields.io/badge/오혜성-606060?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/64674174?v=4"  alt=""/>
        팀원 FE.<br/>
        <a href="https://github.com/hyerimhan">
          <img src="https://img.shields.io/badge/한혜림-FF55B6?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

- ## [Project-NXLL (Demo)](https://team-nxll.netlify.app/)

* ❗관리자
  - ID : admin@abc.com
  - PW : 12345678
* ❗사용자
  - ID : test1@abc.com ...
  - PW : 12345678

- 프로젝트를 진행하면서 작성한 기록들은 [여기서](https://www.notion.so/quokka-eating-carrots/TEAM-NXLL-63f100662e0949e7ab388868f384967b) 보실 수 있습니다. <img src="https://img.shields.io/badge/Notion-000000?style=flat-round&logo=Notion&logoColor=white"/>
  <br/><br/><br/>

## 📆 과제 기간 및 담당 업무

과제 기간: 2022. 11. 28 ~ 2022. 12. 21 <br />

- <b>조민정 :</b> <사용자 페이지> FOOTER 퍼블리싱, 계좌 연결, 결제 페이지, 구매 내역 페이지<br/>
- <b>강현주 :</b> <관리자 페이지> 상품 추가 삭제 수정 | <사용자 페이지> 카테고리 기능<br />
- <b>김상현 :</b> <사용자 페이지> 로그인, 로그아웃, 메인 페이지, 장바구니<br />
- <b>배현수 :</b> <사용자 페이지> 마이쇼핑 페이지 퍼블리싱, 마이오더 페이지 퍼블리싱, 상세 페이지, 장바구니 <br />
- <b>오혜성 :</b> <관리자 페이지> 제품, 구매 내역 목록 조회 페이지, 구매 내역 확정, 취소 | <사용자 페이지> 결제 페이지 <br />
- <b>한혜림 :</b><사용자 페이지> 메인 페이지, 검색 기능 | <관리자 페이지> UI/UX | 총괄 퍼블리싱
  <br/><br/><br/>

## 🪄 기술 스택

<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-round&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-round&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-round&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-round&logo=Swiper&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-round&logo=GitHub&logoColor=white"/>
<br/><br/><br/>

## ⌨️ 레퍼런스

기능 개발에 우선적인 초점을 두고 프로젝트를 진행하여 디자인과 판매 상품들은 [엑토몰](https://acttomall.com/)을 참고하여 진행하였습니다.
<br/><br/><br/>

## 🖥️ 주요 구현 기능

## 인증 - 사용자

### 1. 회원 가입

<img src="https://i.ibb.co/Dp1Rj0n/join.png" alt="join" border="0">

- 회원 가입 api로 가입 정보를 보냄

<br/>

### 2. 로그인

<img src="https://i.ibb.co/pbYrG21/login.png" alt="login" border="0">

- 로그인 성공 시 : 토큰 값을 받아서 LocalStorage에 저장
- 로그인 유지 : 토큰 값이 LocalStorage에서 삭제되지 않는 이상 계속 유지됨
- 로그아웃 시 LocalStorage AccessToken 삭제되면서 메인 화면으로 전환
- 관리자 계정으로 로그인하면 관리자 페이지로 갈 수 있는 버튼이 활성화 됨

<br/><br/><br/>

## 메인 홈 - 사용자

### 1. 홈

<img src="https://i.ibb.co/KFYYs38/home.png" alt="home" border="0">

- keyboard, mouse, new Item 별로 메인 상품 출력
- 각 섹션별로 등록된 제품이 없을 때 '상품준비중' 배너 구현
- 매진된 제품은 제품 가격 대신 'sold out' 아이콘으로 대체
- 상품 검색 가능
- nav 탭을 누르면 해당 종류별로 품목 출력
- 장바구니 페이지로 넘어가지 않고 바로 확인 가능
- 스크롤에 반응하는 nav영역

<br/>

### 2. 결제 - 제품 거래 (구매) 신청

<img src="https://i.ibb.co/ckjswLH/localhost-1234-1.png" alt="localhost-1234-1" border="0">

<br/>

### 3. MY-SHOP (내정보)

<img src="https://i.ibb.co/b6BYvy0/my-Shopping.png" alt="my-Shopping" border="0">

- 사용자 정보 수정 (회원 정보 → 조회)
  - 사용자 정보 수정
    <img src="https://i.ibb.co/BNfVV9Y/Untitled-2.png" alt="Untitled-2" border="0">
  - 계좌
    - 선택가능한 은행 목록 조회
    - 계좌 목록 및 잔액 조회
    - 계좌 연결
    - 계좌 해지
      <img src="https://i.ibb.co/YT6QbgG/Untitled-3.png" alt="Untitled-3" border="0">
      <img src="https://i.ibb.co/Pg34gRb/Untitled-4.png" alt="Untitled-4" border="0">
  - 주문내역 조회 (주문내역 조회 → 조회) + 제품 전체 거래 (구매) 내역 - 주문 취소 - 제품 거래 (구매) 취소 + 주문 확정 - 제품 거래 (구매) 확정
    <img src="https://i.ibb.co/tYkLxfC/localhost-1234.png" alt="localhost-1234" border="0">  
    <br/>

### 4. 제품검색

<img src="https://i.ibb.co/zNNsgKV/product-Search.png" alt="product-Search" border="0">

- 품명으로 상품 검색
- 검색 내용이 없을 때 검색결과 없음 화면 출력
  <br/><br/><br/>

## ETC. - 사용자

### 1. 장바구니

<img src="https://i.ibb.co/gTbvZc0/shopping-Bag.png" alt="shopping-Bag" border="0">

<br/>

### 2. 상품 탭 ex)홀리데이 특가

<img src="https://i.ibb.co/88YM1CT/holiday-Sale-Tab.png" alt="holiday-Sale-Tab" border="0">

<br/>

### 3. 제품 상세 보기

<img src="https://i.ibb.co/F4LRLBM/Untitled-5.png" alt="Untitled-5" border="0">

<br/><br/><br/>

## 제품 - 관리자

### 1. 모든 제품 조회

<img src="https://i.ibb.co/bL85vXv/admin-Allproduct.png" alt="admin-Allproduct" border="0">

- 제품수정, 제품 삭제
  - 제품수정 (모든 제품 조회 → 수정)
  - 제품삭제 (모든 제품 조회 → 삭제)
    <img src="https://i.ibb.co/nrw0dRK/admin-Edit-Product.png" alt="admin-Edit-Product" border="0">

<br/>

### 2. 전체 거래 내역

<img src="https://i.ibb.co/fQVYjZF/admin-Transac.png" alt="admin-Transac" border="0">

- 거래(판매) 내역 완료/취소 및 해제

<br/>

### 3. 제품 추가

<img src="https://i.ibb.co/Z61jpjL/admin-Add-Product.png" alt="admin-Add-Product" border="0">
<br/><br/><br/>

## 📚 개발 문서

1. [코드 문서](https://docs.google.com/spreadsheets/d/1leaXcP6FK4dbTtn1qYrFU5xB5U1O0rGjB4G7o2-VSMk/edit#gid=0) <br />
   html을 작성하면서 생긴 선택자명을 공유하기 위해서 작성하였고, 테스트 하면서 사용되는 ID/PW를 공유하였습니다. SPA 방식으로 프로젝트를 진행하면서 저희는 Hash Change 이벤트를 사용하여 페이지 전화를 하였는데 이때 hash값을 공유하였습니다.
2. [에러 핸들링 문서](https://quokka-eating-carrots.notion.site/730fd8b296cb451b98a896b9100ab4ce) <br />
   과제를 진행하면서 막혔던 부분들을 공유하고 해결한 기록들입니다.
   <br/><br/><br/>

## 🔔 어려웠던 점 및 부족한 점

1. 아직 DOM 요소로 렌더되기 전이라서 존재하지 않는 div를 쿼리셀렉터로 선택하고 싶을 때, 이벤트 위임 외에 어떤 방법이 있는지 궁금합니다. 이벤트 위임으로 처리하니 원하는 기능으로 구현되지 않았습니다. 여러 번 반복적으로 이벤트가 실행되기도 하였습니다.

2. 콘솔창에 에러 자체가 안 뜨게 하는 법이 어려웠다. (현재도 작동은 잘 되어도 콘솔창에 오류가 뜨는 것이 많다.) try catch로 잡고 싶은데 fetch 방식으로 status 상태 코드를 제어하는 것을 잘 몰라서인지 생각한 코드가 잘 실행이 되지 않았다. 그래서 API에서 에러가 났을 때 반환하는 문구들로 에러 처리를 시도했었다.

3. API의 문제인 건지 계좌의 금액이 300만 원 이상(계좌 최초 금액은 300만 원)으로 찍힌 적이 있었습니다.

4. 모듈 상호 참조, 중복 코드 없이 toast 기능을 사용할 수 있는 방법이 있을까요? <br/>
   `현재` <br/>
   ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/45843c4e-aa6b-4323-b109-946571e3f689/%EC%98%88%EC%81%9C%ED%86%A0%EC%8A%A4%ED%8A%B8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T110850Z&X-Amz-Expires=86400&X-Amz-Signature=43a7b1683b991547024097f5348945747d5a8b7cb489c5b43e9d5a24c7c5c085&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25EC%2598%2588%25EC%2581%259C%25ED%2586%25A0%25EC%258A%25A4%25ED%258A%25B8.png%22&x-id=GetObject) <br /> 1-1. 관리자 페이지의 제품 추가/수정/삭제 후 정상적으로 수행되었는지 알리기 위한 toast 기능
   ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7467970e-8c91-4969-9444-64178dddb959/%EB%AA%A8%EB%93%88_%EC%83%81%ED%98%B8%EC%B0%B8%EC%A1%B0%EC%97%86%EC%9D%B4_%EC%82%AD%EC%A0%9C_%EC%8B%9C_%ED%86%A0%EC%8A%A4%ED%8A%B8%EB%A5%BC_%EB%9D%84%EC%9A%B8%EB%B0%A9%EB%B2%95%EC%9D%B4_%EC%9E%88%EC%9D%84%EA%B9%8C3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T110931Z&X-Amz-Expires=86400&X-Amz-Signature=e555206c408df43812e3ca5254cca6a4cc5028ddb1b3013c7f81fa00001dc062&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25EB%25AA%25A8%25EB%2593%2588%2520%25EC%2583%2581%25ED%2598%25B8%25EC%25B0%25B8%25EC%25A1%25B0%25EC%2597%2586%25EC%259D%25B4%2520%25EC%2582%25AD%25EC%25A0%259C%2520%25EC%258B%259C%2520%25ED%2586%25A0%25EC%258A%25A4%25ED%258A%25B8%25EB%25A5%25BC%2520%25EB%259D%2584%25EC%259A%25B8%25EB%25B0%25A9%25EB%25B2%2595%25EC%259D%25B4%2520%25EC%259E%2588%25EC%259D%2584%25EA%25B9%258C3.png%22&x-id=GetObject) <br /> 1-2. 상품 수정 페이지에서 토스트 팝업을 `window.confirm` 대신 사용하기 위해 특정 메시지를 인수로 받아 confirm 기능 추가
   ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/19bdfa27-2baf-45de-a0b9-6875f2789754/%EB%AA%A8%EB%93%88_%EC%83%81%ED%98%B8%EC%B0%B8%EC%A1%B0%EC%97%86%EC%9D%B4_%EC%82%AD%EC%A0%9C_%EC%8B%9C_%ED%86%A0%EC%8A%A4%ED%8A%B8%EB%A5%BC_%EB%9D%84%EC%9A%B8%EB%B0%A9%EB%B2%95%EC%9D%B4_%EC%9E%88%EC%9D%84%EA%B9%8C4_edit%ED%8E%98%EC%9D%B4%EC%A7%80.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T111013Z&X-Amz-Expires=86400&X-Amz-Signature=f973ac46707205527879c3da198292c3c623ebf47984c0342d92d007ef17d68b&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25EB%25AA%25A8%25EB%2593%2588%2520%25EC%2583%2581%25ED%2598%25B8%25EC%25B0%25B8%25EC%25A1%25B0%25EC%2597%2586%25EC%259D%25B4%2520%25EC%2582%25AD%25EC%25A0%259C%2520%25EC%258B%259C%2520%25ED%2586%25A0%25EC%258A%25A4%25ED%258A%25B8%25EB%25A5%25BC%2520%25EB%259D%2584%25EC%259A%25B8%25EB%25B0%25A9%25EB%25B2%2595%25EC%259D%25B4%2520%25EC%259E%2588%25EC%259D%2584%25EA%25B9%258C4%2520edit%25ED%258E%2598%25EC%259D%25B4%25EC%25A7%2580.png%22&x-id=GetObject) <br /> 1-3. 상품 수정 버튼 클릭 시 toast 함수를 호출하는 코드
   ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bf34415b-4574-40a4-9964-61848a998575/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T111514Z&X-Amz-Expires=86400&X-Amz-Signature=63df52b5e35047e7f4ea1fc0c362e0af1e6e3f2054ce3ccf0e086f6cf4d7b1f4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject) <br /> 1-4. toast 함수 `해당 함수는 toast.js에서도 볼 수 있습니다.`
   ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d70c4e3d-9f3f-45ec-bb27-eaa5eeb77cb5/%EB%AA%A8%EB%93%88_%EC%83%81%ED%98%B8%EC%B0%B8%EC%A1%B0%EC%97%86%EC%9D%B4_%EC%82%AD%EC%A0%9C_%EC%8B%9C_%ED%86%A0%EC%8A%A4%ED%8A%B8%EB%A5%BC_%EB%9D%84%EC%9A%B8%EB%B0%A9%EB%B2%95%EC%9D%B4_%EC%9E%88%EC%9D%84%EA%B9%8C1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T111629Z&X-Amz-Expires=86400&X-Amz-Signature=f6a465010ea89a97ab29a0b9d740881ba0bd781c8a84b07a3bc684eee7cad64c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25EB%25AA%25A8%25EB%2593%2588%2520%25EC%2583%2581%25ED%2598%25B8%25EC%25B0%25B8%25EC%25A1%25B0%25EC%2597%2586%25EC%259D%25B4%2520%25EC%2582%25AD%25EC%25A0%259C%2520%25EC%258B%259C%2520%25ED%2586%25A0%25EC%258A%25A4%25ED%258A%25B8%25EB%25A5%25BC%2520%25EB%259D%2584%25EC%259A%25B8%25EB%25B0%25A9%25EB%25B2%2595%25EC%259D%25B4%2520%25EC%259E%2588%25EC%259D%2584%25EA%25B9%258C1.png%22&x-id=GetObject) <br /> 1-5. `window.confrim` 으로 확인 클릭 시 아이템 삭제 함수를 실행하거나, 취소 클릭 시 동작이 취소된다는 알림을 toast로 띄움

`현재` 아이템 삭제버튼 클릭 시에도 toast로 confirm기능을 수행하도록 구현하는 방법 (제대로 해결되지 않음) <br/>
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/86830679-736a-431a-9d9b-fef9984f559c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T112318Z&X-Amz-Expires=86400&X-Amz-Signature=93f84ebdd33351d12428e630fffae830081b4d6b14607085a9ebe553aff0e83f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject) <br/> 1-6. 통일성을 위해서 `window.confirm` 말고 작성해 둔 toast를 사용하고 싶은데 삭제 기능이 있는 `delete.js` 에서 이미 toast를 import 한 상황이라 상호 참조가 발생됨 상호 참조 없이 사용할 수 있는 방법이 궁금하고, 토스트를 활용하는 방법을 찾았다고 할 때, 1-5 사진처럼 취소 버튼 클릭 시 다시 toast가 뜨도록 해야 하는데 재귀 용법으로 사용해도 괜찮을지 궁금합니다.

5. `main.js`로 import 해서 사용하던 도중 사용하지 않는 import에서 오류가 발생하였습니다. ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0aa3baca-3b59-4c38-9516-bca37bc68ff4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221221T123734Z&X-Amz-Expires=86400&X-Amz-Signature=e0109974e98a47524d7df8d9ff167c76c4c96eba8bb24fec2a576e62ae023609&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject) 참고할 [커밋 내역](https://github.com/TEAM-NXLL/Project-NXLL/commit/10d22e618a1adb4165ee5b352d4b9b4d6f57accc#)입니다. 해당 커밋 내역까지는 `main.js`의 13번 줄에서 아무 오류도 없었는데 어느 순간 해당 import 파일에서 값을 못 찾아서 null이 되는 현상이 발생하였습니다. 그 후 13번 코드 자체는 사용하지 않기 때문에 삭제하여서 오류는 해결하였지만 정확한 오류 발생 원인을 찾지 못했습니다. 혹시 뭐가 문제인 건지 알 수 있을까요?

## ❌ 발생하고 있는 문제

- 회원가입 직후 로그인을 하려고 하면 회원가입 페이지로 이동하는 현상
  다시 로그인 페이지에서 로그인을 하면 잘 작동하지만, 첫 시도 시에 회원가입 페이지로 이동하게 됨
