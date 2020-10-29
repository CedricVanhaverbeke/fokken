import { render as rtlRender } from '@testing-library/react';
import { SWRConfig } from 'swr';

import { browserFetcher } from '@/utils/fetcher';

export const render = (children) => {
  return {
    ...rtlRender(
      <SWRConfig
        value={{
          fetcher: browserFetcher,
        }}
      >
        {children}
      </SWRConfig>,
    ),
  };
};
