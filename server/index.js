require('dotenv').config();
const express = require('express');
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { KEY1, KEY2, PORT } = process.env;
const app = express();
const port = PORT || 3000;

auth(passport);

app.use(
  cookieSession({
    name: 'session',
    keys: [KEY1, KEY2]
  })
);
app.use(cookieParser());

app.use(passport.initialize());

app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set'
    });
  } else {
    res.cookie('token', '');
    res.json({
      status: 'session cookie not set'
    });
  }
});

app.get('/auth/google', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent'
  })(req, res, next);
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    console.log(req.user.token);
    req.session.token = req.user.token;
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
