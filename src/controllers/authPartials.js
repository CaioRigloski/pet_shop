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
  verifyAuth,
  generateHash
}