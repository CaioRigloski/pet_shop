const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

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

})

app.listen(8080)
