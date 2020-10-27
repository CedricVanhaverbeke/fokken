import useSWR from 'swr';

const URL = () => `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`;

const useUserDetails = () => {
  const response = useSWR(URL());

  return { userDetails: response.data, ...response };
};

export default useUserDetails;
