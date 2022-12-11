import { userInfoForm } from "./body"
import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail } from "./main"

export function router() {

  const routePath = location.hash
  if (routePath === '') {
    renderMain()
  }
  else if (routePath === '#login') {
    if (localStorage.length === 0) {
      loginRender()
    } else {
      return
    }
  }
  else if (routePath === '#join') {
    if (localStorage.length === 0) {
      joinRender()
    } else {
      return
    }
  }
  else if (routePath === '#myshop') {
    renderMyShop()
  }
  else if (routePath === '#myorder') {
    renderMyOrder()
  }
  else if (routePath === '#userinfo') {
    renderUserInfo()
  }
  else if (routePath === '#detail') {
    renderDetail()
  }
}