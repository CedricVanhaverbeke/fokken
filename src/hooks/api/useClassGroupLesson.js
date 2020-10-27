import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classGroups/${classGroupId}/lessons/${lessonId}`;

export const fetchClassGroupLesson = (id) => initialFetcher(URL(id));

const useClassGroupLesson = (classGroupId, lessonId, initialData) => {
  const response = useSWR(URL(classGroupId, lessonId), null, { initialData });

  return { classGroupLesson: response.data, ...response };
};

export default useClassGroupLesson;
