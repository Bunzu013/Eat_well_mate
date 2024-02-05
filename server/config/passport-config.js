const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email }).populate("savedRecipes");
          if (!user) {
            return done(null, false, { message: "Email or password incorrect" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user, { message: "Found user - passwords match" });
          } else {
            return done(null, false, { message: "Email or password incorrect" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, callBackFunc) => {
    callBackFunc(null, user.id);
  });

  passport.deserializeUser(async (id, callBackFunc) => {
    try {
      const user = await User.findById(id);
      return callBackFunc(null, user);
    } catch (error) {
      return callBackFunc(error);
    }
  });
};
