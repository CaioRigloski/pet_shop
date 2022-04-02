const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Contact = require('./src/database/contact')

const info = require('./src/files/contactInfo')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('req-flash')


app.engine('handlebars', hbs.engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
}))

app.set('view engine', 'handlebars')

app.use('/public', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
  secret: 'ubg1234hijb12hb',
  cookie: { maxAge: 60000},
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
}))

app.use(flash(function(req, res, next) {
  res.locals.message_success = req.flash('message_success')
  res.locals.message_error = req.flash('message_error')
  return next()
}))


app.get('/', (req, res) => {
  res.render('home', {
    info: info,
    message_success: req.flash('message_success'),
    message_error: req.flash('message_error')
  })
})

app.get('/contato', (req, res) => {
  res.render('contact', {
    info: info,
    contact_page: true,
    message_success: req.flash('message_success'),
    message_error: req.flash('message_error')
  })
})

app.post('/contato', (req, res) => {
  Contact.create({
  name: req.body.name,
  pet_name: req.body.pet_name,
  phone: req.body.phone,
  email: req.body.email
  }).then(() => req.flash('message_success', 'Enviado com sucesso!'))
  .catch(() => req.flash('message_error', `Erro ao enviar, por gentileza entre em contato conosco através do telefone ${info.phone}, Whatsapp ${info.cellphone}, ou e-mail ${info.email}`))
  .then(() => res.redirect(req.get('referer')))
})

app.listen(8080)
