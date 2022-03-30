const db = require("../config/db");

const Contact = db.sequelize.define('contact', {
  name: {
    type: db.sequelize.STRING
  },
  pet_name: {
    type: db.sequelize.STRING
  },
  phone: {
    type: db.sequelize.NUMBER
  },
  email: {
    type: db.sequelize.STRING
  }
})

Contact.sync()