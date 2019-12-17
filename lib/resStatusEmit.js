function resStatusEmit(io) {
  return (req, res, next) => {
    res.statusEmit = (eventName, threadId, data, statusCode=200) => {
      if (threadId) io.to(threadId).emit(eventName, threadId, data)
      else io.emit(eventName, data)
      res.sendStatus(statusCode)
    }
    next()
  }
}

module.exports = resStatusEmit
