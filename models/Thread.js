const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: { type: String, maxlength: [
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
    messages: [ { type: messageSchema } ],
    admins: [ { type: mongoose.Schema.ObjectId , ref: 'User' } ],
    participants: [ { type: mongoose.Schema.ObjectId , ref: 'User' } ],
    lastMessageDate: { type: Date }
  }
)

messageSchema.pre('validate', function checkContent(next) {
  const isContentEmpty = (!this.cleared && !this.content) || !this.content.replace(/ |\n/g, '')

  if (isContentEmpty) this.invalidate('content', 'Please provide message content.')
  next()
})

threadSchema.pre('validate', function checkUsers(next) {
  if (
    this.admins.length < 1 ||
    this.admins.length + this.participants.length < 2
  ) this.invalidate('users', 'Threads require at least one admin and one participantA.')
  next()
})

module.exports = mongoose.model('Thread', threadSchema)
