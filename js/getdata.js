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
