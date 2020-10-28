import { SWRConfig } from 'swr';

import Header from '../components/Header';

import browserFetcher from '../utils/browserFetcher';

import '../theme/index.css';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_MOCK
) {
  // eslint-disable-next-line global-require
  require('../mocks');
}
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: browserFetcher,
      }}
    >
      <div className="antialiased w-full h-full overflow-hidden flex flex-col flex-grow items-center relative">
        <Header />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
