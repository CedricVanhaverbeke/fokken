import { serialize } from 'cookie';

import { EMPTY_PROPS } from '../utils/constants';

const Callback = () => {
  return null;
};

export function getServerSideProps({ query, res }) {
  if (!query.redirect || !query.token) {
    res.writeHead(302, { Location: 404 }).end();

    return EMPTY_PROPS;
  }

  res.setHeader(
    'Set-Cookie',
    serialize('authorization', query.token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    }),
  );

  res.writeHead(302, { Location: query.redirect }).end();

  return EMPTY_PROPS;
}

export default Callback;
