const Thread = require('../models/Thread')
const User = require('../models/User')
const cleanWhitespace = require('../lib/cleanWhitespace')

//!!! Use lessons learned in below to flatten all controllers in both files

function createRoute(req, res, next) {
  req.body.admins = [ req.currentUser._id ]
  let createdThread = null

  Thread.create(req.body)
    .then(thread => {
      createdThread = thread
      req.currentUser.threads.addToSet(createdThread)

      return Promise.all(req.body.participantIds.map(pId => User.findById(pId)))
    })
    .then(participants => {
      const savingUsers = []

      for (const user of participants) {
        if (!user) return res.sendStatus(404)
        user.threads.addToSet(createdThread)
        createdThread.participants.addToSet(user)

        savingUsers.push(user.save())
      }

      return Promise.all(savingUsers)
    })
    .then(() => Promise.all([ req.currentUser.save(), createdThread.save() ]))
    .then(thread => Thread.populate(thread, {
      path: 'participants',
      modal: User,
      select: 'name'
    }))
    .then(thread => res.json(thread))
    .catch(next)
}

function showRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => !thread ? res.sendStatus(404) : res.json(thread))
    .catch(next)
}

function changeNameRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      thread.set(req.body.name)
      return thread.save()
        .then(thread => res.json(thread))
    })
    .catch(next)
}

function deleteRoute(req, res, next) {
  Thread.findById(req.params.id)
    .then(thread => !thread ? res.sendStatus(404) : thread.remove()
      .then(() => res.sendStatus(204))
    )
    .catch(next)
}

function changeUserStatusRoutes(req, res, next, changeTo = 'participant') {
  const changeFrom = changeTo === 'admin' ? 'participant' : 'admin'
  Thread.findById(req.params.id)
    .then(thread => {
      return User.findById(req.params.userId)
        .then(user => {
          if (!thread || !user) return res.sendStatus(404)
          user.threads.addToSet(req.params.id)
          return user.save()
            .then(user => {
              thread[`${changeFrom}s`].pull(user._id)
              thread[`${changeTo}s`].addToSet(user._id)
              return thread.save()
            })
            .then(thread => res.json(thread))
        })
    })
    .catch(next)
}

function removeUserRoutes(req, res, next, userType) {
  Thread.findById(req.params.id)
    .then(thread => {
      if (!thread) return res.sendStatus(404)
      thread[`${userType}s`].pull(req.params.userId)
      return thread.save()
        .then(thread => res.json(thread))
    })
    .catch(next)
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
      req.body.content = cleanWhitespace(req.body.content)
      thread.messages.addToSet(req.body)
      return thread.save()
        .then(() => Thread.populate(thread, {
          path: 'messages.user',
          select: 'name _id'
        }))
        .then(() => {
          const message = thread.messages[thread.messages.length - 1]
          res.statusEmit('message:new', thread._id, message)
        })
    })
    .catch(next)
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
      return thread.save()
        //!!! Should I be sending something back with a 204?
        .then(thread => res.json(thread).status(204))
    })
    .catch(next)
}

module.exports = {
  create: createRoute,
  show: showRoute,
  changeName: changeNameRoute,
  delete: deleteRoute,
  addUser: changeUserStatusRoutes,
  removeUser: (req, res, next) => removeUserRoutes(req, res, next, 'participant'),
  promoteUser: (req, res, next) => changeUserStatusRoutes(req, res, next, 'admin'),
  removeAdmin: (req, res, next) => removeUserRoutes(req, res, next, 'admin'),
  demoteAdmin: changeUserStatusRoutes,
  messageCreate: messageCreateRoute,
  messageClear: messageClearRoute
}
