import { promises as fs } from 'node:fs';
import { resolve, sep } from 'node:path';

export const resAbortHandler = '___$HttpResponseAbortHandler';
export default function staticMiddleware(path, config) {
  // eslint-disable-next-line consistent-return
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

    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch {
      return;
    }

    // Path traversal check: the resolved file must stay under the root
    const root = resolve(path);
    const filePath = resolve(root, `.${decodedUrl}`);

    if (filePath !== root && !filePath.startsWith(root + sep)) {
      return;
    }

    const stat = await fs.stat(filePath).catch(() => null);

    if (stat && !res.aborted) {
      return res.sendFile(filePath, config.lastModified, config.compressed);
    }
  };
}
