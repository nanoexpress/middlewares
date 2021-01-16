/* eslint-disable no-console, no-process-exit, eslint-comments/disable-enable-pair */
const bodyParser = require('@nanoexpress/middleware-body-parser');

const middleware = bodyParser({ json: true });

const HttpRequest = {
  body: JSON.stringify({ foo: 'bar' }),
  headers: {
    'content-type': 'application/json'
  }
};

(async () => {
  await middleware(HttpRequest);

  if (HttpRequest.body.foo === 'bar') {
    console.log('Parse successfully handled');
    process.exit(0);
  } else {
    throw new Error('Parse failed');
  }
})();
