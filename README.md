# Middlewares

List of middlewares for nanoexpress

## List

- body-parser

## Example

See to `/examples` directory for each middleware

## Usage

### ESM Module

```js
import bodyParser from 'nanoexpress/middlewares/body-parser';

app.use(bodyParser());
```

### CJS Module

```js
const bodyParser = require('nanoexpress/middlewares/body-parser/cjs');

app.use(bodyParser());
```

## License

MIT
