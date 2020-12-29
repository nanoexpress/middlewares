# PassportJS

PassportJS middleware wrapper for nanoexpress

## Installation

```bash
npm i @nanoexpress/middleware-passport
# or
yarn add @nanoexpress/middleware-passport
```

## Example

See the [examples](./examples) directory

## Usage

See [here](http://www.passportjs.org) for more info

### ESM Module

```js
import passportInitialize from '@nanoexpress/middleware-passport';
import passport from 'passport';

app.use(passportInitialize(config));
app.use(passport.session());
```

### CJS Module

```js
const passportInitialize = require('@nanoexpress/middleware-passport/cjs');
const passport = require('passport');

app.use(passportInitialize(config));
app.use(passport.session());
```

## License

MIT
