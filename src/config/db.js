const Sequelize = require('sequelize')

const sequelize = new Sequelize('pet_shop', 'root', 'senha123', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
