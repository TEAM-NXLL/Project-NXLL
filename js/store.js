import dotenv from 'dotenv'

export const store = {
  selector: function $(selector) {
    return document.querySelector(selector)
  },
  token: localStorage.accessToken
}