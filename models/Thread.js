const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide {PATH}', maxlength: [
    40,
    'Thread names can be no longer that 40 characters. Please choose a shorter thread name.'
  ] },
  nameSpace: { type: String, unique: true, required: true },
  admins: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }],
  lastMessage: { type: String },
  lastMessageDate: { type: Date }
})

module.exports = mongoose.model('Thread', threadSchema)
