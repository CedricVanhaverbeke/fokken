import useSWR from 'swr';

export const URL = (id) =>
  `${process.env.NEXT_PUBLIC_API_URL}/lessons/${id}/slides?hasQuestion=true`;

const useLessonQuestions = (id, initialData) => {
  const response = useSWR(URL(id), undefined, { initialData });

  return { lessonQuestions: response.data, ...response };
};

export default useLessonQuestions;
