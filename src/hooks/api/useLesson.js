import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (id) => `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}`;

export const fetchLesson = (id) => initialFetcher(URL(id));

const useLesson = (id, initialData) => {
  const response = useSWR(URL(id), null, { initialData });

  return { lessonDetails: response.data, ...response };
};

export default useLesson;
