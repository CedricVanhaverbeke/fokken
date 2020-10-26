import { rest } from 'msw';

import classgroup from './dummyData/classgroup';
import lesson from './dummyData/lesson';
import studentInfo from './dummyData/studentInfo';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:lessonId/students`,
    (req, res, ctx) => {
      console.log(studentInfo);
      return res(ctx.json(studentInfo));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/students`,
    (req, res, ctx) => {
      return res(ctx.json(classgroup));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:id`,
    (req, res, ctx) => {
      return res(ctx.json(lesson));
    },
  ),
];
