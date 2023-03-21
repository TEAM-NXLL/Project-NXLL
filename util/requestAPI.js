// import { toast } from "../admin/js/toast";

function checkHash() {
  const hash = location.hash;
  if (hash === '#login' || hash === '#join' || hash === '#userinfo') {
    return true;
  }
}

export async function requestAPI({
  type,
  endpoint,
  page,
  data,
  accessToken,
  state,
}) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api' + endpoint,
      {
        method: type,
        headers: {
          'content-type': 'application/json',
          username: 'KDT3_TEAM_NXLL',
          apikey: process.env.API_KEY,
          masterKey: page === 'admin' ? true : false,
          Authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
        body: data ? JSON.stringify(data) : null,
      },
    );

    if (!res.ok && checkHash()) {
      const requestError = await res.json();
      alert(requestError);
      throw new Error('request 에러 발생');
    } else if (!res.ok) {
      throw new Error('request 에러 발생');
    }

    const requestResult = await res.json();
    return requestResult;
  } catch (error) {
    if (page === 'admin' && state) {
      toast('잠시 후 다시 시도해 주세요.', `${state}`);
      console.log(error, '관리자페이지 에러');
    } else {
      console.log(error, '사용자페이지 에러');
    }
  }
}
