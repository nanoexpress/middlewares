# PassportJS

PassportJS middleware wrapper for nanoexpress

## Example

See the [examples](./examples) directory

## Usage

See [here](http://www.passportjs.org) for more info

### ESM Module

```js
import passportInitialize from '@nanoexpress/middlewares/passport/passport.es.js';
import passport from 'passport';

app.use(passportInitialize(config));
app.use(passport.session());
```

### CJS Module

```js
const passportInitialize = require('@nanoexpress/middlewares/passport/cjs');
const passport = require('passport');

app.use(passportInitialize(config));
app.use(passport.session());
```

## License

MIT
