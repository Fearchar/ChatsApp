const Thread = require('../models/Thread')
const User = require('../models/User')

function createRoute(req, res, next) {
  Thread.create(req.body)
    .then(thread => res.json(thread))
    .catch(next)
}

function showRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => !thread ? res.sendStatus(404) : res.json(thread))
    .catch(next)
}

function updateRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => !thread ? res.sendStatus(404) : thread.set(req.body))
    .then(thread => thread.save())
    .then(thread => res.json(thread))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => !thread ? res.sendStatus(404) : thread.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

function addUserRoute(req, res, next, userType) {
  Thread.findById(req.params.threadId)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      User.findById(req.params.userId)
        .then(user => {
          if (!user) return res.sendStatus(404)
          thread[userType + 's'].addToSet(user._id)
          return thread.save()
        })
        .then(thread => res.json(thread))
        .catch(next)
    })
}

function removeUserRoute(req, res, next) {
  Thread.findById(req.params.threadId)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      thread.users.pull(req.params.userId)
      return thread.save()
    })
    .then(thread => res.json(thread))
    .catch(next)
}

module.exports = {
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  addUser: (req, res, next) => addUserRoute(req, res, next, 'user'),
  removeUser: removeUserRoute,
  addAdmin: (req, res, next) => addUserRoute(req, res, next, 'admin')
}
