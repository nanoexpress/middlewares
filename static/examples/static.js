import nanoexpress from '@nanoexpress/pro-slim';
import staticServe from '../static.es.js';
import path from 'path';

const app = nanoexpress();

(async () => {
  // Simple implementation for `headers` middleware to work
  // effectively with browsers `Ranges` header
  app.use(async (req) => {
    req.headers = {};
    req.forEach((key, value) => {
      req.headers[key] = value;
    });
  });

  // Always use inside `async` to make it work properly
  app.use(
    await staticServe(path.resolve('./static/examples/static'), {
      mode: 'live',
      compressed: false
    })
  );

  await app.listen(4000);
})();
