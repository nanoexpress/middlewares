interface StaticServeOptions {
  mode: 'cached' | 'live';
  index: string;
  forcePretty: boolean;
  addPrettyUrl: boolean;
  lastModified: boolean;
  compressed: boolean;
}

declare function staticServe<T>(
  path: string,
  options?: StaticServeOptions
): T | Promise<T>;

export = staticServe;
