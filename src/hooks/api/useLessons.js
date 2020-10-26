import useSWR from 'swr';

import initialFetcher from '../../utils/initialFetcher';

const URL = (classgroupId, id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/${classgroupId}/lessons/${id}`;

export const fetchLesson = (classgroupId, id) =>
  initialFetcher(URL(classgroupId, id));

const useLesson = (classgroupId, id, initialData) => {
  const response = useSWR(URL(classgroupId, id), null, { initialData });
  return { lesson: response.data, ...response };
};

export default useLesson;
