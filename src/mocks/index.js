/* eslint-disable global-require */

if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_ENABLE_MOCK
) {
  if (typeof window === 'undefined') {
    const { server } = require('./server');
    server.listen();
  } else {
    const { worker } = require('./browser');
    worker.start();
  }
}
