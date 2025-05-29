require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../src/models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      //This function runs after google redirects back with user information
      try {
        //checking for exisiting google in Db
        let user = await User.findOne({ email: profile.email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
          });
          await user.save();
        }

        // `done` tells Passport to continue; user object will be attached to req.user
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

//save user ID to the session cookie
passport.serializeUser((user, done) => {
  done(null, user.id); //store mongodb id in session
});

//read user if from session and fetch full user from db
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
