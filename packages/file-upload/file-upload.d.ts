import { RequestListener } from 'http';

interface IFileUploadOptions {
  limit: string;
}

declare function fileUpload(
  options?: IFileUploadOptions
): Promise<RequestListener>;

export = fileUpload;
