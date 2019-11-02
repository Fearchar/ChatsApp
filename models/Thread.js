const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: { type: String, required: 'Please provide {PATH}', minimize: false, maxlength: [
      2000,
      'Messages can be no longer that 2000 characters. Please choose a shorten your message.'
    ] },
    cleared: { type: Boolean }
  },
  { timestamps: true }
)

const threadSchema = new mongoose.Schema(
  {
    name: { type: String, required: [ true, 'Please provide {PATH}' ], maxlength: [
      40,
      'Thread names can be no longer that 40 characters. Please choose a shorter thread name.'
    ] },
    messages: [ { type: messageSchema , ref: 'User' } ],
    nameSpace: { type: String, unique: true, required: true },
    admins: [ { type: mongoose.Schema.ObjectId , ref: 'User' } ],
    participants: [ { type: mongoose.Schema.ObjectId , ref: 'User' } ],
    lastMessage: { type: String },
    lastMessageDate: { type: Date }
  }
)

threadSchema.pre('validate', function checkUsers(next) {
  if (this.admins.length < 1) {
    this.invalidate('admins', 'Thread requires at least one admin.')
  }
  next()
})

module.exports = mongoose.model('Thread', threadSchema)
