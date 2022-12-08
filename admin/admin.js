import {
  createProduct,
  viewAllProduct,
  viewAllTransactions,
  delProduct,
  correctProduct,
  transactionStatus,
} from './requests';

let data = {
  title: '마우스',
  price: 1000,
  description: '구려',
};

createProduct(data.title, data.price, data.description);
viewAllProduct();
viewAllTransactions();
correctProduct(
  '9vLtK5XR8fT7zSrCBPFC',
  data.title,
  data.price,
  data.description,
);
transactionStatus('23K1s9GjZGpjf5cyugaP', true, true);
delProduct('1j3CKI6MI1FqCj7Je2rl');
