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

const delayedResponse = (data) => (_, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    return res(ctx.json(data));
  }

  return res(ctx.delay(1000), ctx.json(data));
};

export const handlers = [
  rest.get(`*/api/classgroups/:id`, delayedResponse(classGroupDetails)),

  rest.get(`*/api/lessons/:id/slides`, delayedResponse(lessonQuestions)),

  rest.get(
    `*/api/classgroups/:classGroupId/lessons/:lessonId/students/:studentId/answers`,
    delayedResponse(lessonAnswers),
  ),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId/students`,
    delayedResponse(classGroupLessonStudents),
  ),

  rest.get(
    `*/api/classGroups/:classGroupId/students`,
    delayedResponse(classGroupStudents),
  ),

  rest.get(`*/api/lessons/:id`, delayedResponse(lessonDetails)),

  rest.get(
    `*/api/classGroups/:classGroupId/lessons/:lessonId`,
    delayedResponse(classGroupLesson),
  ),

  rest.get(`*/api/users/me`, delayedResponse(userDetails)),
];
