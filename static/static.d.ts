import {
  HttpRequest as HttpRequestBasic,
  HttpResponse as HttpResponseBasic
} from 'uWebSockets.js';
import { HttpResponse } from '@nanoexpress/pro-slim';

type Middleware = (
  req: HttpRequestBasic,
  res: HttpResponse | HttpResponseBasic
) => HttpResponse;

interface StaticServeOptions {
  mode: 'cached' | 'live';
  index: string;
  forcePretty: boolean;
  addPrettyUrl: boolean;
  lastModified: boolean;
  compressed: boolean;
}

declare function staticServe(
  path: string,
  options?: StaticServeOptions
): Middleware | Promise<Middleware>;

export = staticServe;
