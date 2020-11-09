import { useQuery } from 'react-query';

export const URL = (id) => `${process.env.NEXT_PUBLIC_API_URL}/lessons/${id}`;

const useLesson = (id, initialData) => {
  const response = useQuery(URL(id), initialData && { initialData });

  return { lessonDetails: response.data, ...response };
};

export default useLesson;
