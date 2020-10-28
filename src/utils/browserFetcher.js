var cookie = require('cookie');

const browserFetcher = (resource, init) => {
  const { authorization: token } = cookie.parse(document.cookie);

  return fetch(resource, {
    ...init,
    authorization: `Bearer ${token}`,
  }).then((res) => res.json());
};

export default browserFetcher;
