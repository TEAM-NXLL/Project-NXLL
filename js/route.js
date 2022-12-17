import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment, renderMyCancelOrder, renderMyConfirOrder, renderCategory } from "./main.js"
import { getProductDetail } from "./getdata.js"

export async function router() {

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
  
  else if (routePath === '#event') {
    console.log("이벤트카테고리")
  }
  else if (routePath === '#new') {
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
}