import useSWR from 'swr';

export const URL = (classGroupId, lessonId, studentId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classgroups/${classGroupId}/lessons/${lessonId}/students/${studentId}/answers`;

const useLessonAnswers = (classGroupId, lessonId, studentId, initialData) => {
  const response = useSWR(URL(classGroupId, lessonId, studentId), undefined, {
    initialData,
  });

  return {
    lessonAnswers: response.data,
  };
};

export default useLessonAnswers;
