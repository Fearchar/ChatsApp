const Thread = require('../models/Thread')
const Message = require('../models/Message')

// function createRoute(req, res, next) {
//   Thread.findById(req.body.thread._id)
//     .then(thread => !thread ? res.sendStatus(404) : Message.create(req.body))
//     .then(message => res.json(message))
//     .catch(next)
// }

function createRoute(req, res, next) {
  req.body.user = req.currentUser
  req.body.thread = req.params.threadId
  Thread.findById(req.params.threadId)
    .then(thread => !thread ? res.sendStatus(404) : Message.create(req.body))
    .then(message => res.json(message))
    .catch(next)
}

function showRoute(req, res, next) {
  Message.findById(req.params.id)
    .then(message => !message ? res.sendStatus(404) : res.json(message))
    .catch(next)
}

function indexRoute(req, res, next) {
  Message.find() // !!! alter to Message.find(req.query) ???
    .then(messages => res.json(messages))
    .catch(next)
}

function updateRoute(req, res, next) {
  Message.findById(req.params.id)
    .then(message => !message ? res.sendStatus(404) : message.set(req.body))
    .then(message => message.save())
    .then(message => res.json(message))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Message.findById(req.params.id)
    .then(message => !message ? res.sendStatus(404) : message.remove())
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
