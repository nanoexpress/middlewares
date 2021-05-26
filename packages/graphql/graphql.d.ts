import { GraphQLSchema } from 'graphql';
import { RequestListener } from 'http';

declare function graphql(options?: GraphQLSchema): Promise<RequestListener>;

export = graphql;
