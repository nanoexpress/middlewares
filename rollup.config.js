const external = [
  'querystring',
  'graphql',
  'fs',
  'path',
  'getdirname',
  'ajv',
  'js-yaml',
  'fast-json-stringify'
];

export default [
  'body-parser',
  'static',
  'graphql',
  'redoc',
  'schemator',
  'swagger-ui'
].map((name) => ({
  input: `./${name}/${name}.es.js`,
  output: {
    format: 'cjs',
    file: `./${name}/cjs/${name}.cjs.js`,
    strict: false
  },
  external
}));
