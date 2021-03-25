/* eslint-disable no-console, no-process-exit, eslint-comments/disable-enable-pair */
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-import
import bodyParser from '@nanoexpress/middleware-body-parser';

const middleware = bodyParser({ json: true });

const httpRequest = {
  body: JSON.stringify({ foo: 'bar' }),
  headers: {
    'content-type': 'application/json'
  }
};

(async () => {
  await middleware(httpRequest);

  if (httpRequest.body.foo === 'bar') {
    console.log('Parse successfully handled');
    process.exit(0);
  } else {
    throw new Error('Parse failed');
  }
})();
