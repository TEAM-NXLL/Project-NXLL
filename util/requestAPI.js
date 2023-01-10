// import { toast } from "../admin/js/toast";

export async function requestAPI({ type, endpoint, page, data, accessToken }) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api' + endpoint,
      {
        method: type,
        headers: {
          'content-type': 'application/json',
          'username': 'KDT3_TEAM_NXLL',
          'apikey': process.env.API_KEY,
          'masterKey': (page === 'admin') ? true : false,
          'Authorization': accessToken ? `Bearer ${accessToken}` : null
        },
        body: data ? JSON.stringify(data) : null
      }
    )

    if (!res.ok) {
      throw new Error('request 에러 발생')
    }

    const requestResult = await res.json();
    console.log('잘됨')
    return requestResult;

  } catch (error) {
    if (page === 'admin') {
      // toast('잠시 후 다시 시도해 주세요.', `${page}`)
      // alert('잠시 후 다시 시도해 주세요.')
      console.log(error, '관리자페이지 에러')
    } else {
      // alert(error, '잠시 후 다시 시도해 주세요.')
      console.log(error, '사용자페이지 에러')
    }
  }
}