import { Options } from 'formidable';
import { RequestListener } from 'http';

declare function formidable(options?: Options): Promise<RequestListener>;

export = formidable;
