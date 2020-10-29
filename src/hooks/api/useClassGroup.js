import useSWR from 'swr';

export const URL = (classGroupId) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classgroups/${classGroupId}`;

const useClassGroup = (classGroupId, initialData) => {
  const response = useSWR(URL(classGroupId), initialFetcher, { initialData });

  return { classGroup: response.data, ...response };
};

export default useClassGroup;
