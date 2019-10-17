const router = require('express').Router()
//!!! const secureRoute = require('../lib/secureRoute')
const userController = require('../controlllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.index)
router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete)

module.exports = router
