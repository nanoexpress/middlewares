import { RequestListener } from 'http';

interface ISwaggerUIOptions {
  title: string;
  path: string;
  url?: string;
}

declare function swaggerUi(
  options?: ISwaggerUIOptions
): Promise<RequestListener>;

export = swaggerUi;
