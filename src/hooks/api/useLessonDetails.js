import useSWR from 'swr';

import initialFetcher from '../../utils/initialFetcher';

const URL = (id) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons/${id}`;

export const fetchLessonDetails = (id) => initialFetcher(URL(id));

const useLessonDetails = (id, initialData) => {
  const response = useSWR(URL(id), null, { initialData });

  return { lessonDetails: response.data, ...response };
};

export default useLessonDetails;
