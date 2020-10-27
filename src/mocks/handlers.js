import { rest } from 'msw';

import {
  classGroupDetails,
  classGroupLesson,
  classGroupStudents,
} from './mockData/classGroup';
import classGroupLessonStudent from './mockData/classGroupLessonStudent';
import lessonDetails from './mockData/lessonDetails';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/classGroups/:id`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupDetails));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/classGroups/:classGroupId/lessons/:lessonId/students`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupLessonStudent));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/classGroups/:classGroupId/students`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupStudents));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/:id`,
    (_, res, ctx) => {
      return res(ctx.json(lessonDetails));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/classGroups/:classGroupId/lessons/:lessonId}`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupLesson));
    },
  ),
];
