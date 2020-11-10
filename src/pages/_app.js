import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import Header from '../components/Header';

import { browserFetcher as queryFn } from '../utils/fetcher';

import '../theme/index.css';

import LanguageProvider from '@/providers/LanguageProvider';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_MOCK
) {
  // eslint-disable-next-line global-require
  require('../mocks');
}

export const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      queryFn,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className="antialiased w-full h-full overflow-hidden flex flex-col flex-grow items-center relative">
          <Header />
          <Component {...pageProps} />
        </div>
      </ReactQueryCacheProvider>
    </LanguageProvider>
  );
}

export default MyApp;
