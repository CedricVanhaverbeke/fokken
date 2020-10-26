import useSWR from 'swr';

import initialFetcher from '../../utils/initialFetcher';

const URL = (classgroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/${classgroupId}/lessons/${lessonId}`;

export const fetchClassgroupLesson = (id) => initialFetcher(URL(id));

const useClassgroupLesson = (classgroupId, lessonId, initialData) => {
  const response = useSWR(URL(classgroupId, lessonId), null, { initialData });

  return { classgroupLesson: response.data, ...response };
};

export default useClassgroupLesson;
