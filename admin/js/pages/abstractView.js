export default class abstractView {
  constructor() {

  }
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}