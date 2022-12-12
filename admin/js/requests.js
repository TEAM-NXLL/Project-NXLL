import { store } from '../../js/store.js';
const API_KEY = process.env;

// JSON Request 양식 만들기
function createRequest(type, data) {
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
        thumbnail,
        photo,
      }),
    );
    return res;
  } catch {
    console.log('목록 생성 실패');
  }
}

// 제품 추가 결과
// {"id": "nbqtQvEivYwEXTDet7YM",
// "title": "MacBook Pro 16",
// "price": 3360000,
// "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
// "tags": [
//   "가전",
//   "노트북",
//   "컴퓨터"
// ],
// "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
// "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
// "isSoldOut": false
// }

// 모든 제품 조회
export async function viewAllProduct() {
  try {
    const res = await fetch(store.url + '/products', createRequest('GET'));
    const getResult = await res.json();
    return getResult;
  } catch {
    console.log('모든 제품 조회 실패');
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
    return getResult;
  } catch {
    console.log('전체 거래 내역 조회 실패');
  }
}
// 전체 거래 내역 조회 결과
// { // 거래 내역 정보
//   detailId: string // 거래 내역 ID
//   user: { // 거래한 사용자 정보
//     email: string
//     displayName: string
//     profileImg: string | null
//   }
//   account: { // 거래한 사용자의 계좌 정보
//     bankName: string
//     bankCode: string
//     accountNumber: string
//   }
//   product: { // 거래한 제품 정보
//     productId: string
//     title: string
//     price: number
//     description: string
//     tags: string[]
//     thumbnail: string | null
//   }
//   reservation: Reservation | null // 거래한 제품의 예약 정보
//   timePaid: string // 제품을 거래한 시간
//   isCanceled: boolean // 거래 취소 여부
//   done: boolean // 거래 완료 여부
// }

// 거래 내역 완료/취소 및 해제
export async function transactionStatus(detailId, isCanceled, done) {
  try {
    const res = await fetch(
      store.url + `/products/transactions/${detailId}`,
      createRequest('PUT', {
        isCanceled,
        done,
      }),
    );
    return res;
  } catch {
    console.log('개별 거래 내역 관리 실패');
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
      store.url + `/products/${productId}`,
      createRequest('PUT', {
        title,
        price,
        description,
        tags,
        thumbnail,
        photo,
        isSoldOut,
      }),
    );
    return res;
  } catch {
    console.log('제품 수정 실패!');
  }
}
// 제품 수정 결과
// {
//   "id": "nbqtQvEivYwEXTDet7YM",
//   "title": "MacBook Pro 16",
//   "price": 1500,
//   "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
//   "tags": [
//     "가전",
//     "노트북",
//     "컴퓨터"
//   ],
//   "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
//   "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
//   "isSoldOut": false
// }

//제품 삭제
export async function delProduct(productId) {
  try {
    const res = await fetch(
      store.url + `/products/${productId}`,
      createRequest('DELETE'),
    );
    return res;
  } catch {
    console.log('제품 삭제!');
  }
}
//제품 삭제 결과
// type ResponseValue = true
