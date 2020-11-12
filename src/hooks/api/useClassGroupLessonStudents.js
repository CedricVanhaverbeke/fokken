import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}/students`;

const useClassGroupLessonStudents = (classGroupId, lessonId) => {
  const response = useQuery(URL(classGroupId, lessonId));

  return {
    classGroupLessonStudents: response.data?.sort((s1, s2) => {
      if (s1.lastName < s2.lastName) return -1;
      if (s1.lastName > s2.lastName) return 1;
      if (s1.firstName < s2.firstName) return 1;
      if (s1.firstName > s2.firstName) return 1;
      return 0;
    }),
    ...response,
  };
};

export default useClassGroupLessonStudents;
