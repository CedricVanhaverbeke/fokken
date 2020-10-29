import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { cache } from 'swr';

import '@testing-library/jest-dom/extend-expect';

import { server } from '../mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cache.clear();
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => server.close());
