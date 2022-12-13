import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment } from "./main"
import { getProductDetail } from "./getdata.js"

export async function router() {

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
  else if (routePath.includes(`#detail`)) {
    const productId = location.hash.split('/')[1]
    try {
      const productInfo = await getProductDetail(productId);
      renderDetail(productInfo)
    } catch (error) {
      console.log(error)
    }
  }
  else if (routePath === '#payment') {
    renderPayment()
  }
}