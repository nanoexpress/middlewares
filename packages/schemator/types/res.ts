export interface IResponse {
  end(chunk: string): IResponse;
  setHeader(key: string, value: string): IResponse;
}
