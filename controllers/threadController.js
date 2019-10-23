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

function changeUserStatusRoutes(req, res, next, changeTo = 'participant') {
  const changeFrom = changeTo === 'admin' ? 'participant' : 'admin'
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      User.findById(req.params.userId)
        .then(user => {
          if (!user) return res.sendStatus(404)
          user.threads.addToSet(req.params.id)
          return user.save()
        })
        .then(user => {
          thread[`${changeFrom}s`].pull(user._id)
          thread[`${changeTo}s`].addToSet(user._id)
          return thread.save()
        })
        .then(thread => res.json(thread))
        .catch(next)
    })
}

function removeUserRoutes(req, res, next, userType) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      thread[`${userType}s`].pull(req.params.userId)
      return thread.save()
    })
    .then(thread => res.json(thread))
    .catch(next)
}

function messageCreateRoute(req, res, next) {
  req.body.user = req.currentUser._id
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      const users = [ ...thread.admins, ...thread.participants ]
      // !!! I'm unclear why returning res.sendStatus is leading to circular JSON.stringify error. The below has resolved this.
      if (!users.some(id => req.currentUser._id.equals(id))) {
        res.sendStatus(401)
        return
      }
      thread.messages.addToSet(req.body)
      return thread.save()
    })
    .then(thread => res.json(thread))
    .catch(next)
}

function messageClearRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      const message = thread.messages.id(req.params.messageId)
      if (!req.currentUser._id.equals(message.user._id)) return res.sendStatus(401)
      message.content = ''
      message.cleared = true
      return thread.save()
    })
    .then(thread => res.json(thread).status(204))
    .catch(next)
}

module.exports = {
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  addUser: changeUserStatusRoutes,
  removeUser: (req, res, next) => removeUserRoutes(req, res, next, 'participant'),
  promoteUser: (req, res, next) => changeUserStatusRoutes(req, res, next, 'admin'),
  removeAdmin: (req, res, next) => removeUserRoutes(req, res, next, 'admin'),
  demoteAdmin: changeUserStatusRoutes,
  messageCreate: messageCreateRoute,
  messageClear: messageClearRoute
}
