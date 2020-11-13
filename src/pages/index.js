import { EMPTY_PROPS } from '@/utils/constants';

const Home = () => {
  return null;
};

export function getServerSideProps({ res }) {
  res.writeHead(302, { Location: process.env.NEXT_PUBLIC_EDU_URL }).end();

  return EMPTY_PROPS;
}

export default Home;
