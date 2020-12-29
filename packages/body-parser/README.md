# body-parser

body-parser middleware for nanoexpress

> You can use express `body-parser` middleware instead of this middleware

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import bodyParser from '@nanoexpress/middlewares/body-parser/body-parser.es.js';

app.use(bodyParser());
```

### CJS Module

```js
const bodyParser = require('@nanoexpress/middlewares/body-parser/cjs');

app.use(bodyParser());
```

## Options

| Options name                    | Default | Required | Description                                                                            |
| ------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------- |
| `options.json`                  | true    | No       | Parse JSON data with content-type of `application/json` or `text/json` into JS Object? |
| `options.experimentalJsonParse` | false   | No       | Experimental JSON parser, better performance, but not stable yet                       |
| `options.urlEncoded`            | true    | No       | Parse JSON data with content-type of `x-www-form-urlencoded` into JS Object?           |

## License

MIT
