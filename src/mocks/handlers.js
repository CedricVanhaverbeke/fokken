import { rest } from 'msw';

import {
  classGroupDetails,
  classGroupLesson,
  classGroupLessonStudents,
  classGroupStudents,
} from './mockData/classGroup';
import lessonDetails from './mockData/lessonDetails';
import userDetails from './mockData/userDetails';

export const handlers = [
  rest.get(`*/api/classgroups/:id`, (_, res, ctx) => {
    return res(ctx.json(classGroupDetails));
  }),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId/students`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupLessonStudents));
    },
  ),

  rest.get(`*/api/classGroups/:classGroupId/students`, (_, res, ctx) => {
    return res(ctx.json(classGroupStudents));
  }),

  rest.get(`*/api/lessons/:id`, (_, res, ctx) => {
    return res(ctx.json(lessonDetails));
  }),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId}`,
    (_, res, ctx) => {
      return res(ctx.json(classGroupLesson()));
    },
  ),

  rest.get(`*/api/users/me`, (_, res, ctx) => {
    return res(ctx.json(userDetails));
  }),
];
