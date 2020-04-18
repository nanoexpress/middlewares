# graphql

graphql middleware for nanoexpress

> You can use express `express-graphql` middleware instead of this middleware

## Why

If you using middleware for `nanoexpress`, performance will be faster due of this middleware was optimized to work for `nanoexpress`

## Caveats

- This middleware supports only HTTP bindings, not WebSocket/PubSub/Subscription bindings
- This package does not provide GraphiQL support yet

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import graphql from 'nanoexpress/middlewares/graphql';

app.use('/graphql', graphql(GraphQLSchema));
```

### CJS Module

```js
const graphql = require('nanoexpress/middlewares/graphql/cjs');

app.use('/graphql', graphql(GraphQLSchema));
```

## Options

Please refer to [here](https://graphql.org/graphql-js/type/#graphqlschema) or [here](https://graphql.org/graphql-js/#writing-code) for more information

## License

MIT
