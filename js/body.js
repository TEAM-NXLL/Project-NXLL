
function joinForm() {
  return `
      <form id="form-tag">
        <ul class="table-area">
            <h1>JOIN - US</h1>
            <p>아래 정보를 꼼꼼히 입력하세요.</p>
            <li class="base">
            <h2>BASE <span>기본 정보를 입력하세요.</span> <span><img class="require" src="../images/icons/required.png" alt=""> 필수입력사항</span></h2>
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

function logInForm() {
  return `
      <form id="login-form">
        <ul class="logIn-area">
          <h1>LOGIN</h1>
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
            <a href="./join.html">가입하기</a>
          </li>
        </ul>
      </form>
      `
}


export { joinForm, logInForm }