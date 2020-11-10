import { rest } from 'msw';

import {
  classGroupDetails,
  classGroupLesson,
  classGroupLessonStudents,
  classGroupStudents,
} from './mockData/classGroup';
import {
  lessonAnswers,
  lessonDetails,
  lessonQuestions,
} from './mockData/lesson';
import userDetails from './mockData/userDetails';

const delayedResponse = (response, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(ctx.json(response));
  }
  return res(ctx.delay(1000), ctx.json(response));
};

export const handlers = [
  rest.get(`*/api/classgroups/:id`, (_, res, ctx) => {
    return delayedResponse(classGroupDetails, res, ctx);
  }),

  rest.get(`*/api/lessons/:id/slides`, (_, res, ctx) => {
    return delayedResponse(lessonQuestions, res, ctx);
  }),

  rest.get(
    `*/api/classgroups/:classGroupId/lessons/:lessonId/students/:studentId/answers`,
    (_, res, ctx) => {
      return delayedResponse(lessonAnswers, res, ctx);
    },
  ),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId/students`,
    (_, res, ctx) => {
      return delayedResponse(classGroupLessonStudents, res, ctx);
    },
  ),

  rest.get(`*/api/classGroups/:classGroupId/students`, (_, res, ctx) => {
    return delayedResponse(classGroupStudents, res, ctx);
  }),

  rest.get(`*/api/lessons/:id`, (_, res, ctx) => {
    return delayedResponse(lessonDetails, res, ctx);
  }),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId`,
    (_, res, ctx) => {
      return delayedResponse(classGroupLesson, res, ctx);
    },
  ),

  rest.get(`*/api/users/me`, (_, res, ctx) => {
    return delayedResponse(userDetails, res, ctx);
  }),
];
