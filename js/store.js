const store = {
  url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api',
  headers: {
    'content-type': 'application/json',
    username: 'KDT3_TEAM_NXLL',
    masterkey: false,
  },
  selector: function $(selector) {
    return document.querySelector(selector)
  }
};

export { store };
