import graphqlExports from 'graphql';

const hello = {
  type: graphqlExports.GraphQLString,
  resolve() {
    return 'world';
  }
};

const schema = new graphqlExports.GraphQLSchema({
  query: new graphqlExports.GraphQLObjectType({
    name: 'RootQueryType',
    fields: { hello }
  })
});

export default schema;
