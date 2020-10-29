import { serialize } from 'cookie';
import jwt_decode from 'jwt-decode';

import { EMPTY_PROPS } from '../utils/constants';

const Callback = () => {
  return null;
};

export function getServerSideProps({ query, res }) {
  if (!query.redirect || !query.token) {
    res.writeHead(302, { Location: 404 }).end();

    return EMPTY_PROPS;
  }

  const decoded = jwt_decode(query.token);

  res.setHeader(
    'Set-Cookie',
    serialize('authorization', query.token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    }),
  );

  res
    .writeHead(302, { Location: `/${decoded.language}${query.redirect}` })
    .end();

  return EMPTY_PROPS;
}

export default Callback;
