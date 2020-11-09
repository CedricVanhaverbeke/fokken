import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}`;

const useClassGroupLesson = (classGroupId, lessonId, initialData) => {
  const response = useQuery(
    URL(classGroupId, lessonId),
    initialData && {
      initialData,
    },
  );

  return { classGroupLesson: response.data, ...response };
};

export default useClassGroupLesson;
