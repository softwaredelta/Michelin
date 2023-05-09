const userController = require('../controllers/user-controller')

async function userRoutes (fastify, options) {
  userController.fastify = fastify

  fastify.get('/list', userController.getUsers)

  fastify.get(
    '/listProtected',
    {
      onRequest: [fastify.authenticate]
    },
    userController.getUsers)

  fastify.post('/login', userController.login)

  fastify.post('/signup', userController.signup)

  fastify.post('/edit', userController.editUser)

  fastify.post('/newPassword', userController.generateNewUserPassword)

  fastify.post('/delete', userController.postDeleteUsers)

  fastify.get('/role', userController.getRoles)

  fastify.get('/managers', userController.getManagers)
}

module.exports = userRoutes
