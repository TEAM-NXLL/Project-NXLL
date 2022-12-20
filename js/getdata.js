import { store } from "./store.js"
import dotenv from 'dotenv'

// 회원가입 데이터
export async function getData(email, password, id, profile = null) {
  const res = await fetch(store.url + '/auth/signup', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "displayName": id,
      "profileImgBase64": profile
    })
  })
  const json = await res.json()
  if (json === '유효한 정보를 제공하세요.') {
    alert('유효한 정보를 제공하세요.')
  } else if (json === '유효한 이메일이 아닙니다.') {
    alert('유효한 이메일이 아닙니다.')
  } else if (json === '이미 존재하는 사용자입니다.') {
    alert('이미 존재하는 사용자입니다.')
  }
  return json
}

// 로그인 데이터
export async function getLogin(email, password) {
  const res = await fetch(store.url + '/auth/login', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
  const json = await res.json()
  if (json === '유효한 사용자가 아닙니다.') {
    alert('유효한 사용자가 아닙니다.')
  }
  return json
}

// 로그아웃 데이터
export async function getLogOut(accessToken) {
  const res = await fetch(store.url + '/auth/logout', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 로그인 유지 데이터
export async function stateLogin(accessToken) {
  const res = await fetch(store.url + '/auth/me', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 사용자 정보 수정 데이터
export async function editUser(accessToken, displayName, oldPassword, newPassword) {
  const res = await fetch(store.url + '/auth/user', {
    method: 'PUT',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "displayName": displayName,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    })
  })
  const json = await res.json()
  return json
}

// 선택 가능한 은행 목록 조회 데이터
export async function accountLookUp(accessToken) {
  const res = await fetch(store.url + '/account/banks', {
    method: 'GET',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 계좌 목록 및 잔액 조회 데이터
export async function accountCharge(accessToken) {
  const res = await fetch(store.url + '/account', {
    method: 'GET',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 계좌 연결 데이터
export async function addAccount(accessToken, bankCode, accountNumber, phoneNumber) {
  const res = await fetch(store.url + '/account', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "bankCode": bankCode,
      "accountNumber": accountNumber,
      "phoneNumber": phoneNumber,
      "signature": true
    })
  })
  const json = await res.json()
  return json
}

// 계좌 해지 데이터
export async function cancelAccount(accessToken, accountId) {
  const res = await fetch(store.url + '/account', {
    method: 'DELETE',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "accountId": accountId,
      "signature": true
    }),
  })
  const json = await res.json()
  return json
}

// 단일 제품 상세 조회 데이터
export async function getProductDetail(productId) {
  const res = await fetch(store.url + '/products' + `/${productId}`, {
    method: 'GET',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY
    }
  })
  const json = await res.json()
  return json
}

// 결제 데이터
export async function getBuy(accessToken, productId, accountId) {
  const res = await fetch(store.url + '/products/buy', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "productId": productId,
      "accountId": accountId
    })
  })
  const json = await res.json()
  console.log(json)
  return json
}

// 사용자 거래 내역 데이터
export async function getTransactions(accessToken) {
  const res = await fetch(store.url + '/products/transactions/details', {
    method: 'GET',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 사용자 거래 취소 데이터
export async function cancelTransactions(accessToken, productId) {
  const res = await fetch(store.url + '/products/cancel', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "detailId": productId
    })
  })
  const json = await res.json()
  return json
}

// 사용자 거래 확정 데이터
export async function confirmation(accessToken, productId) {
  const res = await fetch(store.url + '/products/ok', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "detailId": productId
    })
  })
  const json = await res.json()
  return json
}

// 제품 검색 데이터
export async function postSearch(searchText, searchTags,) {
  const res = await fetch(store.url + '/products/search', {
    method: 'POST',
    headers: {
      ...store.headers,
      "apikey": process.env.API_KEY,
    },
    body: JSON.stringify({
      searchText,
      searchTags,
    })
  })
  const json = await res.json()
  return json
}