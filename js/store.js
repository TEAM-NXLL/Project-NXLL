import dotenv from 'dotenv'

export const store = {
  url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api',
  headers: {
    'content-type': 'application/json',
    'username': 'KDT3_TEAM_NXLL',
    'apikey': process.env.API_KEY,
    'masterKey': false,
  },
  selector: function $(selector) {
    return document.querySelector(selector)
  },
  token: localStorage.accessToken
}
