const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
      },
      (token, refreshToken, profile, done) =>
        done(null, {
          profile,
          token
        })
    )
  );
};
