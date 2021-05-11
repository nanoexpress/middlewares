import staticServe from '@nanoexpress/middleware-static-serve';
import getdirname from 'getdirname';
import path from 'path';
import swaggerUiDist from 'swagger-ui-dist';
import { expose, load, render } from './methods/index.js';
import importize from './utils/importize.js';

/**
 * Initialized Schemator instance
 * @function
 * @namespace Schemator
 * @param {object} config Schemator configuration
 * @param {string} config.swaggerPath Swagger schema file path
 * @param {string} config.swaggerRAW Swagger schema RAW Object
 * @returns {object} Return object
 * @returns {function} config.define Schemator define function to apply
 * @returns {load} config.load Loading function
 *
 * @example
 * const schematorInstance = schemator({ swaggerPath: './swagger.yml' });
 */
export default function schemator(config) {
  const instanceDirectory = getdirname();
  const swaggerObject = importize(
    {
      path: config.swaggerPath,
      raw: config.swaggerRAW
    },
    instanceDirectory
  );
  const exposePath = config.swaggerPath
    ? path.basename(config.swaggerPath)
    : 'swagger.json';

  // We define it before function let export this
  const functionExports = {};

  functionExports.define = (app) => {
    app.get(
      '/swagger-ui-dist/:file',
      staticServe(swaggerUiDist.absolutePath())
    );
    app.get(`/${exposePath}`, expose(swaggerObject));
    app.get('/swagger', render({ exposePath: `/${exposePath}` }));

    functionExports.load = load.bind(app, swaggerObject);

    return app;
  };
  functionExports.load = () => {
    throw new Error(
      'Please, define by `define` method first to make it work correctly'
    );
  };

  return functionExports;
}
