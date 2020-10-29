import { useRouter } from 'next/router';

const useChangeLanguage = () => {
  const router = useRouter();
  return (newLanguage) => {
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };
};

export default useChangeLanguage;
