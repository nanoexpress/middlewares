import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fastJsonStringify from 'fast-json-stringify';
import getdirname from 'getdirname';
import importize from '../utils/importize';
import omitUnsupportedKeywords from '../utils/omit-unsupported-keywords';
import {
  flatObjects,
  schemaPrepare,
  validatorPrepare
} from '../utils/schema-prepare';

/**
 * @name load
 * Schemator loading router method
 * @param {object} swaggerObject Internal Swagger instance
 * @param {object} config Schemator route load configuration
 * @param {string} config.method Your router method
 * @param {string} config.attach Your router path (with Swagger path format)
 * @param {string} config.path Route Swagger schema file path
 * @param {string} config.raw Route Swagger schema RAW Object
 * @param {object} ajvConfig Ajv config
 * @param {object} enableSmartFunctions Enable smart functions such as serializers and parsers
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
  },
  enableSmartFunctions = true
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

  const { responses, requestBody, parameters } =
    swaggerRouteObject.path[config.attach][config.method];

  if (requestBody || parameters) {
    if (requestBody) {
      // eslint-disable-next-line new-cap
      ajv = Ajv.default ? new Ajv.default(ajvConfig) : new Ajv(ajvConfig);
      addFormats(ajv);

      prepareBodyValidator = schemaPrepare(requestBody.content, (schema) =>
        ajv.compile(omitUnsupportedKeywords(schema))
      );
    }

    if (parameters && parameters.length > 0) {
      if (!ajv) {
        // eslint-disable-next-line new-cap
        ajv = Ajv.default ? new Ajv.default(ajvConfig) : new Ajv(ajvConfig);
        addFormats(ajv);
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

  const compiledJson =
    enableSmartFunctions &&
    responses &&
    Object.entries(responses)
      .map(([code, { content }]) => ({
        [code]: schemaPrepare(content, fastJsonStringify)
      }))
      .reduce(flatObjects, undefined);

  if (enableSmartFunctions && compiledJson && !this._serialized) {
    this._route._middlewares.push(async (req, res) => {
      const bodyContentType = req.headers['content-type'] || 'application/json';
      const responseContentType = req.headers.accept || bodyContentType;

      const serializeTypes =
        compiledJson[res.rawStatusCode] || compiledJson[200];
      const serializer = serializeTypes[responseContentType];

      res.serializer = serializer;
    });
    this._serialized = true;
  }

  // eslint-disable-next-line consistent-return
  return async (req, res) => {
    let errors;

    if (prepareBodyValidator && req.body) {
      const bodyValidator = prepareBodyValidator[req.headers['content-type']];

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

    if (fastJsonStringify && compiledJson) {
      res.writeHeader('Content-Type', req.headers.accept);
      res.writeStatus(res.statusCode);
    }

    if (errors) {
      return res.send({
        status: 'error',
        errors
      });
    }
  };
}
