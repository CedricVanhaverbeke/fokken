import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classGroups/${classGroupId}/lessons/${lessonId}/students`;

export const fetchClassGroupLessonStudent = (classGroupId, lessonId) =>
  initialFetcher(URL(classGroupId, lessonId));

const useClassGroupLessonStudent = (classGroupId, lessonId, initialData) => {
  const response = useSWR(URL(classGroupId, lessonId), null, { initialData });

  return { classGroupLessonStudent: response.data, ...response };
};

export default useClassGroupLessonStudent;
