import precacheStatic from './utils/precache-folder.js';

export default async function staticMiddleware(
  path,
  {
    index = 'index.html',
    forcePretty = false,
    addPrettyUrl = true,
    lastModified = true,
    compressed = true
  } = {}
) {
  // Reduce risk of importing files out-of-folder
  if (path.length > 4 && path.charAt(path.length) !== '/') {
    path += '/';
  }

  const items = await precacheStatic(path);

  return async function handleServe(req, res) {
    let fileName = req.path;

    if (forcePretty || (addPrettyUrl && fileName === '/')) {
      fileName += index;
    }

    for (const { streamable, resolved, raw } of items) {
      if (resolved.endsWith(fileName)) {
        if (streamable) {
          return res.sendFile(resolved, lastModified, compressed);
        }
        return res.end(raw);
      }
    }
  };
}
