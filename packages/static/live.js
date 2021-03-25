import { promises as fs } from 'fs';

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

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const filePath = path + url;

    const stat = await fs.stat(filePath).catch(() => null);

    if (stat && !res.aborted) {
      return res.sendFile(filePath, config.lastModified, config.compressed);
    }
  };
}
