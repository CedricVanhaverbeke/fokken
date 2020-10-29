import useSWR from 'swr';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}`;

const useClassGroupLesson = (classGroupId, lessonId, initialData) => {
  const response = useSWR(URL(classGroupId, lessonId), initialFetcher, {
    initialData,
  });

  return { classGroupLesson: response.data, ...response };
};

export default useClassGroupLesson;
