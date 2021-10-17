/* eslint-disable node/no-unpublished-import, @typescript-eslint/naming-convention, eslint-comments/disable-enable-pair */
import replace from '@rollup/plugin-replace';

const external = [
  'querystring',
  'graphql',
  'fs',
  'path',
  'getdirname',
  'ajv',
  'ajv-formats',
  'js-yaml',
  'fast-json-stringify',
  'swagger-ui-dist',
  'passport',
  'passport/lib/http/request',
  'lodash.omit'
];

export default [
  'body-parser',
  'file-upload',
  'formidable',
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
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NANO_ENV_MODULE': JSON.stringify('commonjs')
      }
    })
  ],
  external
}));
