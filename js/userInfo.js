import { accountLookUp, addAccount, editUser, accountCharge, cancelAccount } from "./requests.js";
import { store } from './store.js'

// 회원 정보 수정 핸들러
export function editUserInfo() {
  const editBtn = store.selector('.editBtn')
  editBtn.onclick = (event) => editUserInfoHandler(event)
}

async function editUserInfoHandler(event) {
  event.preventDefault()
  const nameValue = store.selector('.user-name').value
  const oldPwValue = store.selector('.old-pw-input').value
  const newPwValue = store.selector('.new-pw-input').value
  try {
    const res = await editUser(nameValue, oldPwValue, newPwValue)
    localStorage.setItem("userName", res.displayName)
    location.hash = "#myshop"
    location.reload()
  } catch (err) {
    console.log("정보 수정 에러")
  }
}
// export function editUserInfo() {
//   const editBtn = store.selector('.editBtn')
//   editBtn.addEventListener('click', async (e) => {
//     e.preventDefault()
//     const nameValue = store.selector('.user-name').value
//     const oldPwValue = store.selector('.old-pw-input').value
//     const newPwValue = store.selector('.new-pw-input').value
//     const res = await editUser(nameValue, oldPwValue, newPwValue)

//     if (res.displayName) {
//       alert('회원 정보가 수정되었습니다')
//       localStorage.setItem('userName', res.displayName)
//       location.hash = '#myshop'
//       location.reload()
//     } else if (!res) {
//       return
//     }
//   })
// }

// 보유 계좌 조회
export async function userOwnBank() {
  const { totalBalance, accounts } = await accountCharge()
  return {
    totalBalance, accounts
  }
}

// 계좌 추가
export async function addNewAccount() {
  const accountBtn = store.selector(".accountBtn")
  accountBtn.onclick = event => addNewAccountHandler(event)
}

async function addNewAccountHandler(event) {
  event.preventDefault()
  const bankName = store.selector("#add-account")
  const phoneNumbers = document.querySelectorAll('.phone-number-input')
  const accountNumbers = document.querySelectorAll('.account-number-input')
  let phone = ""
  let account = ""
  phoneNumbers.forEach(number => phone += number.value)
  accountNumbers.forEach(number => account += number.value)
  const res = await addAccount(bankName.value, account, phone)
  if (res.id) {
    alert("계좌가 추가되었습니다.")
    location.hash = '#myshop'
  } else {
    alert("정보를 다시 확인해 주세요.")
  }
}

// export async function addNewAccount() {
//   const accountBtn = store.selector('.accountBtn')
//   accountBtn.addEventListener('click', async (e) => {
//     e.preventDefault()
//     const bankName = store.selector('#add-account')
//     const phoneNumbers = document.querySelectorAll('.phone-number-input')
//     const accountNumbers = document.querySelectorAll('.account-number-input')
//     let phone = ''
//     let account = ''
//     phoneNumbers.forEach(number => phone += number.value)
//     accountNumbers.forEach(number => account += number.value)
//     const res = await addAccount(bankName.value, account, phone)
//     if (res.id) {
//       alert("계좌가 추가되었습니다.")
//       location.hash = '#myshop'
//     } else {
//       alert("정보를 다시 확인해 주세요.")
//     }
//   })
// }

