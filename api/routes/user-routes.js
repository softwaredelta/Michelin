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

  fastify.post('/edit', userController.editUsers)
}

module.exports = userRoutes
