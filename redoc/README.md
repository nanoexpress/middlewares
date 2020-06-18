# ReDoc

redoc middleware for nanoexpress swagger

## Usage

See [here](https://github.com/Redocly/redoc/) for more info

### ESM Module

```js
import reDoc from '@nanoexpress/middlewares/redoc';

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

All of options are optional

- `options.title` [default=`nanoexpress - ReDoc`] - Title of documentation page
- `options.path` [default=`/docs/`] - Path of documentation page
- `options.url` - URL of Swagger file

## License

MIT
