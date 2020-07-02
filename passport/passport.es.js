/**
 * PassportJS middleware wrapper
 * @param {object} options PassportJS options
 *
 * @example
 * app.use(passportInitialize(config))
 * app.use(passport.session())
 */
import passportHttpRequest from 'passport/lib/http/request';
import passport from 'passport';

export default function passportInitialize(config) {
  const initialize = passport.initialize(config);
  return async (req, res) => {
    Object.assign(req, passportHttpRequest);
    await new Promise((resolve, reject) =>
      initialize(req, res, (err, done) => {
        if (err) {
          return reject(err);
        }
        resolve(done);
      })
    );
  };
}
