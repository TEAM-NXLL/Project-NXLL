import { accountLookUp, editUser } from "./getdata.js";


export function editUserInfo () {
  const editBtn = document.querySelector('.editBtn')
  editBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const nameValue = document.querySelector('.user-name').value
    if (nameValue) {
      localStorage.setItem('userName', nameValue)
    }
    const oldPwValue = document.querySelector('.old-pw-input').value
    const newPwValue = document.querySelector('.new-pw-input').value
    await editUser(localStorage.accessToken, nameValue, oldPwValue, newPwValue)
    alert('회원 정보가 수정되었습니다')
  })
}