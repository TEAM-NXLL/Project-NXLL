export { store };
export const { API_KEY } = process.env;

const store = {
  url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api',

  headers: {
    'content-type': 'application/json',
    apikey: `${API_KEY}`,
    username: 'KDT3_TEAM_NXLL',
    masterKey: false,
  },
};
