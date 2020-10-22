import useSWR from 'swr';

const useLesson = (classgroupId, id) => {
  const response = useSWR(`/api/classgroups/${classgroupId}/lessons/${id}`);

  return { lesson: response.data, ...response };
};

export default useLesson;
