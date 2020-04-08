interface BodyParserOptions {
  json: boolean;
  experimentalJsonParse: boolean;
  urlEncoded: boolean;
}

declare function bodyParser<T>(options?: BodyParserOptions): T | Promise<T>;

export = bodyParser;
