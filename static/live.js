import { promises as fs } from 'fs';

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
    let url = req.path;

    if (forcePretty || (addPrettyUrl && url === '/')) {
      url += index;
    }

    const filePath = path + url;

    const stat = await fs.stat(filePath).catch(() => null);

    if (stat) {
      return res.sendFile(filePath, lastModified, compressed);
    }
  };
}
