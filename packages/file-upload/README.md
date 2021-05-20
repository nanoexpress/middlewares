# file-upload

file-upload middleware for nanoexpress

> You can use express `file-upload` middleware instead of this middleware

## Installation

```bash
npm i @nanoexpress/middleware-file-upload
# or
yarn add @nanoexpress/middleware-file-upload
```

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import fileUpload from '@nanoexpress/middleware-file-upload';

app.use(fileUpload());
```

### CJS Module

```js
const fileUpload = require('@nanoexpress/middleware-file-upload/cjs');

app.use(fileUpload());
```

## Options

| Options name    | Default | Required | Description                            |
| --------------- | ------- | -------- | -------------------------------------- |
| `options.limit` | 512 Mb  | Yes      | Limit of total uploading files or data |

## License

MIT
