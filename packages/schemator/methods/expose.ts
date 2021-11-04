import { IResponse } from '../types/res';

/**
 * Schemator expose Swagger documentation schema
 * @param {object} swaggerObject Internal Swagger instance
 * @memberof Schemator
 *
 * @example
 * schematorInstance.expose()
 */
export default function expose(swaggerObject: Record<string, any>): (_: unknown, res: IResponse) => void {
  return async (_: unknown, res: IResponse): Promise<IResponse> => {
    res.setHeader('Content-Type', 'application/json');

    return res.end(JSON.stringify(swaggerObject, null, 2));
  };
}
