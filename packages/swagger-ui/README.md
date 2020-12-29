# swagger-ui

Swagger UI Frontend middleware

## This middleware is marked as legacy and should be used only for supporting old project

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import swaggerUi from '@nanoexpress/middlewares/swagger-ui/swagger-ui.es.js';

app.define(swagger); // For nanoexpress this line doesn't need
app.use('/swagger-ui-dist', swaggerUi());
```

### CJS Module

```js
const swaggerUi = require('@nanoexpress/middlewares/swagger-ui/cjs');

app.define(swagger); // For nanoexpress this line doesn't need
app.use('/swagger-ui-dist', swaggerUi());
```

## Options

| Options name    | Default             | Required | Description                 |
| --------------- | ------------------- | -------- | --------------------------- |
| `options.title` | nanoexpress - ReDoc | No       | Title of documentation page |
| `options.path`  | `/docs/`            | No       | Path of documentation page  |
| `options.url`   | -                   | No       | URL of Swagger file         |

## License

MIT
