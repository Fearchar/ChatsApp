const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  thread: { type: String, required: 'Please provide {PATH}' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: 'Please provide {PATH}' }
}, {
  timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)
