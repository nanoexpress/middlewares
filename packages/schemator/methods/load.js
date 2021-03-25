import Ajv from 'ajv';
import fastJsonStringify from 'fast-json-stringify';
import getdirname from 'getdirname';
import importize from '../utils/importize.js';
import {
  flatObjects,
  schemaPrepare,
  validatorPrepare
} from '../utils/schema-prepare.js';

/**
 * Schemator loading router method
 * @param {object} swaggerObject Internal Swagger instance
 * @param {object} config Schemator route load configuration
 * @param {string} config.method Your router method
 * @param {string} config.attach Your router path (with Swagger path format)
 * @param {string} config.path Route Swagger schema file path
 * @param {string} config.raw Route Swagger schema RAW Object
 * @param {object} ajvConfig
 * @memberof Schemator
 *
 * @default ajvConfig.removeAdditional all `Remove Ajv addin. props`
 *
 * @example
 * schematorInstance.load({
 *   attach: '/auth',
 *   method: 'get',
 *   path: './auth/docs.yml'
 * })
 */
export default function load(
  swaggerObject,
  config,
  ajvConfig = {
    removeAdditional: 'all',
    allErrors: true
  }
) {
  let ajv;

  let prepareBodyValidator;
  let prepareQueriesValidator;
  let prepareParamsValidator;
  let prepareHeadersValidator;
  let prepareCookiesValidator;

  const routeDirectory = getdirname();
  const swaggerRouteObject = importize(config, routeDirectory);

  Object.assign(swaggerObject.paths, swaggerRouteObject.path);

  const { responses, requestBody, parameters } = swaggerRouteObject.path[
    config.attach
  ][config.method];

  if (requestBody || parameters) {
    if (requestBody) {
      // eslint-disable-next-line new-cap
      ajv = Ajv.default ? new Ajv.default(ajvConfig) : new Ajv(ajvConfig);

      prepareBodyValidator = schemaPrepare(requestBody.content, (schema) =>
        ajv.compile(schema)
      );
    }

    if (parameters && parameters.length > 0) {
      if (!ajv) {
        ajv = Ajv(ajvConfig);
      }
      prepareQueriesValidator = validatorPrepare(
        ajv,
        parameters,
        'query',
        true
      );
      prepareParamsValidator = validatorPrepare(ajv, parameters, 'path', true);
      prepareHeadersValidator = validatorPrepare(
        ajv,
        parameters,
        'headers',
        true
      );
      prepareCookiesValidator = validatorPrepare(
        ajv,
        parameters,
        'cookie',
        true
      );
    }
  }

  const prepareSerialize =
    responses &&
    Object.entries(responses)
      .map(([code, { content }]) => ({
        [code]: schemaPrepare(content, fastJsonStringify)
      }))
      .reduce(flatObjects, undefined);

  // eslint-disable-next-line consistent-return
  return async (req, res) => {
    const bodyContentType = req.headers['content-type'] || 'application/json';
    const responseContentType = req.headers.accept || bodyContentType;

    if (prepareSerialize) {
      const serializeTypes =
        prepareSerialize[res.rawStatusCode] || prepareSerialize[200];
      const serializer = serializeTypes[responseContentType];

      res.writeHeader('Content-Type', responseContentType);
      res.writeStatus(res.statusCode);

      // PRO-Slim version polyfill
      res.serialize = serializer;

      // PRO version polyfill
      res.fastJson = serializer;
    }

    let errors;
    if (prepareBodyValidator && req.body) {
      const bodyValidator = prepareBodyValidator[bodyContentType];

      if (bodyValidator) {
        if (!bodyValidator(req.body)) {
          errors = { body: bodyValidator.errors };
        }
      }
    }
    if (prepareQueriesValidator && req.query) {
      if (!prepareQueriesValidator(req.query)) {
        if (!errors) {
          errors = {};
        }
        errors.query = prepareQueriesValidator.errors;
      }
    }
    if (prepareParamsValidator && req.params) {
      if (!prepareParamsValidator(req.params)) {
        if (!errors) {
          errors = {};
        }
        errors.params = prepareParamsValidator;
      }
    }
    if (prepareHeadersValidator && req.headers) {
      if (!prepareHeadersValidator(req.headers)) {
        if (!errors) {
          errors = {};
        }

        errors.headers = prepareHeadersValidator.errors;
      }
    }
    if (prepareCookiesValidator && req.cookies) {
      if (!prepareCookiesValidator(req.cookies)) {
        if (!errors) {
          errors = {};
        }
        errors.cookies = prepareCookiesValidator.errors;
      }
    }

    if (errors) {
      return res.send({
        status: 'error',
        errors
      });
    }
  };
}
