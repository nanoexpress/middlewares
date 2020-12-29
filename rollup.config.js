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
  input: `./packages/${name}/${name}.es.js`,
  output: {
    format: 'cjs',
    file: `.//packages/${name}/cjs/${name}.cjs.js`,
    strict: true,
    sourcemap: 'inline',
    exports: 'default'
  },
  external
}));
