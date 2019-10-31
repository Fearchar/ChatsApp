function resStatusEmit(io) {
  return (req, res, next) => {
    res.statusEmit = (eventName, threadId, data, statusCode=200) => {
      io.to(threadId).emit(eventName, data)
      res.sendStatus(statusCode)
    }
    next()
  }
}

module.exports = resStatusEmit
