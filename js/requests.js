import { token } from "../util/store.js"
import { requestAPI } from "../util/requestAPI.js"

// 회원가입 데이터
export async function signUp(email, password, displayName, profileImgBase64 = null) {
  let data = { email, password, displayName, profileImgBase64 }
  return await requestAPI({ type: "POST", endpoint: "/auth/signup", data })
}

// 로그인 데이터
export async function login(email, password) {
  let data = { email, password }
  return await requestAPI({ type: "POST", endpoint: "/auth/login", data })
}

// 로그아웃 데이터
export async function logout() {
  return await requestAPI({ type: "POST", endpoint: "/auth/logout", accessToken: token })
}

// 로그인 유지 데이터
export async function keepLogin() {
  return await requestAPI({ type: "POST", endpoint: "/auth/me", accessToken: token })
}

// 사용자 정보 수정 데이터
export async function editUser(displayName, oldPassword, newPassword) {
  let data = { displayName, oldPassword, newPassword }
  return await requestAPI({ type: "PUT", endpoint: "/auth/user", data, accessToken: token })
}

// 선택 가능한 은행 목록 조회 데이터
export async function accountLookUp() {
  return await requestAPI({ type: "GET", endpoint: "/account/banks", accessToken: token })
}

// 계좌 목록 및 잔액 조회 데이터
export async function accountCharge() {
  return await requestAPI({ type: "GET", endpoint: "/account", accessToken: token })
}

// 계좌 연결 데이터
export async function addAccount(bankCode, accountNumber, phoneNumber) {
  let data = { bankCode, accountNumber, phoneNumber, signature: true }
  return await requestAPI({ type: "POST", endpoint: "/account", data, accessToken: token })
}

// 계좌 해지 데이터
export async function cancelAccount(accountId) {
  let data = { accountId, signature: true }
  return await requestAPI({ type: "DELETE", endpoint: "/account", data, accessToken: token })
}

// 단일 제품 상세 조회 데이터
export async function getProductDetail(productId) {
  return await requestAPI({ type: "GET", endpoint: `/products/${productId}` })
}

// 결제 데이터
export async function getBuy(productId, accountId) {
  let data = { productId, accountId }
  return await requestAPI({ type: "POST", endpoint: "/products/buy", data, accessToken: token })
}

// 사용자 거래 내역 데이터
export async function getTransactions() {
  return await requestAPI({ type: "GET", endpoint: "/products/transactions/details", accessToken: token })
}

// 사용자 거래 취소 데이터
export async function cancelTransactions(detailId) {
  let data = { detailId }
  return await requestAPI({ type: "POST", endpoint: "/products/cancel", data, accessToken: token })
}

// 사용자 거래 확정 데이터
export async function confirmation(detailId) {
  let data = { detailId }
  return await requestAPI({ type: "POST", endpoint: "/products/ok", data, accessToken: token })
}

// 제품 검색 데이터
export async function postSearch(searchText, searchTags) {
  let data = { searchText, searchTags }
  return await requestAPI({ type: 'POST', endpoint: `/products/search`, data })
}