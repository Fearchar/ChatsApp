const router = require('express').Router()
//!!! const secureRoute = require('../lib/secureRoute')
const userController = require('../controllers/userController')

router.post('/register', userController.registerRoute)
router.post('/login', userController.loginRoute)
router.get('/users', userController.indexRoute)
router.route('/users/:id')
  .get(userController.showRoute)
  .put(userController.updateRoute)
  .delete(userController.deleteRoute)

module.exports = router
