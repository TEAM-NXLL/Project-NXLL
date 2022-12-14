import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("판매 현황");
  }
  async getHtml() {
    return /*HTML*/`
  <main class="admin-summary">
    <div class="inner">
      <!-- ORDER STATUS -->
      <div class="order-status">
        <div class="order-status-text summary-bold">주문현황</div>
        <div class="order-status-el">
          <div class="new-order status-el"></div>
          <div class="purchase-confirmed status-el"></div>
          <div class="purchase-cancled status-el"></div>
        </div>
      </div>
      <!-- Cancel -->
      <div class="transac-status">
        <div class="transac-status-text summary-bold">거래현황</div>
        <div class="transac-status-el">
          <div class="total-products-num status-el"></div>
          <div class="total-income status-el"></div>
          <div class="total-transac-num status-el"></div>
        </div>
      </div>
    </div>
  </main>
    `
  }
}