function verifyAuth(req, res, next) {
  if(req.isAuthenticated()) {

  }
  else {
    req.flash('message_error', 'Acesse para continuar')
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