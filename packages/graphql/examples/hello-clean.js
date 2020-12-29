/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import nanoexpress from '@nanoexpress/pro-slim'; // Or your choice, you can use nanoexpress
import graphqlExports from 'graphql';
import graphql from '../graphql.es.js';

const app = nanoexpress();

// Construct a schema, using GraphQL schema language
const schema = graphqlExports.buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Clean world!'
};

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

app.use('/graphql', graphql(schema, root));

app.listen(4000);
