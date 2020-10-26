import { SWRConfig } from 'swr';

import Header from '../components/Header';

import initialFetcher from '../utils/initialFetcher';

import '../theme/index.css';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('../mocks');
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: initialFetcher,
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
