import { RequestListener } from 'http';

interface IStaticServeOptions {
  mode: 'cached' | 'live';
  index: string;
  forcePretty: boolean;
  addPrettyUrl: boolean;
  lastModified: boolean;
  compressed: boolean;
}

declare function staticServe(
  path: string,
  options?: IStaticServeOptions
): Promise<RequestListener>;

export = staticServe;
