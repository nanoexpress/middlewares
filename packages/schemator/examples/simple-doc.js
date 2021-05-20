/* eslint-disable import/no-unresolved, node/no-missing-import, node/no-unpublished-import, eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import bodyParser from '@nanoexpress/middleware-body-parser';
import schemator from '@nanoexpress/middleware-schemator';
import nanoexpress from 'nanoexpress';

const app = nanoexpress({
  jsonSpaces: 2
});

const schematorInstance = schemator({ swaggerPath: './swagger.json' });
app.define(schematorInstance.define);

app.use(bodyParser());

app.get(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'get', attach: '/', path: './docs.yml' }),
  async () => ({ status: 'success' })
);
app.post(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'post', attach: '/', path: './docs.yml' }),
  async (req) => ({ status: 'success', data: req.body })
);

app.listen(4000);
