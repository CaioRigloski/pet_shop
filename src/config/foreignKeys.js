const Contact = require('../database/contact')
const Note = require('../database/contactNotes')

Contact.hasMany(Note)