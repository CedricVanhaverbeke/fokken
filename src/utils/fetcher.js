import cookie from 'cookie';
import next from 'next';

export const defaultFetcher = (endpoint, token) => {
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const browserFetcher = (endpoint) => {
  const { authorization: token } = cookie.parse(document.cookie);

  return defaultFetcher(endpoint, token);
};
