import { loginRender, joinRender } from "./main"

export function router() {

  const routePath = location.hash

  if (routePath.includes('#login')) {
    if (localStorage.length === 0) {
      loginRender()
    } else {
      return
    }
  }
  else if (routePath.includes('#join')) {
    if (localStorage.length === 0) {
      joinRender()
    } else {
      return
    }
  }
}

