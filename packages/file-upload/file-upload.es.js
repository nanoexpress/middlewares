import uWS from 'uWebSockets.js';
import sizeConvert from './utils/size-converts.js';
import streamHandler from './utils/stream-handler.js';
import streamParser from './utils/stream-parser.js';

/**
 * Handles file-upload process
 * @param {object} options Options of middleware
 * @param {String=} options.limit Limit of uploading file or data
 * @default options.limit 256 MB `256 Mb total limit of data by default`
 * @example
 * app.use(fileUpload())
 */
export default function fileUpload(config = { limit: '256mb' }) {
  const FILE_SIZE_LIMIT = sizeConvert(config.limit);
  return async function fileUploadHandler(req, res) {
    const contentType =
      (req.headers && req.headers['content-type']) ||
      req.getHeader('content-type');
    const contentLength =
      (req.headers && req.headers['content-length']) ||
      req.getHeader('content-length');
    if (
      !contentType ||
      !(req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')
    ) {
      return;
    }

    if (
      contentType.indexOf('multipart/') !== 0 &&
      contentType.indexOf('video/') !== 0 &&
      contentType.indexOf('audio/') !== 0 &&
      contentType.indexOf('image/') !== 0
    ) {
      throw new Error(
        '@nanoexpress/middleware-file-upload [Error]: Invalid upload format, please check your request'
      );
    }
    if (+contentLength > FILE_SIZE_LIMIT) {
      throw new Error(
        '@nanoexpress/middleware-file-upload [Error]: File-limit exceeded, please change limit on server or down file-size from client'
      );
    }
    if (!req.stream) {
      streamHandler(req, res);
    }

    const buffers = await streamParser(req);
    const fields = uWS.getParts(buffers, contentType);

    req.files = [];
    req.body = {};

    for (let i = 0, len = fields.length, field; i < len; i += 1) {
      field = fields[i];

      if (field.type) {
        field.data = Buffer.from(field.data);
        req.files.push(field);
      } else {
        req.body[field.name] = Buffer.from(field.data).toString();
      }
    }
  };
}
