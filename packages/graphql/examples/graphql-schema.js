/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import graphqlExports from 'graphql';

const hello = {
  type: graphqlExports.GraphQLString,
  resolve() {
    return 'world';
  }
};

const greetings = {
  type: graphqlExports.GraphQLString,
  subscribe: async function* sayHiIn5Languages() {
    // eslint-disable-next-line no-restricted-syntax
    for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
      yield hi;
    }
  },
  resolve: (payload) => payload
};

const schema = new graphqlExports.GraphQLSchema({
  query: new graphqlExports.GraphQLObjectType({
    name: 'RootQueryType',
    fields: { hello }
  }),
  subscription: new graphqlExports.GraphQLObjectType({
    name: 'RootSubscriptionType',
    fields: { greetings }
  })
});

export default schema;
