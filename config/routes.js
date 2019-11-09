const router = require('express').Router()
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')
const secureRoute = require('../lib/secureRoute')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.index)
router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete)
router.get('/users/:id/threads', userController.showThreadIndex)

router.post('/threads', secureRoute, threadController.create)
router.route('/threads/:id')
  .get(threadController.show)
  .put(threadController.changeName)
  .delete(threadController.delete)
router.put('/threads/:id/users/:userId/add', threadController.addUser)
router.put('/threads/:id/users/:userId/remove', threadController.removeUser)
router.put('/threads/:id/users/:userId/promote', threadController.promoteUser)
router.put('/threads/:id/admins/:userId/remove', threadController.removeAdmin)
router.put('/threads/:id/admins/:userId/demote', threadController.demoteAdmin)

router.post('/threads/:id/messages', secureRoute, threadController.messageCreate)
router.put('/threads/:id/messages/:messageId/clear', secureRoute, threadController.messageClear)

module.exports = router
