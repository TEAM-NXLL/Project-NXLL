import { loginRender, joinRender } from "./main"

export function router() {
    const routePath = location.hash

    if (routePath.includes('#login')) {
        loginRender()
    }
    else if (routePath.includes('#join')) {
        joinRender()
    }
}

