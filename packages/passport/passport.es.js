/**
 * PassportJS middleware wrapper
 * @param {object} options PassportJS options
 *
 * @example
 * app.use(passportInitialize(config))
 * app.use(passport.session())
 */
import passport from 'passport';
import passportHttpRequest from 'passport/lib/http/request.js';

export default function passportInitialize(config) {
  const initialize = passport.initialize(config);
  return async (req, res) => {
    Object.assign(req, passportHttpRequest);
    await new Promise((resolve, reject) =>
      initialize(req, res, (err, done) => {
        if (err) {
          return reject(err);
        }
        return resolve(done);
      })
    );
  };
}
