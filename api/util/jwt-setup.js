require('dotenv').config()

const fastifyPlugin = require('fastify-plugin')

async function jwtAuthenticator (fastify, options) {
  fastify.register(require('@fastify/jwt'), {
    secret: 'secret'
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send({ statusCode: 401 })
    }
  })
}

module.exports = fastifyPlugin(jwtAuthenticator)
