const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (
        !user ||
        !user.validatePassword(req.body.password)
      ) return res.status(401).send({ errors: { email: 'Incorrect email or password.' } })
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({ token, message: `Welcome back to the conversation ${user.name}` })
    })
    .catch(next)
}

function showRoute(req, res, next) {
  User.findById(req.params.id)
    .select('+email')
    .then(user => !user ? res.sendStatus(404) : res.json(user))
    .catch(next)
}

function indexRoute(req, res, next) {
  User.find() // !!! alter to User.find(req.query) ???
    .then(users => res.json(users))
    .catch(next)
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      user.set(req.body)
      user.save()
        .then(user => res.json(user))
    })
    .catch(next)
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      user.remove()
        .then(() => res.sendStatus(204))
    })
    .catch(next)
}

function userThreadIndexRoute(req, res, next) {
  User.findById(req.params.id).populate('threads.message')
    .then(user => {
      if (!user) res.sendStatus(404)
      else return User.populate(user, {
        path: 'threads',
        modal: 'Thread',
        select: 'name messages admins participants lastMessage lastMessageDate'
      })
    })
    .then(user => User.populate(user, {
      path: 'threads.messages.user',
      select: 'name'
    }))
    .then(user => res.json(user))
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute,
  show: showRoute,
  index: indexRoute,
  update: updateRoute,
  delete: deleteRoute,
  userThreadIndex: userThreadIndexRoute
}
