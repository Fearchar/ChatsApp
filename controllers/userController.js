const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Thread = require('../models/Thread')
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
      ) return res.sendStatus(401)
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({ token, message: `Welcome back to the conversation ${user.name}` })
    })
    .catch(next)
}

function showRoute(req, res, next) {
  User.findById(req.params.id)
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
    .then(user => !user ? res.sendStatus(404) : user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next)
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => !user ? res.sendStatus(404) : user.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

function showThreadIndexRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => !user ? res.sendStatus(404) : User.populate(
      user,
      {
        path: 'threads',
        modal: 'Thread',
        select: 'name lastMessage lastMessageDate'
      }))
    .then(user => res.json(user))
    .catch(next)
}

function joinThreadRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) return res.sendStatus(404)
      Thread.findById(req.params.threadId)
        .then(thread => {
          if (!thread) return res.sendStatus(404)
          user.threads.addToSet(thread._id)
          return user.save()
        })
        .then(user => res.json(user))
        .catch(next)
    })
}

module.exports = {
  register: registerRoute,
  login: loginRoute,
  show: showRoute,
  index: indexRoute,
  update: updateRoute,
  delete: deleteRoute,
  showThreadIndex: showThreadIndexRoute,
  joinThread: joinThreadRoute
}
