const router = require('express').Router()
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')
// const secureRoute = require('../lib/secureRoute')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.index)
router.route('/users/:id')
  .get( userController.show)
  .put( userController.update)
  .delete( userController.delete)
router.get('/users/:id/threads', userController.showThreadIndex)

router.post('/threads', threadController.create)
router.route('/threads/:id')
  .get( threadController.show)
  .put( threadController.update)
  .delete(threadController.delete)
router.put('/threads/:threadId/users/:userId/', threadController.addUser)

module.exports = router
