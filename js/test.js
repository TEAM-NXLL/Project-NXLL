import {getLogOut} from './getdata.js'

export function completeLogin(displayName){
  const li = document.querySelector('.signUpsignIn')
  li.innerHTML = /*HTML*/ `
    <p><strong>${displayName}</strong>님, 환영합니다.</p>
    <a class="logOutBtn" href="#">로그아웃</a>
    `

    const logOutBtn = li.querySelector('.logOutBtn')
    logOutBtn.addEventListener('click', async () => {
      const accessToken = localStorage.getItem('accessToken')
      console.log(accessToken)
      const res = await getLogOut(accessToken)
      console.log(res)
    })
}