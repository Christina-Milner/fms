const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/')  /* May need to adapt this */
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    if (validator.isEmpty(req.body.username)) validationErrors.push({ msg: 'User name cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { console.log("Error: ", err); return next(err) }
      if (!user) {
        console.log("No user")
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        console.log("Login block")
        if (err) { console.log("Error in login block: ", err); return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        console.log("Should be success")
        res.redirect('/')    /* May need to change */
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    console.log("Calling logout")
    req.logout((err) => {
      if (err) { return next(err)}
      console.log('User has logged out.')
      req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err)
        req.user = null
        res.redirect('/')
      })
    })
  }
  
/* Remove anything elsewhere that refers to getSignup or postSignup */
  