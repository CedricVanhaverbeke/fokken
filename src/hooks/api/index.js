import { URL as classGroup } from './useClassGroup';
import { URL as classGroupLesson } from './useClassGroupLesson';
import { URL as classGroupLessonStudents } from './useClassGroupLessonStudents';
import { URL as classGroupStudents } from './useClassGroupStudents';
import { URL as lesson } from './useLesson';
import { URL as user } from './useUser';

import { defaultFetcher } from '@/utils/fetcher';

const calls = {
  classGroup,
  classGroupLesson,
  classGroupStudents,
  classGroupLessonStudents,
  lesson,
  user,
};

const fetcher = (token) => {
  return Object.fromEntries(
    Object.entries(calls).map(([key, URL]) => {
      return [
        `fetch${key.charAt(0).toUpperCase() + key.slice(1)}`,
        (...props) => defaultFetcher(URL(...props), token),
      ];
    }),
  );
};

export default fetcher;
