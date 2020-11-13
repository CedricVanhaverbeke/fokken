import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}`;

const useClassGroupLesson = (classGroupId, lessonId) => {
  const response = useQuery(URL(classGroupId, lessonId));

  return { classGroupLesson: response.data, ...response };
};

export default useClassGroupLesson;
