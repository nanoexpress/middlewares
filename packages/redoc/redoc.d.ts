interface ReDocOptions {
  title: string;
  path: string;
  url?: string;
}

declare function redoc<T>(options?: ReDocOptions): T | Promise<T>;

export = redoc;
