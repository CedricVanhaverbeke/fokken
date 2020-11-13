import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}/students`;

const useClassGroupLessonStudents = (classGroupId, lessonId) => {
  const response = useQuery(URL(classGroupId, lessonId));

  return { classGroupLessonStudents: response.data, ...response };
};

export default useClassGroupLessonStudents;
