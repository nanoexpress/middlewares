import { Readable } from 'stream';

export default function streamHandler(req, res) {
  const cache = [];
  const stream = new Readable({
    read() {
      // some reads here
    }
  });
  req.stream = stream;

  res.onData((chunk, isLast) => {
    cache[0] = Buffer.from(chunk);

    stream.push(Buffer.concat(cache));

    if (isLast) {
      stream.push(null);
      cache[0] = null;
    }
  });
}
