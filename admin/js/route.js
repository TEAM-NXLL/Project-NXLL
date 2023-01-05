
  } else if (routePath === '#add-products') {
    submitUtil(addFormEl);
  } else if (routePath === '#all-transacs') {
    try {
      renderAlltransacs(allTransac);
    } catch {
      console.log('전체 거래 내역 실패');
    }
    try {
      transacSearch(allTransac);
    } catch {
      console.log('전체 거래 내역 검색 실패');
    }
  }
}