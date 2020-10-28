import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPage } from 'next-page-tester';

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

export const render = (ui) => {
  return { ...rtlRender(ui), userEvent };
};

export const renderPage = async (route) => {
  const router = mockPageRouter();
  const Page = await getPage({
    route,
    pagesDirectory: process.cwd() + '/src/pages',
    router: () => router,
  });

  return { ...render(Page), router };
};
