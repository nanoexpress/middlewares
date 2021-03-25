interface IReDocOptions {
  title: string;
  path: string;
  url?: string;
}

declare function redoc<T>(options?: IReDocOptions): T | Promise<T>;

export = redoc;
