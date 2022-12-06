/* 라우터 정리 */
location.hash = '#view'

function router() {
    const routePath = location.hash
    console.log(routePath)
    if (routePath === '') {
        mainContent()
    }
    else if (routePath.includes('#/main/page/')) {
        store.currentPage = Number(routePath.substring(12))
        if (store.currentPage === 0) {
            store.currentPage = 1
        }
        mainContent()
    }
    else if (routePath.includes('#info')) {
        clickMovieInfo()
    }

    else if (routePath.includes('#view')) {
        searchMovieContent();
    }
}

window.addEventListener('hashchange', router)

router();

