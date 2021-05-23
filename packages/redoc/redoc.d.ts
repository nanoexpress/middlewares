import { RequestListener } from 'http';

interface IReDocOptions {
  title: string;
  path: string;
  url?: string;
}

declare function redoc(options?: IReDocOptions): Promise<RequestListener>;

export = redoc;
