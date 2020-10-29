import { render as rtlRender } from '@testing-library/react';
import { SWRConfig } from 'swr';

import LanguageProvider from '../providers/LanguageProvider';

import testFetcher from './testFetcher';

export const render = (children) => {
  return {
    ...rtlRender(
      <LanguageProvider>
        <SWRConfig
          value={{
            fetcher: testFetcher,
          }}
        >
          {children}
        </SWRConfig>
      </LanguageProvider>,
    ),
  };
};
