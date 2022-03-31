const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Contact = require('./src/database/contact')


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

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/contato', (req, res) => {
  res.render('contact')
})

app.post('/contato', (req, res) => {
  Contact.create({
    name: req.body.name,
    pet_name: req.body.pet_name,
    phone: req.body.phone,
    email: req.body.email
  }).then(
    res.redirect('/contato')
  )
})

app.listen(8080)
