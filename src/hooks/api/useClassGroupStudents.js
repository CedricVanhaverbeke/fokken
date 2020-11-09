import { useQuery } from 'react-query';

export const URL = (id) =>
  `${process.env.NEXT_PUBLIC_API_URL}/classGroups/${id}/students`;

const useClassGroupStudents = (id, initialData) => {
  const response = useQuery(URL(id), initialData && { initialData });

  return { classGroupStudents: response.data, ...response };
};

export default useClassGroupStudents;
