const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Contact = require('./src/database/contact')
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
  res.locals.message = req.flash('message')
  return next()
}))


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/contato', (req, res) => {
  res.render('contact', { message: req.flash('message') })
})

app.post('/contato', (req, res) => {
  var err
  try {
    Contact.create({
      name: req.body.name,
      pet_name: req.body.pet_name,
      phone: req.body.phone,
      email: req.body.email
    })
  } catch (error) {
    err = true 
  } finally {
    if(err = true) {
      req.flash('message', 'Erro')
    } else {
      req.flash('message', 'Enviado com sucesso!')
    }
    res.redirect('/contato')
  }
})

app.listen(8080)
