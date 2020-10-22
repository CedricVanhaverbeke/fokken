import { serialize } from 'cookie';

const Callback = () => {
  return null;
};

export async function getServerSideProps({ query, res }) {
  res.setHeader(
    'Set-Cookie',
    serialize('authorization', query.token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    }),
  );

  res.writeHead(302, { Location: query.redirect }).end();

  return {
    props: {},
  };
}

export default Callback;
