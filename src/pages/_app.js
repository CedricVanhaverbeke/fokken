import { SWRConfig } from 'swr';

import Header from '../components/Header';

import '../theme/index.css';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('../mocks');
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <div className="antialiased w-full h-full flex flex-col flex-grow items-center relative">
        <Header />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
