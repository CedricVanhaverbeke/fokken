import fetch from 'isomorphic-fetch';

const testFetcher = (resource, init) => {
  return fetch(resource, {
    ...init,
  }).then((res) => res.json());
};

export default testFetcher;
