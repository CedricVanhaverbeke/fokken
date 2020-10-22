import useSWR from 'swr';

const useClassgroup = (id) => {
  const response = useSWR(`/api/classgroups/${id}`);

  return { classgroup: response.data, ...response };
};

export default useClassgroup;
