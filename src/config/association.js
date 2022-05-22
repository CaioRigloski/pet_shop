const Contact = require("../database/contact");
const Note = require("../database/contactNotes");

const Associations = () => {
  Contact.hasOne(Note, { foreignKey: 'contact_id' })
}


module.exports = Associations