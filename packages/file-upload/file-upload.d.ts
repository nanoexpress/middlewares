import { RequestListener } from 'node:http';

interface IFileUploadOptions {
  limit: string;
}

declare function fileUpload(
  options?: IFileUploadOptions
): Promise<RequestListener>;

export = fileUpload;
