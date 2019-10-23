const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    thread: { type: mongoose.Schema.ObjectId, ref: 'Thread', required: 'Please provide {PATH}' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: { type: String, required: 'Please provide {PATH}', maxlength: [
      2000,
      'Thread names can be no longer that 2000 characters. Please choose a shorter thread name.'
    ] }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
