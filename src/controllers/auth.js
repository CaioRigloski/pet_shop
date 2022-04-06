const passport = require("passport")
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Login = require("../database/login")


const auth = (auth) => {

  passport.serializeUser(function(user, done) {
    return done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    return done(null, user);
  });
  
  passport.use(new localStrategy({
    usernameField: 'login',
    passwordField: 'password',
  },
  function (username, password, done, req) {
    Login.findOne({
      where: {
        login: username
      },
      attributes: ['login', 'password']
    }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Login ou senha incorretos' })
      }
  
      let isValidPass = bcrypt.compareSync(password, user.password)
  
      if(isValidPass == false) {
        return done(null, false, { message: 'Login ou senha incorretos' })
      }
  
      return done(null, user.login)
    })
  }))
}

module.exports = auth

