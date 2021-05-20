/* eslint-disable import/no-unresolved, node/no-missing-import, node/no-unpublished-import, eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies, node/no-extraneous-import */
import fileUpload from '@nanoexpress/middleware-file-upload';
import { writeFile } from 'fs/promises';
import nanoexpress from 'nanoexpress';
import path from 'path';

const app = nanoexpress({
  jsonSpaces: 2
});

app.use(fileUpload({ limit: '300Mb' }));

app.get('/', async () => ({ status: 'success' }));
app.post('/', async (req) => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of req.files) {
    // eslint-disable-next-line security-node/detect-crlf, no-console
    console.log('File info', { name: file.name, type: file.type });

    await writeFile(path.resolve('media', file.filename), file.data);
  }

  return req.body;
});

app.listen(4000);
