import { parse } from 'querystring';

/**
 * Parses string to `JSON` JS Object
 * @param {object} options Options of parser
 * @param {Boolean=} options.json Parse JSON data with
 * content-type of `application/json` or `text/json` into JS Object?
 * @param {Boolean=} options.urlEncoded Parse JSON data with content-type of
 * `x-www-form-urlencoded` into JS Object?
 *
 * @default options.json true `JSON-parsing enabled by default`
 * @default options.experimentalJsonParse false `Experimental JSON-parsing disabled by default`
 * @default options.urlEncoded true `Form Data-parsing enabled by default`
 *
 * @example
 * app.use(bodyParser())
 */
export default function bodyParser(config = {}) {
  return async function bodyParseHandler(req) {
    const { headers, body } = req;

    if (headers && body) {
      const contentType = headers['content-type'];
      if (contentType) {
        if (config.json !== false && contentType.indexOf('/json') !== -1) {
          // eslint-disable-next-line max-depth
          if (req.fastBodyParse !== undefined) {
            req.body = req.fastBodyParse(body);
          } else {
            req.body = JSON.parse(body);
          }
        } else if (
          config.urlEncoded !== false &&
          contentType.indexOf('/x-www-form-urlencoded') !== -1
        ) {
          req.body = parse(body.toString());
        }
      }
    }

    return undefined;
  };
}
