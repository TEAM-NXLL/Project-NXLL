import { store } from '../../js/store.js';
import { toast } from './toast.js';
const API_KEY = process.env;

// products';

// JSON Request 양식 만들기
export function createRequest(type, data) {
  const res = {
    method: type,
    headers: { ...store.headers, apikey: API_KEY },
  };
  if (res.headers.masterKey === false) {
    res.headers.masterKey = true;
  }
  if (data) {
    res.body = JSON.stringify(data);
  }
  return res;
}

// 제품 추가
export async function createProduct(
  title,
  price,
  description,
  tags = '',
  thumbnailBase64 = '', // 기본 썸네일
  photoBase64 = '', // 기본 사진
) {
  try {
    const res = await fetch(
      store.url + '/products',
      createRequest('POST', {
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
      }),
    );
    console.log(res);
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "추가");
  }
}

// 모든 제품 조회
export async function viewAllProduct() {
  try {
    const res = await fetch(store.url + '/products', createRequest('GET'));
    const getResult = await res.json();
    // console.log(getResult);
    return getResult;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "전체");
  }
}
// 모든 제품 조회 결과
// Product { // 제품 정보
//   id: string // 제품 ID
//   title: string // 제품 이름
//   price: number // 제품 가격
//   description: string // 제품 설명(최대 100자)
//   tags: string[] // 제품 태그
//   thumbnail: string | null // 제품 썸네일 이미지(URL)
//   isSoldOut: boolean // 제품 매진 여부
// }

// 전체 거래 내역
export async function viewAllTransactions() {
  try {
    const res = await fetch(
      store.url + '/products/transactions/all',
      createRequest('GET'),
    );
    const getResult = await res.json();
    // console.log(getResult);
    return getResult;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "거래");
  }
}

// 거래 내역 완료/취소 및 해제
export async function transactionStatus(detailId, isCanceled, done) {
  try {
    const res = await fetch(
      store.url + `/products/transactions/${detailId}`,
      createRequest('PUT', { isCanceled, done }),
    );
    toast("거래 상태가 변경되었습니다.")
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "거래");
  }
}

// 제품 수정
export async function correctProduct(productId, title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut) {
  try {
    const res = await fetch(store.url + `/products/${productId}`,
      createRequest('PUT', {
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
        isSoldOut,
      }),
    );
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "전체");
  }
}

//제품 삭제
export async function delProduct(productId) {
  try {
    const res = await fetch(
      store.url + `/products/${productId}`,
      createRequest('DELETE'),
    );
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, "전체");
  }
}