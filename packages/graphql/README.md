# graphql

graphql middleware for nanoexpress

## Installation

```bash
npm i @nanoexpress/middleware-graphql
# or
yarn add @nanoexpress/middleware-graphql
```

## Caveats

- This middleware provides only HTTP bindings
- For **subscription** support, please use [graphql-ws](https://github.com/enisdenjo/graphql-ws)

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import graphql from '@nanoexpress/middleware-graphql';

app.post('/graphql', graphql(GraphQLSchema));
```

### CJS Module

```js
const graphql = require('@nanoexpress/middleware-graphql/cjs');

app.post('/graphql', graphql(GraphQLSchema));
```

## Options

Please refer to [here](https://graphql.org/graphql-js/type/#graphqlschema) or [here](https://graphql.org/graphql-js/#writing-code) for more information

## License

MIT
