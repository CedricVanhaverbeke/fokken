import useSWR from 'swr';

const useLesson = (classgroupId, id) => {
  const result = useSWR(`/api/classgroups/${classgroupId}/lessons/${id}`);
  return result;
};

export default useLesson;
