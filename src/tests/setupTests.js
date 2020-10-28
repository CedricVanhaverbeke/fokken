// eslint-disable-next-line no-unused-vars
import next from 'next';
import { cache } from 'swr';

import '@testing-library/jest-dom/extend-expect';

import { server } from '../mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  cache.clear();
  server.resetHandlers();
});
afterAll(() => server.close());
