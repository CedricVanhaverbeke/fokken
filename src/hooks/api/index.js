import * as classGroup from './useClassGroup';
import * as classGroupLesson from './useClassGroupLesson';
import * as classGroupLessonStudent from './useClassGroupLessonStudent';
import * as classGroupStudents from './useClassGroupStudents';
import * as lesson from './useLesson';
import * as user from './useUser';

import { defaultFetcher } from '@/utils/fetcher';

const calls = {
  classGroup,
  classGroupLesson,
  classGroupLessonStudent,
  classGroupStudents,
  lesson,
  user,
};

const fetcher = (token) => {
  return Object.fromEntries(
    Object.entries(calls).map(([key, exports]) => {
      return [
        `fetch${key.charAt(0).toUpperCase() + key.slice(1)}`,
        (...props) => defaultFetcher(exports.URL(...props), token),
      ];
    }),
  );
};

export default fetcher;
