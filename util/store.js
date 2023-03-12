export const token = localStorage.accessToken;

export function $(selector, dom = document, all) {
  if (selector[0] === '.' && !all) {
    return dom.getElementsByClassName(selector.slice(1))[0];
  } else if (selector[0] === '#' && !all) {
    return dom.getElementById(selector.slice(1));
  } else if (selector[0] !== '.' && selector[0] !== '#' && !all) {
    return dom.getElementsByTagName(selector)[0];
  } else if (all) {
    return dom.querySelectorAll(selector);
  }
}

export const root = $('main');
