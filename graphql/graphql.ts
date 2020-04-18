import { GraphQLSchema } from 'graphql';

declare function graphql<T>(options?: GraphQLSchema): T;

export = graphql;
