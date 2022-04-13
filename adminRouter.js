const express = require('express')
const { verifyAuth, generateHash } = require('./src/controllers/auth')
const User = require('./src/database/user')

const adminRouter = express.Router()

adminRouter.get('/admin/login', (req, res) => {
  res.render('./admin/adm_login', { layout: 'adm' })
})

adminRouter.get('/admin/painel', (req, res) => {
  res.render('./admin/adm_panel', { layout: 'adm' })
})

adminRouter.post('/admin/create_user', (req, res) => {
  var login = req.body.login
  var password = req.body.password
  User.beforeCreate(generateHash)
  User.create({
    login: login,
    password: password
  }).then(
    res.send('usuário criado')
  )
})
module.exports = adminRouter