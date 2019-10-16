const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide {PATH}' },
  admins: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }]
})

module.exports = mongoose.model('Thread', threadSchema)
