import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (id) =>
  `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}/slides?hasQuestion=true`;

export const fetchLessonQuestions = (id) => {
  return initialFetcher(URL(id));
};

const useLessonQuestions = (id, initialData) => {
  const response = useSWR(URL(id), initialFetcher, { initialData });

  return { lessonQuestions: response.data, ...response };
};

export default useLessonQuestions;
