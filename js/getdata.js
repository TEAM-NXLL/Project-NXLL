import { store } from "./store.js"

export async function getData(email, password, id, profile = null) {
    const res = await fetch(store.url + '/auth/signup', {
        method: 'POST',
        headers: store.headers,
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
        alert('유효한 이메일을 아닙니다.')
    }
    return json
}