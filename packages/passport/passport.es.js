/**
 * PassportJS middleware wrapper
 * @param {object} options PassportJS options
 *
 * @example
 * app.use(passportInitialize(config))
 * app.use(passport.session())
 */
import passport from 'passport';

export default function passportInitialize(config) {
  const initialize = passport.initialize(config);
  return async (req, res) => {
    // `passport.initialize()` installs the supported request helpers
    // (`login`, `logout`, `isAuthenticated`, ...) itself, so the wrapper no
    // longer reaches into passport's internal `lib/http/request.js` module.
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
