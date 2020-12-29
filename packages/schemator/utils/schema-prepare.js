export const flatObjects = (acc, item) =>
  acc ? Object.assign(acc, item) : item || null;

// eslint-disable-next-line no-unused-vars
const mapParams = ({ name, schema: { required, ...schema } }) => ({
  [name]: schema
});

export function schemaPrepare(content, handler) {
  return Object.entries(content)
    .map(([type, { schema }]) => ({
      [type]: handler(schema)
    }))
    .reduce(flatObjects);
}

export function validatorPrepare(ajv, parameters, type, isRequired) {
  if (!parameters) {
    return isRequired
      ? async (req) => {
          if (!req[type]) {
            throw new Error(`Reqest::${type} is required`);
          }
        }
      : null;
  }
  const matches = parameters.filter((param) => param.in === type);
  if (matches.length > 0) {
    const values = matches.map(mapParams).reduce(flatObjects, undefined);
    const requiredFields = matches
      .filter((param) => param.schema.required)
      .map((param) => param.name);

    return ajv.compile({
      type: 'object',
      required: requiredFields,
      properties: values
    });
  }

  return null;
}
