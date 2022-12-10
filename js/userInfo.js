import { accountLookUp, addAccount, editUser, accountCharge } from "./getdata.js";

// 회원 정보 수정 핸들러
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

// 보유 계좌 조회
export async function userOwnBank () {
  const { totalBalance, accounts } = await accountCharge(localStorage.accessToken)
  return {
    totalBalance, accounts
  }
}

export async function addNewAccount () {
  const accountBtn = document.querySelector('.accountBtn')
  accountBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const bankName = document.querySelector('#add-account')
    const phoneNumbers = document.querySelectorAll('.phone-number-input')
    const accountNumbers = document.querySelectorAll('.account-number-input')
    let phone = ''
    let account = ''
    phoneNumbers.forEach(number => phone += number.value)
    accountNumbers.forEach(number => account += number.value)
    await addAccount(localStorage.accessToken, bankName.value, account, phone)
    e.stopPropagation()
  })
}