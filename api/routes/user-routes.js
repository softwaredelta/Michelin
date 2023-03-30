const userController = require('../controllers/user-controller')

async function userRoutes (fastify, options) {
  userController.fastify = fastify

  fastify.get('/list', userController.getUsers)

  fastify.post('/login', userController.login)

  fastify.post('/signup', userController.signup)

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
}

module.exports = userRoutes
