const db = require('../config/db')

const Product = db.sequelize.define('products', {
  product_name: {
    type: db.Sequelize.STRING
  },
  product_description: {
    type: db.Sequelize.STRING
  },
  product_image: {
    type: db.Sequelize.BLOB('medium')
  }
})

//Product.sync()

module.exports = Product