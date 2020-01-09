const router = require('express').Router()
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')
const secureRoute = require('../lib/secureRoute')

router.post('/register', userController.register)
router.post('/login', userController.login)
//!!! Remove userIndex route and controller for final version
router.get('/users', secureRoute, userController.index)
router.route('/users/:id')
  .get(secureRoute, userController.show)
  .put(secureRoute, userController.update)
  .delete(secureRoute, userController.delete)
router.put('/userAddContact', secureRoute, userController.addContact)
router.get('/userThreads', secureRoute, userController.userThreadIndex)

router.post('/threads', secureRoute, threadController.create)
router.route('/threads/:id')
  .get(secureRoute, threadController.show)
  .put(secureRoute, threadController.changeName)
  .delete(secureRoute, threadController.delete)
router.put('/threads/:id/users/:userId/add',secureRoute,  threadController.addUser)
router.put('/threads/:id/users/:userId/remove',secureRoute,  threadController.removeUser)
router.put('/threads/:id/users/:userId/promote',secureRoute,  threadController.promoteUser)
router.put('/threads/:id/admins/:userId/remove',secureRoute,  threadController.removeAdmin)
router.put('/threads/:id/admins/:userId/demote',secureRoute,  threadController.demoteAdmin)

router.post('/threads/:id/messages', secureRoute, threadController.messageCreate)
router.put('/threads/:id/messages/:messageId/clear', secureRoute, threadController.messageClear)

module.exports = router
