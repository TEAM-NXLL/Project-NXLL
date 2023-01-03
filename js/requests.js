import { store } from "./store.js"
import { createRequest } from "../admin/js/requests.js"

// 회원가입 데이터
export async function signUp(email, password, displayName, profileImgBase64 = null) {
  const res = await fetch(
    store.url + '/auth/signup',
    createRequest('POST', false, { email, password, displayName, profileImgBase64 })
  )
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    console.log(res)
    alert(json)
  }
}

// 로그인 데이터
export async function login(email, password) {
  const res = await fetch(
    store.url + '/auth/login',
    createRequest('POST', false, { email, password })
  )
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 로그아웃 데이터
export async function logout(accessToken) {
  const res = await fetch(
    store.url + '/auth/logout',
    createRequest('POST', false, null, accessToken)
  )
  const json = await res.json()
  return json
}

// 로그인 유지 데이터
export async function keepLogin(accessToken) {
  const res = await fetch(
    store.url + '/auth/me',
    createRequest('POST', false, null, accessToken)
  )
  const json = await res.json()
  return json
}

// 사용자 정보 수정 데이터
export async function editUser(accessToken, displayName, oldPassword, newPassword) {
  const res = await fetch(
    store.url + '/auth/user',
    createRequest('PUT', false, { displayName, oldPassword, newPassword }, accessToken)
  )
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 선택 가능한 은행 목록 조회 데이터
export async function accountLookUp(accessToken) {
  const res = await fetch(
    store.url + '/account/banks',
    createRequest('GET', false, null, accessToken)
  )
  const json = await res.json()
  return json
}

// 계좌 목록 및 잔액 조회 데이터
export async function accountCharge(accessToken) {
  const res = await fetch(
    store.url + '/account',
    createRequest('GET', false, null, accessToken)
  )
  const json = await res.json()
  return json
}

// 계좌 연결 데이터
export async function addAccount(accessToken, bankCode, accountNumber, phoneNumber) {
  const res = await fetch(
    store.url + '/account',
    createRequest('POST', false, { bankCode, accountNumber, phoneNumber, signature: true }, accessToken)
  )
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 계좌 해지 데이터
export async function cancelAccount(accessToken, accountId) {
  const res = await fetch(
    store.url + '/account',
    createRequest('DELETE', false, { accountId, signature: true }, accessToken)
  )
  const json = await res.json()
  return json
}

// 단일 제품 상세 조회 데이터
export async function getProductDetail(productId) {
  const res = await fetch(
    store.url + '/products' + `/${productId}`,
    createRequest('GET', false)
  )
  const json = await res.json()
  return json
}

// 결제 데이터
export async function getBuy(accessToken, productId, accountId) {
  const res = await fetch(
    store.url + '/products/buy',
    createRequest('POST', false, { productId, accountId }, accessToken)
  )
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 사용자 거래 내역 데이터
export async function getTransactions(accessToken) {
  const res = await fetch(
    store.url + '/products/transactions/details',
    createRequest('GET', false, null, accessToken)
  )
  const json = await res.json()
  return json
}

// 사용자 거래 취소 데이터
export async function cancelTransactions(accessToken, detailId) {
  const res = await fetch(
    store.url + '/products/cancel',
    createRequest('POST', false, { detailId }, accessToken)
  )
  const json = await res.json()
  return json
}

// 사용자 거래 확정 데이터
export async function confirmation(accessToken, detailId) {
  const res = await fetch(
    store.url + '/products/ok',
    createRequest('POST', false, { detailId }, accessToken)
  )
  const json = await res.json()
  return json
}

// 제품 검색 데이터
export async function postSearch(searchText, searchTags,) {
  const res = await fetch(
    store.url + '/products/search',
    createRequest('POST', false, { searchText, searchTags })
  )
  const json = await res.json()
  return json
}