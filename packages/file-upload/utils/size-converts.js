export default function sizeConvert(size) {
  let divideRatio = 1;

  switch (size.toLowerCase().substr(-2)) {
    case 'kb': {
      divideRatio = 1024;
      break;
    }
    case 'mb': {
      divideRatio = 1024 ** 2;
      break;
    }
    case 'gb': {
      divideRatio = 1024 ** 3;
      break;
    }
    case 'tb': {
      divideRatio = 1024 ** 4;
      // eslint-disable-next-line no-console
      console.warn(
        '@nanoexpress/file-upload [Warning]: Uploading such a large file is not a possible or may be corrupted if any of network issue and server issue happens, please rethink about it'
      );
      break;
    }
    default: {
      throw new Error(
        '@nanoexpress/file-upload [Error]: Invalid size scale, choose one of available, please see docs for more'
      );
    }
  }

  return parseFloat(size.substr(0, size.length - 2)) * divideRatio;
}
