import dashboard from './pages/dashboard.js';
// import allProducts from './pages/allProductsPage.js';
// import addPage from './pages/addPage.js';
import editPage from './pages/editPage.js';

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}
export const router = async () => {

  const routes = [
    { path: "/", render: dashboard },
    // { path: "/add-products", render: addPage },
    // { path: "/all-products", render: allProducts },
    { path: "/edit-products", render: editPage },
  ];

  const pageMatches = routes.map(route => {
    return {
      route: route,
      // isMatch: route.path === location.pathname,
      isMatch: location.pathname.includes(route.path),
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }
  const render = new match.route.render();
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