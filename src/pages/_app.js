import { ReactQueryCacheProvider } from 'react-query';

import queryCache from '@/utils/queryCache';

import '../theme/index.css';

import LanguageProvider from '@/providers/LanguageProvider';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_MOCK
) {
  // eslint-disable-next-line global-require
  require('../mocks');
}

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className="antialiased w-screen h-screen overflow-hidden flex flex-col">
          <Component {...pageProps} />
        </div>
      </ReactQueryCacheProvider>
    </LanguageProvider>
  );
}

export default MyApp;
