const browserFetcher = (resource, init) => {
  let token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('authorization'))
    .split('=')[1];
  token = 'Bearer ' + token;
  init = { ...init, headers: { authorization: token } };
  return fetch(resource, init).then((res) => res.json());
};

export default browserFetcher;
