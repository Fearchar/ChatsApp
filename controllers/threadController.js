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
//!!! I need to make it so only the name can be updated.
// function updateRoute(req, res, next) {
//   Thread.findById(req.params.id)
//     .then(thread => !thread ? res.sendStatus(404) : thread.set(req.body))
//     .then(thread => thread.save())
//     .then(thread => res.json(thread))
//     .catch(next)
// }

function deleteRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) res.sendStatus(404)
      else return thread.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

function changeUserStatusRoutes(req, res, next, changeTo = 'participant') {
  const changeFrom = changeTo === 'admin' ? 'participant' : 'admin'
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      User.findById(req.params.userId)
        .then(user => {
          if (!user) return res.sendStatus(404)
          user.threads.addToSet(req.params.id)
          user.save()
            .then(user => {
              thread[`${changeFrom}s`].pull(user._id)
              thread[`${changeTo}s`].addToSet(user._id)
              return thread.save()
            })
            .then(thread => res.json(thread))
            .catch(next)
        })
    })
}

function removeUserRoutes(req, res, next, userType) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      thread[`${userType}s`].pull(req.params.userId)
      thread.save()
        .then(thread => res.json(thread))
        .catch(next)
    })
}

function isThreadUser(thread, user) {
  const threadUsers = [ ...thread.admins, ...thread.participants ]
  return threadUsers.some(id => user._id.equals(id))
}

function messageCreateRoute(req, res, next) {
  req.body.user = req.currentUser._id
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      if (!isThreadUser(thread, req.currentUser)) return res.sendStatus(401)
      thread.messages.addToSet(req.body)
      thread.save()
        .then(thread => res.json(thread))
        .catch(next)
    })
}

function messageClearRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      const message = thread.messages.id(req.params.messageId)
      if (
        !req.currentUser._id.equals(message.user._id) ||
        !isThreadUser(thread, req.currentUser)
      ) return res.sendStatus(401)
      message.content = ''
      message.cleared = true
      thread.save()
        .then(thread => res.json(thread).status(204))
        .catch(next)
    })
}

module.exports = {
  create: createRoute,
  show: showRoute,
  // update: updateRoute,
  delete: deleteRoute,
  addUser: changeUserStatusRoutes,
  removeUser: (req, res, next) => removeUserRoutes(req, res, next, 'participant'),
  promoteUser: (req, res, next) => changeUserStatusRoutes(req, res, next, 'admin'),
  removeAdmin: (req, res, next) => removeUserRoutes(req, res, next, 'admin'),
  demoteAdmin: changeUserStatusRoutes,
  messageCreate: messageCreateRoute,
  messageClear: messageClearRoute
}
