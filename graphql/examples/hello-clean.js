import nanoexpress from '@nanoexpress/pro-slim'; // Or your choice, you can use PRO version itself
import graphqlExports from 'graphql';
import graphql from '../graphql.es.js';

const app = nanoexpress();

// Construct a schema, using GraphQL schema language
var schema = graphqlExports.buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Clean world!';
  }
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
    })
);

app.use('/graphql', graphql(schema, root));

app.listen(4000);
