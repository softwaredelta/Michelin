const userController = require('../controllers/user-controller')

async function userRoutes (fastify, options) {
  userController.fastify = fastify

  fastify.get('/list', userController.getUsers)

  fastify.post('/login', userController.login)

  fastify.post('/signup', { onRequest: [fastify.authenticate] }, userController.signup)

  fastify.post('/edit', { onRequest: [fastify.authenticate] }, userController.editUser)

  fastify.post('/newPassword', { onRequest: [fastify.authenticate] }, userController.generateNewUserPassword)

  fastify.post('/delete', { onRequest: [fastify.authenticate] }, userController.postDeleteUsers)

  fastify.get('/role', { onRequest: [fastify.authenticate] }, userController.getRoles)

  fastify.get('/managers', { onRequest: [fastify.authenticate] }, userController.getManagers)
}

module.exports = userRoutes
