const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema(
  {
    name: { type: String, required: 'Please provide {PATH}', maxlength: [
      40,
      'Thread names can be no longer that 40 characters. Please choose a shorter thread name.'
    ] },
    nameSpace: { type: String, unique: true, required: true },
    admins: { type: [ mongoose.Schema.ObjectId ], ref: 'User'},
    participants: { type: [ mongoose.Schema.ObjectId ], ref: 'User'},
    lastMessage: { type: String },
    lastMessageDate: { type: Date }
  },
  { toJSON: { virtuals: true } }
)

threadSchema.virtual('messages', {
  localField: '_id',
  foreignField: 'thread',
  ref: 'Message',
  justOne: false
})

threadSchema.pre('validate', function checkUsers(next){
  if (this.admins.length < 1) {
    this.invalidate('thread', 'Requires at least one admin.')
  }
  next()
})

module.exports = mongoose.model('Thread', threadSchema)
