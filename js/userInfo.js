import { accountLookUp, addAccount, editUser, accountCharge, cancelAccount } from "./getdata.js";

// 회원 정보 수정 핸들러
export function editUserInfo() {
  const editBtn = document.querySelector('.editBtn')
  editBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const nameValue = document.querySelector('.user-name').value
    if (nameValue) {
      localStorage.setItem('userName', nameValue)
    }
    const oldPwValue = document.querySelector('.old-pw-input').value
    const newPwValue = document.querySelector('.new-pw-input').value
    const res = await editUser(localStorage.accessToken, nameValue, oldPwValue, newPwValue)
    if (res.displayName) {
      alert('회원 정보가 수정되었습니다')
      location.hash = '#myshop'
    } else {
      alert('정보를 다시 확인해 주세요')
    }
  })
}

// 보유 계좌 조회
export async function userOwnBank() {
  const { totalBalance, accounts } = await accountCharge(localStorage.accessToken)
  return {
    totalBalance, accounts
  }
}

// 계좌 추가
export async function addNewAccount() {
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
    const res = await addAccount(localStorage.accessToken, bankName.value, account, phone)
    if (res.id) {
      alert("계좌가 추가되었습니다.")
      location.hash = '#myshop'
    } else {
      alert("정보를 다시 확인해 주세요.")
    }
    e.stopPropagation()
  })
}

// 추가 계좌 은행 이름 눌렀을 때 핸들러
export async function choiceBank() {
  const account = document.querySelector('#add-account')
  const accountNumberEls = document.querySelectorAll('.account-number-input')
  account.addEventListener('change', (e) => {
    if (e.target.value !== "004" && e.target.value !== "011") {
      accountNumberEls[3].readOnly = true
      accountNumberEls[3].style.backgroundColor = '#D8D8D8'
    } else {
      accountNumberEls[3].readOnly = false
      accountNumberEls[3].style.backgroundColor = '#fff'
    }
  })
}

// 보유하고 있는 계좌 리스트
export function ownAccountList(accounts) {
  if (accounts.length > 0) {
    const bankNameEl = document.querySelector('#bank-name')
    const noBankEl = document.querySelector('.no-bank')
    noBankEl.remove()
    accounts.forEach(account => {
      const createBankList = document.createElement('option')
      createBankList.value = account.bankCode
      createBankList.setAttribute('data-id', account.id)
      createBankList.textContent = account.bankName
      bankNameEl.appendChild(createBankList)
    })
  } else return
}

// 추가 가능한 계좌 리스트
export async function addAbleAccountList() {
  const ableList = await accountLookUp(localStorage.accessToken)
  const addAccountEl = document.querySelector('#add-account')
  ableList.forEach(el => {
    if (el.disabled === false) {
      const createBankEl = document.createElement('option')
      createBankEl.value = el.code
      createBankEl.textContent = el.name
      addAccountEl.appendChild(createBankEl)
    }
  })
}

// 보유 계좌 금액 조회
export async function bankChargeLookUp() {
  const { accounts } = await userOwnBank()
  const bankNameEl = document.querySelector('#bank-name')
  const bankChargeEl = document.querySelector('.bank-charge')
  const charge = document.querySelector('.charge')
  const cancelBtn = document.querySelector('.cancel-account')
  bankNameEl.addEventListener('change', (e) => {
    accounts.forEach(account => {
      if (account.bankCode === e.target.value) {
        charge.innerHTML = /* html */ `
        잔액: ${account.balance.toLocaleString()} 원
        `
        bankChargeEl.appendChild(charge)
        cancelBtn.classList.remove('hidden')
      } else if (e.target.value === 'default' || e.target.value === 'null') {
        cancelBtn.classList.add('hidden')
        charge.innerHTML = ''
      }
    })
  })
}

// 계좌 해지 버튼 핸들러
export function cancelBank() {
  const cancelBtn = document.querySelector('.cancel-account')
  const bankName = document.querySelector('#bank-name')
  bankName.addEventListener('change', (e) => {
    const dataResult = e.target[e.target.selectedIndex]
    const bankId = dataResult.dataset.id
    cancelBtn.addEventListener('click', async () => {
      await cancelAccount(localStorage.accessToken, bankId)
      alert("계좌가 삭제되었습니다.")
      location.hash = '#myshop'
    })
  })
}