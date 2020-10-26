import useSWR from 'swr';

import initialFetcher from '~/utils/initialFetcher';

const URL = (classgroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/${classgroupId}/lessons/${lessonId}/students`;

export const fetchStudentInfo = (classgroupId, lessonId) =>
  initialFetcher(URL(classgroupId, lessonId));

const useStudentInfo = (classgroupId, lessonId, initialData) => {
  const response = useSWR(URL(classgroupId, lessonId), null, { initialData });

  return { studentInfo: response.data, ...response };
};

export default useStudentInfo;
