const db = require("../config/db");

const Contact = db.sequelize.define('contacts', {
  name: {
    type: db.Sequelize.STRING
  },
  pet_name: {
    type: db.Sequelize.STRING
  },
  phone: {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  }
})

//Contact.sync()

module.exports = Contact