# ReDoc

redoc middleware for nanoexpress swagger

## Why

If you using middleware for `nanoexpress`, performance will be faster due of this middleware was optimized to work for `nanoexpress`

## Usage

See [here](https://github.com/Redocly/redoc/) for more info

### ESM Module

```js
import reDoc from '@nanoexpress/middlewares/redoc';

app.define(swagger); // For nanoexpress-pro this line doesn't need
app.use(reDoc());
```

### CJS Module

> For installing CJS variant, try `npm i nanoexpress/middlewares#cjs` as always there will be CJS builds

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
