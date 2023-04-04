const Fastify = require('fastify')

function buildFastify (opts = {}, testing) {
  const fastify = Fastify(opts)
  fastify.register(require('@fastify/cors'), {
    origin: '*'
  })

  fastify.register(require('@fastify/formbody'))

  fastify.register(require('./util/env-setup'))
  fastify.register(require('./util/jwt-setup'))

  fastify.register(require('fastify-multer').contentParser)

  fastify.register(require('fastify-bcrypt'))

  if (testing) {
    fastify.register(require('./util/test-db-connector'))
  } else {
    fastify.register(require('./util/db-connector'))
  }

  fastify.register(require('./routes/user-routes'), { prefix: '/user' })
  fastify.register(require('./routes/form-routes'), { prefix: '/form' })

  return fastify
}

module.exports = buildFastify
