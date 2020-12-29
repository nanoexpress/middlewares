# graphql

graphql middleware for nanoexpress

> You can use express `express-graphql` middleware instead of this middleware

## Installation

```bash
npm i @nanoexpress/middleware-graphql
# or
yarn add @nanoexpress/middleware-graphql
```

## Caveats

- This middleware supports only HTTP bindings, not WebSocket/PubSub/Subscription bindings
- This package does not provide GraphiQL support yet

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import graphql from '@nanoexpress/middleware-body-parser;

app.use('/graphql', graphql(GraphQLSchema));
```

### CJS Module

```js
const graphql = require('@nanoexpress/middleware-body-parser/cjs');

app.use('/graphql', graphql(GraphQLSchema));
```

## Options

Please refer to [here](https://graphql.org/graphql-js/type/#graphqlschema) or [here](https://graphql.org/graphql-js/#writing-code) for more information

## License

MIT
