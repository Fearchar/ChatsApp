const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: 'Please provide a {PATH}', maxlength: [
    40,
    'Thread names can be no longer that 40 characters. Please choose a shorter thread name.'
  ] },
  email: { type: String, unique: true, required: 'Please provide a {PATH}' },
  password: { type: String, required: 'Please provide a {PATH}' },
  imageUrl: { type: String, required: false },
  contacts: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  id: false
}, {
  toJSON: {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  }
})

userSchema.virtual('threads', {
  localField: '_id',
  foreignField: 'users',
  ref: 'Thread'
})

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext){
    this._passwordConfirmation = plaintext
  })

userSchema.pre('validate', function checkPasswords(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(plaintext){
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)
