import { RequestListener } from 'http';

interface IBodyParserOptions {
  json: boolean;
  urlEncoded: boolean;
}

declare function bodyParser(
  options?: IBodyParserOptions
): Promise<RequestListener>;

export = bodyParser;
