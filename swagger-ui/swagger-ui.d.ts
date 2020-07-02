interface SwaggerUIOptions {
  title: string;
  path: string;
  url?: string;
}

declare function swaggerUi<T>(options?: SwaggerUIOptions): T | Promise<T>;

export = swaggerUi;
