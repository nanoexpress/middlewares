interface IBodyParserOptions {
  json: boolean;
  experimentalJsonParse: boolean;
  urlEncoded: boolean;
}

declare function bodyParser<T>(options?: IBodyParserOptions): T | Promise<T>;

export = bodyParser;
