import {
  HttpRequest as HttpRequestBasic,
  HttpResponse as HttpResponseBasic
} from 'uWebSockets.js';
import { HttpResponse } from '@nanoexpress/pro-slim';

type Middleware = (
  req: HttpRequestBasic,
  res: HttpResponse | HttpResponseBasic
) => HttpResponse;

interface BodyParserOptions {
  json: boolean;
  experimentalJsonParse: boolean;
  urlEncoded: boolean;
}

declare function bodyParser(
  options?: BodyParserOptions
): Middleware | Promise<Middleware>;

export = bodyParser;
