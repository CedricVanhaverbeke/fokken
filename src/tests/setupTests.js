import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import '@testing-library/jest-dom/extend-expect';

import { server } from '../mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => server.close());
