import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment, renderMyCancelOrder, renderMyConfirOrder, renderCategory, cartCountCheck, sortByTag } from "./main.js"

export async function router() {
  cartCountCheck()

  const routePath = location.hash
  if (routePath === '') {
    renderMain()
  }
  else if (routePath === '#login') {
    loginRender()
  }
  else if (routePath === '#join') {
    joinRender()
  }
  else if (routePath === '#myshop') {
    renderMyShop()
  }
  else if (routePath === '#myorder') {
    renderMyOrder()
  }
  else if (routePath === '#myorder/cancel') {
    renderMyCancelOrder()
  }
  else if (routePath === '#myorder/confir') {
    renderMyConfirOrder()
  }
  else if (routePath === '#userinfo') {
    renderUserInfo()
  }
  else if (routePath.includes(`#detail`)) {
    renderDetail()
  }
  else if (routePath === '#payment') {
    renderPayment()
  }
  else if (routePath === '#new-item') {
    renderCategory("new-item")
  }
  else if (routePath === '#discount') {
    renderCategory("discount")
  }
  else if (routePath === '#smart') {
    renderCategory("smart")
  }
  else if (routePath === '#notebook') {
    renderCategory("notebook")
  }
  else if (routePath === '#pc') {
    renderCategory("pc")
  }
  else if (routePath === '#audio') {
    renderCategory("audio")
  }
  else if (routePath === '#mouse') {
    sortByTag()
  }
  else if (routePath === '#keyboard') {
    sortByTag()
  }
  else if (routePath === '#mousepad') {
    // renderCategory("pc")
    sortByTag()
  }
  else if (routePath === '#usbhub') {
    // renderCategory("pc")
    sortByTag()
  }
  else if (routePath === '#cardreader') {
    // renderCategory("pc")
    sortByTag()
  }
  else if (routePath === '#monitorstand') {
    // renderCategory("pc")
    sortByTag()
  }
  else if (routePath === '#charging') {
    // renderCategory("smart")
    sortByTag()
  }
  else if (routePath === '#adapter') {
    // renderCategory("smart")
    sortByTag()
  }
  else if (routePath === '#smartholder') {
    // renderCategory("smart")
    sortByTag()
  }
  else if (routePath === '#smart-etc') {
    // renderCategory("smart")
    sortByTag()
  }
  else if (routePath === '#notebookstand') {
    // renderCategory("notebook")
    sortByTag()
  }
  else if (routePath === '#keypad') {
    // renderCategory("notebook")
    sortByTag()
  }
  else if (routePath === '#lock') {
    // renderCategory("notebook")
    sortByTag()
  }
  else if (routePath === '#ear-head') {
    // renderCategory("audio")
    sortByTag()
  }
  else if (routePath === '#kids') {
    // renderCategory("audio")
    sortByTag()
  }
  else if (routePath === '#mic') {
    // renderCategory("audio")
    sortByTag()
  }
  else if (routePath === '#speaker') {
    // renderCategory("audio")
    sortByTag()
  }
  else if (routePath === '#audiocable') {
    // renderCategory("audio")
    sortByTag()
  }
}