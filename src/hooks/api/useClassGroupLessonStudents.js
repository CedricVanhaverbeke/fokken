import { useQuery } from 'react-query';

import { sortByLastNameAndFirstName } from '@/utils/sort';

export const URL = (classGroupId, lessonId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${classGroupId}/lessons/${lessonId}/students`;

const useClassGroupLessonStudents = (classGroupId, lessonId) => {
  const response = useQuery(URL(classGroupId, lessonId));

  return {
    classGroupLessonStudents:
      response.data && sortByLastNameAndFirstName(response.data),
    ...response,
  };
};

export default useClassGroupLessonStudents;