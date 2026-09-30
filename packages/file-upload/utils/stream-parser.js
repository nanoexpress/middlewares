export default function streamParser({ stream }, limit = Infinity) {
  const buffers = [];
  let received = 0;
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      received += chunk.byteLength;
      // enforce the limit on actual bytes, not the client-declared header
      if (received > limit) {
        stream.destroy();
        reject(
          new Error(
            '@nanoexpress/middleware-file-upload [Error]: File-limit exceeded, please change limit on server or down file-size from client'
          )
        );
        return;
      }
      buffers.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(buffers));
      buffers.length = 0;
    });
    stream.on('error', (error) => {
      stream.destroy();
      reject(error);
    });
  });
}
