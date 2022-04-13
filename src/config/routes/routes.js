const express = require('express')
const Contact = require('../../database/contact')
const info = require('../../files/contactInfo')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.render('home', {
    info: info,
    message_success: req.flash('message_success'),
    message_error: req.flash('message_error')
  })
})

routes.get('/produtos', (req, res) => {
  res.render('products')
})

routes.get('/contato', (req, res) => {
  res.render('contact', {
    info: info,
    contact_page: true,
    message_success: req.flash('message_success'),
    message_error: req.flash('message_error')
  })
})

routes.post('/contato', (req, res) => {
  Contact.create({
  name: req.body.name,
  pet_name: req.body.pet_name,
  phone: req.body.phone,
  email: req.body.email
  }).then(() => req.flash('message_success', 'Enviado com sucesso!'))
  .catch(() => req.flash('message_error', `Erro ao enviar, por gentileza entre em contato conosco através do telefone ${info.phone}, Whatsroutes ${info.cellphone}, ou e-mail ${info.email}`))
  .then(() => res.redirect(req.get('referer')))
})

module.exports = routes