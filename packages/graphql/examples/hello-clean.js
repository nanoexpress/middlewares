/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import bodyParser from '@nanoexpress/middleware-body-parser';
import graphql from '@nanoexpress/middleware-graphql';
import graphqlExports from 'graphql';
// eslint-disable-next-line import/extensions
import { makeBehavior } from 'graphql-ws/lib/use/uWebSockets';
import nanoexpress from 'nanoexpress';

const app = nanoexpress();
app.use(bodyParser());

// Construct a schema, using GraphQL schema language
const schema = graphqlExports.buildSchema(`
  type Query {
    hello: String
  }
  type Subscription {
    greetings: String
  }
`);

// The roots provide resolvers for each GraphQL operation
const rootQueryMutation = {
  hello: () => 'Hello World!'
};
const rootsSubscription = {
  subscription: {
    greetings: async function* sayHiIn5Languages() {
      // eslint-disable-next-line no-restricted-syntax
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        yield { greetings: hi };
      }
    }
  }
};

app.post('/graphql', graphql(schema, rootQueryMutation));
app.ws('/graphql', makeBehavior({ schema, roots: rootsSubscription }));

app.listen(4000);
