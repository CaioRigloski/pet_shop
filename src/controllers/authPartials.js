const bcrypt = require('bcrypt')

function verifyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('autenticado')
    next()
  }
  else {
    console.log('não autenticado')
    req.flash('error', 'Acesse para continuar')
    res.redirect('/admin/login')
  }
}

async function generateHash(user) {
  let salt = bcrypt.genSaltSync()
  return user.password = bcrypt.hashSync(user.password, salt)
}

module.exports = {
  verifyAuth,
  generateHash
}