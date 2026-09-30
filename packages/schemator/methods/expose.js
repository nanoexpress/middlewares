/**
 * Schemator expose Swagger documentation schema
 * @param {object} swaggerObject Internal Swagger instance
 * @memberof Schemator
 *
 * @example
 * schematorInstance.expose()
 */
export default function expose(swaggerObject) {
  return async (req, res) => {
    res.setHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    });

    return res.end(JSON.stringify(swaggerObject, null, 2));
  };
}
