# static

Static file serve middleware for nanoexpress

## Installation

```bash
npm i @nanoexpress/middleware-static-serve
# or
yarn add @nanoexpress/middleware-static-serve
```

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import staticServe from '@nanoexpress/middleware-static-serve';

app.use(staticServe('./static'));
```

### CJS Module

```js
const staticServe = require('@nanoexpress/middleware-static-serve/cjs');

app.use(staticServe('./static'));
```

## Arguments

| Name    | Type   | Description                      |
| ------- | ------ | -------------------------------- |
| path    | String | Path of your static serve folder |
| options | Object | See [Options](#options)          |

## Options

| Options name           | Default      | Required | Description                                    |
| ---------------------- | ------------ | -------- | ---------------------------------------------- |
| `options.mode`         | cached       | No       | Serve mode\*, has two values - Cached and Live |
| `options.index`        | `index.html` | No       | Index filename                                 |
| `options.forcePretty`  | false        | No       | Force appending index-file path                |
| `options.addPrettyUrl` | true         | No       | Enable pretty url by auto-appending index-file |
| `options.lastModified` | true         | No       | Enable browsers **Last-modified** check        |
| `options.compressed`   | true         | No       | Compress response/response streams             |

\* - Cached gives better performance, but on refresh gives cached result and uses more RAM. Live mode uses less memory usage, on request responses last version but on high-load applicatins may reduces performance

## License

MIT
