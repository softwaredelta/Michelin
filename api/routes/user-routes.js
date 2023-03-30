const userController = require('../controllers/user-controller')

async function userRoutes (fastify, options) {
  userController.fastify = fastify

  fastify.get(
    '/list',
    {
      onRequest: [fastify.authenticate]
    },
    userController.getUsers)

  fastify.post('/login', userController.login)

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
}

module.exports = userRoutes
