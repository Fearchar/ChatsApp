const router = require('express').Router()
//!!! const secureRoute = require('../lib/secureRoute')
const userController = require('../controllers/userController')
const secureRoute = require('../lib/secureRoute')

router.post('/register', userController.registerRoute)
router.post('/login', userController.loginRoute)
router.get('/users', secureRoute, userController.indexRoute)
router.route('/users/:id')
  .get(userController.showRoute)
  .put(userController.updateRoute)
  .delete(userController.deleteRoute)

module.exports = router
