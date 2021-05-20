interface IFileUploadOptions {
  limit: string;
}

declare function fileUpload<T>(options?: IFileUploadOptions): T | Promise<T>;

export = fileUpload;
