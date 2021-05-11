interface IBodyParserOptions {
  json: boolean;
  urlEncoded: boolean;
}

declare function bodyParser<T>(options?: IBodyParserOptions): T | Promise<T>;

export = bodyParser;
