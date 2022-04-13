const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('req-flash')

const passport = require('passport')
const auth = require('./src/controllers/auth')

const adminRouter = require('./src/config/routes/adminRoutersjs')
const routes = require('./src/config/routes/routes')


app.engine('handlebars', hbs.engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
}))

app.set('view engine', 'handlebars')

app.use('/public', express.static('public'))

//app.use(cookieParser())
app.use(session({
  secret: 'ubg1234hijb12hb',
  cookie: { maxAge: 60000},
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash(function(req, res, next) {
  res.locals.message_success = req.flash('message_success')
  res.locals.message_error = req.flash('message_error')
  return next()
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)
app.use(adminRouter)
//app.use(auth)

app.listen(8080)