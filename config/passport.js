const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy(
    async function(username, password, done) {
        let user = await User.findOne({ userName: username })
        if (!user) { return done(null, false, { msg: `User ${user} not found.`})}
        user.comparePassword(password, (err, isMatch) => {
          if (err) { return done(err)}
          if (isMatch)  {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid user name or password.' })
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
  })

passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id).exec()  // No longer accepts a @#$%ing callback
      return done(null, user.id)
    }
    catch (err) {
      return done(err, null)
    }
})
}