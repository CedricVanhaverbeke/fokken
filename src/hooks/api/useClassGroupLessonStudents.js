import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}/students`;

const useClassGroupLessonStudents = (classGroupId, lessonId, initialData) => {
  const response = useQuery(
    URL(classGroupId, lessonId),
    initialData && {
      initialData,
    },
  );

  return { classGroupLessonStudent: response.data, ...response };
};

export default useClassGroupLessonStudents;
