import getdirname from 'getdirname';
import importize from './utils/importize.js';
import { load, expose, render } from './methods/index.js';

/**
 * Initialized Schemator instance
 * @function
 * @namespace Schemator
 * @param {object} config Schemator configuration
 * @param {string} config.swaggerPath Swagger schema file path
 * @param {string} config.swaggerRAW Swagger schema RAW Object
 *
 * @example
 * const schematorInstance = schemator({ swaggerPath: './swagger.yml' });
 */
export default function Schemator(config) {
  const instanceDirectory = getdirname();
  const swaggerObject = importize(
    {
      path: config.swaggerPath,
      raw: config.swaggerRAW
    },
    instanceDirectory
  );

  return {
    load: load.bind(null, swaggerObject),
    expose: expose.bind(null, swaggerObject),
    render
  };
}
