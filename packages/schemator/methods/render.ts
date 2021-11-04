/**
 * Schemator expose Swagger documentation schema
 * @param {object} config Swagger UI Render configuration
 * @param {string} config.title Swagger UI Render page title
 * @param {string} config.exposePath Schemator Swagger schema expose path
 * @memberof Schemator
 *
 * @default config.title `Schemator`
 *
 * @example
 * schematorInstance.render({ title: 'Docs' })
 */

import { IResponse } from '../types/res';

export default function renderSwagger(config: {title?: string; exposePath?: string}): (_: unknown, res:IResponse) => Promise<IResponse> {
  return async (_: unknown, res: IResponse): Promise<IResponse> =>
    res.end(`<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8"><title>${
  (config && config.title) || 'Schemator'
}</title><link rel="stylesheet" type="text/css" href="./swagger-ui-dist/swagger-ui.css" ><link rel="icon" type="image/png" href="./swagger-ui-dist/favicon-32x32.png" sizes="32x32" /><link rel="icon" type="image/png" href="./swagger-ui-dist/favicon-16x16.png" sizes="16x16" /><style>html{box-sizing:border-box;overflow:-moz-scrollbars-vertical;overflow-y:scroll}*,:after,:before{box-sizing:inherit}body{margin:0;background:#fafafa}</style></head><body><div id="swagger-ui"></div><script src="./swagger-ui-dist/swagger-ui-bundle.js"> </script><script src="./swagger-ui-dist/swagger-ui-standalone-preset.js"></script><script>window.onload=function(){const o=SwaggerUIBundle({url:window.location.protocol+"//"+window.location.host+"${
  config.exposePath
}",dom_id:"#swagger-ui",deepLinking:!0,presets:[SwaggerUIBundle.presets.apis,SwaggerUIStandalonePreset],plugins:[SwaggerUIBundle.plugins.DownloadUrl],layout:"StandaloneLayout"});window.ui=o};</script></body></html>`);
}
