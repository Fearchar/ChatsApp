const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401)
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({ token, message: `Welcome back to the conversation ${user.name}` })
    })
    .catch(next)
}

function showRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404)
      return res.json(user)
    })
    .catch(next)
}

function indexRoute(req, res, next) {
  User.find() // !!! alter to User.find(req.query) ??
    .then(users => res.json(users))
    .catch(next)
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      return user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next)
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      return user.remove()
        .then(() => res.sendStatus(204))
        .catch(next)
    })
}

module.exports = { registerRoute, loginRoute, showRoute, indexRoute, updateRoute, deleteRoute }
