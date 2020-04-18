# static

Static file serve middleware for nanoexpress

> You can use express `static-serve` middleware instead of this middleware

## Why

If you using middleware for `nanoexpress`, performance will be faster due of this middleware was optimized to work for `nanoexpress`

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import staticServe from 'nanoexpress/middlewares/static';

app.use(staticServe('./static'));
```

### CJS Module

```js
const staticServe = require('nanoexpress/middlewares/static/cjs');

app.use(staticServe('./static'));
```

## Arguments

- `path` [string] - Path of your static serve folder
- `options` [object] - See below

## Options

All of options are optional

- `options.mode` [default=cached] - Serve mode, has two values - Cached and Live. Cached gives better performance, but on refresh gives cached result and uses more RAM. Live mode uses less memory usage, on request responses last version but on high-load applicatins may reduces performance
- `options.index` [default=index.html] - Index filename
- `options.forcePretty` [default=false] - Force appending index-file path even path isn't as root
- `options.addPrettyUrl` [default=true] - Enable pretty url by auto-appending index-file, so works `/` like `/index.html`
- `options.lastModified` [default=true] - Enable last-modified check, if file not modified, returns empty request with 304 status
- `options.compressed` [default=true] - Compress response/response streams

## License

MIT
