/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/no-use-before-define */
import fs from 'fs';
import path from 'path';
import { getMime } from './mime.js';

function handleDirectory(dirPath) {
  if (fs.statSync(dirPath).isDirectory()) {
    return {
      files: precacheStatic(dirPath),
      reduce: true
    };
  }
  return undefined;
}

function precacheFolder(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);

    const handledFiles = files.map((file) => handleItem(dirPath, file));

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

export default function precacheStatic(dirPath) {
  return mergeCaches(precacheFolder(dirPath));
}
