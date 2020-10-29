import useSWR from 'swr';

export const URL = () => `${process.env.NEXT_PUBLIC_API_URL}/users/me`;

const useUser = () => {
  const response = useSWR(URL());

  return { user: response.data, ...response };
};

export default useUser;
