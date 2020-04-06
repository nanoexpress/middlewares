import { promises as fs } from 'fs';
import { resAbortHandler } from '@nanoexpress/pro-slim/src/constants.js';

export default function staticMiddleware(
  path,
  {
    index = 'index.html',
    forcePretty = false,
    addPrettyUrl = true,
    lastModified = true,
    compressed = true
  } = {}
) {
  return async function handleServe(req, res) {
    if (!res[resAbortHandler]) {
      res.onAborted(() => {
        res.aborted = true;
      });
      res[resAbortHandler] = true;
    }

    let url = req.path;

    if (forcePretty || (addPrettyUrl && url === '/')) {
      url += index;
    }

    const filePath = path + url;

    const stat = await fs.stat(filePath).catch(() => null);

    if (stat && !res.aborted) {
      return res.sendFile(filePath, lastModified, compressed);
    }
  };
}
