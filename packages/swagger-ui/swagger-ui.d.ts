interface ISwaggerUIOptions {
  title: string;
  path: string;
  url?: string;
}

declare function swaggerUi<T>(options?: ISwaggerUIOptions): T | Promise<T>;

export = swaggerUi;
