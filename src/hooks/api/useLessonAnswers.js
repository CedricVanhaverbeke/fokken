import { useQuery } from 'react-query';

export const URL = (classGroupId, lessonId, studentId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classgroups/${classGroupId}/lessons/${lessonId}/students/${studentId}/answers`;

const useLessonAnswers = (classGroupId, lessonId, studentId) => {
  const response = useQuery(URL(classGroupId, lessonId, studentId));

  return {
    lessonAnswers: response.data,
    ...response,
  };
};

export default useLessonAnswers;
