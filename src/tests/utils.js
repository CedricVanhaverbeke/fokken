import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPage } from 'next-page-tester';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { SWRConfig } from 'swr';

import { browserFetcher } from '@/utils/fetcher';

const mockRouter = {
  basePath: '',
  pathname: '/classgroups/[classGroupId]/lessons',
  route: '/classgroups/[classGroupId]/lessons',
  asPath: '/classgroups/d49515ed-972c-11e9-b935-0a0027000063/lessons',
  query: {
    classGroupId: 'd49515ed-972c-11e9-b935-0a0027000063',
  },
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const mockPageRouter = () => {
  const push = jest.fn().mockImplementation(async () => {});
  const replace = jest.fn().mockImplementation(async () => {});
  const prefetch = jest.fn().mockImplementation(async () => {});

  return {
    push,
    replace,
    prefetch,
  };
};

export const render = (children, { router } = {}) => {
  return {
    ...rtlRender(
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <SWRConfig
          value={{
            fetcher: browserFetcher,
          }}
        >
          {children}
        </SWRConfig>
      </RouterContext.Provider>,
    ),
  };
};

export const renderPage = async (route) => {
  const router = mockPageRouter();
  const Page = await getPage({
    route,
    pagesDirectory: process.cwd() + '/src/pages',
    router: () => router,
  });

  return { ...rtlRender(Page), router, userEvent };
};
