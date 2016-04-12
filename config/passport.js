var User = require('../models/user')
var GitHubStrategy = require('passport-github').Strategy

module.exports = function (passport) {
  // passport.serializeUser(function (user, done) {
  //   done(null, user._id)
  // })
  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  //     done(err, user)
  //   })
  // })
  passport.use('github', new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  ));
}
