import omit from 'lodash.omit';

const unsupportedKeywords = ['example'];

export default (schema) => {
  const { properties, ...all } = schema;

  const omittedProperties = Object.keys(properties).reduce(
    (props, key) => ({
      ...props,
      [key]: omit(properties[key], unsupportedKeywords)
    }),
    {}
  );

  return {
    ...all,
    properties: omittedProperties
  };
};
