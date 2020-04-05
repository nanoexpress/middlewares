import { promises as fs } from 'fs';
import { join } from 'path';
import { getMime } from '@nanoexpress/pro-slim/src/helpers/mime.js';

async function handleDirectory(path) {
  if ((await fs.stat(path)).isDirectory()) {
    return {
      files: await precacheStatic(path),
      reduce: true
    };
  }
}

async function precacheFolder(path) {
  try {
    const files = await fs.readdir(path);

    const handledFiles = await Promise.all(
      files.map(async (file) => await handleItem(path, file))
    );

    return handledFiles;
  } catch (e) {
    throw new Error('[nanoexpress::Middlewares]: {static} Precache failed');
  }
}

async function handleItem(path, file) {
  const resolved = join(path, file);

  const isDirectory = await handleDirectory(resolved);
  if (isDirectory !== undefined) {
    return isDirectory;
  }

  const streamable = getMime(resolved);

  return {
    file,
    resolved,
    streamable,
    raw: streamable ? null : await fs.readFile(resolved)
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

export default async function precacheStatic(path) {
  return mergeCaches(await precacheFolder(path));
}
