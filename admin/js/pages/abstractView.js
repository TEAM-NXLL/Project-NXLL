export default class abstractView {
  constructor(params) {
    this.params = params;
    console.log(this.params)
  }
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}