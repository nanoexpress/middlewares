import fs from 'fs';
import path from 'path';
import { getMime } from './mime.js';

function handleDirectory(path) {
  if (fs.statSync(path).isDirectory()) {
    return {
      files: precacheStatic(path),
      reduce: true
    };
  }
}

function precacheFolder(path) {
  try {
    const files = fs.readdirSync(path);

    const handledFiles = files.map((file) => handleItem(path, file));

    return handledFiles;
  } catch (e) {
    throw new Error('[nanoexpress::Middlewares]: {static} Precache failed', e);
  }
}

function handleItem(filePath, file) {
  const resolved = path.join(filePath, file);

  const isDirectory = handleDirectory(resolved);
  if (isDirectory !== undefined) {
    return isDirectory;
  }

  const streamable = getMime(resolved);

  return {
    file,
    resolved,
    streamable,
    raw: streamable ? null : fs.readFileSync(resolved)
  };
}

function mergeCaches(cache) {
  return cache.reduce((list, item) => {
    if (item.reduce) {
      list = list.concat(item.files);
    } else {
      list.push(item);
    }
    return list;
  }, []);
}

export default function precacheStatic(path) {
  return mergeCaches(precacheFolder(path));
}
