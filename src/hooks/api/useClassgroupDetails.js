import useSWR from 'swr';

import initialFetcher from '~/utils/initialFetcher';

const URL = (classgroupId) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/${classgroupId}`;

export const fetchClassgroupDetails = (id) => {
  return initialFetcher(URL(id));
};

const useClassgroupDetails = (classgroupId, initialData) => {
  const response = useSWR(URL(classgroupId), null, { initialData });

  return { classgroupDetails: response.data, ...response };
};

export default useClassgroupDetails;
