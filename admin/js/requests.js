import { store } from '../../js/store.js';
import { toast } from './toast.js';
const URL = store.url + '/products';
// products';

// JSON Request 양식 만들기
export function createRequest(type, masterKey = true, data, accessToken) {
  const res = {
    method: type,
    headers: { ...store.headers },
  };

  if (masterKey) {
    res.headers.masterKey = true;
  }

  if (data) {
    res.body = JSON.stringify(data);
  }

  if (accessToken) {
    res.headers.Authorization = `Bearer ${accessToken}`;
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
      URL,
      createRequest('POST', true, {
        title,
        price,
        description,
        tags,
        thumbnailBase64,
        photoBase64,
      }),
    );
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '추가');
  }
}

// 모든 제품 조회
export async function viewAllProduct() {
  try {
    const res = await fetch(URL, createRequest('GET', true));
    const getResult = await res.json();
    return getResult;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '전체');
  }
}

// 전체 거래 내역
export async function viewAllTransactions() {
  try {
    const res = await fetch(
      URL + '/transactions/all',
      createRequest('GET', true),
    );
    const getResult = await res.json();
    return getResult;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '거래');
  }
}

// 거래 내역 완료/취소 및 해제
export async function transactionStatus(detailId, isCanceled, done) {
  try {
    const res = await fetch(
      URL + `/transactions/${detailId}`,
      createRequest('PUT', true, { isCanceled, done }),
    );
    toast('거래 상태가 변경되었습니다.');
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '거래');
  }
}

// 제품 수정
export async function correctProduct(
  productId,
  title,
  price,
  description,
  tags,
  thumbnailBase64,
  photoBase64,
  isSoldOut,
) {
  try {
    const res = await fetch(
      URL + `/${productId}`,
      createRequest('PUT', true, {
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
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '전체');
  }
}

//제품 삭제
export async function delProduct(productId) {
  try {
    const res = await fetch(
      URL + `/${productId}`,
      createRequest('DELETE', true),
    );
    return res;
  } catch (error) {
    toast(`${error}, 잠시 후 다시 시도해주세요.`, '전체');
  }
}
