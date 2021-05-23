/* eslint-disable import/no-unresolved, node/no-missing-import, node/no-unpublished-import, eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import formidable from '@nanoexpress/middleware-formidable';
import nanoexpress from 'nanoexpress';

const app = nanoexpress({
  jsonSpaces: 2
});

app.use(formidable({ maxFileSize: 512 * 1024 * 1024 }));

app.get('/', async () => ({ status: 'success' }));
app.post('/', async (req) => {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const field in req.files) {
    // eslint-disable-next-line security-node/detect-crlf, no-console
    console.log('File info', field, req.files[field]);
  }

  return req.body;
});

app.listen(4000);
