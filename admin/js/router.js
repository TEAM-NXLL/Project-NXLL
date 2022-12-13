/* 클릭했을때 정보나오게 */

export async function clickAdminMenu() {
  // hiddenBtns()
  let id = '';
  if (location.hash.includes('#info/') >= 0) { // includes를 써도 되는것같다고 함
    id = location.hash.substring(6)
  } else if (location.hash.indexOf('#/tt') >= 0) {
    id = location.hash.substring(2)
  } else if (location.hash.indexOf('#view/') >= 0) {
    id = location.hash.substring(6)

  }
  console.log(id)
  const list = ['Title', 'Actors', 'Awards', 'BoxOffice', 'Country', 'Director', 'Genre', 'Runtime']
  const data = await getMovies(`i=${id}&flot=full`)
  console.log(data)

  const content = [];
  content.push(`
      <div class="clickMovieInfo">
      <img src=${data.Poster}>
      <div class="movieInfoDetail">
  `)
  for (let i = 0; i < 8; i++) {
    content.push(`
          
              <div class="info">
                  <h1>${list[i]}</h1>
                  <h3>${data[`${list[i]}`]}</h3>
              </div>
          
          `)
  }
  content.push(`
      <div class="plot">
      <h1>Plot</h1>
      <span>${data.Plot}</span>
      </div>
      </div>
      </div>
  `)

  root.innerHTML = content.join('')

}


/* 라우터 정리 */


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