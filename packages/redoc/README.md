# ReDoc

redoc middleware for nanoexpress swagger

## Installation

```bash
npm i @nanoexpress/middleware-redoc
# or
yarn add @nanoexpress/middleware-redoc
```

## Usage

See [here](https://github.com/Redocly/redoc/) for more info

### ESM Module

```js
import reDoc from '@nanoexpress/middleware-redoc';

app.define(swagger); // For nanoexpress this line doesn't need
app.use(reDoc());
```

### CJS Module

```js
const reDoc = require('@nanoexpress/middleware-redoc/cjs');

app.define(swagger); // For nanoexpress this line doesn't need
app.use(reDoc());
```

## Options

| Options name    | Default             | Required | Description                 |
| --------------- | ------------------- | -------- | --------------------------- |
| `options.title` | nanoexpress - ReDoc | No       | Title of documentation page |
| `options.path`  | `/docs`             | No       | Path of documentation page  |
| `options.url`   | -                   | No       | URL of Swagger file         |

## License

MIT
