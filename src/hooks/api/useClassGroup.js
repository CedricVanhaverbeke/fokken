import { useQuery } from 'react-query';

export const URL = (classGroupId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classgroups/${classGroupId}`;

const useClassGroup = (classGroupId, initialData) => {
  const response = useQuery(URL(classGroupId), initialData && { initialData });

  return { classGroup: response.data, ...response };
};

export default useClassGroup;
