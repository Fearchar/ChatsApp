const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise
const Thread = require('../models/Thread')
const User = require('../models/User')
const makeThreadData = require('./data/makeThreadData')
const userData = require('./data/userData')
const { dbURI } = require('../config/environment')

const threadHelper = (function () {
  let users = null

  function createThreads(recievedUsers) {
    users = recievedUsers

    return Thread.create(makeThreadData(users))
  }

  function addThreadsToUsers(threads) {
    threads.forEach(thread => {
      users.forEach(user => [ ...thread.admins, ...thread.participants ]
        .some(threadUser => threadUser === user._id) &&
        user.threads.addToSet(thread)
      )
    })

    return Promise.all([ ...users.map(user => user.save()) ])
  }

  return { createThreads, addThreadsToUsers }
})()

function linkUsers(users) {
  users.forEach(userA => {
    users.forEach(userB => {
      if (userA.name !== userB.name) {
        userA.contacts.addToSet(userB)
      }
    })
  })

  return Promise.all([ ...users.map(user => user.save()) ])
}

mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => linkUsers(users))
  .then(threadHelper.createThreads)
  .then(threadHelper.addThreadsToUsers)
  .then(() => console.log('db: Sucessfully seeded'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
