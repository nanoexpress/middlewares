import { default as cacheable } from './cacheable.js';
import { default as live } from './live.js';

/**
 * Serves file
 * @param {String} path Path of folder
 * @param {object} options Options of serve
 * @param {String=} options.mode Serve mode, has two values - Cached and Live.
 * Cached gives better performance, but on refresh gives cached result
 * and uses more RAM.
 * Live mode uses less memory usage, on request responses last version
 * but on high-load applicatins may reduces performance
 *
 * @param {Boolean=} options.index Index filename
 * @param {Boolean=} options.forcePretty Force appending index-file
 * path even path isn't as root
 *
 * @param {Boolean=} options.addPrettyUrl Enable pretty url
 * by auto-appending index-file, so works `/` like `/index.html`
 *
 * @param {Boolean=} options.lastModified Enable last-modified check,
 * if file not modified, returns empty request with 304 status
 * @param {Boolean=} options.compressed Compress response/response streams
 * @default options.mode cached `Uses cached mode by default`
 * @default options.index index.html `Default index.html as index-file`
 * @default options.forcePretty false `Disabled by default`
 * @default options.addPrettyUrl true `Enabled by default`
 * @default options.lastModified true `Enabled by default`
 * @default options.compressed true `Enabled by default`
 *
 * @example // If mode is `cached`
 * app.use(await staticServe('./assets/static'))
 * @example // If mode is `live`
 * app.use(staticServe('./assets/static'))
 */
export default function staticServe(path, config = {}) {
  if (config.mode === undefined) {
    config.mode = 'cached'; // Has better Response/sec
  }
  if (config.mode === 'live') {
    return live(path, config);
  } else if (config.mode === 'cached') {
    return cacheable(path, config);
  } else {
    throw new Error('[nanoexpress::Middlewares]: {static} Unknown mode');
  }
}
