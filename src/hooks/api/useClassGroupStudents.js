import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classGroups/${id}/students`;

export const fetchClassGroupStudents = (id) => initialFetcher(URL(id));

const useClassGroupStudents = (id, initialData) => {
  const response = useSWR(URL(id), null, { initialData });

  return { classGroupStudents: response.data, ...response };
};

export default useClassGroupStudents;
