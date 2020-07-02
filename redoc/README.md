# ReDoc

redoc middleware for nanoexpress swagger

## Usage

See [here](https://github.com/Redocly/redoc/) for more info

### ESM Module

```js
import reDoc from '@nanoexpress/middlewares/redoc/redoc.es.js';

app.define(swagger); // For nanoexpress-pro this line doesn't need
app.use(reDoc());
```

### CJS Module

```js
const reDoc = require('@nanoexpress/middlewares/redoc/cjs');

app.define(swagger); // For nanoexpress-pro this line doesn't need
app.use(reDoc());
```

## Options

| Options name    | Default             | Required | Description                 |
| --------------- | ------------------- | -------- | --------------------------- |
| `options.title` | nanoexpress - ReDoc | No       | Title of documentation page |
| `options.path`  | `/docs/`            | No       | Path of documentation page  |
| `options.url`   | -                   | No       | URL of Swagger file         |

## License

MIT
