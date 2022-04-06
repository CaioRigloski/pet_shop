const db = require('../config/db')

const User = db.sequelize.define('users', {
  login: {
    type: db.Sequelize.STRING
  },
  password: {
    type: db.Sequelize.STRING
  }
})

User.sync({force: true})