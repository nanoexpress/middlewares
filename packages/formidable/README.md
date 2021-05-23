# formidable

Formidable middleware for nanoexpress

## Installation

```bash
npm i @nanoexpress/middleware-formidable
# or
yarn add @nanoexpress/middleware-formidable
```

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import formidable from '@nanoexpress/middleware-formidable';

app.use(formidable());
```

### CJS Module

```js
const formidable = require('@nanoexpress/middleware-formidable/cjs');

app.use(formidable());
```

## Options

See [here](https://github.com/node-formidable/formidable#options)

## License

MIT
