/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import expressSession from 'express-session';
import nanoexpress from 'nanoexpress';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportInitialize from '../passport.es.js';

const app = nanoexpress();

app.use(
  expressSession({
    name: 'passport.sid',
    secret: 'session_secret',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    },
    logErrors: true
  })
);

// Init passport.js
// Use `passportInitialize()` instead of `passport.initialize()`
app.use(passportInitialize());
app.use(passport.session());

// Create Strategy
const strategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password'
  },
  (req, username, password, done) => {
    // eslint-disable-next-line security-node/detect-possible-timing-attacks
    if (password !== '12345678') {
      return done(null, false);
    }
    return done(null, { id: `id_${username}`, username, password });
  }
);

// Configuration
passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Our routes list
app.get('/', async (req) => ({ user: req.user || 'Unauthorized' }));

app.get('/done', (req, res) => {
  res.end('Auth success');
});

app.get('/error', (req, res) => {
  res.end('Auth failed');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/done',
    failureRedirect: '/error'
  })
);

app.listen(4000);
