const User = require('../models/User')
const jwt = require('jasonwebtoken')
const secret = require('../config/environment')

function register(req, res, next) {
  User.create(req.body)
    .catch(next)
}

function login(req, res, next) {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401)
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({ token, message: `Welcome back to the conversation ${user.name}`})
    })
    .catch(next)
}

function show(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404)
      return res.json(user)
    })
    .catch(next)
}

function index(req, res, next) {
  User.find() // !!! alter to User.find(req.query) ??
    .then(users => res.json(users))
    .catch(next)
}

function update(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next)
}

function delete(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      return user.remove()
      .then(() => res.sendStatus(204))
      .catch(next)
    })
}

module.exports = { register, login, show, index, update, delete }
