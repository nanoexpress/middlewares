/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import nanoexpress from '@nanoexpress/pro-slim'; // Or your choice, you can use nanoexpress
import graphql from '../graphql.es.js';
import graphqlSchema from './graphql-schema.js';

const app = nanoexpress();

// Simple implementation for `headers` middleware to work
// effectively with browsers `Ranges` header
app.use(async (req) => {
  req.headers = {};
  req.forEach((key, value) => {
    req.headers[key] = value;
  });
});

// Simple `req.body` implementation
app.use(
  async (req, res) =>
    new Promise((resolve) => {
      let body = '';

      if (req.method !== 'POST') {
        return resolve();
      }

      res.onAborted(() => {});
      res.onData((chunk, isLast) => {
        body += Buffer.from(chunk).toString('utf8');

        if (isLast) {
          req.body = JSON.parse(body);

          resolve();
        }
      });
      return res;
    })
);

app.use('/graphql', graphql(graphqlSchema));

app.listen(4000);
