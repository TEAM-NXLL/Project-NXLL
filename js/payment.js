import { getBuy } from "./getdata.js";
import { userOwnBank } from "./userInfo.js";

// 보유 계좌 불러오기
export function payAccountList(accounts) {
  if (accounts.length > 0) {
    const payAccountEl = document.querySelector('#pay-account')
    const noBankEl = document.querySelector('.no-bank')
    noBankEl.remove()
    accounts.forEach(account => {
      const createBankList = document.createElement('option')
      createBankList.value = account.bankCode
      createBankList.setAttribute('data-id', account.id)
      createBankList.textContent = account.bankName
      payAccountEl.appendChild(createBankList)
    })
  } else return
}

// 보유 계좌 잔액 확인
export async function payBankLoopUp() {
  const { accounts } = await userOwnBank()
  const payAccountEl = document.querySelector('#pay-account')
  const charge = document.querySelector('.charge')
  payAccountEl.addEventListener('change', (e) => {
    accounts.forEach(account => {
      if (account.bankCode === e.target.value) {
        charge.innerHTML = /* html */ `
        잔액: ${account.balance.toLocaleString()} 원
        `
      } else if (e.target.value === 'default' || e.target.value === 'null') {
        charge.innerHTML = ''
      }
    })
  })
}

// 결제하기
export async function buyProducts() {
  const paymentBtn = document.querySelector('.payment-btn')
  const payAccountEl = document.querySelector('#pay-account')
  payAccountEl.addEventListener('change', (e) => {
    const dataResult = e.target[e.target.selectedIndex]
    const accountId = dataResult.dataset.id
    paymentBtn.addEventListener('click', async () => {
      await getBuy(localStorage.accessToken, productId, accountId)
      alert("거래가 완료되었습니다.")
      location.hash = "#myorder"
    })
  })
}