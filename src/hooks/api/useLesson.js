import useSWR from 'swr';

export const URL = (id) => `${process.env.NEXT_PUBLIC_API_URL}/lessons/${id}`;

const useLesson = (id, initialData) => {
  const response = useSWR(URL(id), initialFetcher, { initialData });

  return { lessonDetails: response.data, ...response };
};

export default useLesson;
