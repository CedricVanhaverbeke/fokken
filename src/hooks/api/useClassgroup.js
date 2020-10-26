import useSWR from 'swr';

import initialFetcher from '../../utils/initialFetcher';

const URL = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/classgroups/${id}/students`;

export const fetchClassgroup = (id) => initialFetcher(URL(id));

const useClassgroup = (id, initialData) => {
  const response = useSWR(URL(id), null, { initialData });

  return { classgroup: response.data, ...response };
};

export default useClassgroup;
