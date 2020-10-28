import useSWR from 'swr';

const URL = () => `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`;

const useUser = () => {
  const response = useSWR(URL());

  return { user: response.data, ...response };
};

export default useUser;
