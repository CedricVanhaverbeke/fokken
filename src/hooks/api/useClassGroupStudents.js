import useSWR from 'swr';

export const URL = (id) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${id}/students`;

const useClassGroupStudents = (id, initialData) => {
  const response = useSWR(URL(id), undefined, { initialData });

  return { classGroupStudents: response.data, ...response };
};

export default useClassGroupStudents;
