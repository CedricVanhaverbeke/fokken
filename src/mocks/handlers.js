import { rest } from 'msw';

import classgroupLesson from './dummyData/classgroupLesson';
import classgroupStudents from './dummyData/classgroupStudents';
import lesson from './dummyData/lesson';
import lessonDetails from './dummyData/lessonDetails';
import studentInfo from './dummyData/studentInfo';

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:lessonId/students`,
    (req, res, ctx) => {
      return res(ctx.json(studentInfo));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/students`,
    (req, res, ctx) => {
      return res(ctx.json(classgroupStudents));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:id`,
    (req, res, ctx) => {
      return res(ctx.json(lesson));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons/:id`,
    (req, res, ctx) => {
      return res(ctx.json(lessonDetails));
    },
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/:classgroupId/lessons/:lessonId}`,
    (req, res, ctx) => {
      return res(ctx.json(classgroupLesson));
    },
  ),
];
