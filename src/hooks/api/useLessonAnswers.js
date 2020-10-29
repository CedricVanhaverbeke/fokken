import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (classGroupId, lessonId, studentId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/api/classgroups/${classGroupId}/lessons/${lessonId}/students/${studentId}/answers`;

export const fetchLessonAnswers = (classGroupId, lessonId, studentId) => {
  console.log(URL(classGroupId, lessonId, studentId));
  return initialFetcher(URL(classGroupId, lessonId, studentId));
};

const useLessonAnswers = (classGroupId, lessonId, studentId, initialData) => {
  const response = useSWR(
    URL(classGroupId, lessonId, studentId),
    initialFetcher,
    { initialData },
  );

  return { lessonAnswers: response.data, ...response };
};

export default useLessonAnswers;
