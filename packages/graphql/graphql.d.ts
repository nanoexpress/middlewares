import { GraphQLSchema } from 'graphql';
import { RequestListener } from 'node:http';

declare function graphql(options?: GraphQLSchema): Promise<RequestListener>;

export = graphql;
