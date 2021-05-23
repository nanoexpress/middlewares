import Formidable from 'formidable';

/**
 * Formidable plugin
 * @param {object} options Formidable options
 * @example
 * app.use(formidable())
 */
export default function formidable(config = { multiples: true }) {
  const form = Formidable(config);
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
