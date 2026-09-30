import graphqlExports from 'graphql';
import { compileQuery } from 'graphql-jit';

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
  // simple LRU so unique attacker-supplied queries cannot grow it unbounded
  const COMPILED_QUERY_CACHE_LIMIT = 1000;
  const cache = new Map();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const jitOptions = { customJSONSerializer: true };
  return async function graphqlHandler(req, res) {
    const { headers, body } = req;

    if (headers && body) {
      const contentType = headers['content-type'];
      res.writeHeader('content-type', 'application/json');

      let query;
      let variables;
      let operationName;

      let document;
      let compiled;

      if (
        contentType === 'application/graphql' ||
        contentType === 'text/graphql'
      ) {
        query = body;
      } else {
        query = body.query || body.mutation;
        variables = body.variables;
        operationName = body.operationName;
      }

      if (!query) {
        return res
          .status(400)
          .send({ status: 'error', message: 'Invalid query' });
      }

      compiled = cache.get(query);

      if (!compiled) {
        document = graphqlExports.parse(query);

        if (cache.size >= COMPILED_QUERY_CACHE_LIMIT) {
          // evict the least recently used entry
          cache.delete(cache.keys().next().value);
        }
        compiled = compileQuery(schema, document, operationName, jitOptions);
        cache.set(query, compiled);
      } else {
        // refresh LRU position
        cache.delete(query);
        cache.set(query, compiled);
      }

      const context = { req, res };
      const response = compiled.query(root, context, variables);

      if (response) {
        return res.send(response);
      }
    }

    return res;
  };
}
