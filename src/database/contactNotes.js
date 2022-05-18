const db = require('../config/db')

const Note = db.sequelize.define('contact_notes', {
  contact_id: {
    type: db.Sequelize.INTEGER,
    references: {
      model:'contacts',
      key: 'id'
    }
  },
  note: {
    type: db.Sequelize.STRING
  }
})

//Note.sync()

module.exports = Note