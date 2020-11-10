import { useQuery } from 'react-query';

const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}/students`;

const useClassGroupLessonStudent = (classGroupId, lessonId) => {
  const response = useQuery(URL(classGroupId, lessonId));

  return { classGroupLessonStudent: response.data, ...response };
};

export default useClassGroupLessonStudent;
