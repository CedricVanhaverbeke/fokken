import { useQuery } from 'react-query';

export const URL = () => `${process.env.NEXT_PUBLIC_API_URL}/users/me`;

const useUser = () => {
  const response = useQuery(URL());

  return { user: response.data, ...response };
};

export default useUser;
