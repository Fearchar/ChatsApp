const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: 'Please provide a {PATH}', maxlength: [
    40,
    'Thread names can be no longer that 40 characters. Please choose a shorter thread name.'
  ] },
  email: { type: String, unique: true, required: 'Please provide a {PATH}' },
  password: { type: String, required: 'Please provide a {PATH}' },
  imageUrl: { type: String, required: false },
  contacts: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  threads: [{ type: mongoose.Schema.ObjectId, ref: 'Thread' }]
}, {
  toJSON: {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  }
})

module.exports = mongoose.model('User', userSchema)
