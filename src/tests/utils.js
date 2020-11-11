import { ReactQueryCacheProvider } from 'react-query';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPage } from 'next-page-tester';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import LanguageProvider from '../providers/LanguageProvider';

import queryCache from '../utils/queryCache';

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

const mockPageRouter = (query) => {
  const push = jest.fn().mockImplementation(async () => {});
  const replace = jest.fn().mockImplementation(async () => {});
  const prefetch = jest.fn().mockImplementation(async () => {});

  return {
    push,
    replace,
    prefetch,
    query,
  };
};

export const render = (children, { router } = {}) => {
  return {
    ...rtlRender(
      <LanguageProvider onError={() => {}}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <RouterContext.Provider value={{ ...mockRouter, ...router }}>
            {children}
          </RouterContext.Provider>
        </ReactQueryCacheProvider>
      </LanguageProvider>,
    ),
  };
};

export const renderPage = async (route) => {
  const queryParams = Object.fromEntries(
    route.match(/\/:([^/]+)/g)?.map((queryId) => [queryId.substr(2), 69]),
  );
  const router = mockPageRouter(queryParams);

  const queryParamsRegex = new RegExp(
    `:${Object.keys(queryParams).join('|:')}`,
    'gi',
  );

  const routeWithParams = route.replace(
    queryParamsRegex,
    (queryParam) => router.query[queryParam.substr(1)],
  );

  const Page = await getPage({
    route: routeWithParams,
    pagesDirectory: process.cwd() + '/src/pages',
    router: () => router,
  });

  return {
    ...rtlRender(
      <LanguageProvider onError={() => {}}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          {Page}
        </ReactQueryCacheProvider>
      </LanguageProvider>,
    ),
    route: routeWithParams,
    router,
    userEvent,
  };
};
