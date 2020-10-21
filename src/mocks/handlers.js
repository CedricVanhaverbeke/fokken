import { rest } from 'msw';

import classGroup from './dummyData/classGroup';
import lesson from './dummyData/lesson';

export const handlers = [
  rest.get('*/api/classgroups/:id', (req, res, ctx) => {
    return res(ctx.json(classGroup));
  }),
  rest.get('*/api/classgroups/:classgroupId/lessons/:id', (req, res, ctx) => {
    return res(ctx.json(lesson));
  }),
];
