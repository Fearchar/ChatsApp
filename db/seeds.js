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
      users.forEach(user => {
        user.threads.addToSet(thread)
      })
    })

    return Promise.all([ ...users.map(user => user.save()) ])
  }

  return { createThreads, addThreadsToUsers }
})()

mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(threadHelper.createThreads)
  .then(threadHelper.addThreadsToUsers)
  .then(() => console.log('db: Sucessfully seeded'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
