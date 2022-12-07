import { getLogOut } from './getdata.js'
import { logOut } from './main.js'

/* 로그인 완료시 나오는  */

export function completeLogin(displayName) {
  const li = document.querySelector('.signUpsignIn')
  li.innerHTML = /*HTML*/ `
    <p><strong>${displayName}</strong>님, 환영합니다.</p>
    <a class="logOutBtn">로그아웃</a>
    `
  logOut()
}

/* 로그아웃 버튼 눌렀을때 토큰 삭제하고 창 없애기 */

