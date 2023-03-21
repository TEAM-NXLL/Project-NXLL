import {
  accountLookUp,
  addAccount,
  editUser,
  accountCharge,
  cancelAccount,
} from './requests.js';
import { $ } from '../util/store.js';

// 회원 정보 수정 핸들러
export function editUserInfo() {
  const editBtn = $('.editBtn');
  editBtn.onclick = (event) => editUserInfoHandler(event);
}

async function editUserInfoHandler(event) {
  event.preventDefault();
  const nameValue = $('.user-name').value;
  const oldPwValue = $('.old-pw-input').value;
  const newPwValue = $('.new-pw-input').value;
  try {
    const res = await editUser(nameValue, oldPwValue, newPwValue);
    localStorage.setItem('userName', res.displayName);
    location.hash = '#myshop';
    location.reload();
  } catch (err) {
    console.log('정보 수정 에러');
  }
}

// 보유 계좌 조회
export async function userOwnBank() {
  const { totalBalance, accounts } = await accountCharge();
  return {
    totalBalance,
    accounts,
  };
}

// 계좌 추가
export async function addNewAccount() {
  const accountBtn = $('.accountBtn');
  accountBtn.onclick = (event) => addNewAccountHandler(event);
}

async function addNewAccountHandler(event) {
  event.preventDefault();
  const bankName = $('#add-account');
  const phoneNumbers = $('.phone-number-input', document, true);
  const accountNumbers = $('.account-number-input', document, true);
  let phone = '';
  let account = '';
  phoneNumbers.forEach((number) => (phone += number.value));
  accountNumbers.forEach((number) => (account += number.value));
  const res = await addAccount(bankName.value, account, phone);
  if (res.id) {
    alert('계좌가 추가되었습니다.');
    location.hash = '#myshop';
  } else {
    alert('정보를 다시 확인해 주세요.');
  }
}

// 보유하고 있는 계좌 리스트
export function ownAccountList(accounts) {
  if (accounts.length > 0) {
    const bankNameEl = $('#bank-name');
    const noBankEl = $('.no-bank');
    noBankEl.remove();
    accounts.forEach((account) => {
      const createBankList = document.createElement('option');
      createBankList.value = account.bankCode;
      createBankList.setAttribute('data-id', account.id);
      createBankList.textContent = account.bankName;
      bankNameEl.appendChild(createBankList);
    });
  } else return;
}

// 추가 가능한 계좌 리스트
export async function addAbleAccountList() {
  const ableList = await accountLookUp();
  const addAccountEl = $('#add-account');
  ableList.forEach((el) => {
    if (el.disabled === false) {
      const createBankEl = document.createElement('option');
      createBankEl.value = el.code;
      createBankEl.textContent = el.name;
      addAccountEl.appendChild(createBankEl);
    }
  });
  addAccountEl.onchange = () => selectedAccount(ableList);
}

// 계좌 등록하기
export function selectedAccount(ableList) {
  const addAccountEl = $('#add-account');
  const addAccountNumEl = $('.account-number-box');
  if (addAccountEl.options.length === 0) {
    addAccountEl.innerHTML = `
    <option>계좌 등록</option>
    `;
    addAccountEl.style.color = '#999';
    return;
  }
  const optionValue = addAccountEl.options[addAccountEl.selectedIndex].value;
  const bankCheck = ableList.filter((e) => e.code === optionValue)[0].digits;

  addAccountNumEl.innerHTML = '';

  for (let i = 0; i < bankCheck.length; i += 1) {
    const blank = document.createElement('input');
    const hipen = document.createElement('span');
    hipen.innerHTML = ' - ';
    blank.setAttribute('maxlength', bankCheck[i]);
    blank.setAttribute(
      'onKeyup',
      `this.value=this.value.replace(/[^0-9]/g, '')`,
    );
    blank.classList.add('account-number-input');
    addAccountNumEl.append(blank, hipen);
  }
}

// 보유 계좌 금액 조회
export async function bankChargeLookUp() {
  const { accounts } = await userOwnBank();
  const bankNameEl = $('#bank-name');
  const bankChargeEl = $('.bank-charge');
  const charge = $('.charge');
  const cancelBtn = $('.cancel-account');
  bankNameEl.onchange = (event) =>
    bankChargeLookUpHandler(event, accounts, bankChargeEl, cancelBtn, charge);
}

function bankChargeLookUpHandler(
  event,
  accounts,
  bankChargeEl,
  cancelBtn,
  charge,
) {
  accounts.forEach((account) => {
    if (account.bankCode === event.target.value) {
      charge.innerHTML = /* html */ `
        잔액: ${account.balance.toLocaleString()} 원
        `;
      bankChargeEl.appendChild(charge);
      cancelBtn.classList.remove('hidden');
    } else if (
      event.target.value === 'default' ||
      event.target.value === null
    ) {
      cancelBtn.classList.add('hidden');
      charge.innerHTML = '';
    }
  });
}

// 계좌 해지 버튼 핸들러
export function cancelBank() {
  const cancelBtn = $('.cancel-account');
  const bankName = $('#bank-name');
  cancelBtn.onclick = () => cancelBankHandler(bankName);
}

async function cancelBankHandler(bankName) {
  const dataResult = bankName.options[bankName.selectedIndex];
  const bankId = dataResult.dataset.id;
  const res = await cancelAccount(bankId);
  console.log(res);
  if (res) {
    alert('계좌가 삭제되었습니다.');
    location.hash = '#myshop';
  } else {
    alert('정보를 다시 확인해 주세요.');
  }
}
