import graphqlExports from 'graphql';

/**
 * @param schema - Please see [here](https://graphql.org/graphql-js/type/#graphqlschema)
 * for more information to how-to pass it
 * @param root - See [here](https://graphql.org/graphql-js/#writing-code)
 * for more info to how-to use clean version
 * @example
 * app.use(graphql(GraphQLSchema))
 * @example
 * app.use(graphql(GraphQLSchema, root))
 */

export default function graphql(schema, root) {
  return async function graphqlHandler(req, res) {
    const { headers, body } = req;

    if (headers && body) {
      const contentType = headers['content-type'];
      res.writeHeader('content-type', 'application/json');

      let graphqlQuery = '';
      let variables;
      let operationName;

      if (typeof body === 'object' && body) {
        graphqlQuery = body.query || body.mutation;
        variables = body.variables;
        operationName = body.operationName;
      } else if (typeof body === 'string') {
        if (
          contentType === 'application/graphql' ||
          contentType === 'text/graphql'
        ) {
          graphqlQuery = body;
        } else {
          return res.end(
            '{"status":"error","message":"Please, make sure, your provided data are correct"}'
          );
        }
      }

      const context = { req, res };
      const response = await graphqlExports.graphql(
        schema,
        graphqlQuery,
        root,
        context,
        variables,
        operationName
      );

      if (response) {
        return res.send(response);
      }
    }

    return res;
  };
}
