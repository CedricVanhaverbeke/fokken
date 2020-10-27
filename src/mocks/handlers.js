import { rest } from 'msw';

import {
  classgroupDetails,
  classgroupLesson,
  classgroupStudents,
} from './mockData/classgroup';
import lessonDetails from './mockData/lessonDetails';
import studentInfo from './mockData/studentInfo';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:id`,
    (_, res, ctx) => {
      return res(ctx.json(classgroupDetails));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:lessonId/students`,
    (_, res, ctx) => {
      return res(ctx.json(studentInfo));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/students`,
    (_, res, ctx) => {
      return res(ctx.json(classgroupStudents));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons/:id`,
    (_, res, ctx) => {
      return res(ctx.json(lessonDetails));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:lessonId}`,
    (_, res, ctx) => {
      return res(ctx.json(classgroupLesson));
    },
  ),
];
