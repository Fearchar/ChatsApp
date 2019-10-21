const Thread = require('../models/Thread')

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

function indexRoute(req, res, next) {
  Thread.find(req.body.user.id)
    .then(threads => res.json(threads))
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

module.exports = {
  create: createRoute,
  show: showRoute,
  index: indexRoute,
  update: updateRoute,
  delete: deleteRoute
}
