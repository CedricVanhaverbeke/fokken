import { render as rtlRender } from '@testing-library/react';
import { SWRConfig } from 'swr';

import testFetcher from './testFetcher';

export const render = (children) => {
  return {
    ...rtlRender(
      <SWRConfig
        value={{
          fetcher: testFetcher,
        }}
      >
        {children}
      </SWRConfig>,
    ),
  };
};
