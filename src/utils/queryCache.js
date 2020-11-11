import { QueryCache } from 'react-query';

import { browserFetcher } from '../utils/fetcher';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      queryFn: browserFetcher,
    },
  },
});

export default queryCache;
