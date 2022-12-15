import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment, renderMyCancelOrder, renderMyConfirOrder } from "./main.js"
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
    // const productId = location.hash.split('/')[1]
    // try {
    //   const productInfo = await getProductDetail(productId);
    //   renderDetail(productInfo)
    // } catch (error) {
    //   console.log(error)
    // }
    renderDetail()
  }
  else if (routePath === '#payment') {
    renderPayment()
  }
}