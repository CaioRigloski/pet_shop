const express = require('express')
const passport = require('passport')
const { verifyAuth, generateHash } = require('../../controllers/authpartials')
const Contact = require('../../database/contact')
const Note = require('../../database/contactNotes')
const User = require('../../database/user')

const adminRouter = express.Router()

adminRouter.get('/admin', (req, res) => {
  res.redirect('/admin/login')
})

adminRouter.get('/admin/login', (req, res) => {
  res.render('./admin/adm_login', { layout: 'adm', message_error: req.flash('error') })
})

adminRouter.post('/admin/login', passport.authenticate('local', {
  successRedirect: '/admin/painel',
  failureRedirect: '/admin/login',
  failureFlash: true
}))

adminRouter.post('/admin/create_user', verifyAuth, (req, res) => {  
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

adminRouter.get('/admin/painel', verifyAuth, (req, res) => {
  res.redirect('/admin/painel/1')
})

adminRouter.get('/admin/painel/:number', verifyAuth, (req, res) => {
  var number = req.params.number - 1
  Contact.findAndCountAll().then((result) => {
    var arr = []
    var totalPages = []

    var perPage = 2
    for(var i = 0; i <= result.rows.length; i++) {
      arr.push(result.rows.splice(0, perPage))
      arr[i].page = i + 1
    }

    for(var i = 1; i <= Math.ceil(result.count/perPage); i++) {
      totalPages.push({number: i})
    }

    return {arr, totalPages}
  }).then((contactPage) => {
    
    Note.findAll().then((note) => {
      var contacts = []
      var contactNotes = []
      var data = []
      var render = []

      contacts.push(contactPage.arr)

      note.map((n) => {
        contactNotes.push([{note_id: n.id, contact_id: n.contact_id, note: n.note}])
      })

      contacts.forEach((contact, cIndex) => {
        contact[number].map((c) => {
          data.push([{id: c.id, name: c.name, pet_name: c.pet_name, phone: c.phone, email: c.email}])
        })
      })

      data.map((d, dIndex) => {
        d.forEach((dt, dtIndex) => {
          let notes = contactNotes.flat().filter((element) => element.contact_id === dt.id)
          render.push({id: dt.id, name: dt.name, pet_name: dt.pet_name, phone: dt.phone, email: dt.email, note: notes})
        })
      })
      
      return render
    }).then((render) => {
      res.render('./admin/adm_panel', { layout: 'adm', Contact: render, Page: contactPage.totalPages})
    })
  })
})

adminRouter.post('/admin/painel/concluir_contato', (req, res) => {
  Contact.update(
    {is_concluded: 1}, {
      where: {
        id: req.body.id,
        email: req.body.email
      }
    }).then(() => {
    res.json('success')
  }).catch(() => {
    res.json('error')
  })
})

adminRouter.post('/admin/painel/desfazer_contato', (req, res) => {
  Contact.update(
    {is_concluded: 0}, {
      where: {
        id: req.body.id,
        email: req.body.email
      }
    }).then(() => {
    res.json('success')
  }).catch(() => {
    res.json('error')
  })
})

adminRouter.post('/admin/painel/adicionar_anotacao', (req, res) => {
  console.log(req.body)
  Contact.findOne({
    where: {
      id: req.body.id
    }
  }).then((contact) => {
    Note.create({
      contact_id: contact.id,
      note: req.body.note
    })
  }).then(() => {
    res.json('success')
  }).catch(() => {
    res.json('error')
  })
})

adminRouter.get('/admin/painel/api/contacts', (req, res) => {
  Contact.findAll({
    attributes: ['id','is_concluded']
  }).then((response) => {
    res.json(response)
  }).catch(() => {
    res.json('erro ao buscar contatos')
  })
})

module.exports = adminRouter