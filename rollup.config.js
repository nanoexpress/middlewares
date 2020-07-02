const external = [
  'querystring',
  'graphql',
  'fs',
  'path',
  'getdirname',
  'ajv',
  'js-yaml',
  'fast-json-stringify',
  'swagger-ui-dist',
  'passport',
  'passport/lib/http/request'
];

export default [
  'body-parser',
  'static',
  'graphql',
  'redoc',
  'schemator',
  'swagger-ui',
  'passport'
].map((name) => ({
  input: `./${name}/${name}.es.js`,
  output: {
    format: 'cjs',
    file: `./${name}/cjs/${name}.cjs.js`,
    strict: false
  },
  external
}));
