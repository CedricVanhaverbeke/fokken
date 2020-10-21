import useSWR from 'swr';

const useClassgroup = (id) => {
  const response = useSWR(`/api/classgroups/${id}`);
  return response;
};

export default useClassgroup;
