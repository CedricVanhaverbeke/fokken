import { rest } from 'msw';

const delayedResponse = (data) => (_, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(ctx.json(data));
  }

  return res(ctx.delay(1000), ctx.json(data));
};

export const handlers = [];
