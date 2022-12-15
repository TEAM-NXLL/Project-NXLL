import dashboard from './pages/dashboard.js';
// import allProducts from './pages/allProductsPage.js';
// import addPage from './pages/addPage.js';
import editPage from './pages/editPage.js';

const pathToRegex = path => new RegExp("^"+path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
//"/posts/:id".match(/^\/posts\/(.+)$/) 결과로 나오는 인덱스[1]이 id값
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]); 
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }))
}

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}
export const router = async () => {
  const routes = [
    { path: "/", render: dashboard },
    { path: "/edit-products/:id", render: editPage },
    { path: "/edit-products", render: editPage },
  ];

  const pageMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.result !== null);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }
  const render = new match.route.render(getParams(match));
  console.log(render)
  document.querySelector("#root").innerHTML = await render.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", event => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  })
  router();
})