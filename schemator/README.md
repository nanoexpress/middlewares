# schemator

schemator middleware for nanoexpress

You can think this middleware combine of **Swagger documentation** and **Ajv** validation like original **nanoexpress-pro** built-in feature + **swagger-ui** middleware

## Dependencies

Install dependencies with `npm i DEPENDECY_NAME`

- swagger-ui-dist
- js-yaml
- getdirname

## Schema type

- YML (preferred)
- JSON
- RAW JS Object

### YML

```js
const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.yml'
  }),
  async (req) => {
    // your logic here
  }
);
```

### JSON

```js
const schematorInstance = schemator({ swaggerPath: './swagger.json' });

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.json'
  }),
  async (req) => {
    // your logic here
  }
);
```

### RAW JS Object

```js
const schematorInstance = schemator({ swaggerRAW: {} });

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    raw: {
      paths: {
        '/': {
          /* infos here */
        }
      }
    }
  }),
  async (req) => {
    // your logic here
  }
);
```

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import schemator from '@nanoexpress/middlewares/schemator/schemator.es.js';

const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

app.use('/swagger.json', schematorInstance.expose());

app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.yml'
  }),
  async (req) => {
    // your logic here
  }
);
```

### CJS Module

```js
const bodyParser = require('@nanoexpress/middlewares/schemator/cjs');

const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

app.use('/swagger.json', schematorInstance.expose());

app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.yml'
  }),
  async (req) => {
    // your logic here
  }
);
```

## Options

### Initialize options

| Options name          | Default | Required                     | Description               |
| --------------------- | ------- | ---------------------------- | ------------------------- |
| `options.swaggerPath` | -       | Yes or `options.swaggerRAW`  | Swagger schema file path  |
| `options.swaggerRAW`  | -       | Yes or `options.swaggerPath` | Swagger schema RAW Object |

### `schematorInstance.load(options, AjvConfig)` options

| Options name     | Default | Required              | Description                     |
| ---------------- | ------- | --------------------- | ------------------------------- |
| `options.method` | -       | Yes                   | Your router method              |
| `options.attach` | -       | Yes                   | Your router path                |
| `options.path`   | -       | Yes or `options.raw`  | Route Swagger schema file path  |
| `options.raw`    | -       | Yes or `options.path` | Route Swagger schema RAW Object |

See [Ajv configurations](https://ajv.js.org/#options) for more customization

### `schematorInstance.render(options)` options

| Options name         | Default   | Required | Description                       |
| -------------------- | --------- | -------- | --------------------------------- |
| `options.title`      | Schemator | Yes      | Swagger UI Title                  |
| `options.exposePath` | -         | Yes      | `schematorInstance.expose()` path |

## License

MIT
