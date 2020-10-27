const initialFetcher = (resource, init) => {
  return fetch(resource, init).then((res) => res.json());
};

export default initialFetcher;
