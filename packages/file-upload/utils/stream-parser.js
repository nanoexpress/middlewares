export default function streamParser({ stream }) {
  const buffers = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
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
