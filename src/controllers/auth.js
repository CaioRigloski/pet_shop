const passport = require("passport")
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../database/user')

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
    User.findOne({
      where: {
        login: username
      },
      attributes: ['login', 'password']
    }).then(function(user) {
      if (!user) {
        console.log('usuário não existe')
        return done(null, false, { message: 'Login ou senha incorretos' })
      }
  
      let isValidPass = bcrypt.compareSync(password, user.password)
  
      if(isValidPass == false) {
        console.log('senha incorreta')
        return done(null, false, { message: 'Login ou senha incorretos' })
      }
      
      console.log('logado')
      return done(null, user.login)
    })
  }
))}


module.exports = [ auth ] 

