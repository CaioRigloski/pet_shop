const express = require('express')
const passport = require("passport")
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("../database/user")


const auth = (auth) => {

  passport.serializeUser(function(user, done) {
    return done(null, user);
  })
  passport.deserializeUser(function(user, done) {
    return done(null, user);
  })
  
  passport.use(new localStrategy({
    usernameField: 'login',
    passwordField: 'password',
  },

  function (username, password, done, req) {
    User.findOne({
      where: {
        login: username
      },
      attributes: ['login', 'password']
    }).then(function(user) {
      if (!user) {
        return done(null, false, { message_error: 'Login ou senha incorretos' })
      }
  
      let isValidPass = bcrypt.compareSync(password, user.password)
  
      if(isValidPass == false) {
        return done(null, false, { message_error: 'Login ou senha incorretos' })
      }
  
      return done(null, user.login)
    })
  }))
}

function verifyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  }
  else {
    req.flash('error', 'Acesse para continuar')
    res.redirect('/admin/login')
  }
}

async function generateHash(user) {
  let salt = bcrypt.genSaltSync()
  return user.password = bcrypt.hashSync(user.password, salt)
}

module.exports = {
  auth,
  verifyAuth,
  generateHash
}

