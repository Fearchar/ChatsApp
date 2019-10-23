const mongoose = require('mongoose')

function errorHandler(err, req, res, next) {
  if (err.path === '_id' && !mongoose.Types.ObjectId.isValid(err.value)) return res.sendStatus(404)
  if (err.name === 'ValidationError') {
    for(const key in err.errors) {
      err.errors[key] = err.errors[key].message
    }
    return res.status(422).json({ errors: err.errors })
  }
  console.log(err)
  res.sendStatus(500)
  next(err)
}

module.exports = errorHandler
