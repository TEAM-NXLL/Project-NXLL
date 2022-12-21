import { loginRender, joinRender, renderMyShop, renderMyOrder, renderMain, renderUserInfo, renderDetail, renderPayment, renderMyCancelOrder, renderMyConfirOrder, renderCategory, cartCountCheck } from "./main.js"

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
  const categoryArr = ['#new-item', '#discount', '#smart', '#notebook', '#pc', '#audio'];
  for (let category of categoryArr) {
    if (routePath === category) {
      const tag = category.substring(1)
      renderCategory(tag);
    }
  }
  const hashArr = ['#mouse', '#keyboard', '#mousepad', '#usbhub', '#cardreader', '#monitorstand', '#charging',
    '#adapter', '#smartholder', '#smart-etc', '#notebookstand', '#keypad', '#lock', '#ear-head', '#kids', '#mic', '#speaker', '#audiocable'];
  for (let i = 0; i < hashArr.length; i += 1) {
    if (routePath === hashArr[i]) {
      sortByHash();
    }
  }
}

// 해시값 변경되는 카테고리 클릭 시 렌더링
export function sortByHash() {
  const hash = location.hash.slice(1);
  renderCategory(hash)
}
