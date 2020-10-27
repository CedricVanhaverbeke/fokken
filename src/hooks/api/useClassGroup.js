import useSWR from 'swr';

import initialFetcher from '@/utils/initialFetcher';

const URL = (classGroupId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/api/classGroups/${classGroupId}`;

export const fetchClassGroup = (id) => {
  return initialFetcher(URL(id));
};

const useClassGroup = (classGroupId, initialData) => {
  const response = useSWR(URL(classGroupId), null, { initialData });

  return { classGroup: response.data, ...response };
};

export default useClassGroup;