// 보유하고 있는 계좌 리스트
export function ownAccountList(accounts) {
  if (accounts.length > 0) {
    const bankNameEl = store.selector('#bank-name')
    const noBankEl = store.selector('.no-bank')
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
  const ableList = await accountLookUp()
  const addAccountEl = store.selector('#add-account')
  ableList.forEach(el => {
    if (el.disabled === false) {
      const createBankEl = document.createElement('option')
      createBankEl.value = el.code
      createBankEl.textContent = el.name
      addAccountEl.appendChild(createBankEl)
    }
  })
  addAccountEl.onchange = () => selectedAccount(ableList)
}

// 계좌 등록하기
export function selectedAccount(ableList) {
  const addAccountEl = store.selector('#add-account')
  const addAccountNumEl = store.selector('.account-number-box')
  if (addAccountEl.options.length === 0) {
    addAccountEl.innerHTML = `
    <option>계좌 등록 완료</option>
    `
    addAccountEl.style.color = '#999'
    return
  }
  const optionValue = addAccountEl.options[addAccountEl.selectedIndex].value
  const bankCheck = ableList.filter(e => e.code === optionValue)[0].digits

  addAccountNumEl.innerHTML = ''

  for (let i = 0; i < bankCheck.length; i += 1) {
    const blank = document.createElement('input')
    const hipen = document.createElement('span')
    hipen.innerHTML = ' - '
    blank.setAttribute('maxlength', bankCheck[i])
    blank.setAttribute('onKeyup', `this.value=this.value.replace(/[^0-9]/g, '')`)
    blank.classList.add('account-number-input')
    addAccountNumEl.append(blank, hipen)
  }
}

// 보유 계좌 금액 조회
export async function bankChargeLookUp() {
  const { accounts } = await userOwnBank()
  const bankNameEl = store.selector('#bank-name')
  const bankChargeEl = store.selector('.bank-charge')
  const charge = store.selector('.charge')
  const cancelBtn = store.selector('.cancel-account')
  bankNameEl.onchange = event => bankChargeLookUpHandler(event, accounts, bankChargeEl, cancelBtn, charge)
}
// export async function bankChargeLookUp() {
//   const { accounts } = await userOwnBank()
//   const bankNameEl = store.selector('#bank-name')
//   const bankChargeEl = store.selector('.bank-charge')
//   const charge = store.selector('.charge')
//   const cancelBtn = store.selector('.cancel-account')
//   bankNameEl.addEventListener('change', (e) => {
//     accounts.forEach(account => {
//       if (account.bankCode === e.target.value) {
//         charge.innerHTML = /* html */ `
//         잔액: ${account.balance.toLocaleString()} 원
//         `
//         bankChargeEl.appendChild(charge)
//         cancelBtn.classList.remove('hidden')
//       } else if (e.target.value === 'default' || e.target.value === null) {
//         cancelBtn.classList.add('hidden')
//         charge.innerHTML = ''
//       }
//     })
//   })
// }

function bankChargeLookUpHandler(event, accounts, bankChargeEl, cancelBtn, charge) {
  accounts.forEach(account => {
    if (account.bankCode === event.target.value) {
      charge.innerHTML = /* html */ `
        잔액: ${account.balance.toLocaleString()} 원
        `
      bankChargeEl.appendChild(charge)
      cancelBtn.classList.remove('hidden')
    } else if (event.target.value === "default" || event.target.value === null) {
      cancelBtn.classList.add("hidden")
      charge.innerHTML = ""
    }
  })
}

// 계좌 해지 버튼 핸들러
// export function cancelBank() {
//   const cancelBtn = store.selector('.cancel-account')
//   const bankName = store.selector('#bank-name')
//   bankName.addEventListener('change', (e) => {
//     const dataResult = e.target[e.target.selectedIndex]
//     const bankId = dataResult.dataset.id
//     cancelBtn.addEventListener('click', async () => {
//       await cancelAccount(bankId)
//       alert("계좌가 삭제되었습니다.")
//       location.hash = '#myshop'
//     })
//   })
// }
export function cancelBank() {
  const cancelBtn = store.selector('.cancel-account')
  const bankName = store.selector('#bank-name')
  cancelBtn.onclick = () => cancelBankHandler(bankName)
}

async function cancelBankHandler(bankName) {
  const dataResult = bankName.options[bankName.selectedIndex]
  const bankId = dataResult.dataset.id
  const res = await cancelAccount(bankId)
  console.log(res)
  if (res) {
    alert("계좌가 삭제되었습니다.")
    location.hash = "#myshop"
  } else {
    alert("정보를 다시 확인해 주세요.")
  }
}