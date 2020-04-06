import { promises as fs } from 'fs';
import { resAbortHandler } from '@nanoexpress/pro-slim/src/constants.js';

export default function staticMiddleware(path, config) {
  return async function handleServe(req, res) {
    if (!res[resAbortHandler]) {
      res.onAborted(() => {
        res.aborted = true;
      });
      res[resAbortHandler] = true;
    }

    let url = req.path;

    if (config.forcePretty || (config.addPrettyUrl && url === '/')) {
      url += config.index;
    }

    const filePath = path + url;

    const stat = await fs.stat(filePath).catch(() => null);

    if (stat && !res.aborted) {
      return res.sendFile(filePath, config.lastModified, config.compressed);
    }
  };
}
