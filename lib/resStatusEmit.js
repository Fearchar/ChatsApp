function resStatusEmit(io) {
  return (req, res, next) => {
    res.statusEmit = (eventName, data, statusCode=200) => {
      io.emit(eventName, data)
      res.sendStatus(statusCode)
    }
    next()
  }
}

module.exports = resStatusEmit
