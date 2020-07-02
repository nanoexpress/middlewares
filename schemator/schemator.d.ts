type LoadOptions = { attach: string; method: string };

interface ISchemator {
  load(
    options: (LoadOptions & { path: string }) | (LoadOptions & { raw: object })
  ): PromiseLike<any>;
  render(options: { title: string; exposePath: string }): PromiseLike<any>;
  expose(): PromiseLike<any>;
}

declare function schemator(
  options: { swaggerPath: string } | { swaggerRAW: object }
): ISchemator;

export = schemator;
