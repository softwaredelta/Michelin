const userController = require('../controllers/user-controller')

async function exampleRoutes (fastify, options) {
  userController.fastify = fastify

  fastify.get('/users', userController.getUsers)

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
}

module.exports = exampleRoutes
