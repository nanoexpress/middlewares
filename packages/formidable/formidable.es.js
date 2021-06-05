import Formidable from 'formidable';

/**
 * Formidable plugin
 * @param {object} options Formidable options
 * @param {Function} initialize **Formidable** instance handler
 * @default {object} options {multiples: true}
 * @example
 * app.use(formidable())
 */
export default function formidable(config = { multiples: true }, initialize) {
  const form = Formidable(config);
  if (typeof initialize === 'function') {
    initialize(form);
  }
  return async function formidableHandler(req) {
    Object.assign(req.stream, req);
    await new Promise((resolve, reject) =>
      form.parse(req.stream, (err, fields, files) => {
        if (err) {
          return reject(err);
        }

        req.files = files;
        req.body = fields;
        return resolve();
      })
    );
  };
}
